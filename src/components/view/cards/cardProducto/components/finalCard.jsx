/*-- Estilos --*/
import '../../../../style/cardProducto/components/finalCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

/*-- Clases y controladores --*/
import { regex } from '../../../../../backend/regex';

export function FinalCardProducto({precio, manejarClick}) {

	const formatearNumero = (numero) =>{
		const expresion = regex.pesos;
		const remplazo = "$1.";
		return numero.toString().replace(expresion, remplazo);
	}

	return(
		<div className="cardProducto__final">
  			<span className="cardProducto__final--titulo">${formatearNumero(precio)}</span>
  			<div className="cardProducto__final--boton"> 
			 	<MdOutlineShoppingCart className="cardProducto__final--svg" ></MdOutlineShoppingCart>
			</div>
		</div>
	);
};

