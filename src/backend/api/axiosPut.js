import { conex } from "./axios.js";

export class axiosPut {
	// PUT estado usuario
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

	// PUT activar usuario
	async cambiarEstadoVerificadoUsuario(nuevoEstado){
		let resultado = await conex.put(`/mod/usuario/verificado`, nuevoEstado)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn("El usuario no se pudo modificar");
			return false;
		});
		return resultado;
	}

	// PUT datos usuario 
	async cambiarDatosUsuario(nuevosDatos){
		let resultado = await conex.put(`/mod/usuario/datos`, nuevosDatos)
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