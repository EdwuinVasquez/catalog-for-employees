/*-- Estilos --*/
import "../../style/menus/menuSuperAdmin.css";
import "../../style/menus/components/opcion.css";

/*-- Librerias --*/
import { React } from "react";

/*-- Componentes --*/
import { OpcionMenu } from "./components/opcion.jsx";
import { CabezeraMenu } from "./components/cabezeraMenu.jsx";
import { SubOpcionMenu } from "./components/subOpcion.jsx";
import { BotonMenu } from "../botones/botonMenu.jsx";

/*-- Clases y controladores  --*/
import { useDataContex } from "../contex.jsx";

export function MenuSuperAdmin() {
	const { contexMenu } = useDataContex();

	return (
		<>
			<div className={contexMenu === false ? "menu--desactivado" : "menu--activado"}>
				<nav className="menu">
					<CabezeraMenu ></CabezeraMenu>
					<BotonMenu estado={contexMenu} ></BotonMenu>
					<ul className="lista">
						<OpcionMenu opciones={false} ruta="" icono="FaHome" nombre="Inicio"></OpcionMenu>
						<OpcionMenu opciones={true} icono="FaMoneyBill" nombre="Ventas">
							<ul className="opcion__subMenu">
								<SubOpcionMenu ruta="ventas/lista" nombre="Lista ventas"></SubOpcionMenu>
								<SubOpcionMenu ruta="ventas/editar" nombre="Modificar venta"></SubOpcionMenu>
							</ul>
						</OpcionMenu>
						<OpcionMenu opciones={false} ruta="reporte" icono="VscGraph" nombre="Reportes"></OpcionMenu>
						<OpcionMenu opciones={false} ruta="grafico" icono="VscGraphLine" nombre="Graficos"></OpcionMenu>
						<OpcionMenu opciones={true} icono="HiBuildingStorefront" nombre="Productos">
							<ul className="opcion__subMenu">
								<SubOpcionMenu ruta="producto/lista" nombre="Lista productos"></SubOpcionMenu>
								<SubOpcionMenu ruta="producto/categorias" nombre="Lista categorias"></SubOpcionMenu>
								<SubOpcionMenu ruta="producto/ajustes" nombre="Editar producto"></SubOpcionMenu>
							</ul>
						</OpcionMenu>
						<OpcionMenu opciones={true} icono="RiUserFollowFill" nombre="Empleados">
							<ul className="opcion__subMenu">
								<SubOpcionMenu ruta="empleados/lista" nombre="Lista empleados"></SubOpcionMenu>
								<SubOpcionMenu ruta="empleados/nuevos" nombre="No verificados"></SubOpcionMenu>
								<SubOpcionMenu ruta="empleados/token" nombre="Generar token"></SubOpcionMenu>
							</ul>
						</OpcionMenu>
						<OpcionMenu opciones={false} ruta="ajustes" icono="RiSettings4Fill" nombre="Configuracion"></OpcionMenu>
						<OpcionMenu opciones={false} ruta="salir" icono="ImExit" nombre="Cerrar sesion"></OpcionMenu>
					</ul>
				</nav>
			</div>
		</>
	);
}