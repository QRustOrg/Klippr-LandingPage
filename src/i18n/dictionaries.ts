import esDict from "./es.json";
import enDict from "./en.json";

export interface DictionaryPainItem {
  label: string;
  headline: string;
  copy: string;
}

export interface DictionaryStep {
  label: string;
  heading: string;
  body: string;
}

export interface DictionaryBenefitCard {
  title: string;
  body: string;
}

export interface DictionaryTestimonial {
  quote: string;
  name: string;
  role: string;
  badge: string;
}

export interface DictionaryComparisonRow {
  feature: string;
  tradicional: string;
  superapp: string;
  klippr: string;
}

export interface Dictionary {
  navbar: {
    home: string;
    problem: string;
    benefits: string;
    testimonials: string;
    comparison: string;
    howItWorks: string;
  };
  hero: {
    headline1: string;
    headline2: string;
    headline3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  painPoints: {
    label: string;
    heading: string;
    bridge: string;
    items: DictionaryPainItem[];
  };
  howItWorks: {
    heading: string;
    steps: DictionaryStep[];
    panels: {
      activar: { qrPersonal: string; validTime: string };
      canjear: { success: string; validated: string; redeemed: string };
      compartir: { question: string; review: string; tags: string[]; submit: string };
      explorar: { filters: string[] };
    };
  };
  benefits: {
    heading: string;
    headingAccent: string;
    subheading: string;
    tabConsumer: string;
    tabBusiness: string;
    screenLabelConsumer: string;
    screenLabelBusiness: string;
    b2c: DictionaryBenefitCard[];
    b2b: DictionaryBenefitCard[];
    dashboard: {
      views: string;
      redemptions: string;
      redemptionsPerDay: string;
      promoLabel: string;
      promoStatus: string;
    };
  };
  socialProof: {
    heading: string;
    stat1: string;
    stat2: string;
    stat3: string;
    testimonials: DictionaryTestimonial[];
    dotAriaLabel: string;
  };
  comparison: {
    heading: string;
    subheading: string;
    colFeature: string;
    colTraditional: string;
    colSuperapp: string;
    colKlippr: string;
    tooltipPartial: string;
    rows: DictionaryComparisonRow[];
  };
  footer: {
    cta: string;
    githubButton: string;
    terms: string;
    privacy: string;
    copyright: string;
  };
}

export type Locale = "es" | "en";

export const dictionaries: Record<Locale, Dictionary> = {
  es: esDict as Dictionary,
  en: enDict as Dictionary,
};
