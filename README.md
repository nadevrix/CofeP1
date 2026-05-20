# Cofepollar1 — Hosted Checkout demo

Mini cafetería para mostrar la integración **más simple posible** con Pollar Pay.

Cero servidor del comercio, cero render de QR, cero polling, cero state. Es un
único `index.html` que clickás "Comprar" y te redirige al checkout hosteado.

## Cómo funciona

1. El cliente abre `index.html` (servido como archivo estático)
2. Click "Comprar Espresso" → JS hace `POST /api/sdk/pay` al backend de Pollar
   con la `api_key` publishable
3. Recibe `data.checkout_url` apuntando al Hosted Checkout
4. `window.location.href = checkout_url`
5. Pollar Pay muestra QR + estado + confirmación. El cliente paga, vuelve
   (si configuraste `successUrl`)

## Configuración

```bash
cp config.example.js config.js
```

Editá `config.js`:

```js
window.POLLAR_CONFIG = {
  apiKey: 'pub_testnet_xxxxxxxxxxxxxxxx',  // de tu sucursal
  backendUrl: 'https://pp1back.vercel.app/api',
  successUrl: null, // opcional
};
```

La api key la sacás del dashboard:
**https://pp2front.vercel.app/dashboard/avanzado** → copiar de tu sucursal.

> Las api keys con prefijo `pub_` son **publishable** — diseñadas para vivir
> en el browser (igual que las `pk_` de Stripe). No confundir con secrets.

## Cómo probarlo

Cualquier servidor estático sirve. Las opciones más fáciles:

```bash
# Python
python3 -m http.server 5500

# Node (si tenés serve)
npx serve .

# O simplemente abrí index.html en el browser (cuidado con CORS — si te tira
# error de CORS, usá uno de los anteriores)
```

Abrí `http://localhost:5500/` y clickeá comprar.

## Deploy

Tirable a cualquier hosting estático: GitHub Pages, Vercel static, Netlify,
S3, Cloudflare Pages. Sin backend.

```bash
# Vercel
vercel deploy

# O simplemente subí los archivos a /www de cualquier servidor.
```

## Estructura

```
cofepollar1/
├── index.html         ← catálogo + estilos inline
├── app.js             ← lógica de compra (~70 líneas)
├── config.js          ← apiKey + backendUrl (gitignored)
├── config.example.js  ← template versionable
└── README.md
```

## Diferencia con cofepollar2

| | cofepollar1 (este) | cofepollar2 |
|---|---|---|
| Quién muestra el QR | Pollar Hosted Checkout | El propio comercio |
| Backend del merchant | Ninguno | Node + Express |
| Polling | No (Pollar lo hace) | `pay.waitForPayment()` custom |
| Control UX | Mínimo | Total |
| Líneas de código | ~150 | ~500 |
| Para quién | Tiendas que quieren cobrar ya, sin programar nada complicado | Tiendas con UX propia que quieren integrar Pollar dentro de su app |
