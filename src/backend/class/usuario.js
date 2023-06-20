import { conex } from "../api/axios";

export class usuario {
  constructor (){
		this.cedula = "";
		this.nombre = "";
		this.rol = "";
		this.clave = "";
		this.pregunta = "";
		this.respuesta = "";
		this.usuarioActivado = "";
		this.usuarioVerificado = "";
		this.fechaRegistro = "";
		this.ultimoIngreso = "";
		this.contacto = "";
	}

	// await conex.get(`/getUsuario/0`)
	// 	.then(resultado => {
	// 		return resultado.data;
	// 	}).catch();
	// metodos
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