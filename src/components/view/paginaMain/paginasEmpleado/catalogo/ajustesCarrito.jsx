//importacion de librerias
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDataContex } from "../../../contex.jsx";
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";

import { emple } from "../../../../../backend/class/empleado.js";
import { CarritoTotalEmpleado } from "../../../badge/totalEmpleado.jsx";
import { cerrarAlertaAction as action } from "../../../../../backend/funcioneGenerales.jsx";
const classEmple = new emple();

export function AjustesCarrito() {
  /*-- Estado de datos de la tabla --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Estado global carrito  --*/
  const { carrito, setCarrito } = useDataContex();

  /*-- Borrar Item --*/
  const { enqueueSnackbar } = useSnackbar();

  /*-- Titulos tabla --*/
  const titulosTabla = [
    "Codigo",
    "Imagen",
    "Nombre",
    "Cantidad",
    "Valor unitario",
    "Valor total",
    "Borrar",
  ];

  /*-- Generar lista de los items --*/
  const generarLista = async () => {
    try {
      const nuevosDatos = carrito.map((valor) => [
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "normal",
          valor: valor[0]["id"],
          img: "",
          subClase: "",
          operacion: "",
          parametro: "",
        },
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "imag",
          valor: valor[0]["nombreItem"],
          img: valor[0]["imgItem"],
          subClase: "",
          operacion: "",
          parametro: "",
        },
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "normal",
          valor: valor[0]["nombreItem"],
          img: "",
          subClase: "",
          operacion: "",
          parametro: "",
        },
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "botonCantidad",
          valor: valor[0]["cantidad"],
          img: "",
          subClase: "",
          operacion: validarItemCarrito,
          parametro: valor,
        },
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "costo",
          valor: valor[0]["valor"],
          img: "",
          subClase: "",
          operacion: "",
          parametro: "",
        },
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "costo",
          valor: valor[0]["valor"] * valor[0]["cantidad"],
          img: "",
          subClase: "",
          operacion: "",
          parametro: "",
        },
        {
          key: valor[0]["id"],
          id: valor[0]["id"],
          tipo: "boton",
          valor: "Eliminar item",
          img: "",
          subClase: "basurero",
          operacion: eliminarProductoCarrito,
          parametro: valor,
        },
      ]);
      if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
      if (nuevosDatos.length <= 0) setDatosMain([[]]);
    } catch (error) {
      console.error(error);
    }
  };

  /*-- Validar producto existente en el carrito --*/
  const validarItemCarrito = (productoSelect, operacion) => {
    if (productoSelect != 0 && productoSelect[0] != undefined) {
      if (carrito.length <= 0) {
        setCarrito([productoSelect]);
        classEmple.actualizarCarrito([productoSelect]);
      } else {
        let buscarProducto = carrito.some(
          (value) => value[0]["nombreItem"] == productoSelect[0]["nombreItem"]
        );
        if (buscarProducto) {
          modificarProductoCarrito(productoSelect, operacion);
          generarLista();
        }
      }
    }
  };

  /*-- Modificar la cantidad de un item --*/
  const modificarProductoCarrito = (producto, operacion) => {
    let nuevoCarrito = carrito.map((item) => {
      if (item[0]["nombreItem"] == producto[0]["nombreItem"]) {
        let cantidad = item[0]["cantidad"];
        if (operacion == "+") {
          item[0]["cantidad"]++;
          return item;
        } else if (cantidad - 1 > 0 && operacion == "-") {
          item[0]["cantidad"]--;
          return item;
        }
        return item;
      } else {
        return item;
      }
    });
    if (carrito != nuevoCarrito) {
      const mensaje = operacion == "+" ? "aumento" : "disminuyo";
      const icono = operacion == "+" ? "success" : "warning";
      enqueueSnackbar(`Se ${mensaje} la cantidad de un producto`, {
        variant: icono,
        autoHideDuration: 1500,
        action,
      });
    }
    setCarrito(nuevoCarrito);
    classEmple.actualizarCarrito(nuevoCarrito);
  };

  /*-- Borrar Item --*/
  const eliminarProductoCarrito = (id, producto) => {
    let nuevoCarrito = carrito.filter(
      (item) => item[0]["nombreItem"] !== producto[0]["nombreItem"]
    );
    setCarrito(nuevoCarrito);
    setDatosMain();
    enqueueSnackbar(`Se elimino un producto del carrito`, {
      variant: "info",
      autoHideDuration: 1500,
      action,
    });
    classEmple.actualizarCarrito(nuevoCarrito);
  };

  return (
    <>
      <TablaMain
        buscadorNombre="Codigo o nombre"
        buscadorTitulo="Mi carrito"
        actualizar={generarLista}
        tablaTitulos={titulosTabla}
        tablaContenido={datosMain}
        oculto={true}
      ></TablaMain>
      <CarritoTotalEmpleado manejarClick={setDatosMain}></CarritoTotalEmpleado>
    </>
  );
}
