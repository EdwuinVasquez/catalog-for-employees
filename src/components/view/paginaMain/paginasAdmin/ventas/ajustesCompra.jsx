/*-- Librerias --*/
import { React, useState } from "react";
import { useSnackbar } from 'notistack';
import { round } from 'mathjs';

/*-- Componentes --*/
import { BuscadorSelect } from "./selectCompra.jsx";
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";
import { CarritoTotalAdmin } from "../../../badge/totalAdmin.jsx";
import { AgregarItem } from "../../../badge/itemNuevo.jsx";

/*-- clases y controladores --*/
import { useDataContex } from "../../../contex.jsx";
import { admin } from "../../../../../backend/class/admin.js"
import { cerrarAlertaAction as action, precioVenta } from "../../../../../backend/funcioneGenerales.js";
import { alertaToast } from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();

/*-- Titulos tabla --*/
const titulosTabla = ["Codigo", "Nombre", "Iva", "Descuento", "Cantidad", "Valor unitario", "Valor total", "Borrar"]

export function AjustesCompra() {
	/*-- Estado de datos de la tabla --*/
	const [datosMain, setDatosMain] = useState();

	/*-- Estado de datos de la tabla --*/
	const [cedulaEmpleado, setCedulaEmpleado] = useState();

	/*-- Estado de datos de la tabla --*/
	const [codigoCompra, setCodigoCompra] = useState();

	/*-- Estado de datos del select --*/
	const [datosSelect, setDatosSelect] = useState([{}]);

	/*-- Estado global carrito  --*/
	const { carrito, setCarrito } = useDataContex();

	/*-- Borrar Item alerta --*/
	const { enqueueSnackbar } = useSnackbar();

	/*-- Datos del select --*/
	const listaDeComprasSelet = (() => {
		classAdmin.venta()
			.then(resultado => {
				if (resultado === false) {
					throw new Error("No hay resultados almacenados");
				}
				const listaDatos = resultado.filter((tupla, index) => {
					return resultado.indexOf(
						resultado.find(valor => valor["VENTA_CODIGO_VENTA"] == tupla["VENTA_CODIGO_VENTA"])
					) === index;
				});
				setDatosSelect(listaDatos.map((tupla) => {
					return { label: `${tupla["VENTA_CODIGO_VENTA"]} - ${tupla["USUARIO_NOMBRE"]}` }
				}))
			}).catch(function (error) {
				return [];
			});
	});

	/*-- Carga los datos de la compra en pantalla --*/
	const obtenerDatosCompra = ((compra) => {
		classAdmin.venta()
			.then(resultado => {
				if (resultado === false) {
					throw new Error("No hay resultados almacenados");
				}
				const DatosCompra = resultado.filter(valor => `${valor["VENTA_CODIGO_VENTA"]} - ${valor["USUARIO_NOMBRE"]}`.toUpperCase() == compra)

				const nuevoCarrito = DatosCompra.map(valor => {
					return [{
						key: valor["ITEM_ID_PRODUCTO"],
						id: valor["ITEM_ID_PRODUCTO"],
						nombre: valor["ITEM_NOMBRE_ITEM"],
						iva: valor["ITEM_IVA"],
						descuento: valor["ITEM_DESCUENTO"],
						img: "",
						valor: valor["ITEM_VALOR_DESCUENTO"],
						valorBase: valor["ITEM_VALOR_IVA"],
						valorSinIva: valor["ITEM_VALOR_BASE"],
						detalles: "",
						nombreItem: valor["ITEM_NOMBRE_ITEM"],
						cantidad: valor["ITEM_CANTIDAD"],
						estilo: valor["ITEM_NOMBRE_ITEM"],
						cedula: valor["VENTA_CEDULA_USUARIO"],
						venta: valor["VENTA_CODIGO_VENTA"],
						imgItem: "",
						disponible: "1",
						stock: "0",
						tipoContenido: "0",
						contenido: "0",
						informacionAdicional: valor["ITEM_INFORMACION_ADICIONAL"],
						estadoDetalles: false
					}]
				});

				setCedulaEmpleado(DatosCompra[0]["VENTA_CEDULA_USUARIO"])
				setCodigoCompra(DatosCompra[0]["VENTA_CODIGO_VENTA"])
				setCarrito(nuevoCarrito);
				classAdmin.actualizarCarrito(nuevoCarrito);
			}).catch(function (error) {
				setCarrito([])
			});
	})

	/*-- manejar cambio Iva --*/
	const manejarCambioIva = ((e, productoSelect) => {
		if (productoSelect != 0 && productoSelect[0] != undefined) {
			const nuevoValor = round(e.target.value);
			const nuevoCarrito = carrito.map(item => {
				if (item[0]["nombreItem"] == productoSelect[0]['nombreItem']) {
					if (nuevoValor > 0) {
						item[0]["iva"] = nuevoValor;
						item[0]["valor"] = precioVenta(item[0]["valorSinIva"], nuevoValor, item[0]["descuento"])
						return item;
					}
					return item;
				} else {
					return item;
				}
			});

			alertaToast("success", "IVA modificado", 4000, "top");
			setCarrito(nuevoCarrito);
			classAdmin.actualizarCarrito(nuevoCarrito);
			generarLista();
		}
	});

	/*-- manejar cambio Nombre --*/
	const manejarCambioNombre = ((e, productoSelect) => {
		if (productoSelect != 0 && productoSelect[0] != undefined) {
			const nuevoValor = e.target.value.trim().toUpperCase();
			const nuevoCarrito = carrito.map(item => {
				if (item[0]["nombreItem"] == productoSelect[0]['nombreItem']) {
					if (nuevoValor.length > 0) {
						item[0]["nombreItem"] = nuevoValor;
						return item;
					}
					return item;
				} else {
					return item;
				}
			});

			alertaToast("success", "Nombre modificado", 4000, "top");
			setCarrito(nuevoCarrito);
			classAdmin.actualizarCarrito(nuevoCarrito);
			generarLista();
		}
	});

	/*-- manejar cambio Iva --*/
	const manejarCambioDescuento = ((e, productoSelect) => {
		if (productoSelect != 0 && productoSelect[0] != undefined) {
			const nuevoValor = e.target.value;
			const nuevoCarrito = carrito.map(item => {
				if (item[0]["nombreItem"] == productoSelect[0]['nombreItem']) {
					if (nuevoValor > 0) {
						item[0]["descuento"] = nuevoValor;
						item[0]["valor"] = precioVenta(item[0]["valorSinIva"], item[0]["iva"], nuevoValor)
						return item;
					}
					return item;
				} else {
					return item;
				}
			});

			alertaToast("success", "Descuento modificado", 4000, "top");
			setCarrito(nuevoCarrito);
			classAdmin.actualizarCarrito(nuevoCarrito);
			generarLista();
		}
	});

	/*-- Generar lista de los items --*/
	const generarLista = async () => {
		try {
			if (!(cedulaEmpleado != undefined && cedulaEmpleado != "")
				&& !(codigoCompra != undefined && codigoCompra != "")) {
				setDatosMain([[]]);
				throw new Error("No hay resultados almacenados");
			}
			const nuevosDatos = carrito.map((valor) =>
				[{
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "normal",
					valor: valor[0]["id"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "inputText",
					valor: valor[0]["nombreItem"],
					img: "",
					subClase: "",
					operacion: manejarCambioNombre,
					parametro: valor
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "inputNumber",
					valor: valor[0]["iva"],
					img: "",
					subClase: "",
					operacion: manejarCambioIva,
					parametro: valor
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "inputNumber",
					valor: valor[0]["descuento"],
					img: "",
					subClase: "",
					operacion: manejarCambioDescuento,
					parametro: valor
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "botonCantidad",
					valor: valor[0]["cantidad"],
					img: "",
					subClase: "",
					operacion: validarItemCarrito,
					parametro: valor,
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "costo",
					valor: valor[0]["valor"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "costo",
					valor: (valor[0]["valor"] * valor[0]["cantidad"]),
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				}, {
					key: valor[0]["id"],
					id: valor[0]["id"],
					tipo: "boton",
					valor: "Eliminar item",
					img: "",
					subClase: "basurero",
					operacion: eliminarProductoCarrito,
					parametro: valor,
				}]
			);
			if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
			if (nuevosDatos.length <= 0) setDatosMain([[]]);
		} catch (error) {
			return error;
		} finally {
			listaDeComprasSelet();
		}
	}

	/*-- Validar producto existente en el carrito --*/
	const validarItemCarrito = ((productoSelect, operacion) => {
		if (productoSelect != 0 && productoSelect[0] != undefined) {
			if (carrito.length <= 0) {
				setCarrito([productoSelect]);
				classAdmin.actualizarCarrito([productoSelect]);
			} else {
				let buscarProducto = carrito.some(
					value => value[0]["nombreItem"] == productoSelect[0]['nombreItem']
				);
				if (buscarProducto) {
					modificarProductoCarrito(productoSelect, operacion);
					generarLista();
				}
			}
		}
	})

	/*-- Modificar la cantidad de un item --*/
	const modificarProductoCarrito = ((producto, operacion) => {
		let nuevoCarrito = carrito.map(item => {
			if (item[0]["nombreItem"] == producto[0]['nombreItem']) {
				let cantidad = item[0]["cantidad"];
				if (operacion == "+") {
					item[0]["cantidad"]++;
					return item;
				} else if (cantidad - 1 > 0 && operacion == "-") {
					item[0]["cantidad"]--;
					return item;
				}
				return item;
			} else {
				return item;
			}
		});

		if (carrito != nuevoCarrito) {
			const mensaje = operacion == "+" ? "aumento" : "disminuyo";
			const icono = operacion == "+" ? "success" : "warning";
			enqueueSnackbar(`Se ${mensaje} la cantidad de un producto`, {
				variant: icono,
				action
			})
		}
		setCarrito(nuevoCarrito);
		classAdmin.actualizarCarrito(nuevoCarrito);
	});

	/*-- Borrar Item de carrito --*/
	const eliminarProductoCarrito = ((id, producto) => {
		let nuevoCarrito = carrito.filter(item => item[0]["nombreItem"] !== producto[0]['nombreItem']);
		setCarrito(nuevoCarrito);
		setDatosMain();
		enqueueSnackbar(`Se elimino un producto del carrito`, {
			variant: "info",
			action
		});
		classAdmin.actualizarCarrito(nuevoCarrito);
	});

	/*-- Limpia las variables y estados --*/
	const finalizar = (() => {
		localStorage.removeItem('carritoCopia');
		setDatosMain([]);
		setCedulaEmpleado("");
		setCodigoCompra("");
		setCarrito([]);
	})

	return (
		<>
			<BuscadorSelect lista={datosSelect} manejarCambio={obtenerDatosCompra} manejarClick={generarLista}></BuscadorSelect>
			<AgregarItem actualizar={generarLista}></AgregarItem>
			<TablaMain
				buscadorNombre="Codigo o nombre"
				buscadorTitulo={`Modificar compra ${codigoCompra == undefined ? "" : codigoCompra}`}
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain}
				oculto={true}>
			</TablaMain>
			<CarritoTotalAdmin manejarClick={finalizar} cedula={cedulaEmpleado} codigo={codigoCompra}></CarritoTotalAdmin>
		</>
	);
};