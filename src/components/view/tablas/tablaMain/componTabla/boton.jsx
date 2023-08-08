/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/boton.css";

/*-- Importacion --*/
import { React } from "react";
import Tooltip from '@mui/material/Tooltip';
import { RxUpdate } from "react-icons/rx";
import { RiLoginCircleFill } from "react-icons/ri";
import { MdDelete, MdOutlinePriceCheck, MdPriceChange } from "react-icons/md";
import { IoIosEye, IoIosPricetags } from "react-icons/io";
import { BsFillPersonCheckFill, BsPercent } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";

export function BotonTabla({ operacion, id, parametro, icono, nombre }) {
	/*-- Asignar retorno --*/
	const tipoBoton = (key) => {
		switch (key) {
			case "modificar":
				return <RxUpdate
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </RxUpdate>
			case "basurero":
				return <MdDelete
					className="botonTabla__icono  botonTabla__icono--rojo"
					onClick={() => operacion(id, parametro)}
				> </MdDelete>
			case "login":
				return <RiLoginCircleFill
					className="botonTabla__icono  botonTabla__icono--verde"
					onClick={() => operacion(id, parametro)}
				> </RiLoginCircleFill>
			case "usuarioCheck":
				return <BsFillPersonCheckFill
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </BsFillPersonCheckFill>
			case "ojo":
				return <IoIosEye
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </IoIosEye>
			case "porcentaje":
				return <BsPercent
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </BsPercent>
			case "valor":
				return <MdOutlinePriceCheck
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </MdOutlinePriceCheck>
			case "iva":
				return <IoIosPricetags
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </IoIosPricetags>
			case "descuento":
				return <MdPriceChange
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </MdPriceChange>
			case "renombrar":
				return <BiRename
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </BiRename>
			case "userUpdate":
				return <AiOutlineUserSwitch
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)}
				> </AiOutlineUserSwitch>
			default:
				return <></>
		}
	}

	return (
		<>
			<Tooltip title={nombre} placement="top">
				<div className="botonTabla">
					{tipoBoton(icono)}
				</div>
			</Tooltip>
		</>
	);
};
