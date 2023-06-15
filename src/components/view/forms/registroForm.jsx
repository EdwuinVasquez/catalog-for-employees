//importacion de librerias
import { React } from "react";
import { BotonSencillo } from "../botones/boton.jsx";
import { TituloInicio } from "../titulos/tituloInicio.jsx";
import { CampoVerificado } from "../inputs/inputBase.jsx";
import '../../style/forms/registroForm.css';

export function RegistroFomulario({titulo, icono, tipo}) {
	const verificar = (expresion, value) =>{
    if(expresion.test(value)){
      console.log(value)
    }
  }

  return(
		<>
		<div className="contenedor--centrado">
			<form className="registroFomulario">
				<TituloInicio texto="Registarse"></TituloInicio>
				<div class="registroFomulario__flex">
					<CampoVerificado texto="Nombre" tipo="text"></CampoVerificado>
					<CampoVerificado texto="Apellido" tipo="text"></CampoVerificado>
				</div>
				<CampoVerificado texto="Cedula" tipo="number" expresion="/^[0-9]*$/gm" verificarContenido={verificar}></CampoVerificado>
				<CampoVerificado texto="Contacto" tipo="text"></CampoVerificado>
				<div class="registroFomulario__flex">
					<CampoVerificado texto="Pregunta de seguridad" tipo="text"></CampoVerificado>
					<CampoVerificado texto="Respuesta de seguridad" tipo="text"></CampoVerificado>
				</div>
				<CampoVerificado texto="Clave" tipo="password"></CampoVerificado>
			</form>
		</div>
		</>
	);
};