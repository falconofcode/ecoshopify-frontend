"use client";

import Image from "next/image";
import Link from "next/link";
import Brands from "@/components/homes/multi-brand/Brands";
import { ecoshopHomeTranslations } from "@/data/ecoshop-home-translations";
import { useStorefrontLanguage } from "./useStorefrontLanguage";

const categories = [
  {
    image: "/images/products/food3.jpg",
    alt: "Fresh food",
  },
  {
    image: "/images/shop/store/ourstore4.jpg",
    alt: "Natural personal care",
  },
  {
    image: "/images/collections/cls-food3.png",
    alt: "Eco-friendly products",
  },
  {
    image: "/images/products/plant-1.jpg",
    alt: "Indoor plant",
  },
];

export function PlatformOverviewAndSearch() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <section className="flat-spacing-5">
      <div className="container">
        <div className="flat-title text-center">
          <span className="title">{copy.overviewTitle}</span>
          <p className="sub-title">{copy.overviewDescription}</p>
        </div>
        <form
          action="/shop-default"
          method="get"
          className="tf-mini-search-frm mx-auto"
          style={{ maxWidth: 680 }}
        >
          <fieldset className="text">
            <input
              type="search"
              name="search"
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchLabel}
            />
          </fieldset>
          <button type="submit" aria-label="Search">
            <i className="icon-search" />
          </button>
        </form>
      </div>
    </section>
  );
}

export function MarketplaceCategories() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <section className="flat-spacing-5 flat-categorie">
      <div className="container">
        <div className="flat-title">
          <span className="title">{copy.categoriesTitle}</span>
        </div>
        <div className="tf-grid-layout tf-col-2 md-col-4 gap-15">
          {categories.map((category, index) => (
            <div
              className="collection-item style-2 hover-img"
              key={category.image}
            >
              <div className="collection-inner">
                <Link
                  href="/shop-collection-list"
                  className="collection-image img-style"
                >
                  <Image
                    src={category.image}
                    alt={category.alt}
                    width={480}
                    height={560}
                  />
                </Link>
                <div className="collection-content">
                  <Link
                    href="/shop-collection-list"
                    className="tf-btn collection-title hover-icon fs-15 rounded-full"
                  >
                    <span>{copy.categories[index]}</span>
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersAndDiscounts() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <section className="flat-spacing-12">
      <div className="container">
        <div className="tf-grid-layout md-col-2 tf-img-with-text style-5 bg_light-green-5">
          <div className="tf-content-wrap w-100">
            <span className="sub-heading text-uppercase fw-7 text_green-1">
              {copy.offersEyebrow}
            </span>
            <h2 className="heading text_green-1">{copy.offersTitle}</h2>
            <p className="description text_green-2">{copy.offersDescription}</p>
            <Link
              href="/shop-default"
              className="tf-btn style-2 btn-fill border-0 radius-60 animate-hover-btn bg_green-9"
            >
              {copy.offersButton}
            </Link>
          </div>
          <div className="tf-image-wrap">
            <Image
              src="/images/collections/banner-cls-food2.png"
              alt="Fresh, plant-based products"
              width={800}
              height={798}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ParticipatingBrands() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <>
      <div className="container">
        <div className="flat-title text-center">
          <span className="title">{copy.brandsTitle}</span>
        </div>
      </div>
      <Brands />
    </>
  );
}

export function ProductQualities() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <section className="flat-spacing-5 bg_green-10">
      <div className="container">
        <div className="flat-title text-center">
          <span className="title text_green-1">{copy.qualitiesTitle}</span>
        </div>
        <div className="tf-grid-layout md-col-3 gap-15">
          {copy.qualities.map((item) => (
            <div
              className="tf-icon-box style-border-line text-center bg_white"
              key={item.title}
            >
              <div className="icon">
                <i className="icon-check" />
              </div>
              <div className="content">
                <h3 className="title">{item.title}</h3>
                <p>{item.description}</p>
                <Link href="/shop-default" className="link">
                  {copy.browseProducts}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketplaceBenefits() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];
  const benefitIcons = ["icon-search", "icon-check", "icon-shop"];

  return (
    <section className="flat-spacing-12">
      <div className="container">
        <div className="flat-title text-center">
          <span className="title">{copy.benefitsTitle}</span>
        </div>
        <div className="tf-grid-layout md-col-3 gap-15">
          {copy.benefits.map((benefit, index) => (
            <div
              className="tf-icon-box style-border-line text-center"
              key={benefit.title}
            >
              <div className="icon">
                <i className={benefitIcons[index]} />
              </div>
              <div className="content">
                <h3 className="title">{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupplierInvitation() {
  const language = useStorefrontLanguage();
  const copy = ecoshopHomeTranslations[language];

  return (
    <section className="flat-spacing-12 bg_light-green-5">
      <div className="container text-center">
        <div className="flat-title">
          <span className="title">{copy.supplierTitle}</span>
          <p className="sub-title">{copy.supplierDescription}</p>
        </div>
        <Link
          href="/contact-1"
          className="tf-btn btn-fill radius-60 animate-hover-btn bg_green-9"
        >
          {copy.supplierButton}
        </Link>
      </div>
    </section>
  );
}
