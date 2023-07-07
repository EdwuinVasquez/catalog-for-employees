import { React, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHome, FaMoneyBill, FaUserPlus} from "react-icons/fa";
import { RiSettings4Fill, RiUserFollowFill} from "react-icons/ri";
import { HiBuildingStorefront } from "react-icons/hi2";
import { AiFillAppstore } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { GrHistory } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import { Link } from "react-router-dom";
import "../../../style/menus/components/opcion.css";

export function OpcionMenu(props) {
  const subMenuClick = (e) =>{
		let elementoPadre = e.target;
		if(e.target && e.target.tagName != "DIV") elementoPadre = e.target.parentNode;
		
		if(elementoPadre.nextElementSibling &&  elementoPadre.nextElementSibling.tagName == "UL"){
			elementoPadre.classList.toggle('flecha');
	
			let height = 0;
			let menu = elementoPadre.nextElementSibling;
			if(menu.clientHeight == "0"){
					height=menu.scrollHeight;
			}
			menu.style.height = `${height}px`;
		}
  }

	const iconoHtml = (key) => {
		switch (key) {
			case "MdKeyboardArrowRight":
				return <MdKeyboardArrowRight className="opcion__flecha"/>
			case "FaHome":
				return <FaHome className="opcion__icono"></FaHome>
			case "FaMoneyBill":
				return <FaMoneyBill className="opcion__icono"></FaMoneyBill>
			case "FaUserPlus":
				return <FaUserPlus className="opcion__icono"></FaUserPlus>
			case "RiSettings4Fill":
				return <RiSettings4Fill className="opcion__icono"></RiSettings4Fill>
			case "RiUserFollowFill":
				return <RiUserFollowFill className="opcion__icono"></RiUserFollowFill>
			case "HiBuildingStorefront":
				return <HiBuildingStorefront className="opcion__icono"></HiBuildingStorefront>
			case "AiFillAppstore":
				return <AiFillAppstore className="opcion__icono"></AiFillAppstore>
			case "VscGraph":
				return <VscGraph className="opcion__icono"></VscGraph>
			case "GrHistory":
				return <GrHistory className="opcion__icono"></GrHistory>
			case "ImExit":
				return <ImExit className="opcion__icono"></ImExit>
			default:
				console.log(`El icono ${key} no existe`);
				break;
			}
		}
			
  return(
		<>
			<li 
				className={"opcion__menu  " + (props.opciones ? "opcion__menu--click" : "")} 
				onClick={subMenuClick}>
        <div className={"opcion__boton  " + (props.opciones ? "opcion__boton--click" : "")}>
					{iconoHtml(props.icono)}
          <Link to={props.ruta} className="opcion__link">{props.nombre}</Link>
					{props.opciones ? iconoHtml("MdKeyboardArrowRight") : ""}
					</div>
				{props.children}
      </li>
		</>
	);
}