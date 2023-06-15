//importacion de librerias
import {React } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import '../../style/inputs/inputIcono.css';

export function CampoIcono({titulo, icono, tipo}) {
	
	const iconoHtml = (key) => {
		switch (key) {
			case "AiOutlineUser":
				return <AiOutlineUser className="campoIcono__icono" />
			case "GoLock":
				return <GoLock className="campoIcono__icono" />
			default:
				break;
		}
	}

  return(
		<div className="campoIcono">
			<label className="campoIcono__titulo">{titulo}</label>
			{iconoHtml(icono)}
			<input className="campoIcono__input" placeholder="" title="" type={tipo} ></input>
		</div>
	);
};