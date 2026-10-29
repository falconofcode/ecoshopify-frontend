# Learning guide: preparing the storefront product data for the backend

This guide follows [the Sellzy JSON shop exercise](./learning-shop-default-sellzy-json.md). It explains what the frontend currently does, what the local seed files contain, which product details are not wired yet, and a practical sequence for making the storefront ready for a real product API.

The goal is not to make every Ecomus demo page use the backend at once. The goal is to agree on a safe, stable public product shape, adapt it to the existing UI, and migrate one storefront path at a time.

## 1. Several product data shapes currently coexist

| File or source | What it is | How it is used |
|---|---|---|
| `data/products.js` | Ecomus theme demo data and UI-shaped objects such as `products1` and `allProducts` | Still used by many shop layouts, home sections, quick-view/cart-related components, and product-detail examples |
| `data/products.json` | A larger Sellzy-shaped JSON export | A data reference, not the current source for the shop-default listing |
| `data/seed/*.json` | Raw seed snapshots for products and related catalog entities | Useful for understanding the backend domain and building test fixtures; not a public API contract |
| `data/substitute-products.json` | A curated 10-product sample | Currently used by `/shop-default` and the Sellzy branch of `/product-detail/[id]` |
| `data/storefront-menu.json` | Storefront category/menu data | Used to display the sample products' category names and in the storefront header |

These are not interchangeable formats. Ecomus components expect presentation fields such as `title`, `imgSrc`, `imgHoverSrc`, and color objects with display classes. Sellzy records use fields such as `_id`, `name`, `image`, `images`, and relationship IDs.

Keep the Ecomus data in place while other theme pages still import it. Replacing the demo data globally is a separate migration, not a prerequisite for integrating the default shop.

## 2. What works today

The current data path for the default shop is:

```text
data/substitute-products.json
        ↓ import in ShopDefault
card-shaped mapping: _id → id, name → title, image → imgSrc
        ↓
ShopFilter → Sorting → ProductGrid → ProductCard
        ↓
/product-detail/[id]
```

The shop mapping includes the product ID, title, price, main/hover images, and stock-derived availability. The detail route looks for that ID in the same 10-product sample, maps its gallery and stock, and resolves a category label from `data/storefront-menu.json`. Unknown IDs show a 404. Non-sample IDs continue to use Ecomus demo products.

The `/shop-default` route also accepts `?category=<slug-or-id>` (for example, `?category=home-living`). It looks up the category in `data/storefront-menu.json`, filters products by the category ID, and uses its localized name and description in English or Arabic according to the storefront language setting. An empty description is omitted; an unknown category produces no matching products.

The sample currently intentionally omits most full-record data. The Sellzy detail view displays a basic gallery, name, price, stock, and category. It hides Ecomus-only sample content and does not yet show the full description, brand, review list, or real purchasable variants.

## 3. What is in the seed directory—and what needs checking

The current local seed snapshot contains approximately:

| Seed file | Records | Main purpose |
|---|---:|---|
| `data/seed/products.json` | 83 | Product records, descriptions, gallery URLs, inventory, ratings, and relationship IDs |
| `data/seed/categories.json` | 34 | Category names, hierarchy, slugs, and images |
| `data/seed/brands.json` | 19 | Brand names, slugs, and images |
| `data/seed/producttypes.json` | 18 | Product-type metadata |
| `data/seed/productbases.json` | 5 | Product-base metadata |
| `data/seed/colors.json` | 5 | Color labels and values referenced by product IDs |
| `data/seed/sizes.json` | 5 | Size labels and values referenced by product IDs |
| `data/seed/weights.json` | 2 | Weight labels and values referenced by product IDs |

These counts describe the present local files; they are not guaranteed API totals. The seed products include fields that must not be sent to a public browser, such as `purchasePrice`, `profitMargin`, vendor information, and internal metadata. Review and explicitly allowlist fields when creating a storefront fixture or API response—do not import or return raw seed objects to client components.

The product records refer to categories, brands, types, bases, colors, sizes, and weights by ID. The related JSON files are needed to turn those IDs into readable labels. The current snapshot has at least one product brand reference that does not resolve against the local brands file. Check and repair reference integrity before using the seed set as a complete fixture.

