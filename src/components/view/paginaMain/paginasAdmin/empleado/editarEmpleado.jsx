/*-- Estilos --*/
import '../../../../style/forms/registroForm.css'; 

/*-- Librerias --*/
import { React, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";

/*-- Componentes --*/
import { BotonSencillo } from "../../../botones/botonSencillo.jsx";
import { TituloInicio } from "../../../titulos/tituloInicio.jsx";
import { CampoVerificado } from "../../../inputs/inputBase.jsx";

/*-- Clases y controladores --*/
import { regex } from "../../../../../backend/regex.js";
import { admin } from "../../../../../backend/class/admin.js";
import { SelectBase } from "../../../inputs/selectBase.jsx";
import { alertaToast } from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();

export function EditarEmpleado({}) {

	/*-- Lista de empleados --*/
	const [datosMain, setDatosMain] = useState();

	/*-- Datos introducidos --*/
	const [datos, setDatos] = useState({
		cedula: "",
		nombre: "",
		clave: "",
		contacto: "",
		pregunta: "",
		respuesta: ""
	});

	/*-- Estado de los datos --*/
	const [formCorrecto, setFormCorrecto] = useState({
		cedula: false,
		nombre: true,
		contacto: true,
		clave: false
	});

	/*-- Verificacion completa de los campos --*/
	const verificarEnvio = () => {
		for (let key in formCorrecto) {
			if (formCorrecto[key] === false){
				return false;
			}};
			return true;
	};

	/*-- Manejo de actualizacion de campos --*/
	const actualizarDatos = (dato, correcto, key) =>{
		setDatos(() => {
			let nuevosDatos = datos;
			nuevosDatos[key] = dato;
			return nuevosDatos;
		});

		setFormCorrecto(() => {
			let nuevosDatos = formCorrecto;
			nuevosDatos[key] = correcto;
			return nuevosDatos;
		});

		if(key == "cedula"){
			
			let empleadoSeleccionado = datosMain.find((tupla) =>
				tupla[0]["valor"] == dato
			)
			setDatos(() =>{
				let nuevosDatos ={
					cedula: empleadoSeleccionado[0]['cedula'],
					nombre: empleadoSeleccionado[0]['nombre'],
					clave: '',
					contacto: empleadoSeleccionado[0]['contacto'],
					pregunta: empleadoSeleccionado[0]['pregunta'],
					respuesta: empleadoSeleccionado[0]['respuesta']
				};
			return nuevosDatos;
			})

			limpiarFormulario();
		}
  }

	/*-- Generar la lista de empleados --*/
	const listarEmpleados = () =>{
		classAdmin.usuarios()
		.then(resultado => {
			if(resultado === false){
				console.clear();
				throw new Error("No hay resultados almacenados");
			}
			const empleadosLista = resultado.filter(tupla => 
				tupla["ROL"] === "EMPLEADO" && tupla["USUARIO_VERIFICADO"] === "1"
			);
			const nuevosDatos = empleadosLista.map((valor) =>
				[{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					valor: valor["CEDULA"],
					cedula: valor["CEDULA"],
					nombre: valor["NOMBRE"],
					contacto: valor["CONTACTO"],
					clave: valor["CLAVE"],
					respuesta: valor["PREGUNTA"],
					pregunta: valor["RESPUESTA"]
				}]
			);
			if(nuevosDatos.length > 0) setDatosMain(nuevosDatos);
			if(nuevosDatos.length <= 0) setDatosMain([[]]);
		}).catch(function (error) {
			setDatosMain([[]]);
			console.error(error);
		});
	}

	/*-- limpiar formulario --*/
	const limpiarFormulario = () =>{
		let formulario = document.querySelectorAll(".registroFomulario div input");
		formulario.forEach(input => input.value="")

		setFormCorrecto({
			cedula: true,
			nombre: false,
			clave: false
		})
	}

	/*-- Actualizar datos --*/
	const actualizar = async (e) =>{
		e.preventDefault();
		if(verificarEnvio()) {
			classAdmin.modificarDatosUsuario(datos)
			.then(resultado => {
				if(resultado == false){
					alertaToast("error", "Ocurrio un error", 5000, "top-end");
					throw new Error("Ocurrio un error");
				}
				alertaToast("success", resultado[0]["RESULTADO"], 5000, "top-end");
				listarEmpleados();
				limpiarFormulario();
			}).catch(function (error) {
				console.error(error);
			});
		}else{
			alertaToast("warning", "Aun hay datos sin llenar o en un formato equivocado", 5000, "top-end");
		}
  }

  return(
		<>
		<div className="contenedor--centrado">
			<form className="registroFomulario">
				<TituloInicio texto="Modificar empleado" ></TituloInicio>
				<SelectBase 
					id="cedula" 
					expresion={regex.cedula} 
					texto="Cedula" 
					listaOpciones={datosMain}
					manejarCambio={actualizarDatos}
					manejarNull={listarEmpleados}
					></SelectBase>
				<CampoVerificado 
					id="nombre" 
					expresion={regex.nombre} 
					texto="Nombre" 
					tipo="text" 
					placeholder={datos['nombre']} 
					manejarCambio={actualizarDatos}
					></CampoVerificado>
				<CampoVerificado 
					id="clave" 
					expresion={regex.clave} 
					texto="Clave" 
					tipo="password"
					placeholder="" 
					manejarCambio={actualizarDatos}
					></CampoVerificado>
				<BotonSencillo texto="Modificar" manejarClik={actualizar}></BotonSencillo>
			</form>
		</div>
		</>
	);
};