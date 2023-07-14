/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/buscador.css";

/*-- Importaciones --*/
import { React, useState } from "react";

/*-- componentes --*/
import { buscador } from "../../../logos/img.jsx";

export function TablaBuscador({placeholder, manejarClick}) {
  /*-- Contenido del buscador --*/
  const [buscar, setBuscar] = useState(null);

  /*-- Actualizar buscador --*/
  const actualizarBuscador = (e) => {
    let value = e.target.value.trim();
    setBuscar(value)
  }

  /*-- Activar busqueda por tecla enter --*/
  function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      manejarClick(buscar);
    }
  }
  
  return(
    <div className="buscadorTabla">
      <input className="buscadorTabla__input" onKeyDown={pulsar}  type="search" onChange={actualizarBuscador} placeholder={placeholder} />
      <img className="buscadorTabla__img" src={buscador} onClick={() => manejarClick(buscar)} alt="" />
    </div>
	);
};