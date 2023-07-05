/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js"
import { alertaConfirmar, alertaToast } from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();


export function EmpleadosLista() {
	/*-- Lista de empleados --*/
	const [datosMain, setDatosMain] = useState();
	
	/*-- Titulos de la tabla --*/
	const titulosTabla = ["Cedula", "Nombre", "N°compras", "Ingreso", "Contato", "Cambiar estado", "Eliminar empleado", "Estado"]

	/*-- Generar lista de empleados --*/
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
					valor: "Modificar",
					img: "",
					subClase: "estadoUsuario",
					operacion: modificarEstadoEmpleado,
					parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "boton",
					valor: "Eliminar",
					img: "",
					subClase: "eliminarUsuario",
					operacion: eliminarEstadoEmpleado,
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

	/*-- Modificar Empleado --*/
	const modificarEstadoEmpleado = async (cedula, dato) =>{
		const nuevoEstado = {
			cedula: cedula,
			estado: dato,
		}

		classAdmin.modificarEstadoUsuario(nuevoEstado)
		.then(resultado =>{
			if(resultado === false){
				console.clear();
				alertaToast("warning", "Ocurrio un error", 5000, "top-end");
				throw new Error("No hay resultados almacenados");
			}
			alertaToast(
				resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? "error" : "success", 
				resultado[0]["RESULTADO"], 
				5000, 
				"top-end");
			generarLista();
		}).catch(function (error) {
			console.error(error);
		});
	}

	/*-- Eliminar Empleado --*/
	const eliminarEstadoEmpleado = async (cedula, dato) =>{
		alertaConfirmar(
			"Segur@ que desea eliminar el empleado", 
			`El empleado con el numero de cedula "${cedula}" sera eliminado si no cuenta con ventas registradas`, 
			"warning")
		.then(confirm =>{

			if(confirm){
				classAdmin.eliminarEmpleado(cedula)
				.then(() =>{
			
					classAdmin.usuarios(cedula)
					.then(resultado =>{
						console.log(resultado);
						if(resultado.length == 0){
							alertaToast(
								"success", 
								"EL USUARIO HA SIDO ELIMINADO", 
								5000, 
								"top-end");
								generarLista();
						}else{
							alertaToast("warning", "EL USUARIO NO SE PUDO ELIMINAR", 5000, "top-end");
						}
					});
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
				buscadorTitulo="Empleados"  
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain} >
			</TablaMain>
		</>
	);
};