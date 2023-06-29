import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OpcionMenu } from "./components/opcion.jsx";
import { CabezeraMenu } from "./components/cabezeraMenu.jsx";
import { SubOpcionMenu } from "./components/subOpcion.jsx";
import { BotonMenu } from "../botones/botonMenu.jsx";
import "../../style/menus/menuSuperAdmin.css";
import "../../style/menus/components/opcion.css";
import { useDataContex } from "../contex.jsx";

export function MenuSuperAdmin() {
	const { contexUsuario, setContexUsuario, contexMenu, setContexMenu } = useDataContex();

  return(
		<>
		<div className={contexMenu === false ? "menu--desactivado" : "menu--activado"}>
			<nav className="menu">
				<CabezeraMenu ></CabezeraMenu>
				<BotonMenu estado={contexMenu} ></BotonMenu>
				<ul className="lista">
					<OpcionMenu opciones={false} ruta="home" icono="FaHome" nombre="Inicio"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="venta" icono="FaMoneyBill" nombre="Ventas"></OpcionMenu>
					<OpcionMenu opciones={true} ruta="reporte" icono="VscGraph" nombre="Reportes">
						<ul className="opcion__subMenu">
							<SubOpcionMenu ruta="reporte" nombre="Ventas"></SubOpcionMenu>
							<SubOpcionMenu ruta="reporte" nombre="Productos"></SubOpcionMenu>
							<SubOpcionMenu ruta="reporte" nombre="Empleados"></SubOpcionMenu>
							<SubOpcionMenu ruta="reporte" nombre="Mes"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={true} ruta="" icono="HiBuildingStorefront" nombre="Productos">
						<ul className="opcion__subMenu">
							<SubOpcionMenu nombre="Lista"></SubOpcionMenu>
							<SubOpcionMenu nombre="Categorias"></SubOpcionMenu>
							<SubOpcionMenu nombre="Ajustes"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={true} ruta="" icono="RiUserFollowFill" nombre="Empleados">
					<ul className="opcion__subMenu">
							<SubOpcionMenu ruta="empleados/lista" nombre="Lista"></SubOpcionMenu>
							<SubOpcionMenu ruta="empleados/nuevosRegistros" nombre="Sin verificar"></SubOpcionMenu>
							<SubOpcionMenu ruta="empleados/ajustes" nombre="Ajustes"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={true} ruta="" icono="FaUserPlus" nombre="Usuario">
					<ul className="opcion__subMenu">
							<SubOpcionMenu nombre="Crear usuario"></SubOpcionMenu>
							<SubOpcionMenu nombre="Eliminar usuario"></SubOpcionMenu>
							<SubOpcionMenu nombre="Modificar usuario"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={true} ruta="" icono="AiFillAppstore" nombre="Aplicacion">
						<ul className="opcion__subMenu">
							<SubOpcionMenu nombre="Ajustes"></SubOpcionMenu>
							<SubOpcionMenu nombre="Alertas"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={false} ruta="" icono="GrHistory" nombre="Historial"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="" icono="RiSettings4Fill" nombre="Configuracion"></OpcionMenu>
				</ul>
			</nav>
		</div>
		</>
	);
}