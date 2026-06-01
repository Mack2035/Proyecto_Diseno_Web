/*
  Tema usado: Semana 9 - variables con const.
  CART_KEY guarda el nombre con el que se almacena el carrito en localStorage.
  Se deja en una constante para no repetir el texto varias veces.
*/
const CART_KEY = "pulso_urbano_cart";

/*
  Tema usado: Semana 10 - funciones reutilizables.
  Tema usado: Semana 9 - template literals.
  Esta funcion recibe un numero y lo devuelve como precio en soles.
*/
function formatCurrency(value) {
  return `S/ ${value.toFixed(2)}`;
}

/*
  Tema usado: Semana 10 - funciones y alcance.
  Tema usado: Semana 11 - arrays.
  Esta funcion lee el carrito guardado. Si no existe, devuelve un array vacio.
  JSON.parse convierte el texto guardado en localStorage nuevamente en array.
*/
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

/*
  Tema usado: Semana 9 - JavaScript cambia el comportamiento de la pagina.
  Esta funcion guarda el carrito en localStorage para que no se pierda al recargar.
  JSON.stringify convierte el array del carrito en texto para poder guardarlo.
*/
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCounter();
}

/*
  Tema usado: Semana 11 - busqueda dentro de un array de objetos.
  find busca el producto cuyo id coincide con el id recibido por parametro.
*/
function getProductById(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

/*
  Tema usado: Semana 9 - condicional if/else.
  Tema usado: Semana 10 - parametros con valor por defecto.
  Tema usado: Semana 11 - objetos dentro de un array.
  Esta funcion agrega un producto al carrito. Si ya existe, aumenta la cantidad.
  Si todavia no existe, lo agrega como un nuevo objeto con id y quantity.
*/
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const currentItem = cart.find((item) => item.id === productId);

  if (currentItem) {
    currentItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  saveCart(cart);
}

/*
  Tema usado: Semana 11 - metodo filter.
  Esta funcion elimina un producto dejando en el carrito solo los items
  cuyo id sea diferente al producto que se quiere borrar.
*/
function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

/*
  Tema usado: Semana 10 - parametros.
  Tema usado: Semana 11 - metodo map.
  Esta funcion actualiza la cantidad de un producto. map recorre el carrito
  y devuelve un nuevo array con la cantidad cambiada solo en el producto correcto.
*/
function updateCartQuantity(productId, quantity) {
  const product = getProductById(productId);
  if (!product) return;

  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const cart = getCart().map((item) => {
    if (item.id === productId) {
      return { ...item, quantity: safeQuantity };
    }
    return item;
  });

  saveCart(cart);
}

/*
  Tema usado: Semana 10 - funcion reutilizable.
  Esta funcion vacia el carrito guardando un array vacio.
*/
function clearCart() {
  saveCart([]);
}

/*
  Tema usado: Semana 11 - map y filter.
  El carrito solo guarda id y cantidad. Esta funcion une esos datos con PRODUCTS
  para obtener nombre, precio, imagen y subtotal de cada producto.
*/
function getCartDetails() {
  return getCart()
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return null;
      return {
        ...product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      };
    })
    .filter(Boolean);
}

/*
  Tema usado: Semana 11 - metodo reduce.
  reduce permite sumar todos los subtotales para obtener el total del carrito.
*/
function getCartTotal() {
  return getCartDetails().reduce((total, item) => total + item.subtotal, 0);
}

/*
  Tema usado: Semana 11 - metodo reduce.
  Esta funcion suma las cantidades para mostrar el numero de productos
  en el contador del carrito de la barra de navegacion.
*/
function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

/*
  Tema usado: Semana 9 - manipulacion del DOM.
  Busca todos los elementos con data-cart-count y actualiza su texto
  con la cantidad actual de productos del carrito.
*/
function updateCartCounter() {
  const counters = document.querySelectorAll("[data-cart-count]");
  counters.forEach((counter) => {
    counter.textContent = getCartCount();
  });
}
