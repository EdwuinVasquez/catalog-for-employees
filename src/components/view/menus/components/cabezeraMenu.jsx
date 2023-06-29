import { React } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "../../../style/menus/components/cabezeraMenu.css";
import { Logo } from "../../logos/logo";
import { useDataContex } from "../../contex";

export function CabezeraMenu({manejarClick}) {		
	const { contexUsuarioLogin } = useDataContex();
  return(
		<div className="cabezeraMenu">
			<Logo></Logo>
			<h1 className="cabezeraMenu__nombre" >{contexUsuarioLogin['nombre']}</h1>
		</div>
	);
}