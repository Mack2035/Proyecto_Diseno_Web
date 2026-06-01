# Comentarios del proyecto

Este documento resume los comentarios agregados al codigo y los temas de las presentaciones que se usan.

## Presentaciones usadas como referencia

- Semana 9: fundamentos de JavaScript, vinculacion con HTML, variables, operadores, condicionales, eventos, DOM y validacion.
- Semana 10: funciones, parametros, funciones reutilizables y alcance de variables.
- Semana 11: arrays, arrays de objetos y metodos como `forEach`, `filter`, `map`, `reduce` y `find`.

## Comentarios en JavaScript

### `js/products.js`

- Se explica que `PRODUCTS` es un array de objetos.
- Cada producto tiene propiedades como `id`, `name`, `price`, `image`, `category` y `description`.
- Tema usado: Semana 11, porque se trabaja con arrays y objetos.
- Tambien se comenta `CATEGORIES`, que sirve para crear automaticamente el filtro del catalogo.

### `js/cart-store.js`

- Se comenta `CART_KEY`, que guarda el nombre usado en `localStorage`.
- Se explica `formatCurrency()`, que convierte numeros a precios en soles.
- Se explica `getCart()`, que lee el carrito guardado y devuelve un array.
- Se explica `saveCart()`, que guarda el carrito para que no se pierda al recargar.
- Se explica `getProductById()`, que usa `find()` para buscar productos por id.
- Se explica `addToCart()`, incluyendo el `if/else`: si el producto ya existe aumenta cantidad; si no existe, lo agrega.
- Se explica `removeFromCart()`, que usa `filter()` para eliminar un producto.
- Se explica `updateCartQuantity()`, que usa `map()` para cambiar solo el producto seleccionado.
- Se explica `getCartDetails()`, que une datos del carrito con datos del catalogo.
- Se explica `getCartTotal()` y `getCartCount()`, que usan `reduce()` para sumar.
- Se explica `updateCartCounter()`, que modifica el DOM para actualizar el contador.

### `js/common.js`

- Se explica `getBasePath()`, que ayuda con las rutas entre `index.html` y las paginas internas.
- Se explica `buildImagePath()`, que arma la ruta de imagenes usando template literals.
- Se explica `showToast()`, que crea un mensaje temporal con `createElement`, `appendChild` y `setTimeout`.
- Se explica `createProductCard()`, que crea tarjetas de producto desde JavaScript usando los objetos de `PRODUCTS`.
- Se explica el evento `DOMContentLoaded` y el evento `click` del menu responsive.

### `js/home.js`

- Se explica que el codigo espera a que cargue el HTML con `DOMContentLoaded`.
- Se explica que `slice(0, 3)` toma los tres primeros productos.
- Se explica que `forEach()` recorre los productos destacados y los dibuja en pantalla.
- Se explica el evento `click` para agregar productos al carrito desde el inicio.

### `js/catalog.js`

- Se explica que controla el catalogo interactivo.
- Se explica que `forEach()` crea las opciones del filtro de categorias.
- Se explica que `filter()` busca productos por texto y categoria.
- Se explica `renderCatalog()`, que limpia y vuelve a dibujar el catalogo.
- Se explica `showProductDetail()`, que modifica el DOM con `innerHTML`.
- Se explican los eventos `input`, `change` y `click`.

### `js/cart-page.js`

- Se explica que controla `carrito.html`.
- Se explica `renderCart()`, que vuelve a dibujar el carrito cada vez que cambia algo.
- Se explica como se crea cada fila del carrito con `createElement` e `innerHTML`.
- Se explica el evento `input` para cambiar cantidades.
- Se explica el evento `click` para eliminar productos.
- Se explica el boton para vaciar todo el carrito.

### `js/contact-form.js`

- Se explica que la validacion se hace con JavaScript.
- Se explica `setFieldState()`, que marca visualmente campos correctos o con error.
- Se explica `validateForm()`, que usa condicionales para revisar nombre, correo, celular, objetivo, mensaje y terminos.
- Se explica que los errores se guardan en el objeto `errors`.
- Se explica el evento `input`, que valida mientras se escribe.
- Se explica el evento `submit`, que evita recargar la pagina y muestra mensaje de exito.

## Comentarios en HTML y CSS

- En HTML se comentan las zonas principales: header, hero, catalogo, carrito, formulario, footer y scripts.
- En CSS se comentan los bloques principales: variables, estilos generales, navegacion, grid, tarjetas, botones, formulario, carrito, animacion y media queries.

## Como explicarlo en la exposicion

Puedes decir:

"El catalogo no esta escrito manualmente en HTML. Los productos estan en un array de objetos de JavaScript. Luego usamos funciones y metodos como forEach, filter, map y reduce para mostrarlos, filtrarlos y calcular el carrito. Tambien usamos eventos como click, input, change y submit para que la pagina responda al usuario sin recargar."
