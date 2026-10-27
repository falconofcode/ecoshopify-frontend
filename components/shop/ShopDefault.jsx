"use client";

import sellzyProducts from "@/data/substitute-products.json";

import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import { useState } from "react";
import Pagination from "../common/Pagination";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";

const shopProducts = sellzyProducts.map((product) => ({
  id: product._id,
  title: product.name,
  price: product.price,
  imgSrc: product.image,
  imgHoverSrc: product.images?.[1] ?? product.image,
  isAvailable: product.stock > 0,
  soldOut: product.stock <= 0,
}));

export default function ShopDefault() {
  const [products, setProducts] = useState(shopProducts);
  const [finalSorted, setFinalSorted] = useState(shopProducts);
  const [gridItems, setGridItems] = useState(4);
  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div>
            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${
                    gridItems == layout.dataValueGrid ? "active" : ""
                  }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <Sorting setFinalSorted={setFinalSorted} products={products} />
              </div>
            </div>
          </div>
          <div className="wrapper-control-shop">
            <div className="meta-filter-shop" />
            <ProductGrid allproducts={finalSorted} gridItems={gridItems} />
            {/* pagination */}
            {finalSorted.length ? (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination />
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <ShopFilter
        products={shopProducts}
        setProducts={setProducts}
        showLegacyFacets={false}
      />
    </>
  );
}
