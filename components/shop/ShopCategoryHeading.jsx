"use client";

import { useStorefrontLanguage } from "@/components/homes/ecoshop/useStorefrontLanguage";

export default function ShopCategoryHeading({
  category,
  fallbackHeading,
  fallbackDescription,
}) {
  const language = useStorefrontLanguage();
  const heading =
    category?.name?.[language] ?? category?.name?.en ?? fallbackHeading;
  const description = category
    ? category.description?.[language]?.trim() ||
      category.description?.en?.trim()
    : fallbackDescription;

  return (
    <div className="tf-page-title" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-full">
        <div className="heading text-center">{heading}</div>
        {description && (
          <p className="text-center text-2 text_black-2 mt_5">{description}</p>
        )}
      </div>
    </div>
  );
}
