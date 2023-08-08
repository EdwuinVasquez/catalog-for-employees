/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/informacion.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";

export function InformacionCardProductoDetalles({ titulo, detalles }) {
	return (
		<div className="cardProductoDetalles__informacion">
			<p className="cardProductoDetalles__informacion--titulo">{titulo}</p>
			<p className="cardProductoDetalles__informacion--detalles">{detalles}</p>
		</div>
	);
};

