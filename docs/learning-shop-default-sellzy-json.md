# Learning exercise: show Sellzy products on the shop page

This guide explains how `/shop-default` displays a small sample of products copied from the Sellzy JSON export.

## Files involved

- `data/products.json` is the larger Sellzy export copied into this project.
- `data/substitute-products.json` contains 10 products selected from that export. It keeps Sellzy's catalog field names needed for a listing, but omits long descriptions and customer review/user details. Its `category` values now reference the category IDs in `data/storefront-menu.json`.
- `app/(shop)/shop-default/page.jsx` composes the shop page.
- `components/shop/ShopDefault.jsx` owns the listing state and connects sorting, filtering, and the product grid.
- `components/shop/ShopFilter.jsx` filters the product array.
- `components/shop/Sorting.jsx` sorts the product array.
- `components/shop/ProductGrid.jsx` maps product records into cards.
- `components/shopCards/ProductCard.jsx` displays each card.

The page does not currently read directly from `data/products.js`. Its flow is:

```text
shop-default/page.jsx
  -> ShopDefault.jsx
       -> ShopFilter.jsx
       -> Sorting.jsx
       -> ProductGrid.jsx
            -> ProductCard.jsx
```

`ShopDefault` gets its product list from the route. Some child components still import the demo `products1` array as a fallback when a product prop is omitted, but this page passes its Sellzy list explicitly.

## Category query parameter

The default shop supports category links such as:

```text
/shop-default?category=home-living
```

The route matches the query value against either a category's `slug` or `_id` in `data/storefront-menu.json`. It filters the Sellzy sample using each product's `category` ID, uses the matching English category name as the heading, and displays the category's `description` only when it is non-empty. For example, the current Home & Living description is an empty string, so the category title appears without the default fashion description. With no `category` parameter, the page keeps the "New Arrival" title and default description. An unknown category produces an empty product list rather than showing products from every category.

## Step 1: Look at the JSON shape

Open `data/substitute-products.json`. Each record is a Sellzy product with fields such as:

```json
{
  "_id": "698ccda1b8d43495a8a25a9b",
  "name": "VitaLife Omega-3 Softgels Heart Support Max Strength",
  "price": 29,
  "stock": 44,
  "image": "https://ik.imagekit.io/...",
  "images": [
    "https://ik.imagekit.io/...",
    "https://ik.imagekit.io/..."
  ],
  "category": "698ccd6eb8d43495a8a25a76",
  "brand": "698ccd38550319ac6ad9cec0",
  "slug": "vitalife-omega-3-softgels-heart-support-max-strength"
}
```

In the sample file, `category` is set to one of the `_id` values from `data/storefront-menu.json`, for example `"category_supplements"`. The example above shows the original Sellzy value only to illustrate the source export; the sample's category reference was deliberately changed to match this project's menu categories.

The sample keeps the original Sellzy catalog field names except for that category reference. It intentionally does not copy nested reviews, reviewer names or IDs, or the long HTML descriptions because the product listing exercise does not need them.

### Product-to-category links in this sample

| Sample products | `category` value | Storefront category |
|---|---|---|
| Omega-3 products, Vitamin B2, Nutrageinz | `category_supplements` | Supplements |
| BP machine, temperature guns, antibiotic capsules | `category_wellness_relaxation` | Wellness & Relaxation |
| Hand sanitizer | `category_personal_care` | Personal Care |
| Liquid detergent | `category_home_living` | Home & Living |

These are sample-data classifications based on the product names. Keep the category `_id` values stable when the backend is created: the API/database should use the same IDs or provide a deliberate mapping. The menu `slug` is for readable URLs; the category ID in a product is the relationship used to match/filter products.

The sample has 10 catalog records. Do not edit `data/products.json` to make the sample: keeping the small test file separate makes it easy to compare and replace.

## Step 2: Compare Sellzy fields to the fields the card needs

The existing `ProductCard` does not use Sellzy's field names directly. It expects a simpler view model:

| ProductCard field | Sellzy source field | Purpose |
|---|---|---|
| `id` | `_id` | Stable product identifier used in card actions and links |
| `title` | `name` | Product title shown on the card |
| `price` | `price` | Product price |
| `imgSrc` | `image` | Main product image |
| `imgHoverSrc` | `images[1]`, or `image` if there is no second image | Hover image |
| `isAvailable` | `stock > 0` | Availability filter |
| `soldOut` | `stock <= 0` | Sold-out badge |

This conversion is called an **adapter** or **mapping**. Keep the original JSON in the Sellzy format, and convert it into the shape the current UI needs. Later, the same adapter idea can convert an API response.

Do not pass Sellzy's `colors` or `sizes` arrays to the current card/filter unchanged. In this export they contain database IDs, but the demo UI expects color objects such as `{ name, colorClass, imgSrc }` and size labels such as `"M"`. The export also contains a brand ID, while the demo filter expects display names such as `"Ecoshopify"`.

## Step 3: Adapt the sample once and filter by URL category

`data/storefront-products.js` imports `data/substitute-products.json` and maps each Sellzy record into the card fields used by Ecomus. It also retains the category ID as `categoryId` and exports `getStorefrontProducts(categoryId)` so callers can reuse the same adapted products.

