import { conex } from "./axios.js";

export class axiosGet {
	// GET obtener o buscar usuario
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

	// GET obtener lista de productos
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

	// GET obtener o buscar lista de ventas
	async obtenerVenta(venta = 0){
		let resultado = await conex.get(`/getVenta/${venta}`)
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