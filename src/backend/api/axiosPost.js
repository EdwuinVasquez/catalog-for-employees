import { conex } from "./axios.js";

export class axiosPost {
	//POST registar usuario
	async registarse(nuevoUsuario){
		let resultado = await conex.post(`/pos/usuario/registro`, nuevoUsuario)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn("El usuario ya esta registrado");
			return false;
		});
		return resultado;
	}

	//POST registar venta
	async nuevaVenta(ventaDatos){
		let resultado = await conex.post(`/pos/venta/nueva`, ventaDatos)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.clear();
			console.warn("Error al almacenar los datos");
			return false;
		});
		return resultado;
	}

	//POST registar venta item
	async nuevaVentaItem(datosItem){
		let resultado = await conex.post(`/pos/item/venta`, datosItem)
		.then(resultado => {
			return resultado.data;
		}).catch(function (error) {
			console.warn("Error al almacenar los datos");
			return false;
		});
		return resultado;
	}
}