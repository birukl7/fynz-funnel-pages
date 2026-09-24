export type VisualAspect = "portrait" | "phone" | "wide" | "photo" | "square" | "strip";

/** A photo or screenshot slot on a funnel page, with the brief for sourcing it. */
export interface Visual {
  /** What kind of asset belongs here. */
  kind: "Photo" | "Screenshot" | "Before / after" | "Logo strip";
  title: string;
  /** The brief for whoever sources or shoots the image. Shown in the placeholder until `src` is set. */
  brief: string;
  alt: string;
  aspect: VisualAspect;
  /**
   * Path under /public once the asset exists, e.g. "/industries/restaurants/hero.jpg".
   * Leave unset to show the placeholder with the brief.
   */
  src?: string;
  caption?: string;
}

export interface FunnelMenuItem {
  /** In-page anchor, e.g. "#pricing". Funnel menus never leave the page. */
  href: string;
  label: string;
}

export interface FunnelConfig {
  /** Slug passed to industryThemeVars() for the accent colour. */
  theme: string;
  /** Short label shown beside the logo on larger screens. */
  tag: string;
  /** Anchor of the booking form, and the label used on every call CTA. */
  bookHref: string;
  bookLabel: string;
  /** Shorter label for the phone-width header button. */
  bookShortLabel: string;
  /** Anchor and label for the free-plan CTA. */
  freeHref: string;
  freeLabel: string;
  menu: FunnelMenuItem[];
  /** Folder under /public where this funnel's images go, e.g. "industries/restaurants". */
  assetDir: string;
  /** Repo path of the content file, shown in placeholder hints. */
  contentFile: string;
  /** Small print in the funnel footer. */
  footerNote: string;
}
