/*-- Estilos --*/
import '../../../../style/cardProducto/components/informacion.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";

/*-- Clases y controladores --*/


export function InformacionCardProducto({titulo, detalles}) {
	const formatearTexto = ((texto, limite) =>{
		if(texto.length >= limite){
			return `${texto.slice(0, limite-5)} ...`;
		}
		return texto;
	});

	return(
		<div className="cardProducto__informacion">
			<p className="cardProducto__informacion--titulo">{formatearTexto(titulo, 45)}</p>
			<p className="cardProducto__informacion--detalles">{formatearTexto(detalles, 55)}</p>
		</div>
	);
};

