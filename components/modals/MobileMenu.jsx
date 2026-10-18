"use client";
import React from "react";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import {
  ecoshopNavigationLinks,
  ecoshopShopMenu,
} from "@/data/menu";
import { usePathname } from "next/navigation";
import { useStorefrontLanguage } from "@/components/homes/ecoshop/useStorefrontLanguage";
export default function MobileMenu() {
  const pathname = usePathname();
  const language = useStorefrontLanguage();
  const isArabic = language === "ar";
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.links) {
      menuItem.links?.forEach((elm2) => {
        if (elm2.href?.includes("/")) {
          if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
        if (elm2.links) {
          elm2.links.forEach((elm3) => {
            if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          });
        }
      });
    }

    return active;
  };
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            <li className="nav-mb-item">
              <Link
                href="/"
                className={`mb-menu-link ${
                  pathname === "/" ? "activeMenu" : ""
                }`}
              >
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <li className="nav-mb-item">
              <a
                href="#ecoshop-mobile-shop"
                className="collapsed mb-menu-link current"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="ecoshop-mobile-shop"
              >
                <span>{isArabic ? "تسوق" : "Shop"}</span>
                <span className="btn-open-sub" />
              </a>
              <div id="ecoshop-mobile-shop" className="collapse">
                <ul className="sub-nav-menu">
                  {ecoshopShopMenu.map((group) => (
                    <li key={group.id}>
                      <a
                        href={`#ecoshop-mobile-${group.id}`}
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls={`ecoshop-mobile-${group.id}`}
                      >
                        <span>
                          {isArabic ? group.heading : group.headingEn}
                        </span>
                        <span className="btn-open-sub" />
                      </a>
                      <div
                        id={`ecoshop-mobile-${group.id}`}
                        className="collapse"
                      >
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {group.links.map((link) => (
                            <li key={link.text}>
                              <Link
                                href={link.href}
                                className={`sub-nav-link ${
                                  isMenuActive(link) ? "activeMenu" : ""
                                }`}
                              >
                                {isArabic ? link.text : link.textEn}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {ecoshopNavigationLinks.map((link) => (
              <li className="nav-mb-item" key={link.text}>
                <Link
                  href={link.href}
                  className={`mb-menu-link ${
                    isMenuActive(link) ? "activeMenu" : ""
                  }`}
                >
                  {isArabic ? link.text : link.textEn}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-other-content">
            <div className="d-flex group-icon">
              <Link href={`/wishlist`} className="site-nav-icon">
                <i className="icon icon-heart" />
                Wishlist
              </Link>
              <Link href={`/home-search`} className="site-nav-icon">
                <i className="icon icon-search" />
                Search
              </Link>
            </div>
            <div className="mb-notice">
              <Link href={`/contact-1`} className="text-need">
                Need help ?
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                Address: 1234 Fashion Street, Suite 567, <br />
                New York, NY 10001
              </li>
              <li>
                Email: <b>info@fashionshop.com</b>
              </li>
              <li>
                Phone: <b>(212) 555-1234</b>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-bottom">
          <Link href={`/login`} className="site-nav-icon">
            <i className="icon icon-account" />
            Login
          </Link>
          <div className="bottom-bar-language">
            <div className="tf-currencies">
              <CurrencySelect />
            </div>
            <div className="tf-languages">
              <LanguageSelect
                parentClassName={
                  "image-select center style-default type-languages"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
