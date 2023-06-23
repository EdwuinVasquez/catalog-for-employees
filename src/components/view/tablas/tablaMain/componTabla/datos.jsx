//importacion de librerias
import { React } from "react";
import "../../../../style/tabla/tablaMain/temporal.css"

export function TablaBody({datos}) {
	const generarTupla = (tupla) =>{
		let key = tupla["tipo"]; 
		let valor = tupla["valor"]; 
		let img = tupla["img"]; 
		let subClase = tupla["subClase"]; 
		return tipo(key, valor, img, subClase)
	}

	const estadoNombre = (valor) =>{
		switch (valor) {
			case "0":
				return "Cancelado";
			case "1":
				return "Pendiente";
			case "2":
				return "Entregado";
			case "3":
				return "Pago";
			default:
				return "delivered";
		}
	}

	const subClase = (valor) =>{
		switch (valor) {
			case "0":
				return "cancelled";
			case "1":
				return "pending";
			case "2":
				return "delivered";
			case "3":
				return "shipped";
			default:
				return "delivered";
		}
	}

	const tipo = (key, valor, url, subClaseValor) => {
		switch (key) {
			case "normal":
				return <td> {valor} </td>
			case "estado":
					return <td> <strong><p className={"status  "+ subClase(subClaseValor)}> {estadoNombre(valor)} </p></strong> </td>
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

{/* <td><img src="images/Jeet Saru.jpg" alt="" /> Jeet Saru </td> */}
{/* <tr>
    <td> 1 </td>
    <td> <img src="images/Zinzu Chan Lee.jpg" alt="" />Zinzu Chan Lee</td>
    <td> Seoul </td>
    <td> 17 Dec, 2022 </td>
    <td>
        <p className="status      shipped delivered cancelled pending">Delivered</p>
    </td>
    <td> <strong> $128.90 </strong></td>
</tr> */}