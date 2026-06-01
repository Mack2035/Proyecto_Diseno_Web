/*
  Tema usado: Semana 9 - JavaScript vinculado al HTML.
  Este archivo controla el catalogo: crea filtros, muestra productos,
  actualiza el detalle y permite agregar productos al carrito.
*/
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#catalog-products");
  const searchInput = document.querySelector("#search-product");
  const categoryFilter = document.querySelector("#category-filter");
  const resultText = document.querySelector("#filter-result");
  const detailBox = document.querySelector("#product-detail");

  /*
    Tema usado: Semana 11 - forEach con arrays.
    Se recorre el array CATEGORIES para crear las opciones del select.
    Asi no se escriben las categorias una por una en el HTML.
  */
  CATEGORIES.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });

  /*
    Tema usado: Semana 11 - filter sobre un array de objetos.
    Esta funcion devuelve solo los productos que coinciden con la busqueda
    y con la categoria seleccionada por el usuario.
  */
  function getFilteredProducts() {
    const term = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    return PRODUCTS.filter((product) => {
      const matchesTerm = product.name.toLowerCase().includes(term)
        || product.description.toLowerCase().includes(term);
      const matchesCategory = category === "todos" || product.category === category;
      return matchesTerm && matchesCategory;
    });
  }

  /*
    Tema usado: Semana 10 - funciones reutilizables.
    renderCatalog limpia el contenedor y vuelve a dibujar las tarjetas.
    Se llama al cargar la pagina y tambien cuando cambia la busqueda o categoria.
  */
  function renderCatalog() {
    const products = getFilteredProducts();
    grid.innerHTML = "";

    if (!products.length) {
      grid.innerHTML = `<p class="empty-state">No encontramos productos con esos filtros.</p>`;
    } else {
      products.forEach((product) => {
        grid.appendChild(createProductCard(product, { showDetail: true }));
      });
    }

    resultText.textContent = `Mostrando ${products.length} de ${PRODUCTS.length} productos`;
  }

  /*
    Tema usado: Semana 9 - modificacion del DOM con innerHTML.
    Al presionar "Ver detalle", esta funcion cambia el contenido de la seccion
    de detalle con la imagen, descripcion y precio del producto seleccionado.
  */
  function showProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;

    detailBox.innerHTML = `
      <img src="${buildImagePath(product.image)}" alt="${product.name}">
      <div>
        <p class="product-category">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Precio:</strong> ${formatCurrency(product.price)}</p>
        <button class="btn btn-primary" type="button" data-add="${product.id}">Agregar al carrito</button>
      </div>
    `;
  }

  /*
    Tema usado: Semana 9 - eventos input y change.
    input se activa al escribir en la busqueda.
    change se activa al cambiar la categoria del select.
  */
  searchInput.addEventListener("input", renderCatalog);
  categoryFilter.addEventListener("change", renderCatalog);

  /*
    Tema usado: Semana 9 - evento click.
    Aqui se controla si el clic fue en "Ver detalle" o en "Agregar".
    Se usa closest para encontrar el boton correcto aunque el clic caiga dentro del boton.
  */
  grid.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-detail]");
    const addButton = event.target.closest("[data-add]");

    if (detailButton) {
      showProductDetail(detailButton.dataset.detail);
    }

    if (addButton) {
      addToCart(addButton.dataset.add);
      showToast("Producto agregado al carrito");
    }
  });

  /*
    Tema usado: Semana 9 - evento click.
    El boton de la seccion detalle tambien puede agregar el producto al carrito.
  */
  detailBox.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (!addButton) return;

    addToCart(addButton.dataset.add);
    showToast("Producto agregado al carrito");
  });

  renderCatalog();
  showProductDetail(PRODUCTS[0].id);
});
