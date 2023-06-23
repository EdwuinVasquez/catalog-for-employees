//importacion de librerias
import { React, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { BotonSencillo } from "../botones/botonSencillo.jsx";
import { TituloInicio } from "../titulos/tituloInicio.jsx";
import { CampoVerificado } from "../inputs/inputBase.jsx";
import { regex } from "../../../backend/regex.js";
import { usuario } from "../../../backend/class/usuario.js";
import { LoginFomulario } from "./inicioSesionForm.jsx";
import '../../style/forms/registroForm.css';
const classUsuario = new usuario();

export function RegistroFomulario({titulo, icono, tipo}) {

	const [datos, setDatos] = useState({
		cedula: "",
		nombre: "",
		nombres: "",
		apellidos: "",
		rol: "EMPLEADO",
		clave: "",
		pregunta: "",
		respuesta: "",
		activado: 0,
		verificado: 0,
		contacto: ""
	});

	const [formCorrecto, setFormCorrecto] = useState({
		nombres: false,
		apellidos: false,
		cedula: false,
		contacto: false,
		pregunta: false,
		respuesta: false,
		clave: false
	});

	const verificarEnvio = () => {
		for (let key in formCorrecto) {
			if (formCorrecto[key] === false){
				return false;
			}};
			return true;
	};

	const actualizarDatos = (dato, correcto, key) =>{
		setDatos(() => {
			let nuevosDatos = datos;
			nuevosDatos[key] = dato;
			if(key == "nombres" || key == "apellidos") nuevosDatos["nombre"] = `${nuevosDatos["nombres"]} ${nuevosDatos["apellidos"]}`;
			return nuevosDatos;
		});

		setFormCorrecto(() => {
			let nuevosDatos = formCorrecto;
			nuevosDatos[key] = correcto;
			return nuevosDatos;
		});
  }

	const registarse = async (e) =>{
		e.preventDefault();
		if(verificarEnvio()) {
			classUsuario.registarse(datos)
			.then(resultado => {
				if(resultado == false){
					console.log("d");
				}
				console.log(resultado);
			}).catch(function (error) {
				console.error(error);
			});
		}
  }

  return(
		<>
		<div className="contenedor--centrado">
			<form className="registroFomulario">
				<TituloInicio texto="Registarse"></TituloInicio>
				<div className="registroFomulario__flex">
					<CampoVerificado 
						id="nombres" 
						expresion={regex.nombre} 
						texto="Nombre" 
						tipo="text" 
						manejarCambio={actualizarDatos}
						></CampoVerificado>
					<CampoVerificado 
						id="apellidos" 
						expresion={regex.nombre} 
						texto="Apellido" 
						tipo="text"
						manejarCambio={actualizarDatos}
						></CampoVerificado>
				</div>
				<CampoVerificado 
					id="cedula" 
					expresion={regex.cedula} 
					texto="Cedula" 
					tipo="number" 
					manejarCambio={actualizarDatos}
					></CampoVerificado>
				<CampoVerificado 
					id="contacto" 
					expresion={regex.contacto} 
					texto="Contacto" 
					tipo="text"
					manejarCambio={actualizarDatos}
					></CampoVerificado>
				<CampoVerificado 
						id="pregunta" 
						expresion={regex.pregunta} 
						texto="Pregunta de seguridad" 
						tipo="text"
						manejarCambio={actualizarDatos}
						></CampoVerificado>
					<CampoVerificado 
						id="respuesta" 
						expresion={regex.respuesta} 
						texto="Respuesta de seguridad" 
						tipo="text"
						manejarCambio={actualizarDatos}
						></CampoVerificado>
				<CampoVerificado 
					id="clave" 
					expresion={regex.clave} 
					texto="Clave" 
					tipo="password"
					manejarCambio={actualizarDatos}
					></CampoVerificado>
				<BotonSencillo texto="Registrarse" manejarClik={registarse}></BotonSencillo>
				<Link to="/login">
					<BotonSencillo texto="Ingresar" manejarClik={() => {console.log("a")}}></BotonSencillo>
				</Link>
			</form>

			<Routes>
				<Route exact path='/login/*' element={<LoginFomulario />}/>
				<Route path="*" element={null}/>
    	</Routes>
		</div>
		</>
	);
};