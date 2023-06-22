//importacion de librerias
import { React } from "react";
import pdf from "../../../../img/pdf.png"
import json from "../../../../img/json.png"
import csv from "../../../../img/csv.png"
import excel from "../../../../img/excel.png"
import "../../../../style/tabla/tablaMain/exportar.css"

export function TablaExportar({titulo, icono, tipo}) {
  return(
    <div for="export-file" className="exportar">
      <label for="export-file" className="exportar__boton" title="Export File"></label>
      <input className="exportar__input" type="checkbox" id="export-file" />
      <div for="export-file" className="exportar__opciones">
        <label className="exportar__label  exportar__label--fir">Export As &nbsp; &#10140;</label>
        <label className="exportar__label" id="toPDF">PDF <img src={pdf} alt="" /></label>
        <label className="exportar__label" id="toJSON">JSON <img src={json} alt="" /></label>
        <label className="exportar__label" id="toCSV">CSV <img src={csv} alt="" /></label>
        <label className="exportar__label" id="toEXCEL">EXCEL <img src={excel} alt="" /></label>
      </div>
    </div>
	);
};