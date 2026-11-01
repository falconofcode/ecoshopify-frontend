import heroSlides from "@/data/homepage-hero.json";

export async function getHomepageHeroSlides() {
  return heroSlides
    .filter((slide) => slide.isActive)
    .sort((a, b) => a.order - b.order);
}
