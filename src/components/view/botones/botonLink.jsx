/*-- Estilos --*/
import '../../style/botones/botonLink.css';

/*-- Librerias --*/
import { React } from "react";

export function BotonLink({ texto, manejarClick }) {
	return (
		<div>
			<a onClick={() => manejarClick()} className="botonLink">{texto}</a>
		</div>
	);
};

