import { conex } from "./axios.js";

export class axiosGet {
	async obtenerUsuario(cedula = 0){
		let resultado = await conex.get(`/getUsuario/${cedula}`)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn(error);
			return false;
		});
		return resultado;
	}

	async obtenerProductoBase(){
		let resultado = await conex.get(`/getProductoBase`)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn(error);
			return false;
		});
		return resultado;
	}
}