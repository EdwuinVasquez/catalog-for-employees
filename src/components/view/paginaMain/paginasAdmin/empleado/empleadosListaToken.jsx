/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js"
import { alertaConfirmar, alertaToast } from "../../../../../backend/swetAlert2.js";
import { useDataContex } from "../../../contex.jsx";
const classAdmin = new admin();

export function EmpleadosListaToken() {
	const { urlBase } = useDataContex();

	/*-- Lista de empleados --*/
	const [datosMain, setDatosMain] = useState();
	
	/*-- Titulos de la tabla --*/
	const titulosTabla = ["Cedula", "Nombre", "N°compras", "Ingreso", "Contato", "Token", "Estado"]

	/*-- Generar Lista de empleados --*/
	const generarLista = async () => {
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
					tipo: "normal",
					valor: valor["CEDULA"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "normal",
					valor: valor["NOMBRE"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "normal",
					valor: valor["NUMERO_COMPRAS"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "normal",
					valor: valor["ULTIMO_INGRESO"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "normal",
					valor: valor["CONTACTO"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "boton",
					valor: "Activar token",
					img: "",
					subClase: "RiLoginCircleFill",
					operacion: modificarEstadoEmpleado,
					parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "estado",
					valor: valor["USUARIO_ACTIVADO"],
					img: "",
					subClase: valor["USUARIO_ACTIVADO"],
					operacion: "",
					parametro: ""
				}]
			);
			if(nuevosDatos.length > 0) setDatosMain(nuevosDatos);
			if(nuevosDatos.length <= 0) setDatosMain([[]]);
		}).catch(function (error) {
			setDatosMain([[]]);
			console.error(error);
		});
	}

	/*-- Modificar el estado del empleado --*/
	const modificarEstadoEmpleado = async (cedula, dato) =>{
		const nuevoEstado = {
			cedula: cedula,
			estado: 1,
		}

		alertaConfirmar(
			"Segur@ que deseas activar el Token", 
			`Ingresaras en la cuenta del empleado, si el empleado esta bloqueado sera activado y tu cuenta de administrador sera cerrada`, 
			"warning")
		.then(confirm =>{

			if(confirm){
				classAdmin.modificarEstadoUsuario(nuevoEstado)
				.then(resultado =>{
					if(resultado === false){
						console.clear();
						alertaToast("warning", "Ocurrio un error", 5000, "top-end");
						throw new Error("No hay resultados almacenados");
					}
					classAdmin.usuarios(cedula)
		      .then(resultado =>{
		      	if(resultado[0]['CEDULA'] == undefined){
							alertaToast("warning", "Ocurrio un error", 5000, "top-end");
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
		      }).catch(function (error) {
						console.error(error);
					});
				}).catch(function (error) {
					console.error(error);
				});
			}
			console.log(confirm)
		}).catch(function (error) {
			console.error(error);
		});
		
	}

  return(
		<>
			<TablaMain 
				buscadorNombre="Cedula o nombre" 
				buscadorTitulo="Empleados Token"  
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain} >
			</TablaMain>
		</>
	);
};