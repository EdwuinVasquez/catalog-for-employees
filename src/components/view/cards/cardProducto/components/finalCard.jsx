/*-- Estilos --*/
import '../../../../style/cardProducto/components/finalCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

/*-- Clases y controladores --*/
import { useDataContex } from '../../../contex';
import { formatearNumero } from '../../../../../backend/funcioneGenerales';

export function FinalCardProducto({ precio, id, buscarProducto, carrito, activarDetalles }) {
	/*-- Estado global menu --*/
	const { setContexMenu } = useDataContex();

	/*-- Cerrar los detalles --*/
	const procesarClick = ((codigo) => {
		activarDetalles(true);
		setContexMenu(false);
		carrito(false);
		buscarProducto(codigo);
	})

	return (
		<div className="cardProducto__final">
			<span className="cardProducto__final--titulo">${formatearNumero(precio)}</span>
			<div className="cardProducto__final--boton">
				<MdOutlineShoppingCart className="cardProducto__final--svg" onClick={() => procesarClick(id)} ></MdOutlineShoppingCart>
			</div>
		</div>
	);
};

