export type HeroSection = {
  sectionType: string;
  theme: string;
  title: string;
  subtitle?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
};

export type ContentPageResponse = {
  meta: {
    title: string;
    description: string;
    image: string;
  };
  sections: HeroSection[]; // We're only focusing on the hero section for now
};
