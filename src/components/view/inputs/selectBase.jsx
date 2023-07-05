//importacion de librerias
import { React, useState } from "react";
import '../../style/inputs/selectBase.css';

export function SelectBase({id, texto, expresion, manejarCambio, listaOpciones, manejarNull}) {
	const [datosValido, setDatosValido] = useState(false);
	const [valueCampo, setValueCampo] = useState(true);

  const value = (event) =>{
    let value = event.target.value;
    setDatosValido(expresion.test(value));
    setValueCampo(value.trim() == "");
    manejarCambio(value.trim(), expresion.test(value), id);
  }

	const opcion = (() =>{
    try {
      console.clear();
      if(listaOpciones[0].length >= 1 || listaOpciones.length >= 1){
        return listaOpciones.map((tupla) =>
					<option key={tupla[0]['key']} defaultValue={tupla[0]['valor']}>{tupla[0]['valor']}</option>
        )
      }else{
        return <option key="1232" defaultValue="no hay datos">no hay datos</option>
      }
    } catch (error) {
      manejarNull();
    }

    
  });

  return(
		<>
		<div className="selectBase">
			<select className="selectBase__select" onChange={value} required="" autoComplete="off">
				<option selected={true} defaultValue="NAN" disabled="disabled">seleccione una opcion</option>
				{
					opcion()
				}
			</select>
			<i className="selectBase__flecha"></i>
			<label 
        className={"selectBase__texto  " + (datosValido ? "selectBase__texto--verde" : "selectBase__texto--rojo") + (valueCampo ? "  selectBase__texto--vacio" : "  ")} 
        >{texto}</label>
		</div>
		</>
	);
};