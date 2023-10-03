/*-- Estilos --*/
import "../../style/inputs/buscador.css";

/*-- Librerias --*/
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

export function Buscador({ placeholder, manejarClick }) {
  /*-- Texto del buscador --*/
  const [buscar, setBuscar] = useState(null);

  /*-- Actualizar buscador --*/
  const actualizarBuscador = (e) => {
    let value = e.target.value.trim();
    setBuscar(value.toUpperCase());
  };

  /*-- Enviar dato a buscar --*/
  const enviar = (e) => {
    const palabra = buscar.trim();
    if (palabra && palabra.slice(-1).toLowerCase() === "s") {
      manejarClick(palabra.slice(0, -1));
    } else {
      manejarClick(palabra);
    }
  };

  /*-- Activar al precionar enter --*/
  function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      enviar();
    }
  }

  return (
    <div className="buscador">
      <input
        className="buscador__input"
        onKeyDown={pulsar}
        autoComplete="off"
        onChange={actualizarBuscador}
        type="search"
        placeholder={placeholder}
        name="text"
      />
      <CgSearch className="buscador__icono" onClick={enviar}></CgSearch>
    </div>
  );
}
