//importacion de librerias
import { React } from "react";
import { TablaCabezera } from "./componTabla/cabezera";
import "../../../style/tabla/tablaMain/contenedor.css"
import { TablaCotenido } from "./componTabla/contenido";

export function TablaEmpleados({titulo, icono, tipo}) {
  return(
    <div className="tablaMain">
      <TablaCabezera buscador="nombre" titulo="Empleado"></TablaCabezera>
      <TablaCotenido></TablaCotenido>
    </div>
	);
};