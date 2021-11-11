//--SECCION TRATAMIENTOS

//FUNCION CON PARAMETROS PARA CREAR DIVS DE TRATAMIENTOS --(SECCIÓN TRATAMIENTOS)
/*****************************************************************************************/
const creaDivsContenedoresTratamientos = (
  pDiv,
  pTitTratamiento,
  pSesionesTratamiento,
  pPrecioTrat,
  pTratamientoImg,
  pIdTratamiento,
  pDescTratamiento
) => {
  pDiv = document.getElementsByClassName("contenedor-tratamientos")[0];
  const divsFotos = document.createElement("div");
  divsFotos.classList.add("contenedor-tratamientos-resultados");
  divsFotos.innerHTML = `
            <div id="card-tratamientos" class="card-tratamientos-packs">
            <div class="detalle-tratamientos">
                <h1>${pTitTratamiento}</h1>
                <p class="info-tratamiento">${pSesionesTratamiento}</p>
                <div class="control">
                    <button onclick= "agregarAlCarrito(${pIdTratamiento})" class="boton-card">
                        <span class="price">${pPrecioTrat}</span>
                        <span class="shopping-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                        <span class="buy">Comprar</span>
                    </button>
                </div>
            </div>
            <div class="product-image">
                <img src="${pTratamientoImg}">
                <div class="info">
                <h2>DESCRIPCIÓN:</h2>
                <h2>${pDescTratamiento}</h2>
                </div>
            </div>`;

  pDiv.appendChild(divsFotos);
};

//EVENTOS RECORRIENDO ARRAYS

//FUNCION CON PARÁMETRO STRING PARA RECORRER ARRAY Y CREAR DIV DE ACUERDO AL TIPO DE TRATAMIENTO --(SECCIÓN TRATAMIENTOS)
/************************************************************************************************************************/
const recorreArrayCreaDivTratamientos = (
  array,
  vardivContenedor,
  stringTipo
) => {
  array.forEach((pArray) => {
    if (pArray.tipo.toLowerCase() === stringTipo) {
      creaDivsContenedoresTratamientos(
        vardivContenedor,
        pArray.tratamiento,
        pArray.sesiones,
        pArray.precio,
        pArray.img,
        pArray.id,
        pArray.descripcion
      );
    }
  });
};

//ACCEDO A LOS BOTONES CORPORAL, FACIAL Y MAKEUP
const btnCorporal = document.getElementById("btn-corporal");
const btnFacial = document.getElementById("btn-facial");
const btnMakeup = document.getElementById("btn-makeup");

//1) BOTON CORPORALES MUESTRA CARDS DE TRATAMIENTOS CORPORALES --(SECCION TRATAMIENTOS)
/************************************************************************************************/

btnCorporal.addEventListener("click", () => {
  const divContenedorTratamientosCorporales = document.getElementsByClassName(
    "contenedor-tratamientos"
  )[0];
  divContenedorTratamientosCorporales.classList.remove("contenedor-oculto");
  btnMakeup.classList.add("contenedor-oculto");
  btnFacial.classList.add("contenedor-oculto");
  divContenedorTratamientosCorporales.innerHTML = ``;
  divContenedorTratamientosCorporales.innerHTML = `<button id="btn-cerrar-tratamientos"><i class="fas fa-times-circle"></i></button>`;

  recorreArrayCreaDivTratamientos(
    tratamientosJSONaObjeto,
    divContenedorTratamientosCorporales,
    "corporal"
  );
});

//2) BOTON FACIALES MUESTRA CARDS DE TRATAMIENTOS FACIALES --(SECCION TRATAMIENTOS)
/************************************************************************************************/

btnFacial.addEventListener("click", () => {
  const divContenedorTratamientosFaciales = document.getElementsByClassName(
    "contenedor-tratamientos"
  )[0];
  divContenedorTratamientosFaciales.classList.remove("contenedor-oculto");
  btnMakeup.classList.add("contenedor-oculto");
  btnCorporal.classList.add("contenedor-oculto");
  divContenedorTratamientosFaciales.innerHTML = ``;
  divContenedorTratamientosFaciales.innerHTML = `<button id="btn-cerrar-tratamientos"><i class="fas fa-times-circle"></i></button>`;
  recorreArrayCreaDivTratamientos(
    tratamientosJSONaObjeto,
    divContenedorTratamientosFaciales,
    "facial"
  );
});

//3) BOTON MAKEUP MUESTRA CARDS DE MAKEUP --(SECCION TRATAMIENTOS)
/************************************************************************************************/

btnMakeup.addEventListener("click", () => {
  const divContenedorMakeup = document.getElementsByClassName(
    "contenedor-tratamientos"
  )[0];
  divContenedorMakeup.classList.remove("contenedor-oculto");
  btnCorporal.classList.add("contenedor-oculto");
  btnFacial.classList.add("contenedor-oculto");
  divContenedorMakeup.innerHTML = ``;
  divContenedorMakeup.innerHTML = `<button id="btn-cerrar-tratamientos"><i class="fas fa-times-circle"></i></button>`;
  recorreArrayCreaDivTratamientos(
    tratamientosJSONaObjeto,
    divContenedorMakeup,
    "makeup"
  );
});

//CONTENEDOR TRATAMIENTOS

//ACCEDO AL CONTENEDOR, AL MODAL Y AL BOTON CERRAR
const divContenedorTratamientos = document.getElementsByClassName(
  "contenedor-tratamientos"
)[0];

const btnCerrarTratamientos = document.getElementById(
  "btn-cerrar-tratamientos"
);

//EVENTO CLICK CIERRA EL CONTENEDOR
btnCerrarTratamientos.addEventListener("click", () => {
  divContenedorTratamientos.classList.add("contenedor-oculto");
  btnCorporal.classList.remove("contenedor-oculto");
  btnFacial.classList.remove("contenedor-oculto");
  btnMakeup.classList.remove("contenedor-oculto");
});

divContenedorTratamientos.addEventListener("click", () => {
  btnCerrarTratamientos.click();
});

divContenedorTratamientos.addEventListener("click", (e) => {
  e.stopPropagation();
});
