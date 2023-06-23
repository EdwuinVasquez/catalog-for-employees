//importacion de librerias
import { React, useState } from "react";
import { TablaMain } from "../../tablas/tablaMain/tablaMain.jsx";
import { admin } from "../../../../backend/class/admin.js"
const classAdmin = new admin();

export function EmpleadosLista({titulo, icono, tipo}) {
	const [datosMain, setDatosMain] = useState
	([[{
		key: 1234,
		tipo: "normal",
		valor: "",
		img: "",
		subClase: ""
	}]]);
	
	const titulosTabla = ["Cedula", "Nombre", "N°compras", "Ingreso", "Contato", "Estado", "Operacion"]

	const generarLista = async () => {
		classAdmin.usuarios()
		.then(resultado => {
			if(resultado === false){
				console.log("d");
			}
			let nuevosDatos = resultado.map((valor) =>
				[{
					key: valor["CEDULA"],
					tipo: "normal",
					valor: valor["CEDULA"],
					img: "",
					subClase: ""
				},{
					key: valor["CEDULA"],
					tipo: "normal",
					valor: valor["NOMBRE"],
					img: "",
					subClase: ""
				},{
					key: valor["CEDULA"],
					tipo: "imag",
					valor: valor["NUMERO_COMPRAS"],
					img: "",
					subClase: ""
				},{
					key: valor["CEDULA"],
					tipo: "normal",
					valor: valor["ULTIMO_INGRESO"],
					img: "",
					subClase: ""
				},{
					key: valor["CEDULA"],
					tipo: "normal",
					valor: valor["CONTACTO"],
					img: "",
					subClase: ""
				},{
					key: valor["CEDULA"],
					tipo: "estado",
					valor: valor["USUARIO_ACTIVADO"],
					img: "",
					subClase: valor["USUARIO_ACTIVADO"]
				}]
			);
			setDatosMain(nuevosDatos);
		}).catch(function (error) {
			console.error(error);
		});
	}

	

  return(
		<>
			<TablaMain 
				buscadorNombre="Nombre" 
				buscadorTitulo="Empleados" 
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain} >
			</TablaMain>
			<button onClick={() => generarLista()}> ass</button>
		</>
	);
};