//importacion de librerias
import { React } from "react";
import { FaUserSlash, FaUserCheck, FaUserEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { AiFillBehanceSquare } from "react-icons/ai";
import "../../../../style/tabla/tablaMain/boton.css"

export function BotonTabla({operacion, id, parametro, tipo}) {
	const tipoBoton = (key) => {
		switch (key) {
			case "estadoUsuario":
				return <>
				<button 
				 onClick={() => operacion(id, parametro)} 
				 className="botonTabla  botonTabla--estado"> Modificar
					<FaUserSlash className="botonTabla--icono" />
				</button>
				</>
			case "estadoUsuarioPendiente":
				return <>
				<button
				 onClick={() => operacion(id, parametro)} 
				 className="botonTabla  botonTabla--activar"> Activar
					<FaUserCheck className="botonTabla--icono" />
				</button>
				</>
			case "modificarUsuario":
				return <>
				<button
				 onClick={() => operacion(id, parametro)} 
				 className="botonTabla  botonTabla--editar"> Editar
					<FaUserEdit className="botonTabla--icono" />
				</button>
				</>
				case "eliminarUsuario":
					return <>
					<button
					 onClick={() => operacion(id, parametro)} 
					 className="botonTabla  botonTabla--eliminar"> Eliminar
						<FaUserEdit className="botonTabla--icono" />
					</button>
					</>
			case "estadoProducto":
				return <>
				<button
				 onClick={() => operacion(id, parametro)} 
				 className="botonTabla  botonTabla--estado"> Modificar
					<ImEye className="botonTabla--icono" />
				</button>
				</>
			case "disponibilidadProducto":
				return <>
				<button
				 onClick={() => operacion(id, parametro)} 
				 className="botonTabla  botonTabla--disponibilidad"> Cambiar estado
					<MdOutlineLocalGroceryStore className="botonTabla--icono" />
				</button>
				</>
			case "modificarProducto":
				return <>
				<button
				 onClick={() => operacion(id, parametro)} 
				 className="botonTabla  botonTabla--editar"> Editar
					<AiFillBehanceSquare className="botonTabla--icono" />
				</button>
				</>
			default:
				break;
		}
	}

  return(
    <>
			{tipoBoton(tipo)}
		</>
	);
};
