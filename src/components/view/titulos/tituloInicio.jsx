//importacion de librerias
import {React } from "react";
import '../../style/titulos/tituloInicio.css'

export function TituloInicio({texto}) {
	return(
		<>
		<p className="tituloInicio">{texto} </p>
		</>
	);
};

