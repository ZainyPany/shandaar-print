# Product Images

Drop product photos in this folder.

## Quickstart

1. Save a photo here, e.g. `save-me.jpg` (square, ~1200×1200, JPG/PNG/WebP).
2. Open `src/lib/products.ts` and set the `image` field on the matching product:

```ts
{
  id: "1",
  name: "Save Me. JPG or PDF?",
  // ...
  image: "/products/save-me.jpg",   // <-- add this line
}
```

3. Save — `next/image` picks it up automatically.

## Behaviour

| `image` field          | What renders                                  |
| ---------------------- | --------------------------------------------- |
| omitted / `undefined`  | Branded SVG (auto-typesets product name)      |
| `/products/<file>.jpg` | Your photo, full-bleed, with hover zoom       |
| `/products/placeholder.svg` | The shared placeholder (this folder)     |

The branded SVG fallback means the site looks finished out of the box — you only need to add images for the products you've actually photographed.
