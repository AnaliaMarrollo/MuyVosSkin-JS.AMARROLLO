//SECCION PACKS

//CONTENEDOR PACKS

//ACCEDO AL CONTENEDOR Y AL BOTON CERRAR
const contenedorMuestraPacks = document.getElementsByClassName(
  "contenedor__muestra-packs"
)[0];

const btnCerrarPacks = document.getElementById("btn-cerrar-pack");

//EVENTO CLICK CIERRA EL CONTENEDOR
btnCerrarPacks.addEventListener("click", () => {
  contenedorMuestraPacks.classList.add("contenedor-oculto");
});

contenedorMuestraPacks.addEventListener("click", () => {
  btnCerrarPacks.click();
});

contenedorMuestraPacks.addEventListener("click", (e) => {
  e.stopPropagation();
});

//FUNCION DIV CONTENEDOR PARA CONTENIDO DE PACKS SEGUN TIPO DE PIEL --(SECCIÓN PACKS)
/***************************************************************************************************/
const contenidoDivPackTratamientoSugerido = (
  varDivPackSugerido,
  arraypacksJSONaObjeto,
  index,
  arraytratamientosPacksdesdeJSON,
  vardivTratamientosEnPack,
  varModal
) => {
  if (index != undefined) {
    varDivPackSugerido.innerHTML = `<h3 class="titulo-posisiona-mouse">Posicioná el mouse sobre la imágen para ver los tratamientos incluye el pack sugerido
    </h3>
            <div class="contenedor-tratamiento-sugerido-resultados">
            <div id="card-tratamientos" class="card-tratamientos-packs">
            <div class="detalle-tratamientos">
                <h1>${arraypacksJSONaObjeto[index].nombrePack}</h1>
                <p class="info-tratamiento"></p>
                <div class="control">
                    <button onclick= "agregarAlCarritoPack(${arraypacksJSONaObjeto[index].id})"class="boton-card">
                        <span class="price">${arraypacksJSONaObjeto[index].precioPack}</span>
                        <span class="shopping-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                        <span class="buy">Comprar Pack</span>
                    </button>
                </div>
            </div>
            <div class="product-image">
                <img src="${arraypacksJSONaObjeto[index].img}">
                <div class="info">
                <h2>TRATAMIENTOS INCLUIDOS:</h2>
                </div>
            </div>
        </div> `;

    arraytratamientosPacksdesdeJSON =
      arraypacksJSONaObjeto[index].tratamientosPack;

    arraytratamientosPacksdesdeJSON.forEach((pTratamientos) => {
      contenidoDivPacksTratamientos(
        contenidoTratamientosPorPack,
        pTratamientos,
        vardivTratamientosEnPack
      );
    });

    varDivPackSugerido.appendChild(vardivTratamientosEnPack);
    varModal.appendChild(varDivPackSugerido);
  } else {
    varDivPackSugerido.innerHTML = ` <div class="contenedor-tratamiento-sugerido-error"><h3 class= "titulo-pack titulo-pack-datos-usuario">Por favor no te olvides de seleccionar al menos un "tipo de piel" para ver el pack sugerido.</h3></div>`;
    varDivPackSugerido.appendChild(vardivTratamientosEnPack);
  }
};

//FUNCION DIV PARA CONTENIDO DE TRATAMIENTOS INCLUIDOS EN EL PACK --(SECCIÓN PACKS)
//(OBJETO PACKS CONTIENE UN ARRAY DE TRATAMIENTOS)
/***************************************************************************************************/
const contenidoDivPacksTratamientos = (varh4, pdelForEach, varDivInfo) => {
  varDivInfo = document.getElementsByClassName("info")[0];
  varh4 = document.createElement("h4");
  varh4.textContent = pdelForEach.toUpperCase();
  varDivInfo.appendChild(varh4);
};

// FUNCION ASIGNA NRO DE INDICE SEGUN TIPO DE PIEL ELEGIDO --(SECCIÓN PACKS)
/***************************************************************************************************/
const indiceArrayCondicional = () => {
  if (
    tipoDePielElegido === "piel-normal" &&
    tienePielSensible === true &&
    tienePielRosacea === false
  ) {
    indiceArray = 0;
  } else if (
    tipoDePielElegido === "piel-normal" &&
    tienePielSensible === true &&
    tienePielRosacea === true
  ) {
    indiceArray = 1;
  } else if (
    tipoDePielElegido === "piel-normal" &&
    tienePielSensible === false &&
    tienePielRosacea === false
  ) {
    indiceArray = 2;
  } else if (
    tipoDePielElegido === "piel-seca" &&
    tienePielSensible === true &&
    tienePielRosacea === false
  ) {
    indiceArray = 3;
  } else if (
    tipoDePielElegido === "piel-seca" &&
    tienePielSensible === true &&
    tienePielRosacea === true
  ) {
    indiceArray = 1;
  } else if (
    tipoDePielElegido === "piel-seca" &&
    tienePielSensible === false &&
    tienePielRosacea === false
  ) {
    indiceArray = 4;
  } else if (
    tipoDePielElegido === "piel-grasa" &&
    tienePielSensible === true &&
    tienePielRosacea === false
  ) {
    indiceArray = 5;
  } else if (
    tipoDePielElegido === "piel-grasa" &&
    tienePielSensible === true &&
    tienePielRosacea === true
  ) {
    indiceArray = 1;
  } else if (
    tipoDePielElegido === "piel-grasa" &&
    tienePielSensible === false &&
    tienePielRosacea === false
  ) {
    indiceArray = 6;
  } else if (
    (tipoDePielElegido === "") &&
    ((tienePielSensible === true &&
        tienePielRosacea === true) ||
      (tienePielSensible === false && tienePielRosacea === false) ||
      (tienePielSensible === true && tienePielRosacea === false))
  ) {
    indiceArray = undefined;
  }
  return indiceArray;
};

