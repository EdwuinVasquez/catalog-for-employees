/*-- Estilos --*/
import '../../style/titulos/tituloInicio.css';

/*-- Librerias --*/
import { React } from "react";

export function TituloInicio({ texto }) {
	return (
		<>
			<p className="tituloInicio">{texto} </p>
		</>
	);
};