The seed directory is already under `data/seed`; there is usually no need to copy every file into the top level of `data/`. Prefer focused imports and a small, deliberately sanitized storefront fixture. At the time this guide was written, `git status` showed `data/seed/` as untracked. Check whether these files should be shared or remain local before relying on them in a team workflow; an untracked local file is not available to teammates or a deployment build from a clean checkout.

## 4. Detail-page gaps: raw fields versus what the UI needs

The full seed record has more data than the current sample, but merely copying those fields does not make the details page display them. The detail page uses an adapter before passing its product to `DetailsOuterZoom`, and the component currently reads only a limited set of product fields for Sellzy items.

| User-facing feature | Available in raw seed? | Work still needed |
|---|---|---|
| Product title and slug | `name`, `slug` | Decide whether URLs remain ID-based or move to slugs; keep IDs stable either way |
| Product gallery | `image`, `images[]` | Pass the complete image list to the gallery and handle empty/broken URLs |
| Price and currency | `price` | Agree a currency and price representation with the backend; the current UI formats a bare number as `$` |
| Sale / compare-at price | `discountPercentage` | Define whether the API returns a final price, a compare-at price, or both; do not infer a sale from a percentage without an agreed rule |
| Stock | `stock` | Current detail view shows a stock count; decide whether the public API should expose an exact quantity or only availability |
| Description | HTML `description` | Add a description section/tab and agree whether the API returns sanitized HTML or structured content |
| Category and brand labels | relationship IDs | Resolve to safe public display objects or fetch the related entities; the current category lookup only uses the storefront menu sample |
| Color, size, weight | arrays of IDs | Resolve IDs to labels and represent actual purchasable combinations; do not pass these IDs to the Ecomus fashion selectors |
| Reviews | `averageRating`, `numReviews`, `reviews[]` | Define public review fields, moderation rules, and whether reviews are fetched separately; never expose reviewer account IDs |
| Product metadata | `productType`, `productBase`, `isNewItem`, approval status, etc. | Decide which fields affect storefront display and keep internal/admin-only fields out of the public DTO |

The existing Ecomus variant option arrays in `data/singleProductOptions.js` contain fashion-demo values. They are not a mapping for the Sellzy IDs. Do not create every possible color/size combination by taking a Cartesian product; the backend should identify which variants actually exist and which can be purchased.

## 5. Recommended sequence: get realistic data without coupling the UI to the seed

### Step 1: Keep a small, public storefront fixture

Use the seed files as source material, not as the frontend's final data contract. Select a few representative products and resolve their category, brand, and option IDs. Store only public fields in a fixture, for example:

```text
data/mock/storefront-products.json
```

The existing `data/substitute-products.json` can remain as the 10-product learning sample. Either extend that sample or create a separate fixture for richer detail-page work; keep the two purposes clear. Never put purchase costs, profit margins, supplier contacts, internal user IDs, or moderation-only data in a fixture imported by a client component.

Before using the fixture, check:

1. Every product has a unique, stable ID and a unique slug.
2. Category and brand references resolve.
3. Product image URLs are valid and gallery order is intentional.
4. Price, currency, stock, and discounts have agreed meanings.
5. Rich descriptions are safe to render.
6. Variants reflect real available combinations, not just possible combinations of option labels.

### Step 2: Define one frontend view model

Make a small adapter that converts either the local fixture or an API DTO into the fields the current UI needs. Avoid keeping separate, drifting mapping logic in the shop page and detail route.

For example, the card view can have:

```js
{
  id: "product-id",
  slug: "product-slug",
  title: "Product name",
  price: 29,
  currency: "USD",
  imgSrc: "https://example.com/main.jpg",
  imgHoverSrc: "https://example.com/alternate.jpg",
  isAvailable: true,
  soldOut: false
}
```

The detail view can extend that model with the gallery, description, category, brand, review summary, and variants. Keep the raw API response separate from the UI model. This adapter boundary is what lets the backend change its storage shape without forcing every card to know about database-specific fields.