The `/shop-default` Server Component reads its `category` query parameter and matches it against either the category `slug` or `_id` in `data/storefront-menu.json`. It passes the matching products and category heading into the client component. For example:

```text
/shop-default?category=home-living
/shop-default?category=category_home_living
```

The product's `category` is an ID, so the category slug must first be looked up in the menu to get the matching ID. If the category is not recognized, the page displays no products instead of silently showing the whole catalog.

The category's `name` and `description` are localized objects with `en` and `ar` values. The page uses the existing storefront language preference to display the matching title and description, falling back to English if a translation is missing. Empty descriptions are omitted. Without a category query, the default "New Arrival" heading and fashion subtitle remain. `Outdoor & Travel` is also present in the menu; it has no matching sample products yet.

## Step 4: Give the adapted products to the page state

In `ShopDefault`, initialize both state arrays from `shopProducts`:

```jsx
const [products, setProducts] = useState(shopProducts);
const [finalSorted, setFinalSorted] = useState(shopProducts);
```

The first array is the filter result. The second is the array that sorting prepares for the grid. Starting with the sample rather than an empty array makes the initial data flow easier to follow.

## Step 5: Pass one product source to the filter

`ShopFilter` accepts a `products` prop. Pass it the same already-adapted, category-filtered sample:

```jsx
<ShopFilter
  products={shopProducts}
  setProducts={setProducts}
  showLegacyFacets={false}
/>
```

Now the filter and product grid use the same product records. The price range is calculated from those products, and `showLegacyFacets={false}` hides the demo-only category, brand, color, and size controls. Availability and price filtering remain active. Category filtering happens before this component receives the products, so it remains consistent with the URL and the category heading.

### Important: adapt or temporarily simplify the old filters

The filter UI was made for the fashion demo, not this Sellzy sample:

- The price slider is hardcoded to `$5`–`$22`, but the sample ranges from `$15` to `$120`. With its current initial range, most products disappear.
- The brand choices are demo brand names, but Sellzy's `brand` field is an ID.
- The color and size filter choices are demo values, while Sellzy's arrays contain IDs.
- The category filter list is demo Fashion data.

If you later want those extra facets, update them to use actual category, brand, color, and size data before enabling them. Availability uses `stock > 0`.

Do not leave a filter visible if selecting it silently returns no relevant products. A filter must use values that exist on the new product objects.

## Step 6: Sorting and grid rendering

`ShopDefault.jsx` already passes `products` to `Sorting` and `finalSorted` to `ProductGrid`:

```jsx
<Sorting setFinalSorted={setFinalSorted} products={products} />
<ProductGrid allproducts={finalSorted} gridItems={gridItems} />
```

After the adapter, `Sorting` can use `title` and `price`, and `ProductGrid` can pass each adapted record to `ProductCard`. You should not need to change the product grid's `.map()` for this first display exercise.

The card then uses `imgSrc`, `imgHoverSrc`, `title`, `price`, and `id`. The original Sellzy record remains available in the JSON file if you later need extra information.

## Step 7: Check card interactions separately

The product-detail route now looks up the sample by its Sellzy `_id` and adapts its title, price, images, stock, and category name for the detail view. Unknown IDs show a 404 instead of silently displaying an unrelated demo product. Existing Ecomus demo product IDs still use the original detail page.

Try clicking a sample product's image or title. Confirm that the URL contains its `_id`, and that the detail page shows the matching title, price, sample images, stock count, and category. The sample detail page intentionally hides demo-only variants, purchase actions, policies, and recommendations; cart, Quick View, Quick Add, compare, and wishlist are not integrated with Sellzy records yet.

## Step 8: Check the result locally

1. Start the development server with `npm run dev`.
2. Open `/shop-default`.
3. Confirm that 10 products are counted and that names, prices, and images appear.
4. Try the sort choices and confirm alphabetical and price order.
5. Test only filters you have already adapted.
6. If remote images fail, check the browser console and the Next.js image settings in `next.config.mjs`.

For production, a local change is not enough: build and deploy a new release using the project's production deployment guide.

## What this loading method means

The storefront data helper imports local JSON:

```jsx
import sellzyProducts from "@/data/substitute-products.json";
```

is a **local mock-data import**, not an API request. Next.js includes the data in the app build. It is useful for learning and a small fixed sample, but changing the JSON in production requires a new deployment.

When the backend is ready, replace the local import with a request to the backend in an appropriate Next.js server-side data-loading layer. Then pass the response through the same adapter and into the shop components. That change in data source does not require the card to understand Sellzy's database format.

## The mental model

```text
Sellzy-shaped JSON
        ↓ import
data/storefront-products.js maps raw records into the UI shape
        ↓ category lookup/filter in the shop route
ShopDefault owns the filtered product state
        ↓ props
Filter and Sorting work on that same UI-shaped array
        ↓ props
ProductGrid maps the array into cards
        ↓
Customer sees products
```

The important React idea is that a component receives data through **props**. `ShopDefault` owns the data and state; the filter, sorter, and grid receive the arrays they need.
