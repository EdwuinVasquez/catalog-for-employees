import { React } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "../../../style/menus/components/cabezeraMenu.css";
import { Logo } from "../../logos/logo";

export function CabezeraMenu() {		
  return(
		<div className="cabezeraMenu">
			<Logo></Logo>
			<h1 className="cabezeraMenu__nombre" >Admin</h1>
			<RiCloseCircleFill className="cabezeraMenu__icono" ></RiCloseCircleFill>
		</div>
	);
}