/*-- Librerias --*/
import { useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";
import { VentaIndividual } from "../../../venta/ventaIndividual.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js";
import { nombreEstado } from "../../../../../backend/funcioneGenerales.jsx";
import { alertaToast } from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();

/*-- Titulos de la tabla --*/
const titulosTabla = [
  "Pedido numero",
  "Empleado",
  "Contacto",
  "Fecha",
  "Valor",
  "Estado",
  "Cambiar estado",
  "Ver mas",
];

export function ListaComprasAdmin() {
  /*-- Lista de empleados --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Generar lista de ventas --*/
  const generarListaVenta = async () => {
    classAdmin
      .venta()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        const informacionVentaBase = resultado.filter((tupla, index) => {
          return (
            resultado.indexOf(
              resultado.find(
                (valor) =>
                  valor["VENTA_CODIGO_VENTA"] == tupla["VENTA_CODIGO_VENTA"]
              )
            ) === index
          );
        });

        const nuevosDatos = informacionVentaBase.map((valor) => [
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["VENTA_CODIGO_VENTA"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: `${valor["VENTA_CEDULA_USUARIO"]} - ${valor["USUARIO_NOMBRE"]}`,
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["USUARIO_CONCTACTO"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["VENTA_FECHA_VENTA"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "costo",
            valor: valor["VENTA_VALOR_TOTAL"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "estado",
            valor: valor["VENTA_ESTADO_VENTA"],
            img: "",
            subClase: valor["VENTA_ESTADO_VENTA"],
            operacion: "",
            parametro: "",
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "cambiarEstadoCompra",
            valor: "Modificar Estado",
            img: "",
            subClase: "modificar",
            operacion: modificarEstadoVenta,
            parametro: {
              codigo: valor["VENTA_CODIGO_VENTA"],
              cedula: valor["VENTA_CEDULA_USUARIO"],
            },
          },
          {
            key: valor["ITEM_NOMBRE_ITEM"],
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "botonMas",
            valor: "Ver compra",
            img: "",
            subClase: "ojo",
            operacion: datosDestallasdosVenta,
            parametro: {
              lista: resultado.filter(
                (tupla) =>
                  tupla["VENTA_CODIGO_VENTA"] == valor["VENTA_CODIGO_VENTA"]
              ),
              codigo: valor["VENTA_CODIGO_VENTA"],
            },
          },
        ]);

        if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
        if (nuevosDatos.length <= 0) setDatosMain([[]]);
      })
      .catch(function (error) {
        setDatosMain([[]]);
      });
  };

  /*-- Listar datos de una venta --*/
  const datosDestallasdosVenta = (parametros) => {
    const venta = parametros["lista"].filter(
      (tupla) => tupla["VENTA_CODIGO_VENTA"] == parametros["codigo"]
    );
    return <VentaIndividual lista={venta}></VentaIndividual>;
  };

  /*-- Modificar estado de venta --*/
  const modificarEstadoVenta = (nuevosDatos) => {
    classAdmin
      .modificarEstadoVenta(nuevosDatos)
      .then((resultado) => {
        alertaToast(
          "success",
          `Se cambió el estado de la venta N.º${
            resultado[0]["CODIGO_VENTA"]
          } a un estado ${nombreEstado(resultado[0]["ESTADO_VENTA"])}`,
          5000,
          "top-end"
        );
        generarListaVenta();
      })
      .catch((error) => {
        alertaToast(
          "error",
          `No fue posible aplicar los cambios`,
          5000,
          "top-end"
        );
      });
  };

  return (
    <>
      <TablaMain
        buscadorNombre="N° pedido o empleado"
        buscadorTitulo="Lista de pedidos"
        actualizar={generarListaVenta}
        tablaTitulos={titulosTabla}
        tablaContenido={datosMain}
        oculto={true}
      ></TablaMain>
    </>
  );
}
