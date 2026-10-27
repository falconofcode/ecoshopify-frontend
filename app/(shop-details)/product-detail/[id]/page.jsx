import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";

import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
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
import sellzyProducts from "@/data/substitute-products.json";
import storefrontCategories from "@/data/storefront-menu.json";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";
export default async function page({ params }) {
  const { id } = await params;
  const sellzyProduct = sellzyProducts.find((product) => product._id === id);
  const isSellzyProduct = Boolean(sellzyProduct);
  const demoProduct = allProducts.find((product) => String(product.id) === id);

  if (!sellzyProduct && !demoProduct) {
    notFound();
  }

  const category = sellzyProduct
    ? storefrontCategories.find(
        (category) => category._id === sellzyProduct.category
      )
    : null;
  const product = sellzyProduct
    ? {
        id: sellzyProduct._id,
        title: sellzyProduct.name,
        price: sellzyProduct.price,
        imgSrc: sellzyProduct.image,
        imgHoverSrc: sellzyProduct.images?.[1] ?? sellzyProduct.image,
        images: sellzyProduct.images?.length
          ? sellzyProduct.images
          : [sellzyProduct.image],
        stock: sellzyProduct.stock,
        categoryName: category?.name.en,
      }
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
