/*-- Estilos --*/
import '../../style/inputs/inputBase.css';

/*-- Librerias --*/
import { React, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export function CampoVerificado({ id, tipo, texto, expresion, manejarCambio, placeholder = "" }) {
  const [datosValido, setDatosValido] = useState(false);
  const [valueCampo, setValueCampo] = useState(true);
  const [password, setPassword] = useState(false);
  const [visible, setVisible] = useState("password");

  const value = (event) => {
    let value = event.target.value;
    setDatosValido(expresion.test(value));
    setValueCampo(value.trim() == "");
    manejarCambio(value.trim(), expresion.test(value), id);
  }

  const passwordSee = () => {
    setPassword(true);
    setVisible("text");
  };

  const passwordNotSee = () => {
    setPassword(false);
    setVisible("password");
  };

  const typePass = ((valor, estado) => {
    if (valor) {
      if (estado) {
        return <BsEye className="campoVerificado__password" onClick={() => passwordNotSee()}></BsEye>
      } else {
        return <BsEyeSlash className="campoVerificado__password" onClick={() => passwordSee()}></BsEyeSlash>
      }
    } else {
      return <></>
    }
  })

  return (
    <>
      <div className="campoVerificado">
        <input className="campoVerificado__campo" onChange={value} placeholder={placeholder} type={tipo.toUpperCase() == "PASSWORD" ? visible : tipo} defaultValue={placeholder} required="" autoComplete="off" />
        <label
          className={"campoVerificado__texto  " + (datosValido ? "campoVerificado__texto--verde" : "campoVerificado__texto--rojo") + (valueCampo ? "  campoVerificado__texto--vacio" : "  ")}
        >{texto}</label>
        {typePass(tipo.toUpperCase() == "PASSWORD", password)}
      </div>
    </>
  );
};