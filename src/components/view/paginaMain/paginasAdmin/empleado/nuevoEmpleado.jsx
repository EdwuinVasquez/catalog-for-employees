/*-- Estilos --*/
import '../../../../style/forms/registroForm.css';

/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { BotonSencillo } from "../../../botones/botonSencillo.jsx";
import { TituloInicio } from "../../../titulos/tituloInicio.jsx";
import { CampoVerificado } from "../../../inputs/inputBase.jsx";

/*-- Clases y controladores --*/
import { regex } from "../../../../../backend/regex.js";
import { usuario } from "../../../../../backend/class/usuario.js";
import { alertaToast } from '../../../../../backend/swetAlert2';
const classUsuario = new usuario();

export function NuevoEmpleado() {
	/*-- Datos del formulario --*/
	const [datos, setDatos] = useState({
		cedula: "",
		nombre: "",
		nombres: "",
		apellidos: "",
		rol: "EMPLEADO",
		clave: "",
		pregunta: "Sin pregunta",
		respuesta: "$87292m.dksdskd",
		activado: 1,
		verificado: 1,
		contacto: ""
	});

	/*-- Validez de los datos --*/
	const [formCorrecto, setFormCorrecto] = useState({
		nombres: false,
		apellidos: false,
		cedula: false,
		contacto: false,
		clave: false
	});

	/*-- Validez completa de los campos --*/
	const verificarEnvio = () => {
		for (let key in formCorrecto) {
			if (formCorrecto[key] === false){
				return false;
			}};
			return true;
	};

	/*-- Actualizar datos del formulario --*/
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

	/*-- limpiar formulario --*/
	const limpiarFormulario = () =>{	
		let formulario = document.querySelectorAll(".registroFomulario div input");
		formulario.forEach(input => input.value="")

		setFormCorrecto({
			nombres: false,
			apellidos: false,
			cedula: false,
			contacto: false, 
			clave: false
		})
	}

	/*-- Ingresar empleado --*/	
	const registarse = async (e) =>{
		e.preventDefault();
		if(verificarEnvio()) {
			classUsuario.registarse(datos)
			.then(resultado => {
				if(resultado == false){
					alertaToast("warning", "Ocurrio un error", 5000, "top-end");
					throw new Error("Ocurrio un error");
				}
				alertaToast(
					resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? "error" : "success", 
					resultado[0]["RESULTADO"], 
					5000, 
					"top-end");
				if(resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? false : true){
					limpiarFormulario();
				}
			}).catch(function (error) {
				console.error(error);
			});
		}else{
			alertaToast("warning", "Aun hay datos sin llenar o incorrectos", 5000, "top-end");
		}
  	}

  return(
		<>
		<div className="contenedor--centrado">
			<form className="registroFomulario">
				<TituloInicio texto="Nuevo empleado" ></TituloInicio>
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
					texto="Numero de celular" 
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
				<BotonSencillo texto="Registrar" manejarClik={registarse}></BotonSencillo>
			</form>
		</div>
		</>
	);
};