/*-- Librerias --*/
import { nuevoHash, compararHash } from "./bcrypt.js";

/*-- Clases y controladores --*/
import { axiosGet } from "../api/axiosGet.js";
import { axiosPost } from "../api/axiosPost.js";
import { axiosPut } from "../api/axiosPut.js";
import { axiosDelete } from "../api/axiosDelete.js";
import { usuario } from "./usuario.js"
const classAxiosGet = new axiosGet();
const classAxiosPost = new axiosPost();
const classAxiosPut = new axiosPut();
const classAxiosDelete = new axiosDelete();
export class emple extends usuario  {
  constructor() {
    super();
    this.sesion = "admin";
  }

  // GET
  async productoBase() {
    return await classAxiosGet.obtenerProductoBase();
  }

  // PUT
  async modificarDatosUsuario(nuevoDatos = {}) {
    return await classAxiosPut.cambiarDatosUsuario(nuevoDatos);
  }
}
