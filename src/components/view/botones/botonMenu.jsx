/*-- Estilos --*/
import '../../style/botones/botonMenu.css';

/*-- Librerias --*/
import { React } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

/*-- clases y controladores --*/
import { useDataContex } from "../contex";

export function BotonMenu({ estado }) {
	/*-- Estado global del menu --*/
	const { contexMenu, setContexMenu } = useDataContex();

	/*-- Asignar icono segun el estado --*/
	const iconoHtml = (key) => {
		switch (key) {
			case "MdKeyboardDoubleArrowLeft":
				return <><MdKeyboardDoubleArrowLeft /><span>Cerrar</span></>
			case "MdKeyboardDoubleArrowRight":
				return <><span>Menu</span> <MdKeyboardDoubleArrowRight /></>
			default:
				return <><span>Indefinido</span></>
		}
	}

	/*-- Cambiar el estado del menu --*/
	const cambiarEstado = () => {
		setContexMenu(!contexMenu);
	}

	return (
		<div>
			<button
				className={"botonMenu  " + (estado === false ? "botonMenu--desactivo" : "botonMenu--activo")}
				onClick={cambiarEstado} >
				{
					iconoHtml(estado === false ? "MdKeyboardDoubleArrowRight" : "MdKeyboardDoubleArrowLeft")
				}
			</button>
		</div>
	);
};