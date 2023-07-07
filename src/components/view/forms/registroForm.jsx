/*-- Estilos css --*/
import '../../style/forms/registroForm.css';

/*-- Librerias --*/
import { React, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";

/*-- Componentes --*/
import { BotonSencillo } from "../botones/botonSencillo.jsx";
import { TituloInicio } from "../titulos/tituloInicio.jsx";
import { CampoVerificado } from "../inputs/inputBase.jsx";
import { LoginFomulario } from "./inicioSesionForm.jsx";
import { SelectBase } from "../inputs/selectBase.jsx";

/*-- Clases y controladores --*/
import { regex } from "../../../backend/regex.js";
import { usuario } from "../../../backend/class/usuario.js";
import { alertaToast } from '../../../backend/swetAlert2';
const classUsuario = new usuario();

export function RegistroFomulario() {

	/*-- Value de los campos --*/
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

	/*-- Validez del dato --*/
	const [formCorrecto, setFormCorrecto] = useState({
		nombres: false,
		apellidos: false,
		cedula: false,
		contacto: false,
		pregunta: false,
		respuesta: false,
		clave: false
	});

	/*-- Lista de opciones para pregunta de seguridad */
	const listaOpciones = [
		[{key: 1, valor: "En que ciudad naciste"}],
		[{key: 2, valor: "Cual es tu equipo deportivo favorito"}],
		[{key: 3, valor: "Cual es el nombre de tu ciudad natal"}],
		[{key: 4, valor: "Cual es tu deporte favorito"}],
		[{key: 5, valor: "Nombre de tu ultima mascota"}],
		[{key: 6, valor: "Cual es tu numero de identificación personal"}],
		[{key: 7, valor: "En que mes naciste"}],
		[{key: 8, valor: "En que año empezaste a trabajar en esta empresa"}],
		[{key: 9, valor: "Cual es tu numero de telefono"}],
		[{key: 10, valor: "En que dia naciste"}],
		[{key: 11, valor: "Cual es tu posicion en la linea de produccion"}],
		[{key: 12, valor: "Cual es el nombre de tu supervisor directo"}]
	];

	/*-- Verifica todos los campos y retorna Booleano */
	const verificarEnvio = () => {
		for (let key in formCorrecto) {
			if (formCorrecto[key] === false){
				return false;
			}};
			return true;
	};

	/*-- Actualiza el estado de los datos con el nuevo valor*/
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
			pregunta: true,
			respuesta: false,
			clave: false
		})
	}

	/*-- Eniva el formulario --*/
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
					resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? resultado[0]["RESULTADO"] : `${ resultado[0]["RESULTADO"]}, COMUNIQUESE CON UN ADMINISTRADOR PARA SU VERIFICACION`, 
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
					texto="Numero de Celular" 
					tipo="text"
					manejarCambio={actualizarDatos}
					></CampoVerificado>
				<SelectBase 
						id="pregunta" 
						expresion={regex.pregunta} 
						texto="Pregunta de seguridad" 
						listaOpciones={listaOpciones}
						manejarCambio={actualizarDatos}
						></SelectBase>
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