//CARRITO DE COMPRAS

//MODAL CARRITO:

//ACCEDO AL CONTENEDOR, AL MODAL Y A LOS BOTONES ABRIR Y CERRAR:
const contenedorModalCarrito = document.getElementsByClassName(
  "contenedor__modal-carrito"
)[0];
const modalCarrito = document.getElementsByClassName("modal__carrito")[0];
const btnAbrirCarrito = document.getElementById("btn-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");

//EVENTO CLICK MUESTRA O CIERRA EL MODAL
btnAbrirCarrito.addEventListener("click", () => {
  contenedorModalCarrito.classList.toggle("modal-active");
});

btnCerrarCarrito.addEventListener("click", () => {
  contenedorModalCarrito.classList.toggle("modal-active");
});

contenedorModalCarrito.addEventListener("click", () => {
  btnCerrarCarrito.click();
});

modalCarrito.addEventListener("click", (e) => {
  e.stopPropagation();
});

//ALERT

//MODAL SWEET ALERT SUCCESS -- AGREGADO CORRECTAMENTE CON NOMBRE DE TRATAMIENTO/PACK
const agregadoCorrectamente = (nombreProducto) => {
  Swal.fire({
    width: "30rem",
    icon: "success",
    iconColor: "#e068a0",
    text: `Agregaste: ${nombreProducto} al carrito`,
    showConfirmButton: false,
    timer: 2000,
  });
};

//MODAL SWEET ALERT SUCCESS -- GRACIAS POR TU COMPRA
const graciasPorTuCompra = () => {
  Swal.fire({
    width: "30rem",
    icon: "success",
    iconColor: "#e068a0",
    text: `¡Muchas gracias por tu compra!`,
    showConfirmButton: false,
    timer: 2000,
  });
};

//MODAL SWEET ALERT -- OOPS! CARRITO VACÍO
const oppsCarritoVacio = () => {
  Swal.fire({
    width: "30rem",
    icon: "error",
    iconColor: "#e068a0",
    title: "Oops...",
    text: "No hay tratamientos seleccionados, el carrito se encuentra vacío",
    showConfirmButton: false,
    timer: 2500,
  });
};

//CONTENIDO CARRITO

//ACCEDO AL CONTENEDOR DEL CARRITO, AL CONTADOR Y AL PRECIO TOTAL:
const contenedorCompraTratamientos = document.getElementById(
  "contenedor__carrito"
);
const contadorCarrito = document.getElementById("cantidad-carrito");
const precioTotal = document.getElementById("precio-total");

//FUNCION PARA AGREGAR AL CARRITO TRATAMIENTOS FACIALES, CORPORALES O MAKEUP --(CARRITO)
/************************************************************************************************/
const agregarAlCarrito = (idTratamiento) => {
  const productoEnCarrito = carrito.find(
    (tratamientoEnCarrito) => tratamientoEnCarrito.id === idTratamiento
  );

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    agregadoCorrectamente(productoEnCarrito.tratamiento);
  } else {
    const tratamiento = tratamientosJSONaObjeto.find(
      (tratamientoAlCarrito) => tratamientoAlCarrito.id === idTratamiento
    );

    carrito.push({
      id: tratamiento.id,
      tratamiento: tratamiento.tratamiento,
      precio: tratamiento.precio,
      cantidad: 1,
    });

    agregadoCorrectamente(tratamiento.tratamiento);
  }
  localStorage.setItem("Carrito", JSON.stringify(carrito));
  actualizarCarrito();
};

//FUNCION PARA AGREGAR AL CARRITO PACKS DE TRATAMIENTOS SUGERIDOS --(CARRITO)
/************************************************************************************************/
const agregarAlCarritoPack = (idTratamiento) => {
  const productoPackEnCarrito = carrito.find(
    (tratamientoEnCarrito) => tratamientoEnCarrito.id === idTratamiento
  );

  if (productoPackEnCarrito) {
    productoPackEnCarrito.cantidad++;
    agregadoCorrectamente(productoPackEnCarrito.tratamiento);
  } else {
    const productoPack = packsJSONaObjeto.find(
      (tratamientoAlCarrito) => tratamientoAlCarrito.id === idTratamiento
    );

    carrito.push({
      id: productoPack.id,
      tratamiento: productoPack.nombrePack,
      precio: productoPack.precioPack,
      cantidad: 1,
    });

    agregadoCorrectamente(productoPack.nombrePack);
  }

  localStorage.setItem("Carrito", JSON.stringify(carrito));

  actualizarCarrito();
};

