import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";

import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import SellzyDetailsTabs from "@/components/shopDetails/SellzyDetailsTabs";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Shop Details || Ecoshopify - Ultimate Nextjs Ecommerce Template",
  description: "Ecoshopify - Ultimate Nextjs Ecommerce Template",
};
import { allProducts } from "@/data/products";
import { getStorefrontProductById } from "@/data/storefrontProducts";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";
export default async function page({ params }) {
  const { id } = await params;
  const sellzyProduct = getStorefrontProductById(id);
  const isSellzyProduct = Boolean(sellzyProduct);
  const demoProduct = allProducts.find((product) => String(product.id) === id);

  if (!sellzyProduct && !demoProduct) {
    notFound();
  }

  const product = sellzyProduct
    ? sellzyProduct
    : demoProduct;

  return (
    <>
      <Header2 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />

              <span className="text">
                {product.title}
              </span>
            </div>
            {!isSellzyProduct && (
              <ProductSinglePrevNext currentId={product.id} />
            )}
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} isSellzyProduct={isSellzyProduct} />
      {isSellzyProduct && <SellzyDetailsTabs product={product} />}
      {!isSellzyProduct && (
        <>
          <ShopDetailsTab />
          <Products />
          <RecentProducts />
        </>
      )}
      <Footer1 />
    </>
  );
}
