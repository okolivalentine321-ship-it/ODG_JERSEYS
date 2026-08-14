# ODG_JERSEYS — Premium Sports Hub

A fast static football jersey storefront inspired by the functional structure of the original PEREZ SPORTS HUB, redesigned with a premium black / green / gold futuristic identity.

## Files

- `index.html` — page structure
- `style.css` — all visual styling and animations
- `products.js` — YOUR product control file
- `script.js` — search, filtering, cart, WhatsApp ordering
- `images/` — put jersey pictures here

## Add a product

1. Put the picture in `images/`.
2. Open `products.js`.
3. Copy an existing product object.
4. Change:
   - `name`
   - `price`
   - `category`
   - `label`
   - `image`
   - `description`
5. Save and upload to GitHub.

## Set WhatsApp number

Open `script.js` and replace:

`whatsappNumber: "2348000000000"`

with the client's real WhatsApp number in international format, without `+`, spaces or dashes.

Example for a Nigerian number:

`08012345678` → `2348012345678`

## Important

The sample product images are intentionally not included. Add the client's real jersey photos to `images/` using the exact filenames referenced in `products.js`, or change the filenames there.

## Deploy

Upload all files to a GitHub repository and enable GitHub Pages from the repository's Settings → Pages.

No backend or database is required for this version.
