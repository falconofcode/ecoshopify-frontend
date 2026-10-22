import Footer1 from "@/components/footers/Footer1";
import LocalizedPlantHero from "@/components/homes/ecoshop/LocalizedPlantHero";
import LocalizedProductSections from "@/components/homes/ecoshop/LocalizedProductSections";
import Hero from "@/components/homes/home-grocery/Hero";
import HeroHomeElec from "@/components/homes/home-electronic/Hero";
import BannerCollections from "@/components/homes/home-baby/BannerCollections";

import {
  MarketplaceBenefits,
  MarketplaceCategories,
  OffersAndDiscounts,
  ParticipatingBrands,
  PlatformOverviewAndSearch,
  ProductQualities,
  SupplierInvitation,
} from "@/components/homes/ecoshop/MarketplaceHomeSections";

import React from "react";

export const metadata = {
  title: "EcoShop | Natural and Sustainable Marketplace",
  description:
    "Discover organic, natural, and eco-friendly products from participating brands and suppliers.",
};
export default function page() {
  return (
    <>
      <HeroHomeElec />
      <BannerCollections />
      <PlatformOverviewAndSearch />
      <ProductQualities />
      <OffersAndDiscounts />
            <MarketplaceCategories />
      <LocalizedProductSections />
      <Hero />
      <ParticipatingBrands />
      <MarketplaceBenefits />
      <SupplierInvitation />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
