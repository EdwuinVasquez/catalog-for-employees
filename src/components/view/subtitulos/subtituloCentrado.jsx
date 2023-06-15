//importacion de librerias
import {React } from "react";
import '../../style/subtitulos/subtituloCentrado.css';

export function SubtituloCentrado({texto}) {
	return(
		<>
		<div className="subtituloCentrado">
  	  <span className="subtituloCentrado__texto">{texto}</span>
  	</div>
		</>
	);
};

