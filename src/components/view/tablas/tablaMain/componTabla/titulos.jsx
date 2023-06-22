//importacion de librerias
import { React } from "react";
import buscador from "../../../../img/search.png"
import "../../../../style/tabla/tablaMain/buscador.css"

export function TablaTitulos({titulos}) {
	const contenido = (listaTitulos) =>{
		let etiquetas = listaTitulos.map((nombre) =>{
			return <th> {nombre} <span class="icon-arrow">&UpArrow;</span></th>
		}
		)
		return etiquetas;
	} 

  return(
    <>
    <thead>
      <tr>
	      {contenido(titulos)}
      </tr>
    </thead>
    </>
	);
};