//CONTACTO

//ACCEDO AL FORMULATIO Y AL MENSAJE DE ERROR
const formulario = document.getElementById("formulario-contacto");
const errorCompleteFormulario = document.getElementById(
  "error-complete-formulario"
);

//DESESTRUCTURACIÓN INPUTS, ICONO VALIDACION Y ERRORES FORMULARIO

//INPUTS
const [formNombre, formApellido, formEmail, formTelefono, formConsulta] = [
  document.getElementById("nombre"),
  document.getElementById("apellido"),
  document.getElementById("email"),
  document.getElementById("telefono"),
  document.getElementById("consulta"),
];

//ERRORES
const [errorNombre, errorApellido, errorEmail, errorTelefono, errorConsulta] = [
  document.getElementById("error-nombre"),
  document.getElementById("error-apellido"),
  document.getElementById("error-email"),
  document.getElementById("error-telefono"),
  document.getElementById("error-consulta"),
];

//ICONOS
const [iconoNombre, iconoApellido, iconoEmail, iconoTelefono, iconoConsulta] = [
  document.getElementById("validacion-nombre"),
  document.getElementById("validacion-apellido"),
  document.getElementById("validacion-email"),
  document.getElementById("validacion-telefono"),
  document.getElementById("validacion-consulta"),
];

//OBJETO PARAMETROS CARACTERES PERMITIDOS
const parametrosFormulario = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
  telefono: /^\d{7,14}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  consulta: /^[a-zA-ZÀ-ÿ\s0-9_,;:.¿?¡!+()*#$-]{20,200}$/,
};

//OBJETO CONTROL FINAL FORMULARIO, TODOS LOS ELEMENTOS DEBEN SER VERDADEROS (EXCEPTO OPCION LLAMADA QUE PUEDE SER FALSO)
const controlFinalFormulario = {
  nombre: false,
  apellido: false,
  telefono: false,
  email: false,
  consulta: false,
};

//FUNCION PARA VALIDAR INPUTS EN FORMULARIO
const validacionInputForm = (
  varValida,
  varFormAValidar,
  varErrorForm,
  varIcono,
  stringMsg,
  varControlFinalFormulario
) => {
  if (!varValida.test(varFormAValidar.value) || !varFormAValidar.value.trim()) {
    varFormAValidar.classList.add("error-contacto-input");
    varErrorForm.classList.add("error-contacto-input");
    varErrorForm.classList.remove("ok-contacto");
    varIcono.classList.add("fa-times");
    varIcono.classList.remove("fa-check");
    varIcono.classList.add("validacion-contacto-activa");
    varControlFinalFormulario[stringMsg] = false;
    mensajeErrorInput(stringMsg, varErrorForm);
  } else {
    varFormAValidar.classList.remove("error-contacto-input");
    varErrorForm.classList.remove("error-contacto-input");
    varIcono.classList.remove("fa-times");
    varIcono.classList.add("fa-check");
    inputOK(varErrorForm, varIcono);
    varControlFinalFormulario[stringMsg] = true;
  }
};

const validacionInputNombre = () => {
  validacionInputForm(
    parametrosFormulario.nombre,
    formNombre,
    errorNombre,
    iconoNombre,
    "nombre",
    controlFinalFormulario
  );
};
const validacionInputApellido = () => {
  validacionInputForm(
    parametrosFormulario.apellido,
    formApellido,
    errorApellido,
    iconoApellido,
    "apellido",
    controlFinalFormulario
  );
};
const validacionInputEmail = () => {
  validacionInputForm(
    parametrosFormulario.email,
    formEmail,
    errorEmail,
    iconoEmail,
    "email",
    controlFinalFormulario
  );
};
const validacionInputTelefono = () => {
  validacionInputForm(
    parametrosFormulario.telefono,
    formTelefono,
    errorTelefono,
    iconoTelefono,
    "telefono",
    controlFinalFormulario
  );
};

const validacionInputConsulta = () => {
  validacionInputForm(
    parametrosFormulario.consulta,
    formConsulta,
    errorConsulta,
    iconoConsulta,
    "consulta",
    controlFinalFormulario
  );
};

//MENSAJE DE ERROR POR CADA ELEMENTO DEL FORMULARIO
const mensajeErrorInput = (stringMsg, varErrorForm) => {
  switch (stringMsg) {
    case "nombre":
      varErrorForm.textContent = `Ingrese un ${stringMsg} válido. Debe contener sólo letras y + de 3 caracteres`;
      break;
    case "apellido":
      varErrorForm.textContent = `Ingrese un ${stringMsg} válido. Debe contener sólo letras y + de 3 caracteres`;
      break;
    case "email":
      varErrorForm.textContent = `Ingrese un ${stringMsg} válido. Debe contener nombre + @ y su extensión en minúsculas`;
      break;
    case "telefono":
      varErrorForm.textContent = `Ingrese sólo datos numéricos: código de área y número telefónico`;
      break;
    case "consulta":
      varErrorForm.textContent = `Por favor, ingrese su consulta. El mensaje debe contener al menos 20 caracteres.`;
      break;
  }
};

