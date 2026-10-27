# Learning exercise: show Sellzy products on the shop page

This guide explains how to make `/shop-default` display a small sample of products copied from the Sellzy JSON export. It is a learning exercise; the shop page is **not wired to the new sample yet**.

## Files involved

- `data/products.json` is the larger Sellzy export copied into this project.
- `data/substitute-products.json` contains 10 products selected from that export. It keeps Sellzy's catalog field names needed for a listing, but omits long descriptions and customer review/user details. Its `category` values now reference the category IDs in `data/storefront-menu.json`.
- `app/(shop)/shop-default/page.jsx` composes the shop page.
- `components/shop/ShopDefault.jsx` owns the listing state and connects sorting, filtering, and the product grid.
- `components/shop/ShopFilter.jsx` filters the product array.
- `components/shop/Sorting.jsx` sorts the product array.
- `components/shop/ProductGrid.jsx` maps product records into cards.
- `components/shopCards/ProductCard.jsx` displays each card.

The page does not currently read directly from `data/products.js`. The flow is:

```text
shop-default/page.jsx
  -> ShopDefault.jsx
       -> ShopFilter.jsx
       -> Sorting.jsx
       -> ProductGrid.jsx
            -> ProductCard.jsx
```

Currently several of those components import the demo `products1` array from `data/products.js` as their default source.

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

## Step 3: Import and adapt the sample in `ShopDefault.jsx`

Add this import to `components/shop/ShopDefault.jsx`:

```jsx
import sellzyProducts from "@/data/substitute-products.json";
```

Above the component, create the UI-shaped array:

```jsx
const shopProducts = sellzyProducts.map((product) => ({
  id: product._id,
  title: product.name,
  price: product.price,
  imgSrc: product.image,
  imgHoverSrc: product.images?.[1] ?? product.image,
  isAvailable: product.stock > 0,
  soldOut: product.stock <= 0,
}));
```

Read this as: for every Sellzy record, make a new object with the field names the existing shop UI understands. `map` returns a new array; it does not change the imported JSON.

The optional chaining in `product.images?.[1]` means “use the second image if `images` exists.” The nullish coalescing `??` means “otherwise use the main image.”

## Step 4: Give the adapted products to the page state

In `ShopDefault`, initialize both state arrays from `shopProducts`:

```jsx
const [products, setProducts] = useState(shopProducts);
const [finalSorted, setFinalSorted] = useState(shopProducts);
```

The first array is the filter result. The second is the array that sorting prepares for the grid. Starting with the sample rather than an empty array makes the initial data flow easier to follow.

## Step 5: Pass one product source to the filter

`ShopFilter` already accepts a `products` prop, but `ShopDefault` currently omits it, so the filter falls back to the demo products. Change the rendered filter to receive the adapted sample:

```jsx
<ShopFilter products={shopProducts} setProducts={setProducts} />
```

Now the filter and product grid are working with the same product records.

### Important: adapt or temporarily simplify the old filters

The filter UI was made for the fashion demo, not this Sellzy sample:

- The price slider is hardcoded to `$5`–`$22`, but the sample ranges from `$15` to `$120`. With its current initial range, most products disappear.
- The brand choices are demo brand names, but Sellzy's `brand` field is an ID.
- The color and size filter choices are demo values, while Sellzy's arrays contain IDs.
- The category filter list is demo Fashion data.

For the first test, either hide/remove the brand, color, size, and category filter controls until their data is adapted, or update each one to use actual display data. Make the price slider's minimum and maximum derive from the `products` prop instead of hardcoding `5` and `22`; initialize its selected range to the sample's actual minimum and maximum prices. Availability can use `stock > 0`.

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

This first exercise is about listing cards. The card's product links point to `/product-detail/{id}`, but `app/(shop-details)/product-detail/[id]/page.jsx` currently looks up products in the demo `allProducts` array from `data/products.js`. A Sellzy `_id` will not be found there; the current page can fall back to a demo product.

Quick view, quick add, compare, and wishlist also use existing demo context logic. After confirming the listing, a separate follow-up task is needed to make product-detail and card actions find the Sellzy records. Until then, do not treat those interactions as integrated.

## Step 8: Check the result locally

1. Start the development server with `npm run dev`.
2. Open `/shop-default`.
3. Confirm that 10 products are counted and that names, prices, and images appear.
4. Try the sort choices and confirm alphabetical and price order.
5. Test only filters you have already adapted.
6. If remote images fail, check the browser console and the Next.js image settings in `next.config.mjs`.

For production, a local change is not enough: build and deploy a new release using the project's production deployment guide.

## What this loading method means

Importing JSON like this:

```jsx
import sellzyProducts from "@/data/substitute-products.json";
```

is a **local mock-data import**, not an API request. Next.js includes the data in the app build. It is useful for learning and a small fixed sample, but changing the JSON in production requires a new deployment.

When the backend is ready, replace the local import with a request to the backend in an appropriate Next.js server-side data-loading layer. Then pass the response through the same adapter and into the shop components. That change in data source does not require the card to understand Sellzy's database format.

## The mental model

```text
Sellzy-shaped JSON
        ↓ import
ShopDefault maps raw records into the UI shape
        ↓ props
Filter and Sorting work on that same UI-shaped array
        ↓ props
ProductGrid maps the array into cards
        ↓
Customer sees products
```

The important React idea is that a component receives data through **props**. `ShopDefault` owns the data and state; the filter, sorter, and grid receive the arrays they need.
