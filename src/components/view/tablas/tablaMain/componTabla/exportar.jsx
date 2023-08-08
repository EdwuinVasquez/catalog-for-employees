/*-- Estilo --*/
import "../../../../style/tabla/tablaMain/exportar.css";

/*-- Librerias --*/
import { React } from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { Pdf, json, csv, excel } from "../../../logos/img.jsx";
import { CSVLink } from "react-csv";

export function TablaExportar({ oculto, nombre, header, body, bodyCsv, bodyJson }) {
  /*-- Bloque oculto --*/
  const tipoBloque = (bloque) => {
    if (bloque) {
      return <>
        <div></div>
      </>
    } else {
      return <>
        <div htmlFor="export-file" className="exportar">
          <label htmlFor="export-file" className="exportar__boton" title="Export File"></label>
          <input className="exportar__input" type="checkbox" id="export-file" />
          <div htmlFor="export-file" className="exportar__opciones">
            <label className="exportar__label  exportar__label--fir">Export As &nbsp; &#10140;</label>
            {/* <label className="exportar__label" id="toPDF">PDF <Pdf></Pdf> </label> */}
            {/* <CSVLink data={bodyJson} filename={`${nombre}.json`} style={{ color: "#000" }}>  <label className="exportar__label" id="toJSON">JSON <img src={json} alt="" /></label> </CSVLink> */}
            <CSVLink data={bodyCsv} filename={`${nombre}.csv`} style={{ color: "#000" }}>  <label className="exportar__label" id="toCSV"> CSV <img src={csv} alt="" /></label> </CSVLink>
            <label className="exportar__label" id="toEXCEL" onClick={descargarEcxel} >EXCEL <img src={excel} alt="" /></label>
          </div>
        </div>
      </>
    }
  }

  function descargarEcxel() {
    downloadExcel({
      fileName: `Reporte - ${nombre}`,
      sheet: `${nombre}`,
      tablePayload: {
        header,
        body: body,
      },
    });
  }

  return (
    <>
      {
        tipoBloque(oculto)
      }
    </>
  );
};