//FUNCION PARA BORRAR EL MENSAJE DE ERROR EN FORMULARIO SI SE POSICIONA EN UN INPUT
const removerPropiedadesErrorFormulario = () => {
  errorCompleteFormulario.classList.remove("error-contacto-input");
  errorCompleteFormulario.innerHTML = ``;
};

//FUNCION SI PASA LA VALIDACION EL MENSAJE DE ERROR DESAPARECE
const inputOK = (varErrorForm, varIconoForm) => {
  varErrorForm.textContent = ``;
  varIconoForm.classList.add("validacion-contacto-activa");
};

//MODAL SWEET ALERT SUCCESS FORMULARIO ENVIADO CON EXITO
const mostrarMensajeExito = (errorCompleteFormulario) => {
  Swal.fire({
    width: "50rem",
    height: "50rem",
    icon: "success",
    iconColor: "#e068a0",
    text: `TU CONSULTA FUE ENVIADA CON ÉXITO. NOS COMUNICAREMOS A LA BREVEDAD`,
    showConfirmButton: false,
    timer: 2000,
  });
  removerPropiedadesErrorFormulario();
};

//FUNCION MENSAJE ERROR DEL FORMULARIO SI HAY CAMPOS SIN COMPLETAR
const mostrarMensajeError = () => {
  errorCompleteFormulario.classList.add("error-contacto-input");
  errorCompleteFormulario.innerHTML = `POR FAVOR COMPLETE LOS CAMPOS DEL FORMULARIO ANTES DE ENVIAR  <i class="fas fa-exclamation-circle"></i>`;
};

//EVENTO INPUT Y BLUR PARA INPUT NOMBRE, APELLIDO, TEL, EMAIL Y CONSULTA
//PARA QUE SE COMPORTEN EN FORMA INDIVIDUAL Y NO MUESTRE TODOS LOS ERRORES JUNTOS

//NOMBRE

formNombre.addEventListener("input", () => {
  removerPropiedadesErrorFormulario();
  validacionInputNombre();
});
formNombre.addEventListener("blur", () => {
  validacionInputNombre();
});

//APELLIDO

formApellido.addEventListener("input", () => {
  removerPropiedadesErrorFormulario();
  validacionInputApellido();
});
formApellido.addEventListener("blur", () => {
  validacionInputApellido();
});

//EMAIL

formEmail.addEventListener("input", () => {
  removerPropiedadesErrorFormulario();
  validacionInputEmail();
});
formEmail.addEventListener("blur", () => {
  validacionInputEmail();
});

//TELEFONO

formTelefono.addEventListener("input", () => {
  removerPropiedadesErrorFormulario();
  validacionInputTelefono();
});

formTelefono.addEventListener("blur", () => {
  validacionInputTelefono();
});

//CONSULTA

formConsulta.addEventListener("input", () => {
  removerPropiedadesErrorFormulario();
  validacionInputConsulta();
});

formConsulta.addEventListener("blur", () => {
  validacionInputConsulta();
});

//SUBMIT FORMULARIO
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    controlFinalFormulario.nombre &&
    controlFinalFormulario.apellido &&
    controlFinalFormulario.telefono &&
    controlFinalFormulario.email &&
    controlFinalFormulario.consulta
  ) {

    //SACO EL ICONO DE VALIDACION DE TODOS LOS ELEMENTOS
    [
      iconoNombre,
      iconoApellido,
      iconoApellido,
      iconoConsulta,
      iconoEmail,
      iconoTelefono,
    ].forEach((icono) => {
      icono.classList.remove("validacion-contacto-activa");
    });

    formulario.reset();

    //ALERTA MENSAJE ENVIADO!
    mostrarMensajeExito(errorCompleteFormulario);

    //ITERACION PARA QUE EL OBJETO CONTROL VUELVA A VALORES FALSOS
    for (let reseteo in controlFinalFormulario) {
      controlFinalFormulario[reseteo] = false;
    }
  } else {
    mostrarMensajeError();
    //MUESTRA ERRORES EN LOS QUE NO ESTEN INGRESADOS
    validacionInputNombre();
    validacionInputApellido();
    validacionInputEmail();
    validacionInputTelefono();
    validacionInputConsulta();
  }
});

//RESET FORMULARIO
formulario.addEventListener("reset", (e) => {
  e.preventDefault();
  //SACO EL ICONO DE VALIDACION DE TODOS LOS ELEMENTOS
  [
    iconoNombre,
    iconoApellido,
    iconoConsulta,
    iconoEmail,
    iconoTelefono,
  ].forEach((icono) => {
    icono.classList.remove("validacion-contacto-activa");
  });

  [
    errorNombre,
    errorApellido,
    errorEmail,
    errorTelefono,
    errorConsulta,
  ].forEach((error) => {
    error.classList.remove("error-contacto-input");
    error.textContent = ``;
  });

  [formNombre, formApellido, formEmail, formTelefono, formConsulta].forEach(
    (form) => {
      form.value = "";
      form.classList.remove("error-contacto-input");
    }
  );

  removerPropiedadesErrorFormulario();

  //ITERACION PARA QUE EL OBJETO CONTROL VUELVA A VALORES FALSOS
  for (let reseteo in controlFinalFormulario) {
    controlFinalFormulario[reseteo] = false;
  }

  formulario.reset();
});
