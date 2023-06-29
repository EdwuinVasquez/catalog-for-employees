//importacion de librerias
import { React } from "react";
import "../../../../style/tabla/tablaMain/datos.css"

export function TablaBody({datos}) {
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
				return <td onClick={() => operacion(id, parametro)} >  {valor} </td>
			case "normal":
				return <td > {valor} </td>
			case "estado":
					return <td> <strong><p className={"estado  estado--"+ subClase(subClaseValor)}> {estadoNombre(valor)} </p></strong> </td>
			case "costo":
				return <td> <strong>${valor}</strong> </td>
			case "imag":
				return <td><img src={url} alt="" /> {valor} </td>
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