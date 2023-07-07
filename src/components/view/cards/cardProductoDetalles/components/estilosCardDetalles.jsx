/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/estilosCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React, useState } from "react";
import Tooltip from '@mui/material/Tooltip';

/*-- Clases y controladores --*/
import { useDataContex } from "../../../contex.jsx";

export function EstilosCardProductoDetalles({lista, manejarCambioEstilo}) {
	const { urlBaseImg } = useDataContex();

	/*-- Estilo elegido --*/
	const [seleccionado, setSeleccionado] = useState("00");

	/*-- Cambiar estilo elegido --*/
	const seleccionarEstilo = ((codigo) =>{
		const datos = lista.find(valor => `${valor[0]["id"]}-${valor[0]["contenido"]}` == codigo)
		manejarCambioEstilo(datos);
		setSeleccionado(codigo);
	});

	const element = ((tipo, valor) =>{
		if(tipo == 1){
			return <>
			<img 
							className="cardProductoDetalles__estilos--imagen" 
							src={`${urlBaseImg}${valor}`} alt="" /> 
			</>
		}	else if(tipo == 0){
			return <>
			<button className="cardProductoDetalles__estilos--color" 
				style={{
					backgroundColor: valor
				}}
			></button>
			</>
		}
	})

	/*-- Cargar estilos los estilos de tipo 1 son imagenes, los demas son colores--*/
	const targetaEstilo = (() =>{
		return lista.map((valor) => {
			let codigo = `${valor[0]["id"]}-${valor[0]["contenido"]}`
			return <Tooltip key={`${codigo}`} title={`${valor[0]["disponible"] == 0 ? "PRODUCTO NO DISPONIBLE" : valor[0]["estilo"]}`} placement="top">
				<div 
					key={`${codigo}`} 
					className={`cardProductoDetalles__estilos--contenedor  ${seleccionado == codigo ? "cardProductoDetalles__estilos--seleccionado" : ""}`}
					onClick={() => seleccionarEstilo(`${codigo}`)}>
						{element(valor[0]["tipoContenido"], valor[0]["contenido"])}
    		</div>
        </Tooltip>
		});
	})

	return(
    <div key={`estilos`} className="cardProductoDetalles__estilos">
			{targetaEstilo()}
		</div>
	);
};

