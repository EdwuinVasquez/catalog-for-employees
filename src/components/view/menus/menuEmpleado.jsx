/*-- Estilos --*/
import "../../style/menus/menuSuperAdmin.css";
import "../../style/menus/components/opcion.css";

/*-- Librerias --*/
import { React } from "react";

/*-- Cmponentes --*/
import { OpcionMenu } from "./components/opcion.jsx";
import { CabezeraMenu } from "./components/cabezeraMenu.jsx";
import { SubOpcionMenu } from "./components/subOpcion.jsx";
import { BotonMenu } from "../botones/botonMenu.jsx";

/*-- Clases y controladores --*/
import { useDataContex } from "../contex.jsx";


export function MenuEmpleado() {
	const { contexMenu } = useDataContex();

  return(
		<>
		<div className={contexMenu === false ? "menu--desactivado" : "menu--activado"}>
			<nav className="menu">
				<CabezeraMenu ></CabezeraMenu>
				<BotonMenu estado={contexMenu} ></BotonMenu>
				<ul className="lista">
					<OpcionMenu opciones={false} ruta="home" icono="FaHome" nombre="Catalogo"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="carrito" icono="FaHome" nombre="Carrito"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="compras" icono="FaHome" nombre="Mis pedidos"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="historial" icono="GrHistory" nombre="Historial"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="configuracion" icono="RiSettings4Fill" nombre="Configuracion"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="../" icono="ImExit" nombre="Cerrar sesion"></OpcionMenu>
				</ul>
			</nav>
		</div>
		</>
	);
}