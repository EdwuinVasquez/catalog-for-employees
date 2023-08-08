/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/cerrarCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";
import { VscClose } from "react-icons/vsc";

export function CerrarCardProductoDetalles({ cerrarDetalles }) {
	return (
		<div className="cardProductoDetalles__cerrar" onClick={() => cerrarDetalles(false)}>
			<VscClose></VscClose>
		</div>
	);
};