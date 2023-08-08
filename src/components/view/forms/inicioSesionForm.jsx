/*-- Estilos --*/
import '../../style/forms/inicioSesionForm.css';

/*-- Librerias --*/
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

/*-- Componentes --*/
import { BotonSencillo } from "../botones/botonSencillo.jsx";
import { BotonLink } from "../botones/botonLink.jsx";
import { Logo } from "../logos/logo.jsx";
import { TituloCentradolo } from "../titulos/tituloCentrado.jsx";
import { SubtituloCentrado } from "../subtitulos/subtituloCentrado.jsx";
import { CampoIcono } from "../inputs/inputIcono.jsx";

/*-- clases y controladores --*/
import { usuario } from "../../../backend/class/usuario.js";
import { useDataContex } from "../contex.jsx";
import { alertaInput, alertaToast } from "../../../backend/swetAlert2.js"
const classUsuario = new usuario();

export function LoginFomulario() {
	/*-- Ruta de la ubicacion de las imagenes en el servidor  --*/
	const { urlBase } = useDataContex();

	/*-- Valores de los datos en el formulario --*/
	const [datos, setDatos] = useState(
		{
			cedula: "",
			clave: ""
		}
	);

	/*-- actualizar el estado con el nuevo valor ingresado en el formulario --*/
	const actualizarDatos = (dato, key) => {
		setDatos(() => {
			let nuevosDatos = datos;
			nuevosDatos[key] = dato;
			return nuevosDatos;
		});
	}

	/*-- Envia los datos a la api para su procesamiento  --*/
	const iniciarSesion = (e) => {
		e.preventDefault();
		classUsuario.ingresar(datos['cedula'], datos['clave'])
			.then(resultado => {
				if (resultado.name !== undefined) {
					throw new Error(`${resultado.message}`);
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
				alertaToast("error",
					`${Error.message}`,
					5000,
					"top-end");
			});
	}

	useEffect(() => {
		localStorage.removeItem("carritoCopia");
	});

	const loginPregunta = (() => {
		alertaInput("Ingrese su número de cédula")
			.then(resultado => {
				if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
				const nuevosDatos = {
					cedula: resultado,
				}
				loginSinClave(nuevosDatos);
			}).catch((error) => {
				console.log(error)
			})
	});

	const loginSinClave = ((datos) => {
		classUsuario.ingresarConPregunta(datos['cedula'])
			.then(resultado => {
				console.log(resultado)
				if (resultado.name !== undefined) {
					throw new Error(`${resultado.message}`);
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
				alertaToast("error",
					`${Error.message}`,
					5000,
					"top-end");
			});
	})

	return (
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
					<BotonLink manejarClick={loginPregunta} texto="Olvido su contraseña?"></BotonLink>
					<BotonSencillo texto="Ingresar" manejarClik={iniciarSesion}></BotonSencillo>
					<Link to="/registro">
						<BotonSencillo texto="Registrarse" manejarClik={() => { console.log("a") }}></BotonSencillo>
					</Link>
				</form>
			</div>
		</>
	);
};