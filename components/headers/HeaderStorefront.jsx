"use client";

import Image from "next/image";
import Link from "next/link";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
import LanguageSelect from "../common/LanguageSelect";
import Nav from "./Nav";
import { useStorefrontLanguage } from "@/components/homes/ecoshop/useStorefrontLanguage";

export default function HeaderStorefront({
  isGlobal = false,
  textClass,
  bgColor = "",
  uppercase = false,
  isArrow = true,
  Linkfs = "",
}) {
  const isArabic = useStorefrontLanguage() === "ar";
  const searchLabel = isArabic
    ? "ابحث عن المنتجات والعلامات التجارية"
    : "Search products and brands";

  return (
    <header
      id="header"
      className={`header-default header-style-2 header-style-4 ${
        isGlobal ? "storefront-global-header" : ""
      } ${uppercase ? "header-uppercase" : ""}`}
    >
      <div className="main-header line">
        <div className="container">
          <div className="row wrapper-header align-items-center">
            <div className="col-md-4 col-3 tf-lg-hidden">
              <a
                href="#mobileMenu"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                aria-label={isArabic ? "فتح القائمة" : "Open menu"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={16}
                  viewBox="0 0 24 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3h18M3 8h18M3 13h12"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>

            <div className="col-md-2 col-6">
              <Link href="/" className="logo-header">
                <Image
                  alt="EcoShopify"
                  className="logo"
                  src="/images/logo/logo.webp"
                  width={136}
                  height={21}
                  priority
                />
              </Link>
            </div>

            <div className="col-md-7 col-6 tf-md-hidden">
              <form
                action="/home-search"
                method="get"
                className="tf-form-search"
              >
                <div className="search-box">
                  <input
                    type="search"
                    name="q"
                    placeholder={searchLabel}
                    aria-label={searchLabel}
                  />
                  <button
                    type="submit"
                    className="tf-btn"
                    aria-label={isArabic ? "بحث" : "Search"}
                  >
                    <i className="icon icon-search" />
                  </button>
                </div>
              </form>
            </div>

            <div className="col-md-3 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
                <li className="nav-language d-none d-xl-block">
                  <LanguageSelect topStart />
                </li>
                <li className="nav-search">
                  <a
                    href="#canvasSearch"
                    data-bs-toggle="offcanvas"
                    aria-controls="canvasSearch"
                    className="nav-icon-item"
                    aria-label={isArabic ? "بحث" : "Search"}
                  >
                    <i className="icon icon-search" />
                  </a>
                </li>
                <li className="nav-account">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="nav-icon-item align-items-center gap-10"
                    aria-label={isArabic ? "تسجيل الدخول" : "Login"}
                  >
                    <i className="icon icon-account" />
                    <span className="text">{isArabic ? "دخول" : "Login"}</span>
                  </a>
                </li>
                <li className="nav-wishlist">
                  <Link
                    href="/wishlist"
                    className="nav-icon-item align-items-center gap-10"
                    aria-label={isArabic ? "قائمة الأمنيات" : "Wishlist"}
                  >
                    <i className="icon icon-heart" />
                    <span className="text">
                      {isArabic ? "المفضلة" : "Wishlist"}
                    </span>
                    <span className={`count-box ${bgColor} ${textClass}`}>
                      <WishlistLength />
                    </span>
                  </Link>
                </li>
                <li className="nav-cart cart-lg">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="modal"
                    className="nav-icon-item"
                    aria-label={isArabic ? "سلة التسوق" : "Shopping cart"}
                  >
                    <i className="icon icon-bag" />
                    <span className={`count-box ${bgColor} ${textClass}`}>
                      <CartLength />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom line tf-md-hidden">
        <div className="container">
          <div className="wrapper-header d-flex justify-content-startr align-items-center storefront-header-main-row">
            <nav className="box-navigation text-center" aria-label="Main menu">
              <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                <Nav
                  isArrow={isArrow}
                  Linkfs={Linkfs}
                  showViewAllDemos={false}
                  variant="storefront"
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
