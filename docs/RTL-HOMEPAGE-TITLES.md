# Homepage text and RTL language switching

This project currently has an RTL **direction** toggle, not a complete
internationalization (i18n) system. The toggle stores either `ltr` or `rtl` in
`localStorage` under the `direction` key. For the storefront homepage, the
current implementation uses that saved direction as a simple language choice:

- `ltr` displays English copy.
- `rtl` displays Arabic copy.

This is a practical first step for the homepage. It does not translate every
template page, product name, or shared navigation element.

## Where the homepage translations live

Edit [../data/ecoshop-home-translations.js](../data/ecoshop-home-translations.js).
It has two dictionaries, `en` and `ar`. Keep the same keys in both dictionaries
so every section can display a complete translation.

The dictionary currently contains the homepage hero headings and button,
platform introduction, search labels, category names, product tabs, featured
products heading, offers, participating brands heading, product quality
sections, platform benefits, and supplier invitation.

Example:

```js
overviewTitle: "A marketplace for conscious choices",
```

Its Arabic equivalent belongs under the same key in the `ar` dictionary:

```js
overviewTitle: "منصة لخيارات تسوق أكثر وعيًا",
```

When adding a new translated field:

1. Add the key to both `en` and `ar`.
2. Read it from the dictionary in the homepage component instead of typing the
   visible copy directly into JSX.
3. Check the English page with the RTL toggle set to LTR.
4. Check the Arabic page with the RTL toggle set to RTL, including the mobile
   menu and narrow screens.

## How direction is detected

The [`useStorefrontLanguage`](../components/homes/ecoshop/useStorefrontLanguage.js)
hook reads the saved direction in the browser and returns `en` or `ar`. The
homepage section components use that result to select their copy.

The first server-rendered version uses English because the server cannot read a
visitor's `localStorage`. After the page loads in the browser, the hook reads the
saved direction and switches to Arabic if RTL is selected. A brief English
display before the switch is possible.

## Product components

The shared Home 06 product tabs accept optional `tabLabels` in
[`home-6/Products.jsx`](../components/homes/home-6/Products.jsx). Their
underlying filter keys remain English because the demo product data uses values
such as `"Best seller"` in `filterCategories`. Only the visible tab labels are
translated. This keeps filtering behavior intact.

The Home Plant hero and featured-products components accept optional translated
copy. Their default English text remains unchanged when used on the original
demo route.

## Important current limitations

- RTL direction and Arabic language are currently coupled for this storefront.
  A production language switch should select locale and text direction
  independently.
- This is not yet a full i18n implementation with locale-prefixed routes,
  translation-aware metadata, or server-side locale selection.
- The custom storefront navigation and the rest of the demo template are not
  fully covered by this homepage copy dictionary yet.
- Search, offer/product filtering, certification verification, vendor signup,
  brands, and product listings still use demo or placeholder behavior/data.
- Product names and product data are not translated by this dictionary.

Add translations here as the storefront copy is finalized, and keep the demo
pages unchanged unless they are intentionally being localized too.
