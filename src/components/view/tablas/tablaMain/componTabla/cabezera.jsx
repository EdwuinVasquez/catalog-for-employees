/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/cabezera.css"

/*-- Componentes --*/
import { TablaBuscador } from "./buscador";
import { TablaExportar } from "./exportar";
import { FechaActual } from "../../../titulos/fechaActual";

export function TablaCabezera({ buscador, titulo, manejarClick, oculto, header, body, bodyCsv, nombre, bodyJson }) {
  return (
    <>
      <section className="tablaMain__cabezera">
        <h2>{titulo}
          <FechaActual></FechaActual>
        </h2>
        <TablaBuscador placeholder={buscador} manejarClick={manejarClick}></TablaBuscador>
        <TablaExportar bodyCsv={bodyCsv} bodyJson={bodyJson} nombre={nombre} header={header} body={body} oculto={oculto}></TablaExportar>
      </section>
    </>
  );
};