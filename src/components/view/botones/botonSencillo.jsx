/*-- Estilos --*/
import '../../style/botones/botonSencillo.css';

/*-- Librerias --*/
import { React } from "react";

export function BotonSencillo({ texto, manejarClik }) {
	return (
		<>
			<button className="botonSencillo" title="" type="submit" onClick={(e) => manejarClik(e)}>
				<span>{texto}</span>
			</button>
		</>
	);
};

