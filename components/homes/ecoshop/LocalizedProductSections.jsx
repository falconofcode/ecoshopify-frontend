"use client";

import { ecoshopHomeTranslations } from "@/data/ecoshop-home-translations";
import Home06Products from "@/components/homes/home-6/Products";
import PlantFeaturedProducts from "@/components/homes/home-plant/Products";
import { useStorefrontLanguage } from "./useStorefrontLanguage";

export default function LocalizedProductSections() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <>
      <Home06Products
        tabLabels={{
          bestSeller: copy.bestSellerTab,
          newArrivals: copy.newArrivalsTab,
          onSale: copy.onSaleTab,
        }}
      />
      <PlantFeaturedProducts title={copy.featuredProductsTitle} />
    </>
  );
}
