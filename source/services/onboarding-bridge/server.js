import express from 'express';
import { FIELD_MAP } from './config.js';
import { runSync } from './sync.js';

const REQUIRED_ENV = ['GHL_AGENCY_TOKEN', 'GHL_COMPANY_ID', 'WEBHOOK_SECRET'];
const missingEnv = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}
if (!process.env.ALERT_WEBHOOK_URL) {
  console.warn('ALERT_WEBHOOK_URL not set — failure alerts will only appear in logs.');
}

// Origins allowed to call the public browser endpoint (the marketing site).
// Comma-separated, e.g. "https://fynz.io,https://www.fynz.io".
const PUBLIC_SITE_ORIGINS = (process.env.PUBLIC_SITE_ORIGINS || '')
  .split(',')
  .map((s) => s.trim().replace(/\/$/, ''))
  .filter(Boolean);
if (PUBLIC_SITE_ORIGINS.length === 0) {
  console.warn('PUBLIC_SITE_ORIGINS not set — POST /onboard/web (website wizard) is disabled.');
}

const app = express();
app.use(express.json({ limit: '256kb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/onboard', (req, res) => {
  const payload = req.body || {};

  // Accept the shared secret in the body or in a header, whichever the
  // GHL Custom Webhook action was configured to send.
  const secret = payload.secret || req.get('x-webhook-secret');
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  if (!payload.email || !String(payload.email).includes('@')) {
    return res.status(400).json({ error: 'missing or invalid email' });
  }

  // ACK immediately — GHL webhook actions time out fast. Sync runs async.
  res.status(200).json({ accepted: true });

  setImmediate(() => {
    runSync(payload).catch((err) =>
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          level: 'error',
          msg: 'Unhandled sync error',
          error: err.message,
        }),
      ),
    );
  });
});

// --- Public endpoint for the website's onboarding wizard -------------------
// The marketing site is a static export, so the browser posts here directly;
// there is no server to hold the webhook secret. Protection instead:
// origin allowlist (CORS), per-IP rate limit, honeypot, field allowlist.

const applyCors = (req, res) => {
  const origin = req.get('origin');
  if (!origin || !PUBLIC_SITE_ORIGINS.includes(origin.replace(/\/$/, ''))) return false;
  res.set('Access-Control-Allow-Origin', origin);
  res.set('Vary', 'Origin');
  return true;
};

// 5 submissions per IP per 10 minutes; window map pruned on each hit.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const rateHits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  for (const [k, hits] of rateHits) {
    const live = hits.filter((t) => now - t < RATE_WINDOW_MS);
    if (live.length === 0) rateHits.delete(k);
    else rateHits.set(k, live);
  }
  const hits = rateHits.get(ip) || [];
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  rateHits.set(ip, hits);
  return false;
}

// Only these payload keys are forwarded to the sync (never contact_id — a
// public caller must not be able to tag arbitrary agency contacts).
// industry/plan/billing aren't written anywhere; they ride along so failure
// alerts and logs say which per-industry system the buyer was expecting.
const WEB_ALLOWED_KEYS = ['email', 'company_name', 'industry', 'plan', 'billing', ...Object.keys(FIELD_MAP)];
const MAX_FIELD_LENGTH = 2000;

app.options('/onboard/web', (req, res) => {
  if (!applyCors(req, res)) return res.status(403).end();
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '86400');
  res.status(204).end();
});

app.post('/onboard/web', (req, res) => {
  if (PUBLIC_SITE_ORIGINS.length === 0) {
    return res.status(503).json({ error: 'public endpoint not configured' });
  }
  if (!applyCors(req, res)) {
    return res.status(403).json({ error: 'forbidden origin' });
  }

  const body = req.body || {};

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (body.website) {
    return res.status(200).json({ accepted: true });
  }

  const ip = (req.get('x-forwarded-for') || '').split(',')[0].trim() || req.ip;
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'too many requests' });
  }

  if (!body.email || !String(body.email).includes('@')) {
    return res.status(400).json({ error: 'missing or invalid email' });
  }

  const payload = {};
  for (const key of WEB_ALLOWED_KEYS) {
    if (body[key] === undefined || body[key] === null) continue;
    payload[key] = String(body[key]).slice(0, MAX_FIELD_LENGTH);
  }
  payload.source = 'website-wizard';

  res.status(200).json({ accepted: true });

  setImmediate(() => {
    runSync(payload).catch((err) =>
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          level: 'error',
          msg: 'Unhandled sync error (web)',
          error: err.message,
        }),
      ),
    );
  });
});

// --- Public endpoint for the website's book-a-demo form --------------------
// Same protections as /onboard/web: origin allowlist, per-IP rate limit,
// honeypot, field allowlist. Leads are delivered to the alert webhook (the
// same monitored channel that receives sync failures), so a demo request is
// never silently dropped.

const DEMO_ALLOWED_KEYS = ['name', 'business', 'email', 'phone', 'interest', 'source'];

app.options('/demo/web', (req, res) => {
  if (!applyCors(req, res)) return res.status(403).end();
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '86400');
  res.status(204).end();
});

app.post('/demo/web', (req, res) => {
  if (PUBLIC_SITE_ORIGINS.length === 0) {
    return res.status(503).json({ error: 'public endpoint not configured' });
  }
  if (!applyCors(req, res)) {
    return res.status(403).json({ error: 'forbidden origin' });
  }

  const body = req.body || {};

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (body.website) {
    return res.status(200).json({ accepted: true });
  }

  const ip = (req.get('x-forwarded-for') || '').split(',')[0].trim() || req.ip;
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'too many requests' });
  }

  if (!body.email || !String(body.email).includes('@')) {
    return res.status(400).json({ error: 'missing or invalid email' });
  }

  const lead = {};
  for (const key of DEMO_ALLOWED_KEYS) {
    if (body[key] === undefined || body[key] === null) continue;
    lead[key] = String(body[key]).slice(0, MAX_FIELD_LENGTH);
  }

  res.status(200).json({ accepted: true });

  setImmediate(async () => {
    const text =
      `New DEMO REQUEST from the website: ` +
      `${lead.name || 'no name'} — ${lead.business || 'no business name'} — ` +
      `${lead.email} — ${lead.phone || 'no phone'}` +
      (lead.interest ? ` — interested in: ${lead.interest}` : '') +
      (lead.source ? ` — from: ${lead.source}` : '') +
      `.`;
    const url = process.env.ALERT_WEBHOOK_URL;
    if (!url) {
      console.error(JSON.stringify({ ts: new Date().toISOString(), level: 'error', msg: 'Demo lead received but ALERT_WEBHOOK_URL not set', lead }));
      return;
    }
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      console.log(JSON.stringify({ ts: new Date().toISOString(), level: 'info', msg: 'Demo lead delivered', email: lead.email }));
    } catch (err) {
      console.error(JSON.stringify({ ts: new Date().toISOString(), level: 'error', msg: 'Failed to deliver demo lead', error: err.message, lead }));
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`fynz-onboarding-bridge listening on :${port}`);
});
