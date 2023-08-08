/*-- Estilos --*/
import "../../../style/menus/components/opcion.css";

/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { CampoVerificado } from "../../inputs/inputBase";
import { BotonSencillo } from "../../botones/botonSencillo";

/*-- Controladores y modificadores --*/
import { regex } from "../../../../backend/regex";
import { useDataContex } from "../../contex";
import { usuario } from "../../../../backend/class/usuario";
import { alertaClasica, alertaToast } from "../../../../backend/swetAlert2";
const classUsuario = new usuario();

export function AjustesClave() {
  const { contexUsuarioLogin } = useDataContex();

  const [clave, setClave] = useState(false);

  const [claveValida, setClaveValida] = useState(false);

  /*-- manejar cambio de la clave en el input --*/
  const manejarCambioClave = ((dato, correcto) => {
    setClaveValida(correcto);
    setClave(dato.trim())
  });

  /*--- Enviar datos a la api para aplicar cambio --*/
  const aplicarCambio = (() => {
    const nuevosDatos = {
      cedula: contexUsuarioLogin["cedula"],
      clave: clave
    };
    if (claveValida) {
      classUsuario.cambiarClave(nuevosDatos)
        .then((result) => {
          alertaClasica(
            "success",
            "Su contraseña ha sido modificada",
            5000);
        }).catch((error) => {
          alertaClasica(
            "error",
            "Ha ocurrido un error",
            5000);
        })
    } else {
      alertaToast("error",
        `Hay datos vacios o no se encuentran en el formato correcto`,
        5000,
        "top-end");
    }
  });

  return (
    <>
      <CampoVerificado
        id="clave"
        expresion={regex.clave}
        texto="Clave"
        tipo="password"
        manejarCambio={manejarCambioClave}
      ></CampoVerificado>
      <div style={{ width: "92%" }}>
        <BotonSencillo texto="Guardar" manejarClik={aplicarCambio}></BotonSencillo>
      </div>
    </>
  );
};