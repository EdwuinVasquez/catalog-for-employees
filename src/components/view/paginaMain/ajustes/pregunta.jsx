/*-- Estilos --*/
import "../../../style/menus/components/opcion.css";

/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { SelectBase } from "../../inputs/selectBase";
import { CampoVerificado } from "../../inputs/inputBase";
import { BotonSencillo } from "../../botones/botonSencillo";

/*-- Controladores y modificadores --*/
import { regex } from "../../../../backend/regex";
import { useDataContex } from "../../contex";
import { usuario } from "../../../../backend/class/usuario";
import { alertaClasica, alertaToast } from "../../../../backend/swetAlert2";
import { listaOpciones } from "../../../../backend/funcioneGenerales";
const classUsuario = new usuario();

export function AjustesPregunta() {
  const { contexUsuarioLogin } = useDataContex();

  /*-- Valor de la pregunta --*/
  const [pregunta, setPregunta] = useState(false);

  const [preguntaValida, setPreguntaValida] = useState(false);

  /*-- valor de la respuesta --*/
  const [respuesta, setRespuesta] = useState(false);

  const [respuestaValida, setRespuestaValida] = useState(false);

  /*-- manejar cambio de pregunta --*/
  const manejarCambioPregunta = ((dato, correcto) => {
    setPreguntaValida(correcto)
    setPregunta(dato.trim())
  });

  /*-- manejar cambio de respuesta --*/
  const manejarCambioRespuesta = ((dato, correcto) => {
    setRespuestaValida(correcto)
    setRespuesta(dato.trim())
  })

  /*--- Enviar datos a la api para aplicar cambio --*/
  const aplicarCambio = (() => {
    const nuevosDatos = {
      cedula: contexUsuarioLogin["cedula"],
      pregunta: pregunta,
      respuesta: respuesta
    };

    if (preguntaValida && respuestaValida) {
      classUsuario.cambiarPregunta(nuevosDatos)
        .then((result) => {
          alertaClasica(
            "success",
            "Pregunta y respuesta modificadas",
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
      <SelectBase
        id="pregunta"
        expresion={regex.pregunta}
        texto="Pregunta de seguridad"
        listaOpciones={listaOpciones}
        manejarCambio={manejarCambioPregunta}
      ></SelectBase>
      <CampoVerificado
        id="respuesta"
        expresion={regex.respuesta}
        texto="Respuesta de seguridad"
        tipo="password"
        manejarCambio={manejarCambioRespuesta}
      ></CampoVerificado>
      <div style={{ width: "92%" }}>
        <BotonSencillo texto="Guardar" manejarClik={aplicarCambio}></BotonSencillo>
      </div>
    </>
  );
};