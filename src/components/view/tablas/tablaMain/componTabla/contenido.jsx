/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/contenido.css"

/*-- Importaciones --*/
import { React } from "react";

/*-- Componentes --*/
import { TablaTitulos } from "./titulos";
import { TablaBody } from "./datos";

export function TablaCotenido({titulos, contenido, actualizar}) {
  /*-- Generar tuplas --*/
  const datos = (() =>{
    try {
      if(contenido[0].length > 2){
        return contenido.map((valor) =>
          <TablaBody datos={valor}></TablaBody>
        )
      }else{
        return <h1>No hay datos almacenados</h1>
      }
    } catch (error) {
      actualizar();
    }
  });

  return(
    <>
    <section className="tabla__contenido">
      <table>
        <TablaTitulos titulos={titulos}></TablaTitulos>
        <tbody>
          {
            datos()
          }
        </tbody>
      </table>
		</section>
		</>
	);
};