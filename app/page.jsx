import Footer1 from "@/components/footers/Footer1";
import LocalizedPlantHero from "@/components/homes/ecoshop/LocalizedPlantHero";
import LocalizedProductSections from "@/components/homes/ecoshop/LocalizedProductSections";
import Hero from "@/components/homes/home-grocery/Hero";
import CategoriesHomeGro from "@/components/homes/home-grocery/Categories";
import CollectionsHomeGro from "@/components/homes/home-grocery/Collections";
import ProductsHomeGro from "@/components/homes/home-grocery/Products";
import Products2HomeGro from "@/components/homes/home-grocery/Products2";
import FeaturesHomeGro from "@/components/homes/home-grocery/Features";
import BannerHomeGro from "@/components/homes/home-grocery/Banner";
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
      <div className="color-primary-8 color-main-text-2">
        <Hero />
        <CategoriesHomeGro />
        <CollectionsHomeGro />
        <ProductsHomeGro />
        <Products2HomeGro />
        <FeaturesHomeGro />
        <BannerHomeGro />
      </div>
      <ParticipatingBrands />
      <MarketplaceBenefits />
      <SupplierInvitation />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
