/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/finalCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSnackbar, closeSnackbar } from 'notistack';

/*-- Clases y controladores --*/
import { regex } from '../../../../../backend/regex';
import { useDataContex } from '../../../contex.jsx';
import { emple } from "../../../../../backend/class/empleado.js"
const classEmple = new emple();

export function FinalCardProductoDetalles({precio, productoSelect, precioBase}) {
	/*-- Carrito de compras --*/
	const { carrito, setCarrito } =  useDataContex();
	
	/*-- Alerta --*/
	const { enqueueSnackbar } = useSnackbar();

	/*-- Cerrar alerta --*/
	const action = (snackbarId) =>(
		<>
      <AiFillCloseCircle onClick={() => { closeSnackbar(snackbarId) }}>
			</AiFillCloseCircle>
		</>
	)

	/*-- Formatear Numeros en pesos --*/
	const formatearNumero = (numero) =>{
		const expresion = regex.pesos;
		const remplazo = "$1.";
		return numero.toString().replace(expresion, remplazo);
	}

	/*-- Agregar producto al carrito --*/
	const agregarProducto = (() => {
		if(productoSelect != 0 &&  productoSelect[0] != undefined){
			if(carrito.length <= 0) {
				setCarrito([productoSelect]);
				classEmple.actualizarCarrito([productoSelect]);
			} else{
				let buscarProducto = carrito.some(
					value => value[0]["nombreItem"] == productoSelect[0]['nombreItem']
				);
				if(buscarProducto){
					modificarProductoCarrito(productoSelect);
				}else{
					agregarNuevoProductoCarrito(productoSelect);
				}
			}
			enqueueSnackbar(`Producto agregado al carrito`, {
				variant: "success",
				autoHideDuration: 1500,
				action
			})
		}else{
			enqueueSnackbar(`No has seleccionado un color`, {
				variant: "error",
				autoHideDuration: 1500,
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
			if(item[0]["nombreItem"] == producto[0]['nombreItem']){
				item[0]["cantidad"]++;
				return item;
			}else{
				return item;
			}
		});
		setCarrito(nuevoCarrito);
		classEmple.actualizarCarrito(nuevoCarrito);
	});

	return(
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

