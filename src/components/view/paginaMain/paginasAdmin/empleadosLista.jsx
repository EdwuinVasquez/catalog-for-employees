//importacion de librerias
import { React, useState, useEffect } from "react";
import { TablaMain } from "../../tablas/tablaMain/tablaMain.jsx";
import { admin } from "../../../../backend/class/admin.js"
import { useDataContex } from "../../contex.jsx"
const classAdmin = new admin();

export function EmpleadosLista() {
	const [datosMain, setDatosMain] = useState();
	
	const titulosTabla = ["Cedula", "Nombre", "N°compras", "Ingreso", "Contato", "Operacion", "Estado"]

	const generarLista = async () => {
		classAdmin.usuarios()
		.then(resultado => {
			if(resultado === false){
				console.clear();
				throw new Error("No hay resultados almacenados");
			}
			const empleadosLista = resultado.filter(tupla => tupla["ROL"] === "EMPLEADO");
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
					subClase: "",
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
		}).catch(function (error) {
			setDatosMain([[]]);
			console.error(error);
		});
	}

	const modificarEstadoEmpleado = async (cedula, dato) =>{
		const nuevoEstado = {
			cedula: cedula,
			estado: dato,
		}

		classAdmin.modificarEstadoUsuario(nuevoEstado)
		.then(resultado =>{
			if(resultado === false){
				console.clear();
				throw new Error("No hay resultados almacenados");
			}
			
			generarLista();
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