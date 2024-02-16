/*-- Imagenes --*/
import logo from "../../img/logo.png";
import pdf from "../../img/pdf.png";
import json from "../../img/json.png";
import csv from "../../img/csv.png";
import excel from "../../img/excel.png";
import buscador from "../../img/search.png";

export { pdf, json, csv, excel, logo, buscador };

export function Pdf() {
  return (
    <>
      <img src={pdf} alt="" />
    </>
  );
}
