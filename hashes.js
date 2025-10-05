// Hash donde se guardarán los registros
let registro = {};

// Referencias al DOM
const formRegistro = document.getElementById("formRegistro");
const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const correoInput = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");
const tablaContenedor = document.getElementById("tabla-contenedor");
const btnEliminar = document.getElementById("eliminarRegistro");

// Función para validar campos
function validarCampos(nombre, edad, correo) {
  if (nombre === "" || edad === "" || correo === "") {
    mensaje.textContent = "Todos los campos son obligatorios.";
    return false;
  }
  mensaje.textContent = "";
  return true;
}

// Función para generar una clave única
function generarClave() {
  return "ID" + Math.floor(Math.random() * 1000000);
}

// Función para mostrar los registros en una tabla
function mostrarTabla() {
  tablaContenedor.innerHTML = "";

  const claves = Object.keys(registro);
  if (claves.length === 0) {
    tablaContenedor.textContent = "No hay registros.";
    return;
  }

  const tabla = document.createElement("table");
  const encabezado = document.createElement("tr");
  encabezado.innerHTML = "<th>Clave</th><th>Nombre</th><th>Edad</th><th>Correo</th>";
  tabla.appendChild(encabezado);

  claves.forEach(clave => {
    const fila = document.createElement("tr");
    const { nombre, edad, correo } = registro[clave];
    fila.innerHTML = `<td>${clave}</td><td>${nombre}</td><td>${edad}</td><td>${correo}</td>`;
    tabla.appendChild(fila);
  });

  tablaContenedor.appendChild(tabla);
}

// Evento para registrar datos en el hash
formRegistro.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const edad = edadInput.value.trim();
  const correo = correoInput.value.trim();

  if (!validarCampos(nombre, edad, correo)) return;

  const clave = generarClave();
  registro[clave] = { nombre, edad, correo };

  // Limpiar formulario
  nombreInput.value = "";
  edadInput.value = "";
  correoInput.value = "";

  mostrarTabla();
});

// Evento para eliminar un registro mediante su clave
btnEliminar.addEventListener("click", () => {
  const clave = prompt("Ingrese la clave del registro a eliminar:");

  if (clave && registro.hasOwnProperty(clave)) {
    delete registro[clave];
    alert(`Registro con clave ${clave} eliminado.`);
    mostrarTabla();
  } else if (clave) {
    alert("Clave no encontrada.");
  }
});

// Mostrar tabla inicial vacía
mostrarTabla();
