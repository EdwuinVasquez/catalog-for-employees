//importacion de librerias
import { React } from "react";
import { TablaTitulos } from "./titulos";
import "../../../../style/tabla/tablaMain/contenido.css"
import { TablaBody } from "./datos";

export function TablaCotenido({titulos, contenido, actualizar}) {

  const datos = (() =>{
    try {
      console.clear();
      if(contenido[0].length > 2){
        return contenido.map((valor) =>
          <TablaBody datos={valor}></TablaBody>
        )
      }else{
        console.log(contenido)
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