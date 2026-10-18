"use client";

import PlantHero from "@/components/homes/home-plant/Hero";
import { ecoshopHomeTranslations } from "@/data/ecoshop-home-translations";
import { useStorefrontLanguage } from "./useStorefrontLanguage";

export default function LocalizedPlantHero() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <PlantHero
      slideTitles={copy.heroSlides}
      buttonText={copy.heroButton}
    />
  );
}
