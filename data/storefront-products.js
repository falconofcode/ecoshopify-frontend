import sellzyProducts from "@/data/substitute-products.json";

export const storefrontProducts = sellzyProducts.map((product) => ({
  id: product._id,
  title: product.name,
  price: product.price,
  imgSrc: product.image,
  imgHoverSrc: product.images?.[1] ?? product.image,
  isAvailable: product.stock > 0,
  soldOut: product.stock <= 0,
  categoryId: product.category,
}));

export function getStorefrontProducts(categoryId) {
  return categoryId
    ? storefrontProducts.filter((product) => product.categoryId === categoryId)
    : storefrontProducts;
}
