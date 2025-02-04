import { axios } from "./axios";
import type { ContentPageResponse, HeroSection } from "./content.types";

const ENDPOINT = "/content-page/home";

export async function getHeroSection(): Promise<HeroSection | null> {
  const { data } = await axios.get<ContentPageResponse>(ENDPOINT);

  // Find and return the `hero` section
  const heroSection = data.sections.find(
    (section) => section.sectionType === "hero",
  );

  return heroSection || null;
}
