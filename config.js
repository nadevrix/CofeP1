// ─── Configuración del demo ───────────────────────────────────────────────
// Café Pollar 1 — Hosted Checkout (redirect a Pollar Pay)
//
// API key de la sucursal "Café Pollar 1" obtenida del dashboard:
//   https://pp2front.vercel.app/dashboard/avanzado
// ─────────────────────────────────────────────────────────────────────────

window.POLLAR_CONFIG = {
  // pub_testnet_... o pub_mainnet_...
  apiKey: 'pub_testnet_b733cee6532d9e6e9faf90477170ea6e5374bbdff372d90e78a41de70e29280d',

  // URL del backend Pollar Pay. Por defecto el público de producción.
  backendUrl: 'https://pp1back.vercel.app/api',

  // (opcional) Si querés que después del pago el cliente vuelva a una URL tuya,
  // pasala como success_url al checkout. Tiene que ser absoluta.
  successUrl: null, // ej: 'https://mi-tienda.com/gracias'
};
