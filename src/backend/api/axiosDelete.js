import { conex } from "./axios.js";

export class axiosDelete {
	// DELETE empleado
	async eliminarEmpleado(datos){
		let resultado = await conex.delete(`/del/usuario/${datos}`)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn("El usuario no se pudo eliminar");
			return false;
		});
		return resultado;
	}
}