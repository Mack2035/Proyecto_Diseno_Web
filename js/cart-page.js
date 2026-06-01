/*
  Tema usado: Semana 9 - DOMContentLoaded.
  Este archivo controla la pagina carrito.html. Primero espera que el HTML cargue
  y luego busca los elementos donde se mostraran productos, subtotal y total.
*/
document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.querySelector("#cart-list");
  const subtotal = document.querySelector("#subtotal");
  const shipping = document.querySelector("#shipping");
  const total = document.querySelector("#total");
  const clearButton = document.querySelector("#clear-cart");

  /*
    Tema usado: Semana 10 - funcion reutilizable.
    Tema usado: Semana 11 - arrays de objetos.
    renderCart dibuja todo el carrito cada vez que se agrega, elimina
    o cambia la cantidad de un producto.
  */
  function renderCart() {
    const items = getCartDetails();
    const subtotalValue = getCartTotal();
    cartList.innerHTML = "";

    if (!items.length) {
      cartList.innerHTML = `
        <div class="empty-state">
          <h3>Tu carrito esta vacio</h3>
          <p>Agrega productos desde el catalogo para ver el resumen aqui.</p>
          <a class="btn btn-primary" href="catalogo.html">Ir al catalogo</a>
        </div>
      `;
    } else {
      items.forEach((item) => {
        const row = document.createElement("article");
        row.className = "cart-item";
        row.innerHTML = `
          <img src="${buildImagePath(item.image)}" alt="${item.name}">
          <div>
            <p class="product-category">${item.category}</p>
            <h3>${item.name}</h3>
            <p>${formatCurrency(item.price)} por unidad</p>
          </div>
          <label>
            Cantidad
            <input type="number" min="1" value="${item.quantity}" data-quantity="${item.id}">
          </label>
          <strong>${formatCurrency(item.subtotal)}</strong>
          <button class="btn-icon remove" type="button" data-remove="${item.id}" aria-label="Eliminar ${item.name}">&times;</button>
        `;
        cartList.appendChild(row);
      });
    }

    subtotal.textContent = formatCurrency(subtotalValue);
    shipping.textContent = "Gratis";
    total.textContent = formatCurrency(subtotalValue);
    updateCartCounter();
  }

  /*
    Tema usado: Semana 9 - evento input.
    Cuando el usuario cambia la cantidad de un producto, se actualiza el carrito,
    se vuelve a dibujar la lista y el total cambia en tiempo real.
  */
  cartList.addEventListener("input", (event) => {
    const quantityInput = event.target.closest("[data-quantity]");
    if (!quantityInput) return;

    updateCartQuantity(quantityInput.dataset.quantity, quantityInput.value);
    renderCart();
  });

  /*
    Tema usado: Semana 9 - evento click.
    Si el usuario presiona el boton de eliminar, se quita ese producto del carrito.
  */
  cartList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove]");
    if (!removeButton) return;

    removeFromCart(removeButton.dataset.remove);
    renderCart();
    showToast("Producto eliminado");
  });

  /*
    Tema usado: Semana 9 - evento click.
    Este boton limpia todo el carrito usando la funcion clearCart.
  */
  clearButton.addEventListener("click", () => {
    clearCart();
    renderCart();
    showToast("Carrito vaciado");
  });

  renderCart();
});