//FUNCION PARA ACTUALIZAR CARRITO --(CARRITO)
/************************************************************************************************/
const actualizarCarrito = () => {
  contenedorCompraTratamientos.innerHTML = ``;

  //info del local storage
  carrito = JSON.parse(localStorage.getItem("Carrito"));

  carrito.forEach((tratamientoAlCarrito) => {
    const divTratamientosEnCarrito = document.createElement("div");
    divTratamientosEnCarrito.classList.add("tratamiento-en-carrito");

    divTratamientosEnCarrito.innerHTML = `
                  <p>${tratamientoAlCarrito.tratamiento}</p>
                  <p>Precio: $ ${tratamientoAlCarrito.precio}</p>
                  <button onclick="agregarAlCarrito(${tratamientoAlCarrito.id})" class="btn-sumar-carrito"><i class="fas fa-plus"></i></button>
                  <p>${tratamientoAlCarrito.cantidad}</p>
                  <button onclick="eliminarTratamiento(${tratamientoAlCarrito.id})" class="btn-restar-carrito"><i class="fas fa-minus"></i></button>
                  <button onclick="eliminarTratamientoTotal(${tratamientoAlCarrito.id})" id="${tratamientoAlCarrito.id}"class="btn-eliminar"><i class="fas fa-trash-alt"></i></button>
             `;

    contenedorCompraTratamientos.appendChild(divTratamientosEnCarrito);
  });

  contadorCarrito.textContent = carrito.reduce(
    (acumulador, tratamiento) => (acumulador += tratamiento.cantidad),
    0
  );

  precioTotal.textContent = carrito.reduce(
    (acumulador, tratamiento) =>
      (acumulador += tratamiento.precio * tratamiento.cantidad),
    0
  );
};

//FUNCION PARA ELIMINAR DEL CARRITO DE A 1 UNIDAD DE PRODUCTO --(CARRITO)
/************************************************************************************************/
const eliminarTratamiento = (idTratamientoEnCarrito) => {
  let tratamientoAEliminar = carrito.find(
    (tratamientoEnCarrito) => tratamientoEnCarrito.id === idTratamientoEnCarrito
  );

  tratamientoAEliminar.cantidad--;

  if (tratamientoAEliminar.cantidad === 0) {
    let indice = carrito.indexOf(tratamientoAEliminar);
    carrito.splice(indice, 1);

    localStorage.setItem("Carrito", JSON.stringify(carrito));
    precioTotal.textContent = "";

    actualizarCarrito();
  }

  localStorage.setItem("Carrito", JSON.stringify(carrito));
  actualizarCarrito();
};

//FUNCION PARA ELIMINAR DEL CARRITO EL PRODUCTO COMPLETO (ELIMINA TODAS LAS UNIDADES) --(CARRITO)
/************************************************************************************************/
const eliminarTratamientoTotal = (idTratamientoEnCarrito) => {
  let tratamientoAEliminar = carrito.find(
    (tratamientoEnCarrito) => tratamientoEnCarrito.id === idTratamientoEnCarrito
  );

  tratamientoAEliminar.cantidad === 0;

  let indice = carrito.indexOf(tratamientoAEliminar);
  carrito.splice(indice, 1);

  localStorage.setItem("Carrito", JSON.stringify(carrito));
  precioTotal.textContent = "";

  actualizarCarrito();
};

if (localStorage.getItem("Carrito")) {
  actualizarCarrito();
}

//BOTON FINALIZAR COMPRA --(CARRITO)
const btnFinalizarCompra = document.getElementById("btn-comprar-carrito");

btnFinalizarCompra.addEventListener("click", () => {
  if (contadorCarrito.textContent === "0") {
    oppsCarritoVacio();
    contenedorModalCarrito.classList.toggle("modal-active");
  } else {
    graciasPorTuCompra();
    localStorage.removeItem("Carrito");
    let vaciarDivCarrito = document.getElementById("contenedor__carrito");
    vaciarDivCarrito.innerHTML = "";
    contadorCarrito.textContent = "0";
    precioTotal.textContent = "";
    contenedorModalCarrito.classList.toggle("modal-active");
    finalizarCompra();
  }
});