The Ecomus cards and detail components currently expect a numeric decimal `price` and call `.toFixed(2)`. If the API uses integer minor units, convert them in the adapter (for example, `2900` cents to `29.00`) and format with the returned currency. Do not pass an API price object directly to components that expect a number.

### Step 3: Add the richer product view to the sample detail page

Extend the adapter and the Sellzy detail rendering in small, testable pieces:

1. Validate and preserve the full image gallery already used by the sample detail route.
2. Category and brand names.
3. Description content.
4. Rating summary.
5. Real variants and availability for each variant.
6. Cart/quick-view/wishlist integration only after those features use the same product and variant IDs consistently.

Do not display Ecomus countdowns, fabricated review counts, or fashion options for Sellzy products. If a field is missing, omit that UI section or display an intentional empty state rather than invented data.

### Step 4: Agree on the API with the backend developer

Treat the following as a proposed storefront contract to discuss—not a claim about endpoints that already exist. Keep the API version and host configurable in the frontend.

#### List products

```http
GET /api/storefront/products?page=1&pageSize=24&category=supplements&sort=price_asc
```

Useful optional query parameters:

```text
q, category, brand, minPrice, maxPrice, inStock, sort, page, pageSize
```

Filtering, sorting, and pagination should be performed by the backend once the catalog is larger than a small mock. Agree whether `category` and `brand` filters accept IDs or slugs.

Example response:

```json
{
  "items": [
    {
      "id": "698ccda1b8d43495a8a25a9b",
      "slug": "vitalife-omega-3-softgels-heart-support-max-strength",
      "name": "VitaLife Omega-3 Softgels Heart Support Max Strength",
      "price": { "amount": 2900, "currency": "USD" },
      "compareAtPrice": null,
      "image": "https://example.com/product-main.jpg",
      "images": [
        "https://example.com/product-main.jpg",
        "https://example.com/product-side.jpg"
      ],
      "availability": "in_stock",
      "category": {
        "id": "category_supplements",
        "name": "Supplements",
        "slug": "supplements"
      },
      "brand": {
        "id": "brand-id",
        "name": "Brand name",
        "slug": "brand-name"
      },
      "rating": { "average": 5, "count": 1 }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 24,
    "totalItems": 83,
    "totalPages": 4,
    "hasNextPage": true
  }
}
```

In this example, price is an integer number of minor currency units: `2900` means `$29.00` for USD. Confirm the currency and this representation before implementation. The example's total is illustrative; the real API must return the actual total.

#### Get one product

```http
GET /api/storefront/products/{id}
```

Return the listing fields plus the fields needed by the detail page:

```json
{
  "id": "698ccda1b8d43495a8a25a9b",
  "slug": "vitalife-omega-3-softgels-heart-support-max-strength",
  "name": "VitaLife Omega-3 Softgels Heart Support Max Strength",
  "description": {
    "format": "html",
    "content": "<p>Public, sanitized product description.</p>"
  },
  "price": { "amount": 2900, "currency": "USD" },
  "compareAtPrice": null,
  "availability": "in_stock",
  "stockQuantity": 44,
  "images": ["https://example.com/product-main.jpg"],
  "category": { "id": "category_supplements", "name": "Supplements", "slug": "supplements" },
  "brand": { "id": "brand-id", "name": "Brand name", "slug": "brand-name" },
  "rating": { "average": 5, "count": 1 },
  "variants": [
    {
      "id": "variant-id",
      "sku": "PUBLIC-SKU",
      "name": "60 capsules",
      "options": [{ "name": "Weight", "value": "60 capsules" }],
      "price": { "amount": 2900, "currency": "USD" },
      "availability": "in_stock",
      "stockQuantity": 12
    }
  ]
}
```

If exact inventory should not be public, omit `stockQuantity` and return only `availability`. If variants do not apply to a product, return an empty array. Do not expose internal purchase costs, profit, supplier data, raw database documents, reviewer account IDs, or unmoderated reviews in either endpoint.

Agree on these behaviors too:

