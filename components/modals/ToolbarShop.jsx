"use client";
import { useStorefrontLanguage } from "@/components/homes/ecoshop/useStorefrontLanguage";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import storefrontCategories from "@/data/storefront-menu.json";

export default function ToolbarShop() {
  const isArabic = useStorefrontLanguage() === "ar";
  const categories = storefrontCategories
    .filter((category) => category.isActive)
    .sort((a, b) => a.order - b.order);


  return (
    <div
      className="offcanvas offcanvas-start canvas-mb toolbar-shop-mobile"
      id="toolbarShopmb"
    >
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          
          
          
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            {categories.map((category) => {
              
            const label = category.name[isArabic ? "ar" : "en"];

            return(
              <li key={category._id} className="nav-mb-item">
                <Link
                  href="/shop-default"
                  className="tf-category-link mb-menu-link"
                >
                  <div className="image">
                    <Image
                      alt={label}
                      src={category.image}
                      width={40}
                      height={48}
                    />
                  </div>
                  <span>{label}</span>
                </Link>
              </li>
              );
            })}
          </ul>



        </div>
        <div className="mb-bottom">
          <Link href={`/shop-default`} className="tf-btn fw-5 btn-line">
            View all collection
            <i className="icon icon-arrow1-top-left" />
          </Link>
        </div>
      </div>
    </div>
  );
}
