export type CtaLink = {
  label: string;
  href: string;
};

export type TextCard = {
  title: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  commonIssues: string[];
};

export type WhatWeDoContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: TextCard[];
};

export type ServicesContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: TextCard[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ProcessContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type WhyClipContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: TextCard[];
};

export type BestFitContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: TextCard[];
};

export type ResultsContent = {
  eyebrow: string;
  title: string;
  description: string;
  before: string[];
  after: string[];
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
};

export type RootContent = {
  hero: HeroContent;
  whatWeDo: WhatWeDoContent;
  services: ServicesContent;
  process: ProcessContent;
  whyClip: WhyClipContent;
  bestFit: BestFitContent;
  results: ResultsContent;
  contact: ContactContent;
};
