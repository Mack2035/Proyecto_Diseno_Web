/*
  Tema usado: Semana 9 - validacion de formularios con JavaScript.
  Este archivo controla contacto.html. La validacion se hace con JS para
  mostrar mensajes personalizados y no depender solo de atributos HTML.
*/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const successMessage = document.querySelector("#form-success");

  /*
    Tema usado: Semana 10 - funciones con parametros.
    Esta funcion recibe el nombre del campo y el mensaje de error.
    Si hay mensaje, marca el campo como error. Si no hay mensaje, lo marca como correcto.
  */
  function setFieldState(fieldName, message) {
    const field = form.elements[fieldName];
    const error = document.querySelector(`[data-error-for="${fieldName}"]`);

    if (!field || !error) return;

    error.textContent = message;
    field.classList.toggle("field-error", Boolean(message));
    field.classList.toggle("field-ok", !message && field.type !== "checkbox");
  }

  /*
    Tema usado: Semana 9 - condicionales, operadores y valores booleanos.
    Tema usado: Semana 10 - funcion reutilizable.
    validateForm revisa cada campo y guarda los errores en el objeto errors.
    Si errors queda vacio, significa que el formulario esta correcto.
  */
  function validateForm() {
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const goal = String(data.get("goal") || "");
    const message = String(data.get("message") || "").trim();
    const acceptsTerms = form.elements.terms.checked;
    const errors = {};

    if (name.length < 3) {
      errors.name = "Ingresa al menos 3 caracteres.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Ingresa un correo valido.";
    }

    if (!/^[0-9]{9}$/.test(phone)) {
      errors.phone = "Ingresa un celular de 9 digitos.";
    }

    if (!goal) {
      errors.goal = "Selecciona un objetivo.";
    }

    if (message.length < 15) {
      errors.message = "Describe tu necesidad en 15 caracteres o mas.";
    }

    if (!acceptsTerms) {
      errors.terms = "Debes aceptar el contacto.";
    }

    ["name", "email", "phone", "goal", "message", "terms"].forEach((fieldName) => {
      setFieldState(fieldName, errors[fieldName] || "");
    });

    return Object.keys(errors).length === 0;
  }

  /*
    Tema usado: Semana 9 - evento input.
    Cada vez que el usuario escribe o cambia un campo, se vuelve a validar
    para dar retroalimentacion visual inmediata.
  */
  form.addEventListener("input", () => {
    successMessage.textContent = "";
    validateForm();
  });

  /*
    Tema usado: Semana 9 - evento submit.
    preventDefault evita que el formulario recargue la pagina.
    Si la validacion es correcta, se muestra un mensaje de exito y se limpia el formulario.
  */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      successMessage.textContent = "";
      return;
    }

    successMessage.textContent = "Solicitud enviada correctamente. Te contactaremos pronto.";
    showToast("Formulario enviado");
    form.reset();
    form.querySelectorAll(".field-ok").forEach((field) => field.classList.remove("field-ok"));
  });
});
