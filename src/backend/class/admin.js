/*-- Librerias --*/
import { nuevoHash, compararHash } from "./bcrypt.js";
import { evaluate } from "mathjs";

/*-- Clases y controladores --*/
import { axiosGet } from "../api/axiosGet.js";
import { axiosPost } from "../api/axiosPost.js";
import { axiosPut } from "../api/axiosPut.js";
import { axiosDelete } from "../api/axiosDelete.js";
import { usuario } from "./usuario.js";
const classAxiosGet = new axiosGet();
const classAxiosPost = new axiosPost();
const classAxiosPut = new axiosPut();
const classAxiosDelete = new axiosDelete();
export class admin extends usuario {
  constructor() {
    super();
    this.sesion = "admin";
  }

  // GET
  async usuarios(usuario = 0) {
    return await classAxiosGet.obtenerUsuario(usuario);
  }

  // POST
  async estadoCatalogo(nuevoDatos = {}) {
    return await classAxiosPost.estadoCatalogo(nuevoDatos);
  }

  // POST
  async subirImagen(datos) {
    return await classAxiosPost.subirImagenApi(datos);
  }

  // POST
  async nuevaCategoria(nuevoDatos = {}) {
    return await classAxiosPost.nuevaCategoria(nuevoDatos);
  }

  // PUT
  async modificarEstadoUsuario(nuevoEstado = {}) {
    return await classAxiosPut.cambiarEstadoUsuario(nuevoEstado);
  }

  // PUT
  async modificarEstadoVerificadoUsuario(nuevoEstado = {}) {
    return await classAxiosPut.cambiarEstadoVerificadoUsuario(nuevoEstado);
  }

  // PUT
  async modificarDatosUsuario(nuevoDatos = {}) {
    return await classAxiosPut.cambiarDatosUsuario(nuevoDatos);
  }

  // PUT
  async modificarEstadoVenta(nuevoDatos = {}) {
    return await classAxiosPut.cambiarEstadoVenta(nuevoDatos);
  }

  // PUT
  async modificarDatosVenta(nuevoDatos = {}) {
    return await classAxiosPut.cambiarDatosVenta(nuevoDatos);
  }

  // PUT
  async modificarEstadoCategoria(nuevoDatos = {}) {
    return await classAxiosPut.cambiarEstadoCategoria(nuevoDatos);
  }

  // PUT
  async modificarNombreCategoria(nuevoDatos = {}) {
    return await classAxiosPut.cambiarNombreCategoria(nuevoDatos);
  }

  // PUT
  async modificarIvaCategoria(nuevoDatos = {}) {
    return await classAxiosPut.cambiarIvaCategoria(nuevoDatos);
  }

  // PUT
  async modificarDescuentoCategoria(nuevoDatos = {}) {
    return await classAxiosPut.cambiarDescuentoCategoria(nuevoDatos);
  }

  // PUT
  async modificarValorNumeroCategoria(nuevoDatos = {}) {
    return await classAxiosPut.cambiarValorNumeroCategoria(nuevoDatos);
  }

  // PUT
  async modificarValorPorcentajeCategoria(nuevoDatos = {}) {
    return await classAxiosPut.cambiarValorPorcentajeCategoria(nuevoDatos);
  }

  // DELETE
  async eliminarEmpleado(datos = 0) {
    return await classAxiosDelete.eliminarEmpleado(datos);
  }

  // DELETE
  async eliminarCategoria(datos = 0) {
    return await classAxiosDelete.eliminarCategoria(datos);
  }

  // DELETE
  async eliminarProducto(datos = 0) {
    return await classAxiosDelete.eliminarProducto(datos);
  }
  /*--------- METODOS VENTA  -----------*/
  /*-- Finalizar modificacion Venta --*/
  finalizarActualizacionVenta = async (carrito, cedula, codigo) => {
    try {
      let totalIva = 0;
      let totalDescuento = 0;
      let totalVenta = 0;

      const items = carrito.map((tupla) => {
        totalIva +=
          this.calcularIva(tupla[0]["valor"], tupla[0]["iva"]) *
          tupla[0]["cantidad"];
        totalDescuento += this.calcularDescuento(
          tupla[0]["valorBase"],
          tupla[0]["valor"],
          tupla[0]["cantidad"]
        );
        totalVenta += tupla[0]["valor"] * tupla[0]["cantidad"];
        return {
          nombreItem: tupla[0]["nombreItem"],
          informacionAdicional: tupla[0]["informacionAdicional"],
          descuento: tupla[0]["descuento"],
          iva: tupla[0]["iva"],
          cantidad: tupla[0]["cantidad"],
          valorBase: tupla[0]["valorSinIva"],
          valorIva: tupla[0]["valorBase"],
          valorDescuento: tupla[0]["valor"],
          valorTotal: tupla[0]["valor"] * tupla[0]["cantidad"],
          idProducto: tupla[0]["id"],
          idVenta: codigo,
        };
      });

      const venta = {
        iva: totalIva,
        descuento: totalDescuento,
        total: totalVenta,
        estado: 3,
        codigo: codigo,
        cedula: cedula,
      };

      if (
        items.length >= 1 ||
        (totalIva > 0 && totalDescuento > 0 && totalVenta > 0)
      ) {
        return this.modificarDatosVenta(venta)
          .then((resultado) => {
            if (resultado === false) {
              throw new Error("No hay resultados almacenados");
            }

            /*-- Enviar items -*/
            items.forEach((tupla) => {
              let item = tupla;
              item["idVenta"] = resultado[0]["CODIGO_VENTA"];
              this.insertaVentaItem(item)
                .then((resultado) => {
                  if (resultado === false) {
                    throw new Error("No hay resultados almacenados");
                  }
                })
                .catch(function (error) {
                  return false;
                });
            });

            /*-- Listar datos -*/
            return this.venta(carrito[0][0]["venta"])
              .then((resultado) => {
                if (resultado === false) {
                  throw new Error("No hay resultados almacenados");
                }
                return resultado;
              })
              .catch(function (error) {
                return false;
              });
          })
          .catch(function (error) {
            return false;
          });
      }
    } catch (error) {
      return false;
    }
  };

  /*--------- METODOS Producto  -----------*/
  /*-- Finalizar modificacion producto --*/
  finalizarActualizacionProducto = async (datos) => {
    try {
      classAxiosPost.nuevoProducto(datos[0][0]).then((resultado) => {
        if (resultado != false) {
          datos.forEach((value) => {
            classAxiosPost
              .nuevoProductoInfo(value[0])
              .then((resultado) => {
                if (resultado === false) {
                  throw new Error("No hay resultados almacenados");
                }
              })
              .catch(function (error) {
                throw new Error("No hay resultados almacenados");
              });
          });
        } else {
          throw new Error("No hay resultados almacenados");
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  };
}
