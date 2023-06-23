import { conex } from "./axios.js";

export class axiosPost {
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
}