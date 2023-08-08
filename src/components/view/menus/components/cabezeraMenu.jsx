/*-- Estilos --*/
import "../../../style/menus/components/cabezeraMenu.css";

/*-- Librerias --*/
import { React } from "react";
import { Logo } from "../../logos/logo";

/*-- clases y controladores --*/
import { useDataContex } from "../../contex";

export function CabezeraMenu() {
	const { contexUsuarioLogin } = useDataContex();

	return (
		<div className="cabezeraMenu">
			<Logo></Logo>
			<h1 className="cabezeraMenu__nombre" >{contexUsuarioLogin['nombre']}</h1>
		</div>
	);
}