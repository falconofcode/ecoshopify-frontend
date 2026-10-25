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
            <div className="box-left">
              <div className="tf-list-categories">
                <a href="#" className="categories-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M4.83416 0H1.61897C0.726277 0 0 0.726277 0 1.61897V4.83416C0 5.72685 0.726277 6.45312 1.61897 6.45312H4.83416C5.72685 6.45312 6.45312 5.72685 6.45312 4.83416V1.61897C6.45312 0.726277 5.72685 0 4.83416 0ZM5.35938 4.83416C5.35938 5.12375 5.12375 5.35938 4.83416 5.35938H1.61897C1.32937 5.35938 1.09375 5.12375 1.09375 4.83416V1.61897C1.09375 1.32937 1.32937 1.09375 1.61897 1.09375H4.83416C5.12375 1.09375 5.35938 1.32937 5.35938 1.61897V4.83416ZM12.3594 0H9.1875C8.28286 0 7.54688 0.735984 7.54688 1.64062V4.8125C7.54688 5.71714 8.28286 6.45312 9.1875 6.45312H12.3594C13.264 6.45312 14 5.71714 14 4.8125V1.64062C14 0.735984 13.264 0 12.3594 0ZM12.9062 4.8125C12.9062 5.11405 12.6609 5.35938 12.3594 5.35938H9.1875C8.88595 5.35938 8.64062 5.11405 8.64062 4.8125V1.64062C8.64062 1.33908 8.88595 1.09375 9.1875 1.09375H12.3594C12.6609 1.09375 12.9062 1.33908 12.9062 1.64062V4.8125ZM4.83416 7.54688H1.61897C0.726277 7.54688 0 8.27315 0 9.16584V12.381C0 13.2737 0.726277 14 1.61897 14H4.83416C5.72685 14 6.45312 13.2737 6.45312 12.381V9.16584C6.45312 8.27315 5.72685 7.54688 4.83416 7.54688ZM5.35938 12.381C5.35938 12.6706 5.12375 12.9062 4.83416 12.9062H1.61897C1.32937 12.9062 1.09375 12.6706 1.09375 12.381V9.16584C1.09375 8.87625 1.32937 8.64062 1.61897 8.64062H4.83416C5.12375 8.64062 5.35938 8.87625 5.35938 9.16584V12.381ZM12.3594 7.54688H9.1875C8.28286 7.54688 7.54688 8.28286 7.54688 9.1875V12.3594C7.54688 13.264 8.28286 14 9.1875 14H12.3594C13.264 14 14 13.264 14 12.3594V9.1875C14 8.28286 13.264 7.54688 12.3594 7.54688ZM12.9062 12.3594C12.9062 12.6609 12.6609 12.9062 12.3594 12.9062H9.1875C8.88595 12.9062 8.64062 12.6609 8.64062 12.3594V9.1875C8.64062 8.88595 8.88595 8.64062 9.1875 8.64062H12.3594C12.6609 8.64062 12.9062 8.88595 12.9062 9.1875V12.3594Z"
                      fill="currentColor"
                    />
                  </svg>
                  Browse All Departments
                </a>
                <div className="list-categories-inner toolbar-shop-mobile">
                  <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                    <li className="nav-mb-item">
                      <Link
                        href={`/shop-default`}
                        className="tf-category-link mb-menu-link"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate1.jpg"
                            width={40}
                            height={48}
                          />
                        </div>
                        <span className="link">Accessories</span>
                      </Link>
                    </li>
                    <li className="nav-mb-item">
                      <Link
                        href={`/shop-default`}
                        className="tf-category-link mb-menu-link"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate2.jpg"
                            width={40}
                            height={48}
                          />
                        </div>
                        <span className="link">Dog</span>
                      </Link>
                    </li>
                    <li className="nav-mb-item">
                      <Link
                        href={`/shop-default`}
                        className="tf-category-link mb-menu-link"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate3.jpg"
                            width={40}
                            height={43}
                          />
                        </div>
                        <span className="link">Grocery</span>
                      </Link>
                    </li>
                    <li className="nav-mb-item">
                      <Link
                        href={`/shop-default`}
                        className="tf-category-link mb-menu-link"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate4.png"
                            width={40}
                            height={48}
                          />
                        </div>
                        <span className="link">Handbag</span>
                      </Link>
                    </li>
                    <li className="nav-mb-item">
                      <a
                        href="#cate-menu-one"
                        className="tf-category-link has-children collapsed mb-menu-link"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="cate-menu-one"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate5.jpg"
                            width={40}
                            height={48}
                          />
                        </div>
                        <span className="link">Fashion</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="cate-menu-one" className="collapse list-cate">
                        <ul className="sub-nav-menu" id="cate-menu-navigation">
                          <li>
                            <a
                              href="#cate-shop-one"
                              className="tf-category-link has-children sub-nav-link collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              aria-controls="cate-shop-one"
                            >
                              <div className="image">
                                <Image
                                  alt="image"
                                  src="/images/shop/cate/cate6.jpg"
                                  width={40}
                                  height={49}
                                />
                              </div>
                              <span>Mens</span>
                              <span className="btn-open-sub" />
                            </a>
                            <div id="cate-shop-one" className="collapse">
                              <ul className="sub-nav-menu sub-menu-level-2">
                                <li>
                                  <Link
                                    href={`/shop-default`}
                                    className="tf-category-link sub-nav-link"
                                  >
                                    <div className="image">
                                      <Image
                                        alt="image"
                                        src="/images/shop/cate/cate1.jpg"
                                        width={40}
                                        height={48}
                                      />
                                    </div>
                                    <span>Accessories</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/shop-default`}
                                    className="tf-category-link sub-nav-link"
                                  >
                                    <div className="image">
                                      <Image
                                        alt="image"
                                        src="/images/shop/cate/cate8.jpg"
                                        width={40}
                                        height={48}
                                      />
                                    </div>
                                    <span>Shoes</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <a
                              href="#cate-shop-two"
                              className="tf-category-link has-children sub-nav-link collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              aria-controls="cate-shop-two"
                            >
                              <div className="image">
                                <Image
                                  alt="image"
                                  src="/images/shop/cate/cate9.jpg"
                                  width={40}
                                  height={49}
                                />
                              </div>
                              <span>Womens</span>
                              <span className="btn-open-sub" />
                            </a>
                            <div id="cate-shop-two" className="collapse">
                              <ul className="sub-nav-menu sub-menu-level-2">
                                <li>
                                  <Link
                                    href={`/shop-default`}
                                    className="tf-category-link sub-nav-link"
                                  >
                                    <div className="image">
                                      <Image
                                        alt="image"
                                        src="/images/shop/cate/cate4.png"
                                        width={40}
                                        height={48}
                                      />
                                    </div>
                                    <span>Handbag</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/shop-default`}
                                    className="tf-category-link sub-nav-link"
                                  >
                                    <div className="image">
                                      <Image
                                        alt="image"
                                        src="/images/shop/cate/cate7.jpg"
                                        width={40}
                                        height={41}
                                      />
                                    </div>
                                    <span>Tee</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-mb-item">
                      <a
                        href="#cate-menu-two"
                        className="tf-category-link has-children collapsed mb-menu-link"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="cate-menu-two"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate6.jpg"
                            width={40}
                            height={49}
                          />
                        </div>
                        <span className="link">Men</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="cate-menu-two" className="collapse list-cate">
                        <ul className="sub-nav-menu" id="cate-menu-navigation1">
                          <li>
                            <Link
                              href={`/shop-default`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt="image"
                                  src="/images/shop/cate/cate1.jpg"
                                  width={40}
                                  height={48}
                                />
                              </div>
                              <span>Accessories</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/shop-default`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt="image"
                                  src="/images/shop/cate/cate8.jpg"
                                  width={40}
                                  height={48}
                                />
                              </div>
                              <span>Shoes</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-mb-item">
                      <Link
                        href={`/shop-default`}
                        className="tf-category-link mb-menu-link"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate7.jpg"
                            width={40}
                            height={41}
                          />
                        </div>
                        <span className="link">Tee</span>
                      </Link>
                    </li>
                    <li className="nav-mb-item">
                      <Link
                        href={`/shop-default`}
                        className="tf-category-link mb-menu-link"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate8.jpg"
                            width={40}
                            height={48}
                          />
                        </div>
                        <span className="link">Shoes</span>
                      </Link>
                    </li>
                    <li className="nav-mb-item">
                      <a
                        href="#cate-menu-three"
                        className="tf-category-link has-children collapsed mb-menu-link"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="cate-menu-three"
                      >
                        <div className="image">
                          <Image
                            alt="image"
                            src="/images/shop/cate/cate9.jpg"
                            width={40}
                            height={49}
                          />
                        </div>
                        <span className="link">Women</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="cate-menu-three" className="collapse list-cate">
                        <ul className="sub-nav-menu" id="cate-menu-navigation2">
                          <li>
                            <Link
                              href={`/shop-default`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt="image"
                                  src="/images/shop/cate/cate4.png"
                                  width={40}
                                  height={48}
                                />
                              </div>
                              <span>Handbag</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/shop-default`}
                              className="tf-category-link sub-nav-link"
                            >
                              <div className="image">
                                <Image
                                  alt="image"
                                  src="/images/shop/cate/cate7.jpg"
                                  width={40}
                                  height={41}
                                />
                              </div>
                              <span>Tee</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <div className="categories-bottom">
                    <Link
                      href={`/shop-collection-sub`}
                      className="tf-btn btn-line collection-other-link"
                    >
                      <span>View all departments</span>
                      <i className="icon icon-arrow1-top-left" />
                    </Link>
                  </div>
                </div>
              </div>

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
      </div>
    </header>
  );
}
