/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/boton.css"

/*-- Importacion --*/
import { React } from "react";
import Tooltip from '@mui/material/Tooltip';
import { RxUpdate } from "react-icons/rx";
import { RiLoginCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { BsFillPersonCheckFill } from "react-icons/bs";

export function BotonTabla({operacion, id, parametro, icono, nombre}) {
	/*-- Asignar retorno --*/
	const tipoBoton = (key) => {
		switch (key) {
			case "RxUpdate":
				return <RxUpdate  
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)} 
					> </RxUpdate>
				case "MdDelete": 
				  return <MdDelete 
					className="botonTabla__icono  botonTabla__icono--rojo"
					onClick={() => operacion(id, parametro)} 
					> </MdDelete>
				case "RiLoginCircleFill": 
				  return <RiLoginCircleFill 
					className="botonTabla__icono  botonTabla__icono--verde"
					onClick={() => operacion(id, parametro)} 
					> </RiLoginCircleFill>
				case "BsFillPersonCheckFill": 
				  return <BsFillPersonCheckFill 
					className="botonTabla__icono  botonTabla__icono--negro"
					onClick={() => operacion(id, parametro)} 
					> </BsFillPersonCheckFill>
				case "IoIosEye": 
					return <IoIosEye 
					  className="botonTabla__icono  botonTabla__icono--negro"
					  onClick={() => operacion(id, parametro)} 
					  > </IoIosEye>
			default:
				return <></>
		}
	}

  return(
		<>		
		<Tooltip title={nombre} placement="top">
			<div className="botonTabla">
				{tipoBoton(icono)}
			</div>
		</Tooltip>
		</>
	);
};
