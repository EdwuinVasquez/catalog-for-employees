/*-- Librerias --*/
import { useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";
import { FiltrosDatosTabla } from "./filtros.jsx";

/*-- Clases y controladores --*/
import { emple } from "../../../../../backend/class/empleado.js";
import { evaluate } from "mathjs";
import { alertaToast } from "../../../../../backend/swetAlert2.js";
const classEmple = new emple();

/*-- Titulos de la tabla --*/
const titulosTabla = [
  "Pedido numero",
  "Fecha",
  "Item",
  "Cantidad",
  "Valor unitario",
  "Valor Total",
  "Estado",
  "Empleado",
];
const header = [
  "Pedido numero",
  "Item",
  "Cantidad",
  "IVA",
  "VALOR SIN IVA",
  "TOTAL SIN IVA",
  "VALOR CON IVA",
  "TOTAL CON IVA",
  "Estado",
  "Empleado",
];

function formatoFecha(fecha, formato) {
  return formato
    .replace("mm", fecha.getMonth() + 1)
    .replace("yy", fecha.getFullYear())
    .replace("dd", fecha.getDate());
}

const fecha = Date.now();
const hoy = new Date(fecha);
const fechaActual = formatoFecha(hoy, "yy-mm-dd");

export function ReporteComprasAdmin() {
  /*-- fecha inicial seleccionada --*/
  const [fechaInicial, setFechaInicial] = useState("2000-1-1 00:00:05");

  /*-- fecha final seleccionada --*/
  const [fechaFinal, setFechaFinal] = useState(`${fechaActual} 23:59:05`);

  /*-- Lista de empleados --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Lista de datos Exportar excel --*/
  const [body, setBody] = useState([]);

  /*-- Lista de datos Exportar csv --*/
  const [csvDatos, setCsvDatos] = useState([]);

  /*-- Lista de datos Exportar json --*/
  const [jsonDatos, setJsonDatos] = useState([]);

  /*-- Filtro de estados --*/
  const [estadoFiltro, setEstadoFiltro] = useState(
    "CANCELADO, PENDIENTE, PAGO, ENTREGADO"
  );

  /*-- Validar fecha en rango --*/
  const validarFechaEnRango = (vFechaInicio, vFechaFin, vFechaValidar) => {
    const fechaInicioMs = new Date(vFechaInicio).getTime();
    const fechaFinMs = new Date(vFechaFin).getTime();
    const fechaValidarMs = new Date(vFechaValidar).getTime();

    if (fechaValidarMs >= fechaInicioMs && fechaValidarMs <= fechaFinMs) {
      return true;
    } else {
      return false;
    }
  };

  /*-- tipo de estado --*/
  const asignarEstadoNombre = (estado) => {
    switch (parseInt(estado)) {
      case 2:
        return "CANCELADO";
      case 3:
        return "PENDIENTE";
      case 4:
        return "ENTREGADO";
      case 5:
        return "PAGO";
      default:
        return -1;
    }
  };

  /*-- Filtar tuplas--*/
  const filtarTuplas = (tupla, estado, fechaInicioFiltro, fechaFinalFiltro) => {
    if (
      validarFechaEnRango(
        fechaInicioFiltro,
        fechaFinalFiltro,
        tupla["VENTA_FECHA_VENTA"]
      )
    ) {
      if (
        estado
          .toUpperCase()
          .includes(asignarEstadoNombre(parseInt(tupla["VENTA_ESTADO_VENTA"])))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /*-- Generar lista de ventas --*/
  const generarLista = async () => {
    classEmple
      .venta()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        // Datos en filtrados
        const datosFiltrados = resultado.filter((valor) => {
          return filtarTuplas(valor, estadoFiltro, fechaInicial, fechaFinal);
        });

        // Calcular valor total
        const valorTotal = datosFiltrados.reduce(
          (total, tupla) => evaluate(`${total}+${tupla["ITEM_VALOR_TOTAL"]}`),
          0
        );

        // Calcular porcentaje iva
        const sumaIva = datosFiltrados.reduce(
          (total, tupla) => evaluate(`${total}+${tupla["ITEM_IVA"]}`),
          0
        );
        const porcentajeIva = sumaIva / datosFiltrados.length;

        // Calcular valor iva
        const valorIva = evaluate(`${valorTotal}/1.${porcentajeIva}`);

        // Calcular valor neto
        const valorNeto = evaluate(`${valorTotal}-${valorIva}`);

        // Datos en excel
        const nuevoContenidoTablaExcel = datosFiltrados.map((valor) => [
          valor["VENTA_CODIGO_VENTA"],
          valor["ITEM_NOMBRE_ITEM"],
          valor["ITEM_CANTIDAD"],
          valor["ITEM_IVA"],
          evaluate(
            `(${valor["ITEM_VALOR_DESCUENTO"]}/1.${valor["ITEM_IVA"]})`
          ).toFixed(0),
          evaluate(
            `(${valor["ITEM_VALOR_TOTAL"]}/1.${valor["ITEM_IVA"]})`
          ).toFixed(0),
          valor["ITEM_VALOR_DESCUENTO"],
          valor["ITEM_VALOR_TOTAL"],
          asignarEstadoNombre(parseInt(valor["VENTA_ESTADO_VENTA"])),
          valor["USUARIO_NOMBRE"],
        ]);
        nuevoContenidoTablaExcel.push(
          ["Sin iva", "", "", "", "", "", "", "", "", valorIva.toFixed(0)],
          [
            "Iva",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            porcentajeIva.toFixed(2),
            valorNeto.toFixed(0),
          ],
          ["Total", "", "", "", "", "", "", "", "", valorTotal.toFixed(0)]
        );

        //Datos en csv
        const nuevoContenidoTablaCsv = datosFiltrados.map((valor) => {
          return {
            Numero_pedido: valor["VENTA_CODIGO_VENTA"],
            Producto: valor["ITEM_NOMBRE_ITEM"],
            Cantidad: valor["ITEM_CANTIDAD"],
            Valor_iva: evaluate(
              `(${valor["ITEM_VALOR_TOTAL"]}*0.${valor["ITEM_IVA"]})`
            ).toFixed(0),
            Valor_unitario: valor["ITEM_VALOR_DESCUENTO"],
            Valor_total: valor["ITEM_VALOR_TOTAL"],
            Estado_compra: asignarEstadoNombre(
              parseInt(valor["VENTA_ESTADO_VENTA"])
            ),
            Empleado: valor["USUARIO_NOMBRE"],
          };
        });
        nuevoContenidoTablaCsv.push(
          {
            Numero_pedido: "Neto",
            Producto: "",
            Cantidad: "",
            Valor_iva: "",
            Valor_unitario: "",
            Valor_total: "",
            Estado_compra: "",
            Empleado: valorNeto.toFixed(0),
          },
          {
            Numero_pedido: "Iva",
            Producto: "",
            Cantidad: "",
            Valor_iva: "",
            Valor_unitario: "",
            Valor_total: "",
            Estado_compra: "",
            Empleado: valorIva.toFixed(0),
          },
          {
            Numero_pedido: "Total",
            Producto: "",
            Cantidad: "",
            Valor_iva: "",
            Valor_unitario: "",
            Valor_total: "",
            Estado_compra: "",
            Empleado: valorTotal.toFixed(0),
          }
        );

        const nuevosDatos = datosFiltrados.map((valor) => [
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["VENTA_CODIGO_VENTA"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["VENTA_FECHA_VENTA"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["ITEM_NOMBRE_ITEM"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["ITEM_CANTIDAD"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "costo",
            valor: valor["ITEM_VALOR_DESCUENTO"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "costo",
            valor: valor["ITEM_VALOR_TOTAL"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "estado",
            valor: valor["VENTA_ESTADO_VENTA"],
            img: "",
            subClase: valor["VENTA_ESTADO_VENTA"],
            operacion: "",
            parametro: "",
          },
          {
            key: `${valor["ITEM_NOMBRE_ITEM"]}-${valor["VENTA_CODIGO_VENTA"]}`,
            id: valor["ITEM_NOMBRE_ITEM"],
            tipo: "normal",
            valor: valor["USUARIO_NOMBRE"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
        ]);

        if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
        if (nuevosDatos.length <= 0) setDatosMain([[]]);
        setBody(nuevoContenidoTablaExcel);
        setCsvDatos(nuevoContenidoTablaCsv);
        setJsonDatos(datosFiltrados);
        alertaToast("success", `Informacion actualizada`, 5000, "bottom-end");
      })
      .catch(function (error) {
        setDatosMain([[]]);
        setBody([]);
        setCsvDatos([{}]);
        setJsonDatos([{}]);
      });
  };

  return (
    <>
      <FiltrosDatosTabla
        estadoFiltro={setEstadoFiltro}
        filtarDatos={generarLista}
        valueFechaInicial={fechaInicial}
        valueFechaFinal={fechaFinal}
        fechaFinal={setFechaFinal}
        fechaInicial={setFechaInicial}
      ></FiltrosDatosTabla>
      <TablaMain
        buscadorNombre="Codigo o fecha"
        buscadorTitulo="Datos de pedido"
        actualizar={generarLista}
        tablaTitulos={titulosTabla}
        tablaContenido={datosMain}
        oculto={false}
        header={header}
        body={body}
        bodyCsv={csvDatos}
        bodyJson={jsonDatos}
        nombre="Ventas"
      ></TablaMain>
    </>
  );
}
