"use client";

import React, { useEffect } from "react";

export function FynzFormEmbed() {
  useEffect(() => {
    const scriptSrc = "https://api.fynz.io/js/form_embed.js";
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else if (typeof (window as any).iFrameResize === "function") {
      try {
        (window as any).iFrameResize(
          {
            log: false,
            checkOrigin: false,
            enablePublicMethods: true,
            scrolling: true,
            heightCalculationMethod: "offset",
            autoResize: true,
            sizeWidth: false,
            sizeHeight: true,
          },
          "#inline-NSxKNOvB6tt1ik1jGVyo"
        );
      } catch {
        // Ignored if already attached
      }
    }
  }, []);

  return (
    <>
      <iframe
        src="https://api.fynz.io/widget/form/NSxKNOvB6tt1ik1jGVyo"
        style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
        id="inline-NSxKNOvB6tt1ik1jGVyo"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="FRM — Vertical Interest"
        data-height="1011"
        data-layout-iframe-id="inline-NSxKNOvB6tt1ik1jGVyo"
        data-form-id="NSxKNOvB6tt1ik1jGVyo"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="FRM — Vertical Interest"
      />
      <script src="https://api.fynz.io/js/form_embed.js" async />
    </>
  );
}
