//importacion de librerias
import { React, useEffect, useState } from "react";
import { TablaCabezera } from "./componTabla/cabezera";
import "../../../style/tabla/tablaMain/contenedor.css"
import { TablaCotenido } from "./componTabla/contenido";

export function TablaMain({buscadorNombre, buscadorTitulo, tablaTitulos, tablaContenido, actualizar}) {
  const [contenidoFilter, setContenidoFilter] = useState([[]]);
  const realizarBusqueda = (e) =>{
    let valueBuscador = e.target.value.trim();
    let datosFiltrados = tablaContenido.filter(
      tupla => (tupla[0]['valor'].includes(valueBuscador) || tupla[1]['valor'].includes(valueBuscador)) 
    );
    console.clear();
    if(datosFiltrados.length > 0) setContenidoFilter(datosFiltrados);
  }

  return(
    <>
    <div className="tablaMain">
      <TablaCabezera buscador={buscadorNombre} titulo={buscadorTitulo} manejarClick={realizarBusqueda}></TablaCabezera>
      <TablaCotenido titulos={tablaTitulos} actualizar={actualizar} contenido={(contenidoFilter[0].length >= 2 ? contenidoFilter : tablaContenido)}></TablaCotenido>
    </div>
    </>
	);
};