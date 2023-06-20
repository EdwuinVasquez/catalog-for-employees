//importacion de librerias
import {React } from "react";
import '../../style/botones/botonLink.css';

export function BotonLink({texto}) {
	return(
		<div>
			<a className="botonLink" href="">{texto}</a>
		</div>
	);
};

