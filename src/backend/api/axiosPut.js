import { conex } from "./axios.js";

export class axiosPut {
	async cambiarEstadoUsuario(nuevoEstado){
		let resultado = await conex.put(`/mod/usuario/estado`, nuevoEstado)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn("El usuario no se pudo modificar");
			return false;
		});
		return resultado;
	}
}