// FUNCION MUESTRA PACK SEGUN TIPO DE PIEL ELEGIDO --(SECCIÓN PACKS)
/***************************************************************************************************/
const muestraPackPorTipoDePiel = () => {
  const divPackSugerido = document.getElementById("pack");
  const divTratamientosEnPack = document.createElement("div");

  contenedorMuestraPacks.classList.remove("contenedor-oculto");
  divTratamientosEnPack.classList.add("contenido-pack-recomendado");
  divPackSugerido.innerHTML = ``;

  indiceArrayCondicional();

  contenidoDivPackTratamientoSugerido(
    divPackSugerido,
    packsJSONaObjeto,
    indiceArray,
    tratamientosPacksdesdeJSON,
    divTratamientosEnPack,
    contenedorMuestraPacks
  );
};

//ACCEDO A LOS BOTONES DE LAS CARDS

const btnPielNormal = document.getElementsByClassName("btn-normal")[0];
const btnPielGrasa = document.getElementsByClassName("btn-grasa")[0];
const btnPielSeca = document.getElementsByClassName("btn-seca")[0];
const btnPielSensible = document.getElementsByClassName("btn-sensible")[0];
const btnPielRosacea = document.getElementsByClassName("btn-rosacea")[0];

//ACCEDO A LAS CARDS

const cardPielNormal = document.getElementsByClassName(
  "card-lado-piel-normal"
)[0];
const cardPielSeca = document.getElementsByClassName("card-lado-piel-seca")[0];
const cardPielGrasa = document.getElementsByClassName(
  "card-lado-piel-grasa"
)[0];
const cardPielSensible = document.getElementsByClassName(
  "card-lado-piel-sensible"
)[0];
const cardPielRosacea = document.getElementsByClassName(
  "card-lado-piel-rosacea"
)[0];

//FUNCION CAMBIA EL COLOR DE LA CARD A GRIS CUANDO ELIGE EL TIPO DE PIEL --(SECCIÓN PACKS)
/***************************************************************************************************/
const clasesBotonesTipoDePiel = (
  btnClick,
  btn1,
  btn2,
  btn3,
  btn4,
  card1,
  card2,
  card3,
  card4,
  card5
) => {
  card1.classList.add("card-no-elegida");
  card2.classList.add("card-no-elegida");
  card3.classList.remove("card-no-elegida");

  btnClick.classList.add("card-elegida");
  btn1.classList.remove("card-elegida");
  btn2.classList.remove("card-elegida");

  //CONDICIONAL Si Piel Sensible ya está seleccionada, respeta la seleccion y no aplica cambios en esas cards:
  if (btn3.classList.contains("card-elegida")) {
    card4.classList.remove("card-no-elegida");
    btn3.classList.add("card-elegida");
    //CONDICIONAL Si Piel Rosacea ya está seleccionada, respeta la seleccion y no aplica cambios en esas cards:
  } else if (btn4.classList.contains("card-elegida")) {
    card5.classList.remove("card-no-elegida");
    btn4.classList.add("card-elegida");
  } else {
    card4.classList.add("card-no-elegida");
    btn3.classList.remove("card-elegida");
    card5.classList.add("card-no-elegida");
    btn4.classList.remove("card-elegida");
  }
};

//BOTON PIEL NORMAL --(SECCIÓN PACKS)
/***************************************************************************************************/
btnPielNormal.addEventListener("click", () => {
  //CONDICIONAL Si Piel Normal ya está seleccionado, le quita la selección:
  if (btnPielNormal.classList.contains("card-elegida")) {
    btnPielNormal.classList.remove("card-elegida");
    cardPielGrasa.classList.remove("card-no-elegida");
    cardPielSeca.classList.remove("card-no-elegida");
    tipoDePielElegido = "";
  } else {
    clasesBotonesTipoDePiel(
      btnPielNormal,
      btnPielGrasa,
      btnPielSeca,
      btnPielSensible,
      btnPielRosacea,
      cardPielGrasa,
      cardPielSeca,
      cardPielNormal,
      cardPielRosacea,
      cardPielSensible
    );
    tipoDePielElegido = "piel-normal";
    if (btnPielSensible.classList.contains("card-no-elegida")) {
      tienePielSensible = false;
    } else if (btnPielSensible.classList.contains("card-no-elegida")) {
      tienePielRosacea = false;
    }
  }
});

