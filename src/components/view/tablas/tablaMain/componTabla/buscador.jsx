//importacion de librerias
import { React, useState } from "react";
import { buscador } from "../../../logos/img.jsx";
import "../../../../style/tabla/tablaMain/buscador.css"

export function TablaBuscador({placeholder, manejarClick}) {
  const [buscar, setBuscar] = useState(null);

  const actualizarBuscador = (e) => {
    let value = e.target.value.trim();
    setBuscar(value)
  }
  return(
    <div className="buscadorTabla">
      <input className="buscadorTabla__input" type="search" onChange={actualizarBuscador} placeholder={placeholder} />
      <img className="buscadorTabla__img" src={buscador} onClick={() => manejarClick(buscar)} alt="" />
    </div>
	);
};