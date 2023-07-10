//importacion de librerias
import { React } from "react";
import "../../../../style/tabla/tablaMain/datos.css";
import { useDataContex } from "../../../contex";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import swal from'sweetalert2';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { regex } from "../../../../../backend/regex";
import { BotonTabla } from "./boton";

export function TablaBody({datos}) {
	const { urlBaseImg } = useDataContex();

	const maximixarImagen = (url, nombre) => {
		swal.fire({
			title: `${nombre}`,
			imageUrl: `${url}`,
			imageWidth: 400,
			imageHeight: 200,
		})
	}

	const formatearNumero = (numero) =>{
		const expresion = regex.pesos;
		const remplazo = "$1.";
		return numero.toString().replace(expresion, remplazo);
	}
	
	const generarTupla = (tupla) =>{
		console.clear();
		let key = tupla["tipo"]; 
		let id = tupla["id"]; 
		let valor = tupla["valor"]; 
		let img = tupla["img"]; 
		let subClase = tupla["subClase"]; 
		let operacion = tupla["operacion"]; 
		let parametro = tupla["parametro"]; 
		return tipo(key, id, valor, img, subClase, operacion, parametro)
	}

	const estadoNombre = (valor) =>{
		switch (valor) {
			case "0":
				return "Bloqueado";
			case "1":
				return "Activo";
			case "2":
				return "Cancelado";
			case "3":
				return "Pendiente";
			case "4":
				return "Entregado";
			case "5":
				return "Pago";
			default:
				return "Error";
		}
	}

	const subClase = (valor) =>{
		switch (valor) {
			case "0":
				return "bloqueado";
			case "1":
				return "activo";
			case "2":
				return "cancelado";
			case "3":
				return "pendiente";
			case "4":
				return "pago";
			case "5":
				return "entregado";
			default:
				return "bloqueado";
		}
	}
	
	const tipo = (key, id, valor, url, subClaseValor, operacion, parametro) => {
		switch (key) {
			case "boton":
				return <td className="dato--boton" >  <BotonTabla operacion={operacion} id={id} parametro={parametro} icono={subClaseValor} nombre={valor}></BotonTabla> </td>
			case "normal":
				return <td className="dato--normal"> {valor} </td>
			case "estado":
					return <td className="dato--estado"> <strong><p className={"estado  estado--"+ subClase(subClaseValor)}> {estadoNombre(valor)} </p></strong> </td>
			case "costo":
				return <td className="dato--costo"> <strong>${formatearNumero(valor)}</strong> </td>
			case "imag":
				return <>
				<td className="dato--imag"> 
					<LazyLoadImage onClick={() => maximixarImagen(`${urlBaseImg}${url}`, valor)} src={`${urlBaseImg}${url}`} alt="" effect="blur"/> 
				</td>
				</>
			default:
				return <td> "valor no recibido" </td>
		}
	}

  return(
  <>
    <tr key={datos[0]["key"]}>
			{
				datos.map((data) => 
					generarTupla(data)
				)
			}
    </tr>
	</>
	);
};