//importacion de librerias
import { React, useState } from "react";
import '../../style/inputs/inputBase.css';

export function CampoVerificado({id, tipo, texto, expresion, manejarCambio}) {
	const [datosValido, setDatosValido] = useState(false);
	const [valueCampo, setValueCampo] = useState(true);

  const value = (event) =>{
    let value = event.target.value;
    setDatosValido(expresion.test(value));
    setValueCampo(value.trim() == "");
    manejarCambio(value.trim(), expresion.test(value), id);
  }

  return(
		<>
		<div className="campoVerificado">
      <input className="campoVerificado__campo" onChange={value} placeholder="" type={tipo} required="" autoComplete="off" />
      <label 
        className={"campoVerificado__texto  " + (datosValido ? "campoVerificado__texto--verde" : "campoVerificado__texto--rojo") + (valueCampo ? "  campoVerificado__texto--vacio" : "  ")} 
        >{texto}</label>
    </div>
		</>
	);
};