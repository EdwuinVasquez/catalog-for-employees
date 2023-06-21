import { React } from "react";
import { OpcionMenu } from "./components/opcion.jsx";
import { SubOpcionMenu } from "./components/subOpcion.jsx";
import "../../style/menus/menuSuperAdmin.css";
import "../../style/menus/components/opcion.css";

export function MenuSuperAdmin() {
  return(
		<>
			<nav className="menu">
				<ul className="lista">
					<OpcionMenu opciones={false} icono="FaHome" nombre="Inicio"></OpcionMenu>
					<OpcionMenu opciones={false} icono="FaMoneyBill" nombre="Ventas"></OpcionMenu>
					<OpcionMenu opciones={true} icono="VscGraph" nombre="Reportes"></OpcionMenu>
					<OpcionMenu opciones={true} icono="HiBuildingStorefront" nombre="Productos"></OpcionMenu>
					<OpcionMenu opciones={true} icono="RiUserFollowFill" nombre="Empleados"></OpcionMenu>
					<OpcionMenu opciones={true} icono="FaUserPlus" nombre="Usuario"></OpcionMenu>
					<OpcionMenu opciones={true} icono="AiFillAppstore" nombre="Aplicacion">
						<ul className="opcion__subMenu">
							<SubOpcionMenu nombre="Ajustes"></SubOpcionMenu>
							<SubOpcionMenu nombre="Alertas"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={false} icono="RiSettings4Fill" nombre="Configuracion"></OpcionMenu>
				</ul>
			</nav>
		</>
	);
}