/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/finalCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

/*-- Clases y controladores --*/
import { regex } from '../../../../../backend/regex';

export function FinalCardProductoDetalles({precio, productoSelect, precioBase}) {

	const formatearNumero = (numero) =>{
		const expresion = regex.pesos;
		const remplazo = "$1.";
		return numero.toString().replace(expresion, remplazo);
	}

	const agregarProducto = (() => {
		console.log(productoSelect);
	})

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

