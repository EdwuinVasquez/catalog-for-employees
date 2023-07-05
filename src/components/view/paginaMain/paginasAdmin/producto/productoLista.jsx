//importacion de librerias
import { React, useState, useEffect } from "react";
import { evaluate } from 'mathjs'
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";
import { admin } from "../../../../../backend/class/admin.js"
import { useDataContex } from "../../../contex.jsx"
const classAdmin = new admin();

export function ProductoLista() {
	const [datosMain, setDatosMain] = useState();
	
	const titulosTabla = ["Codigo", "Imagen", "Nombre", "Iva", "Descuento", "Precio producto", "Precio de venta", "Disponible", "Estado"]

	const precioVenta = (precio, iva, descuento) =>{
		return Math.ceil(evaluate(`(${precio}*1.${iva})-((${precio}*1.${iva})*${descuento}%)`));
	}

	const generarLista = async () => {
		classAdmin.productoBase()
		.then(resultado => {
			if(resultado === false){
				console.clear();
				throw new Error("No hay resultados almacenados");
			}
			let productosFiltrados = resultado.filter((tupla,index)=>{
    			return resultado.indexOf(
						resultado.find(valor => valor["CODIGO_PRODUCTO"] == tupla["CODIGO_PRODUCTO"])
						) === index;
  			});

			const nuevosDatos = productosFiltrados.map((valor) =>
				[{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "normal",
					valor: valor["CODIGO_PRODUCTO"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "imag",
					valor: valor["NOMBRE_PRODUCTO"],
					img: valor["IMAGEN_PRINCIPAL"],
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "normal",
					valor: valor["NOMBRE_PRODUCTO"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "normal",
					valor: valor["IVA"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "normal",
					valor: valor["DESCUENTO"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "costo",
					valor: valor["PRECIO_BASE"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "costo",
					valor: precioVenta(valor["PRECIO_BASE"], valor["IVA"], valor["DESCUENTO"]),
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "estado",
					valor: valor["PRODUCTO_DISPONIBLE"],
					img: "",
					subClase: valor["PRODUCTO_DISPONIBLE"],
					operacion: "",
					parametro: ""
				},{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					tipo: "estado",
					valor: valor["ESTADO_PRODUCTO"],
					img: "",
					subClase: valor["ESTADO_PRODUCTO"],
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
				buscadorNombre="Codigo o nombre" 
				buscadorTitulo="Productos"  
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain} >
			</TablaMain>
		</>
	);
};