//importacion de librerias
import { React } from "react";
import { Boton } from "./boton.jsx";
import { Campo } from "./input.jsx";
import '../style/inicioSesionForm.css';

export function LoginFomulario({titulo, icono, tipo}) {
  return(
		<>
			<form className="formulario">
				<Campo titulo="Cedula" icono="AiOutlineUser" tipo="number"></Campo>
				<Campo titulo="Clave" icono="AiOutlineUser" tipo="password"></Campo>
				<Boton></Boton>
			</form>
		</>
	);
};