/*
  Tema usado: Semana 9 - evento DOMContentLoaded.
  Tema usado: Semana 11 - slice y forEach.
  Este codigo se ejecuta cuando el HTML del inicio ya cargo.
  Luego toma los 3 primeros productos del array PRODUCTS y los muestra como destacados.
*/
document.addEventListener("DOMContentLoaded", () => {
  const featuredContainer = document.querySelector("#featured-products");
  if (!featuredContainer) return;

  const featuredProducts = PRODUCTS.slice(0, 3);

  featuredProducts.forEach((product) => {
    featuredContainer.appendChild(createProductCard(product));
  });

  /*
    Tema usado: Semana 9 - evento click.
    El contenedor escucha los clics de sus botones. Si el usuario presiona
    "Agregar", se obtiene el id del producto y se manda al carrito.
  */
  featuredContainer.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (!addButton) return;

    const productId = addButton.dataset.add;
    addToCart(productId);
    showToast("Producto agregado al carrito");
  });
});
