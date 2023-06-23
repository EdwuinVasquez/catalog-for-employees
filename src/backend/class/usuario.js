import { axiosGet } from "../api/axiosGet.js";
import { axiosPost } from "../api/axiosPost.js";
import { nuevoHash, compararHash } from "./bcrypt.js";
const classAxiosGet = new axiosGet();
const classAxiosPost = new axiosPost();

export class usuario {
  constructor() {
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

  async registarse(usuario) {
    let nuevoUsuario = usuario;
    nuevoUsuario.clave = await nuevoHash(nuevoUsuario.clave);
    nuevoUsuario.respuesta = await nuevoHash(nuevoUsuario.pregunta);

    return await classAxiosPost.registarse(nuevoUsuario);
  }
}
