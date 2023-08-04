import { conex } from "./axios.js";

export class axiosGet {
  // GET obtener o buscar usuario
  async obtenerUsuario(cedula = 0) {
    let resultado = await conex
      .get(`/getUsuario/${cedula}`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // GET obtener lista de productos
  async obtenerProductoBase() {
    let resultado = await conex
      .get(`/getProductoBase`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // GET obtener lista de categorias
  async obtenerCategorias() {
    let resultado = await conex
      .get(`/getCategoria`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // GET obtener lista de imagenes
  async obtenerImagenes() {
    let resultado = await conex
      .get(`/getImagenes`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // GET obtener o buscar lista de ventas
  async obtenerVenta(venta = 0) {
    let resultado = await conex
      .get(`/getVenta/${venta}`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // GET obtener datos generales de la aplicacion
  async obtenerHome() {
    let resultado = await conex
      .get(`/getHome`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }
}
