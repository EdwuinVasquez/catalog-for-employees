/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/cerrarCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React, useEffect } from "react";
import { VscClose } from "react-icons/vsc";

/*-- Clases y controladores --*/
import { regex } from '../../../../../backend/regex';
import { useDataContex } from "../../../contex.jsx";


export function CerrarCardProductoDetalles({estadoDetalle}) {
	const {detallesActivo, setDetallesActivo } = useDataContex();

	const cerrarDetalles = (() =>{
		setDetallesActivo(false)
	})

	return(
		<div className="cardProductoDetalles__cerrar" onClick={cerrarDetalles}>
			<VscClose></VscClose>
		</div>
	);
};

