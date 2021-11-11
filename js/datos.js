// VARIABLES 
/***********************************************************************************/

//eleccion tipo de piel
let tipoDePielElegido;
let tienePielSensible = false;
let tienePielRosacea = false;

//indice para mostrar pack
let indiceArray;

//Tratamientos incluidos dentro de array en Objeto Packs
let contenidoTratamientosPorPack;

//Modo Oscuro
let modoOscuroActivado;

// ARRAYS
/***********************************************************************************/
let carrito =[];
const descuentos = [];

// OBJETOS
/***********************************************************************************/

//OBJETO TRATAMIENTO CON MÉTODO APLICAR PROMO
class Tratamiento {
  constructor(pId, pTratamiento, pTipo, pSesiones, pImg, pDescripcion, pPrecio) {
    this.id = pId;
    this.tratamiento = pTratamiento;
    this.tipo = pTipo;
    this.sesiones = pSesiones;
    this.img = pImg;
    this.descripcion = pDescripcion;
    this.precio = pPrecio;
  }
  aplicaPromo(pDescuento) {
    this.precioPromo = this.precio - (this.precio * pDescuento) / 100;
    return this.precioPromo;
  }
}

//OBJETO PACKS CON MÉTODO APLICAR PROMO
class PackTratamiento {
  constructor(id, pNombrePack, pTratamientosPack, pImg, pPrecioPack) {
    this.id = id;
    this.nombrePack = pNombrePack;
    this.tratamientosPack = pTratamientosPack;
    this.img = pImg;
    this.precioPack = pPrecioPack;
  }
  aplicaPromoPack(pDescuento) {
    this.precioPromoPack = this.precioPack - (this.precioPack * pDescuento) / 100;
    return this.precioPromoPack;
  }
}

// ARRAY DE % DE DESCUENTOS
descuentos.push(5, 10, 15, 20, 25);

/************************************************************************************************/
/***********************************************************************************************/

//AJAX CON JQUERY
/***********************************************************************************/
const urlDatosTratamientos = "./json/datos.json";
const urlDatosPacks = "./json/packs.json";

let tratamientosJSONaObjeto;
let packsJSONaObjeto;
let packsConDescuento10;
let tratamientosPacksdesdeJSON;

//FUNCION PARA INSTANCIAR OBJETO TRATAMIENTO Y PODER APLICAR SUS METODOS
/***********************************************************************************/
const instancioDataTratamiento = (arrayResponse) =>{
  tratamientosJSONaObjeto = arrayResponse.map(
    (item) => new Tratamiento(item.id, item.tratamiento, item.tipo, item.sesiones, item.img, item.descripcion, item.precio)
  );
}

//FUNCION PARA INSTANCIAR OBJETO PACK TRATAMIENTO Y PODER APLICAR SUS METODOS
/***********************************************************************************/
const instancioDataPacks = (arrayPackResponse) => {
  packsJSONaObjeto = arrayPackResponse.map((item) => 
      new PackTratamiento(
        item.id,
        item.nombrePack,
        item.tratamientosPack,
        item.img,
        item.precioPack
      ));
}

//FUNCION PARA APLICAR METODO "APLICAPROMO" A OBJETO PACK TRATAMIENT0
/***********************************************************************************/
const aplicaPrecioPromoaPack = (packsJSONaObjeto) => {
packsConDescuento10 = packsJSONaObjeto.map((promo10) => {
    return {
      id: promo10.id,
      nombrePack: promo10.nombrePack,
      tratamientosPack: promo10.tratamientosPack,
      precioPack: promo10.precioPack,
      precioPromoPack: promo10.aplicaPromoPack(descuentos[1]),
    };
  });
}

//LLAMADA CON METODO GETJSON A DATOS.JSON-------------------------------------------//
$.getJSON(urlDatosTratamientos, (response, success) => {
  if (success === "success") {
    instancioDataTratamiento(response);
  }
});

//LLAMADA CON METODO GETJSON A PACKS.JSON------------------------------------------//
$.getJSON(urlDatosPacks, (response, success) => {
  if (success === "success") {
    instancioDataPacks(response);
    aplicaPrecioPromoaPack(packsJSONaObjeto);
  }
});

//API MERCADOPAGO
const finalizarCompra = async () => {

    const itemsAMPago = carrito.map( (prod) => {
        return {
            title: prod.nombre,
            description: "",
            picture_url: "",
            category_id: prod.id,
            quantity: prod.cantidad,
            currency_id: "ARS",
            unit_price: prod.precio
        }
    })

    const responseAPIMPago = await fetch('https://api.mercadopago.com/checkout/preferences', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer TEST-1974925028503957-110423-1b4639cbbe186d505ba5f69dc49eae31-67920033"
                },
                body: JSON.stringify({
                    items: itemsAMPago,
                    back_urls: {
                        success: window.location.href,
                        failure: window.location.href
                    }

                })
            })
    const dataMPAgo = await responseAPIMPago.json()

    window.location.replace(dataMPAgo.init_point)
}


//FUNCION PARA GUARDAR LOS DATOS EN LOCAL STORAGE-------------------------------------------//
/*******************************************************************************************/
const guardarLocalStorage = (pVarString, pVarAlLS, pKey, pVarLS) => {
  pVarString = JSON.stringify(pVarAlLS);
  pVarLS = localStorage.setItem(pKey, pVarString);
};

//FUNCION PARA ELIMINAR LOS DATOS DEL LOCAL STORAGE------------------------------------//
/**************************************************************************************/
const eliminarLocalStorage = (pVariable, pKey, pVarParse) => {
  pVariable = localStorage.removeItem(pKey, pVarParse);
};