- Stable ID and slug rules; whether the public product URL is ID-based or slug-based.
- Whether a missing, inactive, or unapproved product returns `404`.
- A consistent error response, for example `{ "error": { "code": "PRODUCT_NOT_FOUND", "message": "Product not found" } }`.
- Page size limits and sort keys, and whether counts are exact.
- Whether descriptions are plain text, structured blocks, or sanitized HTML. Never render untrusted HTML directly.
- Whether the list endpoint includes nested category/brand labels or the frontend must request those catalogs separately.
- How currency, taxes, discounts, and variant-specific pricing are represented.

### Step 5: Connect Next.js to the API at a server boundary

The current `/shop-default` component is a client component and imports local JSON. For a real integration, prefer fetching products in the route's Server Component, then pass serializable product data to the client-side grid/filter controls. This avoids shipping a raw seed or private API credential in the browser bundle.

Suggested flow:

```text
Server page (fetch list) → shared adapter → ShopDefault client component
                                      ├─ filter/sort controls
                                      └─ product cards

Server detail page (fetch by ID) → shared detail adapter → detail component
```

Use the browser for API requests only when the interaction genuinely needs client-side fetching. Never put a private backend token in a `NEXT_PUBLIC_*` environment variable or in client component code. For a public catalog endpoint, the backend should enforce which fields are public regardless of how the browser calls it.

Start by migrating only `/shop-default` and `/product-detail/[id]`. Many other shop pages and Ecomus home sections still import `products1` from `data/products.js`; they will remain demo-driven until explicitly migrated.

### Step 6: Verify the integration in layers

Before removing the fixture, check all of the following:

1. `/shop-default` loads a real list and shows the right product count.
2. Cards display the right title, currency-formatted price, image, and availability.
3. Sorting and supported filters use the same result set and do not reset unexpectedly.
4. Clicking a card opens that exact product, including on a direct page refresh.
5. Detail gallery, description, category, brand, rating, and variant states match the API response.
6. Empty results, loading failures, missing products, and sold-out variants have intentional UI states.
7. API errors are visible in logs or the UI; they do not silently fall back to unrelated Ecomus products.
8. The browser network response contains only public storefront fields.
9. A production build succeeds with the API configuration and image hosts set correctly.

Only remove the local fixture from a path after its API path has passed these checks. Keep a deliberate mock mode if local development needs to run without the backend.

## 6. Suggested implementation milestones

1. **Audit and select** — choose representative products and resolve every related ID from `data/seed`.
2. **Sanitize fixtures** — create a small public-only fixture; do not copy all seed fields to the browser.
3. **Agree on the contract** — confirm list/detail fields, filters, pagination, currency, variants, and error semantics with the backend developer.
4. **Create shared adapters** — one adapter for cards and one for details, used by both fixtures and API responses.
5. **Complete one detail page** — show real description, images, relationships, and variants without theme demo content.
6. **Fetch on the server** — wire only the default listing and standard detail route first.
7. **Integrate shopping actions** — align cart and wishlist state with backend product and variant IDs.
8. **Migrate deliberately** — move other shop/home components in separate batches after the first path is stable.

## 7. Message to send the backend developer

> I have the frontend's default shop and standard product detail route using a 10-product local Sellzy sample. The UI currently needs a card shape with a stable product ID, slug, name, price/currency, images, and availability; the detail page also needs description, category and brand labels, rating summary, and real purchasable variants. Could we agree on `GET /api/storefront/products` with pagination/filter/sort parameters and `GET /api/storefront/products/{id}` for the detail response? Please return only public storefront fields (not purchase cost, profit, supplier details, internal user IDs, or raw database records). We also need to agree on currency/price units, stock visibility, description format, variant IDs, and missing-product/error behavior before I replace the mock with API calls.

## Mental model

```text
Ecomus theme objects ──────────────────→ existing demo UI

Seed snapshots → sanitized fixture ─┐
                                    ├→ shared adapter → storefront UI
Backend API response ───────────────┘
```

The backend should own the product domain and public response contract. The frontend adapter should own the translation from that contract into Ecomus component props. Keeping those responsibilities separate makes it possible to replace the local fixture with the API without teaching every visual component how the database is structured.