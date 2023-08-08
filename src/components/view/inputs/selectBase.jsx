/*-- Estilo --*/
import '../../style/inputs/selectBase.css';

/*-- Librerias --*/
import { React, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function SelectBase({ id, texto, expresion, manejarCambio, listaOpciones, manejarNull }) {
  const [datosValido, setDatosValido] = useState(false);
  const [valueCampo, setValueCampo] = useState(true);

  /*-- Obtener el valor seleccionado --*/
  const value = (event) => {
    let value = event.target.value;
    setDatosValido(expresion.test(value));
    setValueCampo(value.trim() == "");
    manejarCambio(value.trim(), expresion.test(value), id);
  }

  /*-- Generar lista de opciones --*/
  const opcion = (() => {
    try {
      if (listaOpciones[0].length >= 1 || listaOpciones.length >= 1) {
        return listaOpciones.map((tupla) =>
          <option key={uuidv4()} defaultValue={tupla[0]['valor']}>{tupla[0]['valor']}</option>
        )
      } else {
        return <option key={uuidv4()} defaultValue="no hay datos">no hay datos</option>
      }
    } catch (error) {
      manejarNull();
    }
  });

  return (
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