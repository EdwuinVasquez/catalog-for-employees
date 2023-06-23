//importacion de librerias
import { React } from "react";
import { TablaCabezera } from "./componTabla/cabezera";
import "../../../style/tabla/tablaMain/contenedor.css"
import { TablaCotenido } from "./componTabla/contenido";

export function TablaMain({buscadorNombre, buscadorTitulo, tablaTitulos, tablaContenido}) {
  return(
    <div className="tablaMain">
      <TablaCabezera buscador={buscadorNombre} titulo={buscadorTitulo}></TablaCabezera>
      <TablaCotenido titulos={tablaTitulos} contenido={tablaContenido}></TablaCotenido>
    </div>
	);
};