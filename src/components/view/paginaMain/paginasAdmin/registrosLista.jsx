//importacion de librerias
import { React, useState, useEffect } from "react";
import { TablaMain } from "../../tablas/tablaMain/tablaMain.jsx";
import { admin } from "../../../../backend/class/admin.js"
import { useDataContex } from "../../contex.jsx"
const classAdmin = new admin();

export function RegistroLista() {
	const [datosMain, setDatosMain] = useState();
	
	const titulosTabla = ["Cedula", "Nombre", "Registro", "Contato", "Operacion", "Estado"]

	const generarLista = async () => {
		classAdmin.usuarios()
		.then(resultado => {
			if(resultado === false){
				console.clear();
				throw new Error("No hay resultados almacenados");
			}
			const empleadosLista = resultado.filter(tupla => tupla["ROL"] === "EMPLEADO" && tupla["USUARIO_VERIFICADO"] === "0");
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
					valor: valor["FECHA_REGISTRO"],
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
					subClase: "estadoUsuarioPendiente",
					operacion: modificarEstadoEmpleado,
					parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
				},{
					key: valor["CEDULA"],
					id: valor["CEDULA"],
					tipo: "estado",
					valor: "3",
					img: "",
					subClase: "3",
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
				buscadorTitulo="Sin verificar"  
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain} >
			</TablaMain>
		</>
	);
};