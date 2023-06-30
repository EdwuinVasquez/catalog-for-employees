//importacion de librerias
import { React } from "react";
import "../../../../style/tabla/tablaMain/cabezera.css"
import { TablaBuscador } from "./buscador";
import { TablaExportar } from "./exportar";
import { FechaActual } from "../../../titulos/fechaActual";

export function TablaCabezera({buscador, titulo, manejarClick}) {
  return(
    <>
      <section className="tablaMain__cabezera">
        <h2>{titulo}
          <FechaActual></FechaActual>
         </h2>
        <TablaBuscador placeholder={buscador} manejarClick={manejarClick}></TablaBuscador>
        <TablaExportar></TablaExportar>
      </section>
    </>
	);
};