// ─── Café Pollar — Hosted Checkout demo ─────────────────────────────────────
// Mínima integración posible. Click "Comprar" → POST /api/sdk/pay → redirige
// al checkout_url. Pollar muestra el QR, el timer, la confirmación. El
// merchant no renderiza nada propio.
// ─────────────────────────────────────────────────────────────────────────────

const CATALOG = [
  { id: 1, name: 'Espresso',  desc: 'Doble shot, bien cargado.',    price: 2.50 },
  { id: 2, name: 'Capuccino', desc: 'Leche vaporizada y cocoa.',    price: 4.00 },
  { id: 3, name: 'Latte',     desc: 'Premium con arte.',            price: 5.50 },
  { id: 4, name: 'Bolsa 250g', desc: 'Café molido para llevar.',     price: 18.00 },
];

const cfg = window.POLLAR_CONFIG || {};
const $catalog = document.getElementById('catalog');
const $err = document.getElementById('error');
const $configWarn = document.getElementById('config-warning');

function showError(msg) {
  $err.textContent = msg;
  $err.style.display = 'block';
  setTimeout(() => { $err.style.display = 'none'; }, 6000);
}

function isConfigured() {
  return cfg.apiKey
    && (cfg.apiKey.startsWith('pub_testnet_') || cfg.apiKey.startsWith('pub_mainnet_'))
    && !cfg.apiKey.includes('XXXX');
}

function renderCatalog() {
  $catalog.innerHTML = CATALOG.map(p => `
    <article class="product">
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="price-row">
        <span class="price">${p.price.toFixed(2)}</span>
        <span class="currency">USDC</span>
      </div>
      <button class="btn" data-id="${p.id}">Comprar</button>
    </article>
  `).join('');

  $catalog.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => buy(parseInt(btn.dataset.id, 10), btn));
  });
}

async function buy(productId, btn) {
  if (!isConfigured()) {
    $configWarn.style.display = 'block';
    return;
  }
  const product = CATALOG.find(p => p.id === productId);
  if (!product) return;

  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = 'Generando…';

  try {
    const res = await fetch(`${cfg.backendUrl}/sdk/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pollar-api-key': cfg.apiKey,
      },
      body: JSON.stringify({
        amount_expected: product.price.toFixed(2),
        reason: `Café Pollar — ${product.name}`,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

    // El SDK / API devuelve checkout_url ya armado.
    // Le agregamos success_url opcional para que el cliente vuelva.
    let url = data.data.checkout_url;
    if (cfg.successUrl) {
      const sep = url.includes('?') ? '&' : '?';
      url += `${sep}success_url=${encodeURIComponent(cfg.successUrl)}`;
    }

    window.location.href = url;
  } catch (e) {
    showError(`Error: ${e.message}`);
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

// Init
if (!isConfigured()) $configWarn.style.display = 'block';
renderCatalog();
