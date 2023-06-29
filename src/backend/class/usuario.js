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

  async ingresar(usuario, clave) {
    return classAxiosGet.obtenerUsuario(usuario)
    .then(async resultado =>{
      if(resultado === false || resultado.length <= 0){
        throw new Error("Usuario No encontrado");
      }

      const validarClave = await compararHash(clave, resultado[0]['CLAVE']);
      if(clave != resultado[0]['CLAVE']){
        if(!validarClave){
          throw new Error("La contraseña no es valida");
        }
      }

      if(resultado[0]['USUARIO_ACTIVADO'] == 0 || resultado[0]['USUARIO_VERIFICADO'] == 0 ){
        throw new Error("El usuario ingresado no cuenta con una cuenta activa en el sistema");
      }

      return resultado;
    }).catch(function (error) {
      console.error(error);
      return error;
    });
  }
}
