// ─── Configuración del demo ───────────────────────────────────────────────
// Copialo a `config.js` (que está gitignored) y completá los valores.
//
// El POLLAR_API_KEY se obtiene del dashboard:
//   https://pp2front.vercel.app/dashboard/avanzado
//
// Las api keys con prefijo `pub_` son PUBLISHABLE — diseñadas para vivir en
// el browser (igual que las pk_ de Stripe). NO confundir con secrets server-side.
// ─────────────────────────────────────────────────────────────────────────

window.POLLAR_CONFIG = {
  // pub_testnet_... o pub_mainnet_...
  apiKey: 'pub_testnet_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

  // URL del backend Pollar Pay. Por defecto el público de producción.
  backendUrl: 'https://pp1back.vercel.app/api',

  // (opcional) Si querés que después del pago el cliente vuelva a una URL tuya,
  // pasala como success_url al checkout. Tiene que ser absoluta.
  successUrl: null, // ej: 'https://mi-tienda.com/gracias'
};
