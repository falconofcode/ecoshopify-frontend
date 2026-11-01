import { allProducts } from "@/data/products";
import { storefrontProducts } from "@/data/storefrontProducts";

export const catalog = [...allProducts, ...storefrontProducts];
