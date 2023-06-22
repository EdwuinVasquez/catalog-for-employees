//importacion de librerias
import { React } from "react";
import buscador from "../../../../img/search.png"
import "../../../../style/tabla/tablaMain/buscador.css"

export function TablaBuscador({placeholder}) {
  return(
    <div className="buscadorTabla">
      <input className="buscadorTabla__input" type="search" placeholder={placeholder} />
      <img className="buscadorTabla__img" src={buscador} alt="" />
    </div>
	);
};