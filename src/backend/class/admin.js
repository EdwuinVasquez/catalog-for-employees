import { axiosGet } from "../api/axiosGet.js";
import { axiosPost } from "../api/axiosPost.js";
import { axiosPut } from "../api/axiosPut.js";
import { nuevoHash, compararHash } from "./bcrypt.js";
import { usuario } from "./usuario.js"
const classAxiosGet = new axiosGet();
const classAxiosPost = new axiosPost();
const classAxiosPut = new axiosPut();

export class admin extends usuario  {
  constructor() {
    super();
    this.sesion = "admin";
  }

  async usuarios(usuario = 0) {
    return await classAxiosGet.obtenerUsuario(usuario);
  }

  // PUT
  async modificarEstadoUsuario(nuevoEstado = {}) {
    return await classAxiosPut.cambiarEstadoUsuario(nuevoEstado);
  }
}
