/*
  Tema usado: Semana 10 - funcion reutilizable.
  Algunas paginas estan dentro de /pages y otras no. data-base indica
  si la ruta debe empezar vacia o con "../" para encontrar imagenes y enlaces.
*/
function getBasePath() {
  return document.body.dataset.base || "";
}

/*
  Tema usado: Semana 9 - template literals.
  Esta funcion arma la ruta completa de una imagen usando la ruta base.
*/
function buildImagePath(path) {
  return `${getBasePath()}${path}`;
}

/*
  Tema usado: Semana 9 - manipulacion del DOM.
  showToast crea un mensaje temporal cuando el usuario agrega o elimina productos.
  createElement crea el parrafo, appendChild lo agrega al body y setTimeout lo borra.
*/
function showToast(message) {
  const currentToast = document.querySelector(".toast");
  if (currentToast) currentToast.remove();

  const toast = document.createElement("p");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("toast-hide");
    window.setTimeout(() => toast.remove(), 260);
  }, 1800);
}

/*
  Tema usado: Semana 9 - innerHTML y creacion de elementos.
  Tema usado: Semana 11 - objetos del array PRODUCTS.
  Esta funcion recibe un objeto producto y devuelve una tarjeta HTML.
  Se usa en Home y Catalogo para no escribir los productos manualmente en HTML.
*/
function createProductCard(product, options = {}) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.innerHTML = `
    <div class="product-image">
      <img src="${buildImagePath(product.image)}" alt="${product.name}">
    </div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-bottom">
        <strong>${formatCurrency(product.price)}</strong>
        <div class="card-actions">
          ${options.showDetail ? `<button class="btn btn-small btn-light" type="button" data-detail="${product.id}">Ver detalle</button>` : ""}
          <button class="btn btn-small" type="button" data-add="${product.id}">Agregar</button>
        </div>
      </div>
    </div>
  `;
  return article;
}

/*
  Tema usado: Semana 9 - eventos DOMContentLoaded y click.
  DOMContentLoaded espera a que el HTML cargue. Luego se actualiza el contador
  del carrito y se activa el boton del menu en pantallas pequenas.
*/
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();

  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});
