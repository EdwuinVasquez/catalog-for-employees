//importacion de librerias
import { React } from "react";
import "../../../../style/tabla/tablaMain/cabezera.css"
import { TablaBuscador } from "./buscador";
import { TablaExportar } from "./exportar";

export function TablaCabezera({buscador, titulo, tipo}) {
  return(
    <>
      <section className="tablaMain__cabezera">
        <h2>{titulo}</h2>
        <TablaBuscador placeholder={buscador}></TablaBuscador>
        <TablaExportar></TablaExportar>
      </section>
    </>
	);
};