import swal from "sweetalert2";

/*-- alerta claseca --*/
export const alertaClasica = (
  icono = "success",
  mensaje = "",
  tiempo = 3000
) => {
  return swal.fire({
    icon: icono,
    title: mensaje,
    timer: tiempo,
    timerProgressBar: true,
  });
};

/*-- alerta pequeña --*/
export const alertaToast = (
  icono = "success",
  mensaje = "",
  tiempo = 3000,
  posicion = "top-end"
) => {
  const Toast = swal.mixin({
    toast: true,
    position: posicion,
    showConfirmButton: false,
    timer: tiempo,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icono,
    title: mensaje,
  });
};

/*-- alerta confirmar --*/
export const alertaConfirmar = async (
  titulo = "",
  texto = "",
  icono = "warning"
) => {
  return swal
    .fire({
      title: titulo,
      text: texto,
      icon: icono,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false;
    });
};

/*-- alerta campo de texto --*/
export const alertaInput = async (titulo = "Ingrese el nuevo valor") => {
  const { value: text } = await swal.fire({
    title: titulo,
    input: "text",
    inputLabel: "",
    inputPlaceholder: "Escribe aqui",
  });
  if (text) {
    return text;
  }
};

/*-- Mostrar Imagen en gran escala --*/
export const maximixarImagen = (url, nombre) => {
  swal.fire({
    title: `${nombre}`,
    imageUrl: `${url}`,
    imageWidth: 400,
    imageHeight: 200,
  });
};
