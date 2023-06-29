//importacion de librerias
import { React } from "react";
import { Pdf, pdf, json, csv, excel } from "../../../logos/img.jsx";
import "../../../../style/tabla/tablaMain/exportar.css"

export function TablaExportar() {
  return(
    <div htmlFor="export-file" className="exportar">
      <label htmlFor="export-file" className="exportar__boton" title="Export File"></label>
      <input className="exportar__input" type="checkbox" id="export-file" />
      <div htmlFor="export-file" className="exportar__opciones">
        <label className="exportar__label  exportar__label--fir">Export As &nbsp; &#10140;</label>
        <label className="exportar__label" id="toPDF">PDF <Pdf></Pdf> </label>
        <label className="exportar__label" id="toJSON">JSON <img src={json} alt="" /></label>
        <label className="exportar__label" id="toCSV">CSV <img src={csv} alt="" /></label>
        <label className="exportar__label" id="toEXCEL">EXCEL <img src={excel} alt="" /></label>
      </div>
    </div>
	);
};