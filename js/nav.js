//MENU DE NAVEGACIÓN Y BOTON WHATSAPP

//JQUERY:

//FUNCION ACTIVAR MODO OSCURO --(MENÚ DE NAVEGACIÓN)
/************************************************************************************************/
const activaModoDark = () => {
  $(".switch-modo-nocturno").html('MODO LIGHT <i class="far fa-heart"></i>');
  $("#dark").attr("href", "./styles/dark-theme.css");
  $(".switch-modo-nocturno").addClass("dark");
  $(".switch-modo-nocturno").removeClass("light");
};

//FUNCION ACTIVAR MODO PINK --(MENÚ DE NAVEGACIÓN)
/************************************************************************************************/
const activaModoPink = () => {
  $(".switch-modo-nocturno").html('MODO DARK <i class="far fa-heart"></i>');
  $(".switch-modo-nocturno").addClass("light");
  $(".switch-modo-nocturno").removeClass("dark");
  $("#dark").removeAttr("href", "./styles/dark-theme.css");
};

//PARSEO DATOS DEL LOCAL STORAGE PARA UTILIZAR EN CONDICIONAL
modoOscuroActivado = JSON.parse(localStorage.getItem("MODO-DARK"));

//CONDICIONAL SI EN LOCAL STORAGE ESTA GUARDADO EL MODO DARK, LO APLICA
if (modoOscuroActivado) {
  activaModoDark();
} else {
  activaModoPink();
}

//FUNCION PARA ACTIVAR Y DESACTIVAR MODO OSCURO DESDE EL BOTÓN --(MENÚ DE NAVEGACIÓN)
/************************************************************************************************/
const modoDarkPink = () => {
  $(".switch-modo-nocturno").click(() => {
    if ($(".switch-modo-nocturno").hasClass("light")) {
      activaModoDark();
      JSON.stringify(localStorage.setItem("MODO-DARK", true));
    } else if ($(".switch-modo-nocturno").hasClass("dark")) {
      activaModoPink();
      JSON.stringify(localStorage.setItem("MODO-DARK", false));
    }
  });
};

modoDarkPink();

//FUNCION CAMBIA ICONO Y POSITION CSS EN MENU HAMBURGUESA --(MENÚ DE NAVEGACIÓN)
/************************************************************************************************/
const propiedadesMenuHamburguesa = () => {
  if ($("#icono-menu-hamburguesa").hasClass("fa-times")) {
    $("#icono-menu-hamburguesa").addClass("fa-bars");
    $("#icono-menu-hamburguesa").removeClass("fa-times");
  } else {
    $("#icono-menu-hamburguesa").addClass("fa-times");
    $("#icono-menu-hamburguesa").removeClass("fa-bars");
  }

  $("#icono-menu-hamburguesa").hasClass("fa-times")
    ? $(".nav__contenedor-menu-hamburguesa").css("position", "fixed")
    : $(".nav__contenedor-menu-hamburguesa").css("position", "absolute");
};

// MENU HAMBURGUESA
$(".nav__contenedor-menu-hamburguesa").on("click", () => {
  propiedadesMenuHamburguesa();
  $(
    ".nav__menu-hamburguesa, .nav__contenedor-menu, .nav__contenedor-menu-hamburguesa"
  ).toggleClass("fs");
});

//ACCEDO A LOS ITEMS DEL MENU, MENU HAMBURGUESA Y CONTENEDORES
const itemIndex = document.getElementsByClassName("nav__menu-link")[0];
const itemPacks = document.getElementsByClassName("nav__menu-link")[1];
const itemTratamientos = document.getElementsByClassName("nav__menu-link")[2];
const itemContacto = document.getElementsByClassName("nav__menu-link")[3];

const menuHamburguesa = document.getElementsByClassName(
  "nav__menu-hamburguesa"
)[0];
const menuContenedorHamburguesa = document.getElementsByClassName(
  "nav__contenedor-menu-hamburguesa"
)[0];
const menuNavegacion = document.getElementsByClassName(
  "nav__contenedor-menu"
)[0];

//FUNCION EVENTO CLICK PARA CAMBIAR EL ESTILO FIXED SI ACCEDE A UNA SECCIÓN DESDE EL MENÚ --(MENÚ DE NAVEGACIÓN)
/***************************************************************************************************************/
const modificarStyleMenuHamburguesa = (item) => {
  item.addEventListener("click", () => {
    propiedadesMenuHamburguesa();
    menuHamburguesa.classList.toggle("fs");
    menuNavegacion.classList.toggle("fs");
    menuContenedorHamburguesa.classList.toggle("fs");
  });
};

modificarStyleMenuHamburguesa(itemIndex);
modificarStyleMenuHamburguesa(itemPacks);
modificarStyleMenuHamburguesa(itemTratamientos);
modificarStyleMenuHamburguesa(itemContacto);

// JQUERY:

//ANIMACIONES CONCATENADAS --(BOTÓN WHATSAPP)

$(".boton__whatsapp")
  .fadeIn(800)
  .animate(
    {
      width: 0,
      height: 0,
      right: 0,
      bottom: 0,
    },
    1000
  )
  .animate(
    {
      width: 48,
      height: 48,
      right: 55,
      bottom: 45,
    },
    1200
  )
  .animate(
    {
      width: 48,
      height: 48,
      right: 16,
      bottom: 16,
    },
    1200
  )
  .fadeOut(200)
  .fadeIn(1000);
