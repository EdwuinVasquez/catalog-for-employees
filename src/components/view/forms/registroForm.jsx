/*-- Estilos css --*/
import '../../style/forms/registroForm.css';

/*-- Librerias --*/
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

/*-- Componentes --*/
import { BotonSencillo } from "../botones/botonSencillo.jsx";
import { TituloInicio } from "../titulos/tituloInicio.jsx";
import { CampoVerificado } from "../inputs/inputBase.jsx";
import { SelectBase } from "../inputs/selectBase.jsx";

/*-- Clases y controladores --*/
import { regex } from "../../../backend/regex.js";
import { usuario } from "../../../backend/class/usuario.js";
import { alertaToast } from '../../../backend/swetAlert2';
import { listaOpciones } from '../../../backend/funcioneGenerales';
const classUsuario = new usuario();

export function RegistroFomulario() {
	/*-- Aqui se almacenan los valores de los campos del formularios --*/
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

	/*-- Aqui se almacena un boleano de cada dato que permite conocer si estan en el formato indicado  --*/
	const [datosCorrectos, setDatosCorrectos] = useState({
		nombres: false,
		apellidos: false,
		cedula: false,
		contacto: false,
		pregunta: false,
		respuesta: false,
		clave: false
	});

	/*-- Aqui validamos que todo este llenado correctamente */
	const todosLosDatosSonCorrectos = () => {
		for (let key in datosCorrectos) {
			if (datosCorrectos[key] === false) {
				return false;
			}
		};
		return true;
	};

	/*-- Actualiza el valor del dato del formulario en el estado --*/
	const actualizarDatos = (dato, correcto, key) => {
		setDatos(() => {
			let nuevosDatos = datos;
			nuevosDatos[key] = dato;
			if (key == "nombres" || key == "apellidos") nuevosDatos["nombre"] = `${nuevosDatos["nombres"]} ${nuevosDatos["apellidos"]}`;
			return nuevosDatos;
		});

		setDatosCorrectos(() => {
			let nuevosDatos = datosCorrectos;
			nuevosDatos[key] = correcto;
			return nuevosDatos;
		});
	}

	/*-- limpia los datos del formulario --*/
	const limpiarFormulario = () => {
		let formulario = document.querySelectorAll(".registroFomulario div input");
		formulario.forEach(input => input.value = "")

		setDatosCorrectos({
			nombres: false,
			apellidos: false,
			cedula: false,
			contacto: false,
			pregunta: true,
			respuesta: false,
			clave: false
		})
	}

	/*-- Eniva el formulario a la api para su procesamiento --*/
	const registarse = async (e) => {
		e.preventDefault();
		if (todosLosDatosSonCorrectos()) {
			classUsuario.registarse(datos)
				.then(resultado => {
					if (resultado == false) {
						alertaToast("warning", "Ocurrio un error", 5000, "top-end");
						throw new Error("Ocurrio un error");
					}
					alertaToast(
						resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? "error" : "success",
						resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? resultado[0]["RESULTADO"] : `${resultado[0]["RESULTADO"]}, COMUNIQUESE CON UN ADMINISTRADOR PARA SU VERIFICACION`,
						5000,
						"top-end");
					if (resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? false : true) {
						limpiarFormulario();
					}
				}).catch(function (error) {
					console.error(error);
				});
		} else {
			alertaToast("warning", "Aún hay datos sin llenar o incorrectos", 5000, "top-end");
		}
	}

	useEffect(() => {
		localStorage.removeItem("usuario");
		localStorage.removeItem("carritoCopia");
	});

	return (
		<>
			<div className="contenedor--centrado" style={{ position: "absolute", top: "0" }}>
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
						tipo="password"
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
						<BotonSencillo texto="Ingresar" manejarClik={() => console.log()}></BotonSencillo>
					</Link>
				</form>
			</div>
		</>
	);
};