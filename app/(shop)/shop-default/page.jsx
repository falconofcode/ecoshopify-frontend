import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";
import storefrontCategories from "@/data/storefront-menu.json";
import { getStorefrontProducts } from "@/data/storefront-products";

export const metadata = {
  title: "Product Default || Ecoshopify - Ultimate Nextjs Ecommerce Template",
  description: "Ecoshopify - Ultimate Nextjs Ecommerce Template",
};

const defaultHeading = "New Arrival";
const defaultDescription = "Shop through our latest selection of Fashion";

export default async function page({ searchParams }) {
  const params = await searchParams;
  const requestedCategory = params?.category;
  const categoryValue = Array.isArray(requestedCategory)
    ? requestedCategory[0]
    : requestedCategory;
  const normalizedCategory = categoryValue?.trim().toLowerCase();
  const category = normalizedCategory
    ? storefrontCategories.find(
        (item) =>
          item._id.toLowerCase() === normalizedCategory ||
          item.slug.toLowerCase() === normalizedCategory
      )
    : null;
  const hasCategoryFilter = Boolean(normalizedCategory);
  let products = getStorefrontProducts();
  if (hasCategoryFilter) {
    products = category ? getStorefrontProducts(category._id) : [];
  }
  const heading =
    category?.name.en ?? (hasCategoryFilter ? "Category not found" : defaultHeading);
  const description = hasCategoryFilter
    ? category?.description?.trim()
    : defaultDescription;

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{heading}</div>
          {description && (
            <p className="text-center text-2 text_black-2 mt_5">
              {description}
            </p>
          )}
        </div>
      </div>
      <ShopDefault
        key={normalizedCategory ?? "all"}
        products={products}
      />
      <Footer1 />
    </>
  );
}
