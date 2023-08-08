/*-- Estilos --*/
import '../../style/titulos/tituloCentrado.css';

/*-- Librerias --*/
import { React } from "react";

export function TituloCentradolo({ texto }) {
	return (
		<>
			<div className="tituloCentradolo">
				<p className="tituloCentradolo__texto">{texto}</p>
			</div>
		</>
	);
};

