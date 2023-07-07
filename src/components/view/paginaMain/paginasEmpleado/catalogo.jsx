/*-- Librerias --*/
import { React, useEffect, useState } from "react";
import { evaluate } from 'mathjs'

/*-- Componentes --*/
import { CardProducto } from "../../cards/cardProducto/cardProducto.jsx";
import { PaginadorBasico } from "../../paginador/paginado.jsx";
import { Buscador } from "../../inputs/buscador.jsx";
import { CarritoBoton } from "../../badge/carrito.jsx";
import { CardProductoDetalles } from "../../cards/cardProductoDetalles/cardProductoDetalles.jsx";

/*-- Clases y controladores --*/
import { emple } from "../../../../backend/class/empleado.js"
import { useDataContex } from "../../contex.jsx"
const classEmple = new emple();

/*-- Variables iniciales --*/
const paginaInicial = 0;
const elementosPorPagina = 20;

export function CatalogoCards() {
	/*-- Vista de detalles activada --*/
	const {detallesActivo, setDetallesActivo } = useDataContex();

	/*-- Lista de catalogo completa --*/
	const [datosCompletos, setDatosCompletos] = useState();

	/*-- Lista de productos sin detalles de estilos --*/
	const [datosMain, setDatosMain] = useState();

	/*-- Lista de productos en pantalla --*/
	const [datosFiltrados, setDatosFiltrados] = useState();

	/*-- numero de paginas  --*/
	const [numeroPaginas, setNumeroPaginas] = useState();

	/*-- Localizacion de la pagina --*/
	const [paginaActual, setPaginaActual] = useState(paginaInicial);
	
	/*-- Producto a ver sus detalles --*/
	const [idProductosSeleccionado, setIdProductosSeleccionado] = useState(0);
	
	useEffect = (() =>{
		if(idProductosSeleccionado === 0){
			setDetallesActivo(false);
			setIdProductosSeleccionado(-1)
		} 
	})

	/*-- Formatear a precio de venta --*/
	const precioVenta = (precio, iva, descuento) =>{
		return Math.ceil(evaluate(`(${precio}*1.${iva})-((${precio}*1.${iva})*${descuento}%)`));
	}

	/*-- Formatear a precio de Base --*/
	const precioBase = (precio, iva) =>{
		return Math.ceil(evaluate(`(${precio}*1.${iva})`));
	}

	/*-- Generar la lista de productos --*/
	const generarLista = async () => {
		classEmple.productoBase()
		.then(resultado => {
			if(resultado === false){
				console.clear();
				throw new Error("No hay resultados almacenados");
			}
			let productosFiltrados = resultado.filter((tupla,index)=>{
    		return resultado.indexOf(
						resultado.find(valor => valor["CODIGO_PRODUCTO"] == tupla["CODIGO_PRODUCTO"])
						) === index && tupla["PRODUCTO_DISPONIBLE"] == 1;
  			});

			const nuevosDatosCompletos = resultado.map((valor) =>
				[{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					nombre: valor["NOMBRE_PRODUCTO"],
					img: valor["IMAGEN_PRINCIPAL"],
					valor: precioVenta(valor["PRECIO_BASE"], valor["IVA"], valor["DESCUENTO"]),
					valorBase: precioBase(valor["PRECIO_BASE"], valor["IVA"]),
					detalles: valor["DETALLES"],
					nombreItem: `${valor["NOMBRE_PRODUCTO"]} - ${valor["NOMBRE_ESTILO"]}`,
					estilo: valor["NOMBRE_ESTILO"],
					imgItem: valor["IMAGEN_EXTRA"],
					disponible: valor["DISPONIBLE"],
					stock: valor["STOCK"],
					tipoContenido: valor["TIPO_CONTENIDO"],
					contenido: valor["CONTENIDO"],
					estadoDetalles: detallesActivo
				}]
			);

			const nuevosDatos = productosFiltrados.map((valor) =>
				[{
					key: valor["CODIGO_PRODUCTO"],
					id: valor["CODIGO_PRODUCTO"],
					nombre: valor["NOMBRE_PRODUCTO"],
					img: valor["IMAGEN_PRINCIPAL"],
					valor: precioVenta(valor["PRECIO_BASE"], valor["IVA"], valor["DESCUENTO"]),
					valorBase: precioBase(valor["PRECIO_BASE"], valor["IVA"]),
					detalles: valor["DETALLES"],
					buscarProducto: setIdProductosSeleccionado
				}]
			);

			if(nuevosDatos.length > 0){
				setDatosMain(nuevosDatos);
				setDatosFiltrados(nuevosDatos);
				setDatosCompletos(nuevosDatosCompletos);
				setNumeroPaginas(Math.ceil(nuevosDatos.length / elementosPorPagina));
			}else{
				setDatosMain([[]]);
				setDatosFiltrados([[]]);
				setDatosCompletos([[]]);
				setNumeroPaginas(1);
			}
		}).catch(function (error) {
			setDatosMain([[]]);
			console.error(error);
		});
	}

	/*-- Cargar datos de pagina en pantalla --*/
	const datos = (() =>{
    try {
			const corteInicio = paginaActual * elementosPorPagina;
			const corteFinal = corteInicio + elementosPorPagina;
			const listaElementosPagina = (datosFiltrados.slice(corteInicio, corteFinal));
      if(datosFiltrados[0].length >= 1){
        return listaElementosPagina.map((valor) =>
          <CardProducto 
				key={valor[0]["key"]} 
				nombre={valor[0]["nombre"]} 
				detalles={valor[0]["detalles"]} 
				imagen={valor[0]["img"]} 
				valor={valor[0]["valor"]} 
				id={valor[0]["id"]} 
				buscarProducto={setIdProductosSeleccionado}
			></CardProducto>
        )
      }else{
        return <h1>No hay datos almacenados</h1>
      }
    } catch (error) {
      generarLista();
    }
  });

	/*-- Filtar elementos --*/
	const BuscarElementos = ((buscar) =>{
		try {
			if(datosMain[0].length <= 0 || (buscar == "" || buscar == null)) {
				setDatosFiltrados(datosMain);
				setNumeroPaginas(Math.ceil(datosMain.length / elementosPorPagina));
				return;
			}
			let nuevosDatos = datosMain.filter((tupla)=>{
				return tupla[0]['nombre'].toUpperCase().includes(buscar) ;
				});

			if(nuevosDatos.length > 0){
				setPaginaActual(0);
				setDatosFiltrados(nuevosDatos);
				setNumeroPaginas(Math.ceil(nuevosDatos.length / elementosPorPagina));
			}else{
				setDatosFiltrados(datosMain);
				setNumeroPaginas(Math.ceil(datosMain.length / elementosPorPagina));
			}
		} catch (error) {
			console.log(error)
		}
	});

	/*-- Cargar vista de datos detallados --*/
	const datosDetallados = (() =>{
    try {
			let productosSeleccionado = datosCompletos.filter(tupla => 
				tupla[0]["id"] == idProductosSeleccionado 
				&& tupla[0]["disponible"] == 1);
			console.log(productosSeleccionado)
			if(productosSeleccionado.length < 1){
				productosSeleccionado = datosCompletos.filter(tupla => 
				tupla[0]["id"] == idProductosSeleccionado);
			}
			return <>
				<CardProductoDetalles 
					key={productosSeleccionado[0][0]["key"]} 
					nombre={productosSeleccionado[0][0]["nombre"]} 
					detalles={productosSeleccionado[0][0]["detalles"]} 
					imagen={productosSeleccionado[0][0]["img"]} 
					valor={productosSeleccionado[0][0]["valor"]} 
					valorBase={productosSeleccionado[0][0]["valorBase"]} 
					lista={productosSeleccionado}
					id={productosSeleccionado[0][0]["id"]} 
					estadoDetalle={detallesActivo}
				></CardProductoDetalles>
			</>

    } catch (error) {
      console.log(error);
    }
  });

  return(
		<>
		<div className="contenedor__buscador">
			<Buscador placeholder="buscar" manejarClick={BuscarElementos}></Buscador>
		</div>
		<div className="contenedor__badge">
			<CarritoBoton numero="0" manejarClick={BuscarElementos}></CarritoBoton>
		</div>
		<div className={`contenedor__grid  `}>
			{datos()}
		</div>
		<div className={`contenedor__paginador`}>
			<PaginadorBasico 
				numeroPaginas={numeroPaginas}
				navegar={setPaginaActual}
			></PaginadorBasico>
		</div>
		<div className={`contenedor__detallesProducto  ${detallesActivo && idProductosSeleccionado != 0 ? "" : "contenedor__detallesProducto--desactiva"}`}>
			{datosDetallados()}
		</div>
		</>
	);
};