import { conex } from "./axios.js";

export class axiosPost {
  //POST registar usuario
  async registarse(nuevoUsuario) {
    let resultado = await conex
      .post(`/pos/usuario/registro`, nuevoUsuario)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  //POST registar categoria
  async nuevaCategoria(nuevoUsuario) {
    let resultado = await conex
      .post(`/pos/categoria/nueva`, nuevoUsuario)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  //POST registar venta
  async nuevaVenta(ventaDatos) {
    let resultado = await conex
      .post(`/pos/venta/nueva`, ventaDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  //POST registar venta item
  async nuevaVentaItem(datosItem) {
    let resultado = await conex
      .post(`/pos/item/venta`, datosItem)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  //POST estado catalogo
  async estadoCatalogo(datosItem) {
    let resultado = await conex
      .post(`/pos/aplicacion/alert`, datosItem)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  //POST subir imagen
  async subirImagenApi(datos) {
    let resultado = await conex
      .post("/pos/subirImagen", datos)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return false;
      });
    return resultado;
  }

  //POST registar producto
  async nuevoProducto(datos) {
    let resultado = await conex
      .post(`/pos/producto/nuevo`, datos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  //POST registar producto info
  async nuevoProductoInfo(datos) {
    let resultado = await conex
      .post(`/pos/productoInfo/nuevo`, datos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }
}
