import swal from'sweetalert2';

/*-- alerta pequeña --*/
export const alertaToast = (icono = "success", mensaje = "", tiempo = 3000, posicion = "top-end") =>{
  const Toast = swal.mixin({
    toast: true,
    position: posicion,
    showConfirmButton: false,
    timer: tiempo,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: icono,
    title: mensaje
  })
}

/*-- alerta confirmar --*/
export const alertaConfirmar = async (titulo = "", texto = "", icono = "warning") =>{
	return swal.fire({
		title: titulo,
		text: texto,
		icon: icono,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar',
	}).then((result) => {
		if (result.isConfirmed) {
			return true;
		}
		return false;
	})
}