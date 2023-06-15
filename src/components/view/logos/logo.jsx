//importacion de librerias
import {React } from "react";
import '../../style/logos/logo.css'
import logo from "../../img/logo-rimoplasticas.png";

export function Logo() {
	return(
		<>
			<div className="logo">
				<img className="logo__imagen" src={logo} alt="" />
			</div>
		</>
	);
};