import Footer1 from "@/components/footers/Footer1";
import LocalizedProductSections from "@/components/homes/ecoshop/LocalizedProductSections";
import Hero from "@/components/homes/home-grocery/Hero";
import CategoriesHomeGro from "@/components/homes/home-grocery/Categories";
import CollectionsHomeGro from "@/components/homes/home-grocery/Collections";
import ProductsHomeGro from "@/components/homes/home-grocery/Products";
import FeaturesHomeGro from "@/components/homes/home-grocery/Features";
import BannerHomeGro from "@/components/homes/home-grocery/Banner";
import HeroHomeElec from "@/components/homes/home-electronic/Hero";
import BannerCollections from "@/components/homes/home-baby/BannerCollections";

import {
  MarketplaceBenefits,
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
      <PlatformOverviewAndSearch />
      <div className="color-primary-8 color-main-text-2">
        <Hero />
        <CategoriesHomeGro />
      </div>
      <ProductQualities />
      <OffersAndDiscounts />
      <LocalizedProductSections />
      <div className="color-primary-8 color-main-text-2">
        <CollectionsHomeGro />
        <ProductsHomeGro />
        <FeaturesHomeGro />
        <BannerHomeGro />
      </div>
      <BannerCollections />
      <ParticipatingBrands />
      <MarketplaceBenefits />
      <SupplierInvitation />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
