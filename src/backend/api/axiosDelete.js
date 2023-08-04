import { conex } from "./axios.js";

export class axiosDelete {
  // DELETE empleado
  async eliminarEmpleado(datos) {
    let resultado = await conex
      .delete(`/del/usuario/${datos}`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // DELETE producto
  async eliminarProducto(datos) {
    let resultado = await conex
      .delete(`/del/producto/${datos}`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // DELETE producto
  async eliminarCategoria(datos) {
    let resultado = await conex
      .delete(`/del/categoria/${datos}`)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }
}
