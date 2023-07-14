/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/cabezera.css"

/*-- importaciones --*/
import { React } from "react";

/*-- Componentes --*/
import { TablaBuscador } from "./buscador";
import { TablaExportar } from "./exportar";
import { FechaActual } from "../../../titulos/fechaActual";

export function TablaCabezera({buscador, titulo, manejarClick, oculto}) {
  return(
    <>
      <section className="tablaMain__cabezera">
        <h2>{titulo}
          <FechaActual></FechaActual>
         </h2>
        <TablaBuscador placeholder={buscador} manejarClick={manejarClick}></TablaBuscador>
        <TablaExportar oculto={oculto}></TablaExportar>
      </section>
    </>
	);
};