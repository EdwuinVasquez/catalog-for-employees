/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/finalCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSnackbar } from 'notistack';

/*-- Clases y controladores --*/
import { useDataContex } from '../../../contex.jsx';
import { emple } from "../../../../../backend/class/empleado.js";
import { cerrarAlertaAction as action, formatearNumero } from "../../../../../backend/funcioneGenerales.jsx"
const classEmple = new emple();

export function FinalCardProductoDetalles({ precio, productoSelect, precioBase }) {
	/*-- Carrito de compras --*/
	const { carrito, setCarrito } = useDataContex();

	/*-- Alerta --*/
	const { enqueueSnackbar } = useSnackbar();

	/*-- Agregar producto al carrito --*/
	const agregarProducto = (() => {
		if (productoSelect != 0 && productoSelect[0] != undefined) {
			if (carrito.length <= 0) {
				setCarrito([productoSelect]);
				classEmple.actualizarCarrito([productoSelect]);
			} else {
				let buscarProducto = carrito.some(
					value => value[0]["nombreItem"] == productoSelect[0]['nombreItem']
				);
				if (buscarProducto) {
					modificarProductoCarrito(productoSelect);
				} else {
					agregarNuevoProductoCarrito(productoSelect);
				}
			}
			enqueueSnackbar(`Producto agregado al carrito`, {
				variant: "success",
				action
			})
		} else {
			enqueueSnackbar(`No has seleccionado un color`, {
				variant: "error",
				action
			})
		}
	})

	/*-- Agregar item en cantidad 1 --*/
	const agregarNuevoProductoCarrito = ((producto) => {
		let nuevoCarrito = [...carrito, producto];
		setCarrito(nuevoCarrito);
		classEmple.actualizarCarrito(nuevoCarrito);
	});

	/*-- Aumentar la cantidad de un item --*/
	const modificarProductoCarrito = ((producto) => {
		let nuevoCarrito = carrito.map(item => {
			if (item[0]["nombreItem"] == producto[0]['nombreItem']) {
				item[0]["cantidad"]++;
				return item;
			} else {
				return item;
			}
		});
		setCarrito(nuevoCarrito);
		classEmple.actualizarCarrito(nuevoCarrito);
	});

	return (
		<div className="cardProductoDetalles__final">
			<div className="cardProductoDetalles__final--precios">
				<span className="cardProductoDetalles__final--precioBase">${formatearNumero(precioBase)}</span>
				<span className="cardProductoDetalles__final--precioFinal">${formatearNumero(precio)}</span>
			</div>
			<div className="cardProductoDetalles__final--boton" onClick={agregarProducto}>
				<MdOutlineShoppingCart className="cardProductoDetalles__final--svg" ></MdOutlineShoppingCart>
			</div>
		</div>
	);
};