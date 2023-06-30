//importacion de librerias
import { React, useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { BotonSencillo } from "../botones/botonSencillo.jsx";
import { BotonLink } from "../botones/botonLink.jsx";
import { Logo } from "../logos/logo.jsx";
import { TituloCentradolo } from "../titulos/tituloCentrado.jsx";
import { SubtituloCentrado } from "../subtitulos/subtituloCentrado.jsx";
import { CampoIcono } from "../inputs/inputIcono.jsx";
import { usuario } from "../../../backend/class/usuario.js";
import '../../style/forms/inicioSesionForm.css'
import { RegistroFomulario } from "./registroForm.jsx";
import { useDataContex } from "../contex.jsx";
const classUsuario = new usuario();

export function LoginFomulario() {
	const { urlBase } = useDataContex();

	const [datos, setDatos] = useState(
		{
			cedula: "",
			clave: ""
		}
	);

	const actualizarDatos = (dato, key) =>{
		setDatos(() => {
			let nuevosDatos = datos;
			nuevosDatos[key] = dato;
			return nuevosDatos;
		});
  }

	const ingresar = (e) =>{
		e.preventDefault();
		classUsuario.ingresar(datos['cedula'], datos['clave'])
		.then(resultado =>{
			if(resultado[0]['CEDULA'] == undefined){
				throw new Error(resultado);
			}	
			let sesion = {
				cedula: resultado[0]['CEDULA'],
				clave: resultado[0]['CLAVE'],
				nombre: resultado[0]['NOMBRE'],
				rol: resultado[0]['ROL'],
				conctacto: resultado[0]['CONTACTO']
			};
			localStorage.removeItem("usuario");
			localStorage.setItem("usuario", JSON.stringify(sesion));
			window.location.href = `${urlBase}process`;
		})
		.catch(function (Error) {
      console.error(Error);
    });
	}

  return(
		<>
		<div className="contenedor--centrado">
			<form className="loginFomulario">
				<Logo></Logo>
				<TituloCentradolo texto=""></TituloCentradolo>
				<SubtituloCentrado 
					texto="Bienvenido al catalogo de los empleados, antes de empezar ingrese a su cuenta"
					></SubtituloCentrado>
				<CampoIcono id="cedula" titulo="Cedula" icono="AiOutlineUser" tipo="number" manejarCambio={actualizarDatos}></CampoIcono>
				<CampoIcono id="clave" titulo="Clave" icono="GoLock" tipo="password" manejarCambio={actualizarDatos}></CampoIcono>
				<BotonLink texto="Olvido su contraseña?"></BotonLink>
				<BotonSencillo texto="Ingresar" manejarClik={ingresar}></BotonSencillo>
				<Link to="/registro">
					<BotonSencillo texto="Registrarse" manejarClik={() => {console.log("a")}}></BotonSencillo>
				</Link>
			</form>
		</div>

		<Routes>
    	<Route path="/registro/*" element={<RegistroFomulario />} />
			<Route path="*" element={null}/>
    </Routes>
		</>
	);
};