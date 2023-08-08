/*-- Estilos --*/
import "../../../style/tabla/tablaMain/contenedor.css"

/*-- Importaciones --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { TablaCabezera } from "./componTabla/cabezera";
import { TablaCotenido } from "./componTabla/contenido";
import { alertaToast } from "../../../../backend/swetAlert2";

export function TablaMain({ buscadorNombre, nombre, bodyCsv, bodyJson, header, body, buscadorTitulo, tablaTitulos, tablaContenido, actualizar, oculto }) {
  /*-- Lista de datos filtrados --*/
  const [contenidoFilter, setContenidoFilter] = useState([[]]);

  /*-- Buscar en el contenido de la tabla --*/
  const realizarBusqueda = (buscar) => {
    try {
      let valueBuscador = buscar.trim();
      let datosFiltrados = tablaContenido.filter(
        tupla => (tupla[0]['valor'].toLowerCase().includes(valueBuscador.toLowerCase()) || tupla[1]['valor'].toLowerCase().includes(valueBuscador.toLowerCase()))
      );
      if (datosFiltrados.length > 0) {
        alertaToast("success", "Datos filtrados", 6000, "top-end")
        setContenidoFilter(datosFiltrados);
      }else{
        alertaToast("error", "No se encontraron datos", 6000, "top-end")
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <div className="tablaMain">
        <TablaCabezera nombre={nombre} bodyCsv={bodyCsv} bodyJson={bodyJson} header={header} body={body} buscador={buscadorNombre} titulo={buscadorTitulo} manejarClick={realizarBusqueda} oculto={oculto}></TablaCabezera>
        <TablaCotenido titulos={tablaTitulos} actualizar={actualizar} contenido={(contenidoFilter[0].length >= 2 ? contenidoFilter : tablaContenido)}></TablaCotenido>
      </div>
    </>
  );
};