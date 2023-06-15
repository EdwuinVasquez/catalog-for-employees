//importacion de librerias
import { React } from "react";
import { BotonSencillo } from "../botones/boton.jsx";
import { Logo } from "../logos/logo.jsx";
import { TituloCentradolo } from "../titulos/tituloCentrado.jsx";
import { SubtituloCentrado } from "../subtitulos/subtituloCentrado.jsx";
import { CampoIcono } from "../inputs/inputIcono.jsx";
import '../../style/forms/inicioSesionForm.css'

export function LoginFomulario({titulo, icono, tipo}) {
  return(
		<>
		<div className="contenedor--centrado">
			<form className="loginFomulario">
				<Logo></Logo>
				<TituloCentradolo texto="Rimoplasticas S.A"></TituloCentradolo>
				<SubtituloCentrado 
					texto="Bienvenido al catalogo de los empleados, antes de empezar ingrese a su cuenta"
					></SubtituloCentrado>
				<CampoIcono titulo="Cedula" icono="AiOutlineUser" tipo="number"></CampoIcono>
				<CampoIcono titulo="Clave" icono="GoLock" tipo="password"></CampoIcono>
				<BotonSencillo></BotonSencillo>
			</form>
		</div>
		</>
	);
};