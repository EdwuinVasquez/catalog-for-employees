/*-- Estilo --*/
import '../../style/subtitulos/subtituloCentrado.css';

/*-- Librerias --*/
import { React } from "react";

export function SubtituloCentrado({ texto }) {
	return (
		<>
			<div className="subtituloCentrado">
				<span className="subtituloCentrado__texto">{texto}</span>
			</div>
		</>
	);
};

