/*-- Estilos --*/
import "../../../../style/inputs/inputBase.css";
import "../../../../style/inputs/selectBase.css";

import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { admin } from "../../../../../backend/class/admin.js";

import Tooltip from "@mui/material/Tooltip";
import { FaEye } from "react-icons/fa";
import { AgregarCategoria } from "./paneles/addCategoria";
import { AgregarImagen } from "./paneles/addImgen";
import { ListaItemProducto } from "./paneles/newItem";
import { CardProductoDetalles } from "../../../cards/cardProductoDetalles/cardProductoDetalles";
import { BotonSencillo } from "../../../botones/botonSencillo";
import { alertaToast } from "../../../../../backend/swetAlert2";
const classAdmin = new admin();

export function ProductoCRUD() {
  /*-- Vista de detalles activada --*/
  const [detallesActivo, setDetallesActivo] = useState(false);

  /*-- Vista de detalles activada --*/
  const [productoListaCompleta, setProductoListaCompleta] = useState(false);

  /*-- Continene lista de datos --*/
  const [datosMain, setDatosMain] = useState(false);

  /*-- Continene lista de categorias --*/
  const [datosCategoria, setDatosCategoria] = useState(false);

  /*-- Continene lista de imagenes --*/
  const [datosImagenes, setDatosImagenes] = useState(false);

  /*-- Continene la informacion del producto base --*/
  const [datosProductoBase, setDatosProductoBase] = useState({ nombre: "" });

  /*-- Continene la informacion del producto general --*/

  const abrirDestalles = () => {
    setDetallesActivo(true);
  };

  const generarLista = async () => {
    /*-- Producto base --*/
    classAdmin
      .productoBase()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        if (resultado.length > 0) setDatosMain(resultado);
        if (resultado.length <= 0) setDatosMain([[]]);
        alertaToast(
          "success",
          "Los datos fueron cargados correctamente",
          5000,
          "top-end"
        );
      })
      .catch(function (error) {
        setDatosMain([[]]);
        alertaToast("warning", "Error al obtener los datos", 5000, "top-end");
      });
    /*-- Categorias --*/
    classAdmin
      .categorias()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        if (resultado.length > 0) setDatosCategoria(resultado);
        if (resultado.length <= 0) setDatosCategoria([[]]);
      })
      .catch(function (error) {
        setDatosCategoria([[]]);
      });
    /*-- Imagenes --*/
    classAdmin
      .imagenes()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        setDatosImagenes(resultado);
      })
      .catch(function (error) {
        setDatosImagenes({ 1: "No hay datos" });
      });
  };

  const generarDatalist = (productos) => {
    let resultado = productos;
    if (productos == false) {
      generarLista();
      return <></>;
    }
    const productosFiltrados = resultado.filter((tupla, index) => {
      return (
        resultado.indexOf(
          resultado.find(
            (valor) => valor["CODIGO_PRODUCTO"] == tupla["CODIGO_PRODUCTO"]
          )
        ) === index
      );
    });

    return (
      <>
        <datalist id="lista__productos">
          {productosFiltrados.map((value, index) => {
            return (
              <option key={index} value={value["CODIGO_PRODUCTO"]}>
                {value["NOMBRE_PRODUCTO"]}
              </option>
            );
          })}
        </datalist>
      </>
    );
  };

  const listaImagenes = (json) => {
    const listaToSting = JSON.stringify(json);
    const lista = Object.values(JSON.parse(listaToSting));
    if (lista != false) {
      return (
        <>
          {lista.map((value, index) => {
            return <option key={index} value={value}>{value}</option>;
          })}
        </>
      );
    }
    return (
      <option key="1232" defaultValue="no hay datos">
        no hay datos
      </option>
    );
  };

  const listaCategorias = (lista) => {
    if (lista.length > 0 && lista != false) {
      return (
        <>
          {lista.map((value, index) => {
            return (
              <option key={index} value={value["CODIGO_CATEGORIA"]}>
                {value["NOMBRE_CATEGORIA"]}
              </option>
            );
          })}
        </>
      );
    }
    return (
      <option key="1232" defaultValue="no hay datos">
        no hay datos
      </option>
    );
  };

  const buscarProducto = (e) => {
    const value = e.target.value.trim();
    const productosFiltrados = datosMain.filter((tupla) => {
      return tupla["CODIGO_PRODUCTO"] == value;
    });

    let nuevosDatos = {
      CODIGO_PRODUCTO: value,
      NOMBRE_PRODUCTO: "",
      IVA: "",
      DESCUENTO: "",
      PRECIO_BASE: "",
      PRODUCTO_DISPONIBLE: "1",
      IMAGEN_PRINCIPAL: "",
      ID_CATEGORIA: "",
      DETALLES: "",
    };

    let nuevosProductoCompleto = false;

    if (productosFiltrados.length > 0) {
      nuevosDatos = {
        CODIGO_PRODUCTO: value,
        NOMBRE_PRODUCTO: productosFiltrados[0]["NOMBRE_PRODUCTO"],
        IVA: productosFiltrados[0]["IVA"],
        DESCUENTO: productosFiltrados[0]["DESCUENTO"],
        PRECIO_BASE: productosFiltrados[0]["PRECIO_BASE"],
        PRODUCTO_DISPONIBLE: productosFiltrados[0]["PRODUCTO_DISPONIBLE"],
        IMAGEN_PRINCIPAL: productosFiltrados[0]["IMAGEN_PRINCIPAL"],
        ID_CATEGORIA: productosFiltrados[0]["ID_CATEGORIA"],
        DETALLES: productosFiltrados[0]["DETALLES"],
      };

      nuevosProductoCompleto = productosFiltrados.map((valor) => [
        {
          key: valor["CODIGO_PRODUCTO"],
          id: valor["CODIGO_PRODUCTO"],
          nombre: valor["NOMBRE_PRODUCTO"],
          productoDisponible: nuevosDatos["PRODUCTO_DISPONIBLE"],
          categoriaId: nuevosDatos["ID_CATEGORIA"],
          iva: valor["IVA"],
          descuento: valor["DESCUENTO"],
          img: valor["IMAGEN_PRINCIPAL"],
          valor: precioVenta(
            valor["PRECIO_BASE"],
            valor["IVA"],
            valor["DESCUENTO"]
          ),
          valorBase: precioBase(valor["PRECIO_BASE"], valor["IVA"]),
          valorSinIva: valor["PRECIO_BASE"],
          detalles: valor["DETALLES"],
          nombreItem: `${valor["NOMBRE_PRODUCTO"]} - ${valor["NOMBRE_ESTILO"]}`,
          cantidad: 1,
          estilo: valor["NOMBRE_ESTILO"],
          imgItem: imagenItem(valor["IMAGEN_PRINCIPAL"], valor["IMAGEN_EXTRA"]),
          imgExtra: valor["IMAGEN_EXTRA"],
          disponible: valor["DISPONIBLE"],
          stock: valor["STOCK"],
          tipoContenido: valor["TIPO_CONTENIDO"],
          contenido: valor["CONTENIDO"],
          informacionAdicional: valor["INFORMACION_ADICIONAL"],
          estadoDetalles: detallesActivo,
        },
      ]);
      alertaToast(
        "success",
        "Datos almacenados cargados en pantalla",
        5000,
        "top-end"
      );
    } else {
      alertaToast(
        "warning",
        "Error no se encontraron datos relacionados",
        5000,
        "top-end"
      );
    }
    setProductoListaCompleta(nuevosProductoCompleto);
    /*-- Asignar valor inputs --*/
    document.getElementById("productoNombreBase").value =
      nuevosDatos["NOMBRE_PRODUCTO"];
    document.getElementById("productoIvaBase").value = nuevosDatos["IVA"];
    document.getElementById("productoDescuentoBase").value =
      nuevosDatos["DESCUENTO"];
    document.getElementById("productoValorBase").value =
      nuevosDatos["PRECIO_BASE"];
    document.getElementById("productoEstadoBase").value =
      nuevosDatos["PRODUCTO_DISPONIBLE"];
    document.getElementById("productoImagenBase").value =
      nuevosDatos["IMAGEN_PRINCIPAL"];
    document.getElementById("productoCategoriaBase").value =
      nuevosDatos["ID_CATEGORIA"];
    document.getElementById("productoDetallesBase").value =
      nuevosDatos["DETALLES"];

    setDatosProductoBase(nuevosDatos);
  };

  const value = (e, id) => {
    let nuevosDatos = datosProductoBase;
    nuevosDatos[id] = e.target.value.trim();
    if (
      (id == "IVA" || id == "PRECIO_BASE" || id == "DESCUENTO") &&
      e.target.value.trim() == ""
    ) {
      nuevosDatos[id] = 0;
    }
    setDatosProductoBase(nuevosDatos);
    datosItemCambioBase(nuevosDatos);
  };

  const datosItemCambioBase = (nuevaBase) => {
    if (productoListaCompleta != false) {
      const nuevosProductoCompleto = productoListaCompleta.map((valor) => {
        let datosActualizados = valor;
        datosActualizados[0]["productoDisponible"] =
          nuevaBase["PRODUCTO_DISPONIBLE"];
        datosActualizados[0]["categoriaId"] = nuevaBase["ID_CATEGORIA"];
        datosActualizados[0]["descuento"] = nuevaBase["DESCUENTO"];
        datosActualizados[0]["detalles"] = nuevaBase["DETALLES"];
        datosActualizados[0]["imgItem"] = imagenItem(
          nuevaBase["IMAGEN_PRINCIPAL"],
          valor[0]["imgExtra"]
        );
        datosActualizados[0]["img"] = nuevaBase["IMAGEN_PRINCIPAL"];
        datosActualizados[0]["iva"] = nuevaBase["IVA"];
        datosActualizados[0]["nombre"] = nuevaBase["NOMBRE_PRODUCTO"];
        datosActualizados[0][
          "nombreItem"
        ] = `${nuevaBase["NOMBRE_PRODUCTO"]} - ${valor[0]["estilo"]}`;
        datosActualizados[0]["valor"] = precioVenta(
          nuevaBase["PRECIO_BASE"],
          nuevaBase["IVA"],
          nuevaBase["DESCUENTO"]
        );
        datosActualizados[0]["valorBase"] = precioBase(
          nuevaBase["PRECIO_BASE"],
          nuevaBase["IVA"]
        );
        datosActualizados[0]["valorSinIva"] = nuevaBase["PRECIO_BASE"];
        return datosActualizados;
      });
      setProductoListaCompleta(nuevosProductoCompleto);
    }
  };

  const datosDetallados = () => {
    try {
      if (productoListaCompleta.length >= 1) {
        return (
          <>
            <CardProductoDetalles
              key={productoListaCompleta[0][0]["key"]}
              nombre={productoListaCompleta[0][0]["nombre"]}
              detalles={productoListaCompleta[0][0]["detalles"]}
              imagen={productoListaCompleta[0][0]["img"]}
              valor={productoListaCompleta[0][0]["valor"]}
              valorBase={productoListaCompleta[0][0]["valorBase"]}
              lista={productoListaCompleta}
              id={productoListaCompleta[0][0]["id"]}
              estadoDetalle={detallesActivo}
              setEstadoDetalle={setDetallesActivo}
            ></CardProductoDetalles>
          </>
        );
      } else if (productoListaCompleta != false) {
        alertaToast(
          "warning",
          "No hay información adicional del ítem",
          5000,
          "top-end"
        );
      }
    } catch (error) {
      alertaToast("warning", "Error al obtener los datos", 5000, "top-end");
    }
  };

  const cambiarEstadoItem = (id, parametro) => {
    const nuevosDatos = productoListaCompleta.map((tupla) => {
      let tuplaModificada = tupla;
      if (tupla[0]["nombreItem"].toUpperCase() == id.toUpperCase()) {
        tuplaModificada[0]["disponible"] = parametro;
      }
      return tuplaModificada;
    });
    setProductoListaCompleta(nuevosDatos);
  };

  const eliminarItem = (id, parametro) => {
    const nuevosDatos = productoListaCompleta.filter((tupla) => {
      return tupla[0]["nombreItem"].toUpperCase() != id.toUpperCase();
    });
    alertaToast(
      "warning",
      `${id.toUpperCase()} fue eliminado`,
      5000,
      "top-end"
    );
    if (nuevosDatos.length > 0) {
      setProductoListaCompleta(nuevosDatos);
    } else {
      setProductoListaCompleta(false);
    }
  };

  const guardarProducto = () => {
    if (productoListaCompleta != false) {
      classAdmin
        .finalizarActualizacionProducto(productoListaCompleta)
        .then((resultado) => {
          if (resultado) {
            alertaToast("success", "Datos almacenados", 5000, "top-end");
          } else {
            alertaToast(
              "error",
              "Error al guardar la información",
              5000,
              "top-end"
            );
          }
        })
        .catch((error) => {
          alertaToast(
            "error",
            "Error al guardar la información",
            5000,
            "top-end"
          );
        });
    } else {
      alertaToast("error", "Aún falta información", 5000, "top-end");
    }
  };

  const agregarProductoEstilo = (estilo) => {
    const nuevaTupla = {
      key: datosProductoBase["CODIGO_PRODUCTO"],
      id: datosProductoBase["CODIGO_PRODUCTO"],
      nombre: datosProductoBase["NOMBRE_PRODUCTO"],
      iva: datosProductoBase["IVA"],
      descuento: datosProductoBase["DESCUENTO"],
      img: datosProductoBase["IMAGEN_PRINCIPAL"],
      productoDisponible: datosProductoBase["PRODUCTO_DISPONIBLE"],
      categoriaId: datosProductoBase["ID_CATEGORIA"],
      valor: precioVenta(
        datosProductoBase["PRECIO_BASE"],
        datosProductoBase["IVA"],
        datosProductoBase["DESCUENTO"]
      ),
      valorBase: precioBase(
        datosProductoBase["PRECIO_BASE"],
        datosProductoBase["IVA"]
      ),
      valorSinIva: datosProductoBase["PRECIO_BASE"],
      detalles: datosProductoBase["DETALLES"],
      nombreItem: `${datosProductoBase["NOMBRE_PRODUCTO"]} - ${estilo["estiloInfo"]}`,
      cantidad: 1,
      estilo: estilo["estiloInfo"],
      imgItem: imagenItem(
        datosProductoBase["IMAGEN_PRINCIPAL"],
        estilo["imagenExtraInfo"]
      ),
      imgExtra: estilo["imagenExtraInfo"],
      disponible: estilo["estadoInfo"],
      stock: "0",
      tipoContenido: estilo["tipoContenidoInfo"],
      contenido:
        estilo["tipoContenidoInfo"] == 0
          ? estilo["contenidoHexaInfo"]
          : estilo["contenidoImgInfo"],
      informacionAdicional: "",
      estadoDetalles: detallesActivo,
    };
    if (productoListaCompleta != false) {
      const verificarEstilo = productoListaCompleta.filter((tupla) => {
        return (
          tupla[0]["estilo"].toUpperCase() == estilo["estiloInfo"].toUpperCase()
        );
      });
      if (verificarEstilo.length > 0) {
        alertaToast(
          "error",
          "Ya hay un producto vinculado con ese nombre",
          5000,
          "top-end"
        );
      } else {
        let nuevosDatos = [...productoListaCompleta, [nuevaTupla]];
        setProductoListaCompleta(nuevosDatos);
        alertaToast("success", "Producto vinculado", 5000, "top-end");
      }
    } else {
      setProductoListaCompleta([[nuevaTupla]]);
    }
  };

  useEffect(() => {
    generarDatalist(datosMain)
  }, [])

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      {/*-- Codigo --*/}
      <div
        style={{
          width: "92%",
          display: "grid",
          gridTemplateColumns: "1fr 50px",
        }}
      >
        <div className="campoVerificado">
          <input
            style={{ width: "96%" }}
            list="lista__productos"
            className="campoVerificado__campo"
            onChange={buscarProducto}
            type="number"
            required=""
            autoComplete="off"
          />
          <label className={"campoVerificado__texto"}>Codigo producto</label>
        </div>
        <Tooltip title="Previsualizar">
          <div
            style={{
              width: "30px",
              height: "30px",
            }}
          >
            <FaEye
              onClick={abrirDestalles}
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            ></FaEye>
          </div>
        </Tooltip>
      </div>
      {/*-- Nombre --*/}
      <div className="campoVerificado">
        <input
          id="productoNombreBase"
          className="campoVerificado__campo"
          onChange={(e) => value(e, "NOMBRE_PRODUCTO")}
          type="text"
          required=""
          autoComplete="off"
        />
        <label className={"campoVerificado__texto"}>Nombre producto</label>
      </div>
      {/*-- Estado --*/}
      <div className="selectBase" style={{ width: "92%" }}>
        <select
          id="productoEstadoBase"
          className="selectBase__select"
          onChange={(e) => value(e, "PRODUCTO_DISPONIBLE")}
          required=""
          autoComplete="off"
        >
          <option selected={true} defaultValue="NAN" disabled="disabled">
            seleccione una opcion
          </option>
          <option value="1">Activo</option>
          <option value="0">Bloqueado</option>
        </select>
        <i className="selectBase__flecha"></i>
        <label className={"selectBase__texto  "}>Estado</label>
      </div>
      {/*-- Imagen --*/}
      <div
        style={{
          width: "92%",
          display: "grid",
          gridTemplateColumns: "1fr 50px",
        }}
      >
        <div className="selectBase" style={{ width: "98%" }}>
          <select
            id="productoImagenBase"
            className="selectBase__select"
            onChange={(e) => value(e, "IMAGEN_PRINCIPAL")}
            required=""
            autoComplete="off"
          >
            <option selected={true} defaultValue="NAN" disabled="disabled">
              seleccione una opcion
            </option>
            {listaImagenes(datosImagenes)}
          </select>
          <i className="selectBase__flecha"></i>
          <label className={"selectBase__texto  "}>Imagen principal</label>
        </div>
        <AgregarImagen manejarCambio={generarLista}></AgregarImagen>
      </div>
      {/*-- Categoria --*/}
      <div
        style={{
          width: "92%",
          display: "grid",
          gridTemplateColumns: "1fr 50px",
        }}
      >
        <div className="selectBase" style={{ width: "98%" }}>
          <select
            id="productoCategoriaBase"
            className="selectBase__select"
            onChange={(e) => value(e, "ID_CATEGORIA")}
            required=""
            autoComplete="off"
          >
            <option selected={true} defaultValue="NAN" disabled="disabled">
              seleccione una opcion
            </option>
            {listaCategorias(datosCategoria)}
          </select>
          <i className="selectBase__flecha"></i>
          <label className={"selectBase__texto  "}>Categoria</label>
        </div>
        <AgregarCategoria manejarCambio={generarLista}></AgregarCategoria>
      </div>
      {/*-- Iva --*/}
      <div className="campoVerificado">
        <input
          id="productoIvaBase"
          className="campoVerificado__campo"
          onChange={(e) => value(e, "IVA")}
          type="number"
          min="0"
          step="any"
          required=""
          autoComplete="off"
        />
        <label className={"campoVerificado__texto"}>Iva del producto</label>
      </div>
      {/*-- Descuento --*/}
      <div className="campoVerificado">
        <input
          id="productoDescuentoBase"
          className="campoVerificado__campo"
          onChange={(e) => value(e, "DESCUENTO")}
          type="number"
          min="0"
          step="any"
          required=""
          autoComplete="off"
        />
        <label className={"campoVerificado__texto"}>
          Descuento del producto
        </label>
      </div>
      {/*-- Precio --*/}
      <div className="campoVerificado">
        <input
          id="productoValorBase"
          className="campoVerificado__campo"
          onChange={(e) => value(e, "PRECIO_BASE")}
          type="number"
          min="0"
          step="any"
          required=""
          autoComplete="off"
        />
        <label className={"campoVerificado__texto"}>Valor del producto</label>
      </div>
      {/*-- Destalles --*/}
      <div className="campoVerificado">
        <input
          id="productoDetallesBase"
          className="campoVerificado__campo"
          onChange={(e) => value(e, "DETALLES")}
          type="text"
          required=""
          autoComplete="off"
        />
        <label className={"campoVerificado__texto"}>Detalles producto</label>
      </div>
      <h1>lista de estilos</h1>
      <ListaItemProducto
        datosTabla={productoListaCompleta}
        cambiarEstado={cambiarEstadoItem}
        eliminarItem={eliminarItem}
        imagenes={datosImagenes}
        agregar={agregarProductoEstilo}
      ></ListaItemProducto>
      <div
        className={`contenedor__detallesProducto  ${detallesActivo && productoListaCompleta != false
            ? ""
            : "contenedor__detallesProducto--desactiva"
          }`}
      >
        {datosDetallados()}
      </div>
      {/*-- BotonSencillo --*/}
      <div style={{ width: "92%" }}>
        <BotonSencillo
          texto="Guardar"
          manejarClik={guardarProducto}
        ></BotonSencillo>
      </div>
    </div>
  );
}

/*-- Asignar la imagen --*/
const imagenItem = (imagenBase, imagenItem) => {
  return imagenItem.length >= 6 ? imagenItem : imagenBase;
};

/*-- Formatear a precio de venta --*/
const precioVenta = (precio, iva, descuento) => {
  return Math.ceil(
    evaluate(`(${precio}*1.${iva})-((${precio}*1.${iva})*${descuento}%)`)
  );
};

/*-- Formatear a precio de Base --*/
const precioBase = (precio, iva) => {
  return Math.ceil(evaluate(`(${precio}*1.${iva})`));
};
