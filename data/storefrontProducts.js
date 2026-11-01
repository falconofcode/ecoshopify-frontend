import rawProducts from "@/data/substitute-products.json";
import categories from "@/data/storefront-menu.json";
import brands from "@/data/storefront-brands.json";

// Backend contract: the API should return products in this shape
// (the same one the Ecomus demo data uses, plus the detail-page fields).
export function toStorefrontProduct(raw) {
  const category = categories.find((c) => c._id === raw.category);
  const brand = brands.find((b) => b._id === raw.brand);
  const discount = raw.discountPercentage ?? 0;
  const gallery = raw.images?.length ? raw.images : [raw.image];

  const filterCategories = [];
  if (discount > 0) filterCategories.push("On Sale");
  if (raw.isNewItem) filterCategories.push("New arrivals");
  if ((raw.averageRating ?? 0) >= 5) filterCategories.push("Best seller");

  return {
    id: raw._id,
    slug: raw.slug,
    title: raw.name,
    price: raw.price,
    oldPrice: discount > 0 ? +(raw.price / (1 - discount / 100)).toFixed(2) : null,
    discountPercentage: discount,
    imgSrc: raw.image,
    imgHoverSrc: gallery[1] ?? raw.image,
    images: gallery,
    colors: (raw.colors ?? []).map((color) => ({
      name: color.name.en,
      nameI18n: color.name,
      colorClass: color.colorClass,
      imgSrc: raw.image,
    })),
    sizes: (raw.sizes ?? []).map((size) => size.en),
    sizesI18n: raw.sizes ?? [],
    badge: raw.badge ?? null,
    shortDescription: raw.shortDescription ?? null,
    description: raw.description ?? null,
    features: raw.features ?? [],
    specifications: raw.specifications ?? [],
    shipping: raw.shipping ?? null,
    filterCategories,
    brand: brand?.name.en ?? "",
    brandId: raw.brand,
    categoryId: raw.category,
    categoryName: category?.name ?? null,
    stock: raw.stock,
    isAvailable: raw.stock > 0,
    soldOut: raw.stock <= 0,
    rating: raw.averageRating ?? 0,
    reviewCount: raw.numReviews ?? 0,
  };
}

export const storefrontProducts = rawProducts.map(toStorefrontProduct);

export const getStorefrontProductById = (id) =>
  storefrontProducts.find((p) => p.id === id);

export function getStorefrontProducts(categoryId) {
  return categoryId
    ? storefrontProducts.filter((product) => product.categoryId === categoryId)
    : storefrontProducts;
}
