
let products = [];
let currentCategory = "Todos";

async function loadProducts(){
  const res = await fetch("products.json");
  products = await res.json();
  renderCatalog();
}

function moneyBRL(v){
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
}

function renderCatalog(){
  const grid = document.querySelector("#product-grid");
  if(!grid) return;
  const search = (document.querySelector("#search")?.value || "").toLowerCase().trim();

  const filtered = products.filter(p => {
    const matchesSearch = `${p.title} ${p.artist} ${p.category}`.toLowerCase().includes(search);
    const matchesCategory = currentCategory === "Todos" || p.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = filtered.length ? filtered.map(p => `
    <article class="card">
      <a href="produto.html?id=${encodeURIComponent(p.id)}">
        <div class="cover"><img src="${p.cover}" alt="Capa de ${p.title}"></div>
        <div class="card-body">
          <div class="tag">${p.format}</div>
          <h3>${p.title}</h3>
          <div class="artist">${p.artist}</div>
          <div class="meta">
            <span class="price">${moneyBRL(p.price_brl)}</span>
            <span class="btn">Ver cifra</span>
          </div>
        </div>
      </a>
    </article>
  `).join("") : `<div class="empty">Nenhuma cifra encontrada.</div>`;
}

function setupFilters(){
  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      renderCatalog();
    });
  });
}

async function loadProductPage(){
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const p = products.find(x => x.id === id);
  const el = document.querySelector("#product-detail");
  if(!el) return;

  if(!p){
    el.innerHTML = `<div class="notice">Produto não encontrado.</div>`;
    return;
  }

  document.title = `${p.title} — ${p.artist} | Nathaniel Ribeiro`;
  el.innerHTML = `
    <a class="back" href="index.html#catalogo">← Voltar ao catálogo</a>
    <div class="product-layout">
      <div class="product-cover"><img src="${p.cover}" alt="Capa de ${p.title}"></div>
      <div>
        <div class="eyebrow">${p.category} · ${p.format}</div>
        <h1>${p.title}</h1>
        <div class="artist">${p.artist}</div>
        <p class="description">${p.description}</p>
        <ul class="features">${p.details.map(x => `<li>${x}</li>`).join("")}</ul>
        <div class="purchase">
          <div class="purchase-price">${moneyBRL(p.price_brl)} <span style="font-size:14px;color:#777;font-weight:500">/ US$ ${p.price_usd.toFixed(2)}</span></div>
          <div class="purchase-actions">
            <a class="btn btn-mp" href="${p.mercadopago}" target="_blank" rel="noopener">Comprar com Mercado Pago</a>
            <a class="btn btn-paypal" href="${p.paypal}" target="_blank" rel="noopener">PayPal · International</a>
          </div>
          <small>Após o pagamento, você receberá o acesso ao material. Os links de pagamento acima ainda precisam ser substituídos pelos seus links reais.</small>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  setupFilters();
  await loadProductPage();
  document.querySelector("#search")?.addEventListener("input", renderCatalog);
});
