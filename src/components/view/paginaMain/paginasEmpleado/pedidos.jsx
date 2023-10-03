/*-- Librerias --*/
import { useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../tablas/tablaMain/tablaMain.jsx";

/*-- Clases y controladores --*/
import { emple } from "../../../../backend/class/empleado.js";
import { useDataContex } from "../../contex.jsx";
import { VentaIndividual } from "../../venta/ventaIndividual.jsx";
const classEmple = new emple();

export function ListaCompras() {
  const { contexUsuarioLogin } = useDataContex();

  /*-- Lista de empleados --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Titulos de la tabla --*/
  const titulosTabla = ["Pedido numero", "Fecha", "Valor", "Estado", "Ver mas"];

  /*-- Generar lista de ventas --*/
  const generarLista = async () => {
    classEmple
      .venta()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        const misVentasLista = resultado.filter(
          (tupla) =>
            tupla["VENTA_CEDULA_USUARIO"] == contexUsuarioLogin["cedula"]
        );

        const misVentasListaFiltradas = misVentasLista.filter(
          (tupla, index) => {
            return (
              misVentasLista.indexOf(
                misVentasLista.find(
                  (valor) =>
                    valor["VENTA_CODIGO_VENTA"] == tupla["VENTA_CODIGO_VENTA"]
                )
              ) === index
            );
          }
        );

        const nuevosDatos = misVentasListaFiltradas.map((valor) => [
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
            tipo: "botonMas",
            valor: "Ver compra",
            img: "",
            subClase: "ojo",
            operacion: datosVenta,
            parametro: {
              lista: misVentasLista,
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

  /*-- Listar datos venta --*/
  const datosVenta = (parametros) => {
    const venta = parametros["lista"].filter(
      (tupla) => tupla["VENTA_CODIGO_VENTA"] == parametros["codigo"]
    );
    return <VentaIndividual lista={venta}></VentaIndividual>;
  };

  return (
    <>
      <TablaMain
        buscadorNombre="Codigo o fecha"
        buscadorTitulo="Mis pedido"
        actualizar={generarLista}
        tablaTitulos={titulosTabla}
        tablaContenido={datosMain}
        oculto={true}
      ></TablaMain>
    </>
  );
}
