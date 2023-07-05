/*-- Estilos --*/
import '../../../../style/cardProducto/components/informacion.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";

/*-- Clases y controladores --*/


export function InformacionCardProducto({titulo, detalles}) {
	return(
		<div className="cardProducto__informacion">
			<p className="cardProducto__informacion--titulo">{titulo}</p>
			<p className="cardProducto__informacion--detalles">{detalles}</p>
		</div>
	);
};

