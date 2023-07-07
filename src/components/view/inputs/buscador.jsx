//importacion de librerias
import { React, useState } from "react";
import "../../style/inputs/buscador.css"
import { CgSearch } from "react-icons/cg";

export function Buscador({placeholder, manejarClick}) {
  const [buscar, setBuscar] = useState(null);

  const actualizarBuscador = (e) => {
    let value = e.target.value.trim();
    setBuscar(value.toUpperCase())
  }

  const enviar = (e) => {
    manejarClick(buscar)
  }

  function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      enviar();
    }
  }

  return(
    <div className="buscador">
        <input className="buscador__input" onKeyDown={pulsar} autoComplete="off" onChange={actualizarBuscador} type="search" placeholder={placeholder} name="text" />
        <CgSearch className="buscador__icono" onClick={enviar}></CgSearch>
    </div>
	);
};