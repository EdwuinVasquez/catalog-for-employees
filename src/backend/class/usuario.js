import { axiosGet } from "../api/axiosGet.js";
import { axiosPost } from "../api/axiosPost.js";
import { axiosPut } from "../api/axiosPut.js";
import { alertaInput } from "../swetAlert2.js";
import { nuevoHash, compararHash } from "./bcrypt.js";
import { evaluate } from "mathjs";
const classAxiosGet = new axiosGet();
const classAxiosPost = new axiosPost();
const classAxiosPut = new axiosPut();
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
  // GET
  async venta(venta) {
    return await classAxiosGet.obtenerVenta(venta);
  }

  // GET
  async productoBase() {
    return await classAxiosGet.obtenerProductoBase();
  }

  // GET
  async categorias() {
    return await classAxiosGet.obtenerCategorias();
  }

  // GET
  async imagenes() {
    return await classAxiosGet.obtenerImagenes();
  }

  // GET
  async home() {
    return await classAxiosGet.obtenerHome();
  }

  // POST
  async registarse(usuario) {
    let nuevoUsuario = usuario;
    nuevoUsuario.clave = await nuevoHash(nuevoUsuario.clave);
    nuevoUsuario.respuesta = await nuevoHash(nuevoUsuario.pregunta);

    return await classAxiosPost.registarse(nuevoUsuario);
  }

  // POST
  async ingresar(usuario, clave) {
    return classAxiosGet
      .obtenerUsuario(usuario)
      .then(async (resultado) => {
        if (resultado === false || resultado.length <= 0) {
          throw new Error("Usuario no encontrado");
        }

        const validarClave = await compararHash(clave, resultado[0]["CLAVE"]);
        if (clave != resultado[0]["CLAVE"]) {
          if (!validarClave) {
            throw new Error("La contraseña no es válida");
          }
        }

        if (
          resultado[0]["USUARIO_ACTIVADO"] == 0 ||
          resultado[0]["USUARIO_VERIFICADO"] == 0
        ) {
          throw new Error(
            "El usuario ingresado no cuenta con una cuenta activa en el sistema"
          );
        }

        return resultado;
      })
      .catch(function (error) {
        return error;
      });
  }

  async ingresarConPregunta(usuario) {
    return classAxiosGet
      .obtenerUsuario(usuario)
      .then(async (resultado) => {
        if (resultado === false || resultado.length <= 0) {
          throw new Error("Usuario no encontrado");
        }

        return alertaInput(`Pregunta: ${resultado[0]["PREGUNTA"]} `)
          .then(async (clave) => {
            if (clave == undefined || clave == "")
              throw new Error("No se ingresó un valor válido");

            const validarClave = await compararHash(
              clave,
              resultado[0]["RESPUESTA"]
            );
            if (clave != resultado[0]["RESPUESTA"]) {
              if (!validarClave) {
                throw new Error("La respuesta no es válida");
              }
            }

            if (
              resultado[0]["USUARIO_ACTIVADO"] == 0 ||
              resultado[0]["USUARIO_VERIFICADO"] == 0
            ) {
              throw new Error(
                "El usuario ingresado no cuenta con una cuenta activa en el sistema"
              );
            }

            return resultado;
          })
          .catch((error) => {
            return error;
          });
      })
      .catch(function (error) {
        return error;
      });
  }

  // POST
  async insertaVenta(nuevoDatos = {}) {
    return await classAxiosPost.nuevaVenta(nuevoDatos);
  }

  // POST
  async insertaVentaItem(nuevoDatos = {}) {
    return await classAxiosPost.nuevaVentaItem(nuevoDatos);
  }

  //PUT
  async cambiarClave(datos = {}) {
    let nuevosDatos = datos;
    nuevosDatos.clave = await nuevoHash(nuevosDatos.clave);
    return await classAxiosPut.cambiarDatosUsuarioClave(nuevosDatos);
  }

  //PUT
  async cambiarPregunta(datos = {}) {
    let nuevosDatos = datos;
    nuevosDatos.respuesta = await nuevoHash(nuevosDatos.respuesta);
    return await classAxiosPut.cambiarDatosUsuarioPregunta(nuevosDatos);
  }

  //PUT
  async cambiarContacto(datos = {}) {
    return await classAxiosPut.cambiarDatosUsuarioClave(datos);
  }

  //PUT
  async cambiarNombre(datos = {}) {
    return await classAxiosPut.cambiarDatosUsuarioNombre(datos);
  }

  /*-- Calcular descuento --*/
  calcularDescuento = (precioIva, precioDescuento, cantidad) => {
    return Math.round(
      evaluate(`(${precioIva}*${cantidad})-(${precioDescuento}*${cantidad})`)
    );
  };

  /*-- Calcular iva --*/
  calcularIva = (precio, iva) => {
    return Math.round(evaluate(`(${precio}*1.${iva})-${precio}`));
  };

  /*--------- METODOS CARRITO  -----------*/
  async actualizarCarrito(nuevoCarrito) {
    localStorage.removeItem("carritoCopia");
    localStorage.setItem("carritoCopia", JSON.stringify(nuevoCarrito));
  }
}
