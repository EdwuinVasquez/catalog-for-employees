//importacion de librerias
import {React } from "react";
import '../../style/botones/botonLink.css';
import { Link } from "react-router-dom";

export function BotonLink({texto}) {
	return(
		<div>
			<Link to="/" className="botonLink">{texto}</Link>
		</div>
	);
};

