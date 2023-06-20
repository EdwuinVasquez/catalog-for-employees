//importacion de librerias
import {React } from "react";
import '../../style/botones/botonSencillo.css';

export function BotonSencillo({texto, manejarClik}) {
	return(
		<>
			<button className="botonSencillo" title="" type="submit" onClick={(e) => manejarClik(e)}>
				<span>{texto}</span>
		  </button>
		</>
	);
};

