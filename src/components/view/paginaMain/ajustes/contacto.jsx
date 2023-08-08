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

export function AjustesContacto() {
  const { contexUsuarioLogin } = useDataContex();

  const [numero, setNumero] = useState(false);

  const [numeroValido, setNumeroValido] = useState(false);

  /*-- manejar cambio del numero en el input --*/
  const manejarCambioNumero = ((dato, correcto) => {
    setNumeroValido(correcto)
    setNumero(dato.trim())
  })

  /*--- Enviar datos a la api para aplicar cambio --*/
  const aplicarCambio = (() => {
    const nuevosDatos = {
      cedula: contexUsuarioLogin["cedula"],
      contacto: numero
    };

    if (numeroValido) {
      classUsuario.cambiarContacto(nuevosDatos)
        .then((result) => {
          alertaClasica(
            "success",
            "Contacto modificado de manera exitosa",
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

  })

  return (
    <>
      <CampoVerificado
        id="contacto"
        expresion={regex.contacto}
        texto="Numero de Celular"
        tipo="text"
        manejarCambio={manejarCambioNumero}
      ></CampoVerificado>
      <div style={{ width: "92%" }}>
        <BotonSencillo texto="Guardar" manejarClik={aplicarCambio}></BotonSencillo>
      </div>
    </>
  );
};