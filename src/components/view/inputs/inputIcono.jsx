/*-- Estilo --*/
import "../../style/inputs/inputIcono.css";

/*-- Librerias --*/
import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";

export function CampoIcono({ id, titulo, icono, tipo, manejarCambio }) {
  const [password, setPassword] = useState(false);
  const [visible, setVisible] = useState("password");

  const value = (event) => {
    let value = event.target.value;
    manejarCambio(value.trim(), id);
  };

  const iconoHtml = (key) => {
    switch (key) {
      case "AiOutlineUser":
        return <AiOutlineUser className="campoIcono__icono" />;
      case "GoLock":
        return <GoLock className="campoIcono__icono" />;
      default:
        break;
    }
  };

  const passwordSee = () => {
    setPassword(true);
    setVisible("text");
  };

  const passwordNotSee = () => {
    setPassword(false);
    setVisible("password");
  };

  const typePass = (valor, estado, icono) => {
    if (valor) {
      if (estado) {
        return (
          <BsEye
            className="campoIcono__icono  campoIcono__password"
            onClick={() => passwordNotSee()}
          ></BsEye>
        );
      } else {
        return (
          <BsEyeSlash
            className="campoIcono__icono  campoIcono__password"
            onClick={() => passwordSee()}
          ></BsEyeSlash>
        );
      }
    } else {
      return iconoHtml(icono);
    }
  };
  return (
    <div className="campoIcono">
      <label className="campoIcono__titulo">{titulo}</label>
      {typePass(tipo.toUpperCase() == "PASSWORD", password, icono)}
      <input
        className="campoIcono__input"
        onChange={value}
        placeholder=""
        title=""
        autoComplete="off"
        type={tipo.toUpperCase() == "PASSWORD" ? visible : tipo}
      ></input>
    </div>
  );
}
