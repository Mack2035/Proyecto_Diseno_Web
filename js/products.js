/*
  Tema usado: Semana 11 - arrays y objetos.
  Este arreglo funciona como una pequeña "base de datos" del catalogo.
  Cada elemento del array es un objeto producto con sus propiedades:
  id, nombre, precio, imagen, categoria y descripcion.
*/
const PRODUCTS = [
  {
    id: "zapatillas-volt",
    name: "Zapatillas Volt Runner",
    price: 189.9,
    image: "img/zapatillas-volt.svg",
    category: "cardio",
    description: "Zapatillas ligeras para caminatas rapidas y rutinas de cardio."
  },
  {
    id: "mochila-core",
    name: "Mochila Core 18L",
    price: 129.9,
    image: "img/mochila-core.svg",
    category: "accesorios",
    description: "Mochila compacta para llevar ropa, botella y accesorios de entrenamiento."
  },
  {
    id: "banda-force",
    name: "Banda Force Set",
    price: 69.9,
    image: "img/banda-force.svg",
    category: "fuerza",
    description: "Set de bandas elasticas para ejercicios de fuerza y movilidad."
  },
  {
    id: "botella-thermo",
    name: "Botella Thermo 700",
    price: 54.9,
    image: "img/botella-thermo.svg",
    category: "hidratacion",
    description: "Botella termica con tapa segura para mantener la bebida fria."
  },
  {
    id: "audifonos-beat",
    name: "Audifonos Beat Clip",
    price: 149.9,
    image: "img/audifonos-beat.svg",
    category: "tecnologia",
    description: "Audifonos deportivos con ajuste firme para entrenar con musica."
  },
  {
    id: "mat-flow",
    name: "Mat Flow Antideslizante",
    price: 99.9,
    image: "img/mat-flow.svg",
    category: "movilidad",
    description: "Mat antideslizante para estiramientos, yoga y ejercicios de core."
  }
];

/*
  Tema usado: Semana 11 - arrays.
  Este arreglo guarda solo las categorias. En catalog.js se recorre con forEach
  para crear automaticamente las opciones del filtro.
*/
const CATEGORIES = ["cardio", "accesorios", "fuerza", "hidratacion", "tecnologia", "movilidad"];
