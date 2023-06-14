//importacion de librerias
import {React } from "react";
import { AiOutlineUser } from "react-icons/ai";
import '../style/input.css';

export function Campo({titulo, icono, tipo}) {
  return(
		<div className="campo">
			<label className="campo__titulo">{titulo}</label>
			{icono == "AiOutlineUser" ? <AiOutlineUser className="campo__icono" /> : null}
			<input className="campo__input" placeholder="" title="" type={tipo} ></input>
		</div>
	);
};