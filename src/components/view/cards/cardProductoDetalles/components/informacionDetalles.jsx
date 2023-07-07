/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/informacion.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";

/*-- Clases y controladores --*/


export function InformacionCardProductoDetalles({titulo, detalles}) {
	const formatearTexto = ((texto, limite) =>{
		if(texto.length >= limite){
			return `${texto.slice(0, limite-5)} ...`;
		}
		return texto;
	});

	return(
		<div className="cardProductoDetalles__informacion">
			<p className="cardProductoDetalles__informacion--titulo">{formatearTexto(titulo, 80)}</p>
			<p className="cardProductoDetalles__informacion--detalles">{formatearTexto(detalles, 100)}</p>
		</div>
	);
};

