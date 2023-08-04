import { conex } from "./axios.js";

export class axiosPut {
  // PUT estado usuario
  async cambiarEstadoUsuario(nuevoEstado) {
    let resultado = await conex
      .put(`/mod/usuario/estado`, nuevoEstado)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT activar usuario
  async cambiarEstadoVerificadoUsuario(nuevoEstado) {
    let resultado = await conex
      .put(`/mod/usuario/verificado`, nuevoEstado)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT datos usuario clave
  async cambiarDatosUsuarioClave(nuevosDatos) {
    let resultado = await conex
      .put(`/mod/usuario/clave`, nuevosDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT datos usuario pregunta
  async cambiarDatosUsuarioPregunta(nuevosDatos) {
    let resultado = await conex
      .put(`/mod/usuario/pregunta`, nuevosDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT datos usuario pregunta
  async cambiarDatosUsuarioNombre(nuevosDatos) {
    let resultado = await conex
      .put(`/mod/usuario/nombre`, nuevosDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }
  // PUT datos usuario conctato
  async cambiarDatosUsuarioContacto(nuevosDatos) {
    let resultado = await conex
      .put(`/mod/usuario/contacto`, nuevosDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT datos venta estado
  async cambiarEstadoVenta(nuevosDatos) {
    let resultado = await conex
      .put(`/mod/venta/estado`, nuevosDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT datos venta
  async cambiarDatosVenta(nuevosDatos) {
    let resultado = await conex
      .put(`/mod/venta/modificar`, nuevosDatos)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT estado categoria
  async cambiarEstadoCategoria(nuevoEstado) {
    let resultado = await conex
      .put(`/mod/categoria/estado`, nuevoEstado)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT nombre categoria
  async cambiarNombreCategoria(nuevoNombre) {
    let resultado = await conex
      .put(`/mod/categoria/nombre`, nuevoNombre)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT iva categoria
  async cambiarIvaCategoria(nuevoIva) {
    let resultado = await conex
      .put(`/mod/categoria/iva`, nuevoIva)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT descuento categoria
  async cambiarDescuentoCategoria(nuevoDescuento) {
    let resultado = await conex
      .put(`/mod/categoria/descuento`, nuevoDescuento)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT valor numero categoria
  async cambiarValorNumeroCategoria(nuevoValor) {
    let resultado = await conex
      .put(`/mod/categoria/valor`, nuevoValor)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }

  // PUT valor porcentaje categoria
  async cambiarValorPorcentajeCategoria(nuevoValor) {
    let resultado = await conex
      .put(`/mod/categoria/porcentaje`, nuevoValor)
      .then((resultado) => {
        return resultado.data;
      })
      .catch(function (error) {
        return false;
      });
    return resultado;
  }
}
