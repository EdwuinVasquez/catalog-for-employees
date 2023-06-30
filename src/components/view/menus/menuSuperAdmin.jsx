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

	const adminSuper = () =>{
		if(contexUsuario == "SUPER"){
			return <>
			<OpcionMenu opciones={true} icono="FaUserPlus" nombre="Usuario">
				<ul className="opcion__subMenu">
					<SubOpcionMenu ruta="usuarios/lista" nombre="Lista usuarios"></SubOpcionMenu>
					<SubOpcionMenu ruta="usuarios/nuevo" nombre="Crear usuario"></SubOpcionMenu>
					<SubOpcionMenu ruta="usuarios/eliminar" nombre="Eliminar usuario"></SubOpcionMenu>
					<SubOpcionMenu ruta="usuarios/modificar" nombre="Modificar usuario"></SubOpcionMenu>
				</ul>
			</OpcionMenu>
			</>
		}
	}
  return(
		<>
		<div className={contexMenu === false ? "menu--desactivado" : "menu--activado"}>
			<nav className="menu">
				<CabezeraMenu ></CabezeraMenu>
				<BotonMenu estado={contexMenu} ></BotonMenu>
				<ul className="lista">
					<OpcionMenu opciones={false} ruta="home" icono="FaHome" nombre="Inicio"></OpcionMenu>
					<OpcionMenu opciones={true} icono="FaMoneyBill" nombre="Ventas">
					<ul className="opcion__subMenu">
							<SubOpcionMenu ruta="ventas/lista" nombre="Lista ventas"></SubOpcionMenu>
							<SubOpcionMenu ruta="ventas/editar" nombre="Modificar venta"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={true} icono="VscGraph" nombre="Reportes">
						<ul className="opcion__subMenu">
							<SubOpcionMenu ruta="reporte/ventas" nombre="Ventas"></SubOpcionMenu>
							<SubOpcionMenu ruta="reporte/producto" nombre="Productos"></SubOpcionMenu>
							<SubOpcionMenu ruta="reporte/empleado" nombre="Empleados"></SubOpcionMenu>
							<SubOpcionMenu ruta="reporte/mes" nombre="Mes"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
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
							<SubOpcionMenu ruta="empleados/nuevosRegistros" nombre="No verificados"></SubOpcionMenu>
							<SubOpcionMenu ruta="empleados/token" nombre="Generar token"></SubOpcionMenu>
							<SubOpcionMenu ruta="empleados/nuevo" nombre="Crear empleado"></SubOpcionMenu>
							<SubOpcionMenu ruta="empleados/ajustes" nombre="Editar empleado"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					{adminSuper()}
					<OpcionMenu opciones={true} icono="AiFillAppstore" nombre="Aplicacion">
						<ul className="opcion__subMenu">
							<SubOpcionMenu ruta="aplicacion/tablon" nombre="Tablon"></SubOpcionMenu>
							<SubOpcionMenu ruta="aplicacion/alertas" nombre="Alertas"></SubOpcionMenu>
						</ul>
					</OpcionMenu>
					<OpcionMenu opciones={false} ruta="historial" icono="GrHistory" nombre="Historial"></OpcionMenu>
					<OpcionMenu opciones={false} ruta="configuracion" icono="RiSettings4Fill" nombre="Configuracion"></OpcionMenu>
				</ul>
			</nav>
		</div>
		</>
	);
}