//importacion de librerias
import {React } from "react";
import '../../style/inputs/inputBase.css';

export function CampoVerificado({id, tipo, texto, expresion, verificarContenido}) {
  return(
		<>
		<div className="campoVerificado">
      <input className="campoVerificado__campo" onChange={() => verificarContenido(id, expresion)} placeholder="" type={tipo} required="" />
      <label className="campoVerificado__texto">{texto}</label>
    </div>
		</>
	);
};