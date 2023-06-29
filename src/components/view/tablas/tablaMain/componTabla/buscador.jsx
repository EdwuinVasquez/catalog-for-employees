//importacion de librerias
import { React } from "react";
import { buscador } from "../../../logos/img.jsx";
import "../../../../style/tabla/tablaMain/buscador.css"

export function TablaBuscador({placeholder, manejarClick}) {
  return(
    <div className="buscadorTabla">
      <input className="buscadorTabla__input" onChange={manejarClick} type="search" placeholder={placeholder} />
      <img className="buscadorTabla__img" src={buscador} alt="" />
    </div>
	);
};