//BOTON PIEL GRASA --(SECCIÓN PACKS)
/***************************************************************************************************/
btnPielGrasa.addEventListener("click", () => {
  //CONDICIONAL Si Piel Grasa ya está seleccionado, le quita la selección:
  if (btnPielGrasa.classList.contains("card-elegida")) {
    btnPielGrasa.classList.remove("card-elegida");
    cardPielNormal.classList.remove("card-no-elegida");
    cardPielSeca.classList.remove("card-no-elegida");
    tipoDePielElegido = "";
  } else {
    clasesBotonesTipoDePiel(
      btnPielGrasa,
      btnPielNormal,
      btnPielSeca,
      btnPielSensible,
      btnPielRosacea,
      cardPielNormal,
      cardPielSeca,
      cardPielGrasa,
      cardPielRosacea,
      cardPielSensible
    );
    tipoDePielElegido = "piel-grasa";
    if (btnPielSensible.classList.contains("card-no-elegida")) {
      tienePielSensible = false;
    } else if (btnPielSensible.classList.contains("card-no-elegida")) {
      tienePielRosacea = false;
    }
  }
});

//BOTON PIEL SECA --(SECCIÓN PACKS)
/***************************************************************************************************/
btnPielSeca.addEventListener("click", () => {
  //CONDICIONAL Si Piel Seca ya está seleccionado, le quita la selección:
  if (btnPielSeca.classList.contains("card-elegida")) {
    btnPielSeca.classList.remove("card-elegida");
    cardPielNormal.classList.remove("card-no-elegida");
    cardPielGrasa.classList.remove("card-no-elegida");
    tipoDePielElegido = "";
  } else {
    clasesBotonesTipoDePiel(
      btnPielSeca,
      btnPielGrasa,
      btnPielNormal,
      btnPielSensible,
      btnPielRosacea,
      cardPielGrasa,
      cardPielNormal,
      cardPielSeca,
      cardPielRosacea,
      cardPielSensible
    );
    tipoDePielElegido = "piel-seca";
    if (btnPielSensible.classList.contains("card-no-elegida")) {
      tienePielSensible = false;
    } else if (btnPielSensible.classList.contains("card-no-elegida")) {
      tienePielRosacea = false;
    }
  }
});

//BOTON PIEL SENSIBLE --(SECCIÓN PACKS)
/***************************************************************************************************/
btnPielSensible.addEventListener("click", () => {
  //CONDICIONAL Si Piel Sensible está seleccionada, le quita la selección SOLO SI Piel Rosacea NO está seleccionada
  if (btnPielSensible.classList.contains("card-elegida")) {
    if (cardPielRosacea.classList.contains("card-no-elegida")) {
      btnPielSensible.classList.remove("card-elegida");
      cardPielSensible.classList.remove("card-no-elegida");
      cardPielRosacea.classList.remove("card-no-elegida");
      tienePielSensible = false;
    }
  } else {
    btnPielSensible.classList.add("card-elegida");
    cardPielSensible.classList.remove("card-no-elegida");
    cardPielRosacea.classList.add("card-no-elegida");
    tienePielSensible = true;
    tienePielRosacea = false;
  }
});

//BOTON PIEL ROSACEA --(SECCIÓN PACKS)
/***************************************************************************************************/
btnPielRosacea.addEventListener("click", () => {
  //CONDICIONAL Si Piel Rosacea está seleccionada, le quita la selección
  if (btnPielRosacea.classList.contains("card-elegida")) {
    cardPielRosacea.classList.add("card-no-elegida");
    btnPielRosacea.classList.remove("card-elegida");
    tienePielRosacea = false;
    if (btnPielSensible.classList.contains("card-no-elegida")) {
      btnPielSensible.classList.remove("card-no-elegida");
      cardPielSensible.classList.remove("card-no-elegida");
      tienePielSensible = true;
    }
  } else {
    cardPielRosacea.classList.remove("card-no-elegida");
    btnPielRosacea.classList.remove("card-no-elegida");
    cardPielSensible.classList.remove("card-no-elegida");
    btnPielSensible.classList.add("card-elegida");
    btnPielRosacea.classList.add("card-elegida");
    tienePielSensible = true;
    tienePielRosacea = true;
  }
});

//ACCEDO AL BOTÓN VER TRATAMIENTOS:
const btnPack = document.getElementById("btn-packs");

//EVENTO CLICK
/*************************************************************************************/
//BOTON PARA VER TRATAMIENTOS MUESTRA EL PACK RECOMENDADO SEGUN EL TIPO DE PIEL ELEGIDO
btnPack.addEventListener("click", muestraPackPorTipoDePiel);