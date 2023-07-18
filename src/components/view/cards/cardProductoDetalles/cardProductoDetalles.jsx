/*-- Estilos --*/
import '../../../style/cardProductoDetalles/cardProductoDetalles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { ImagenCardProductoDetalles } from './components/imagenDetalles';
import { InformacionCardProductoDetalles } from './components/informacionDetalles';
import { FinalCardProductoDetalles } from './components/finalCardDetalles';
import { EstilosCardProductoDetalles } from './components/estilosCardDetalles';
import { CerrarCardProductoDetalles } from './components/cerrarCardDetalles';

export function CardProductoDetalles({nombre, detalles, lista, imagen, valor, valorBase, setEstadoDetalle}) {
	/*-- Estado producto con estilo --*/
	const [productoEstilo, setProductoEstilo] = useState("0");
	
	/*-- Estado imagen del estilo --*/
	const [imagenItem, setImagenItem] = useState(imagen);

	const manejarCambioEstilo = ((datos) =>{
		if(datos[0]["disponible"] == 1){
			setProductoEstilo(datos);
			setImagenItem(datos[0]["imgItem"]);
		}
	});

	return(
		<div className="cardProductoDetalles">
			<CerrarCardProductoDetalles cerrarDetalles={setEstadoDetalle}></CerrarCardProductoDetalles>
      <ImagenCardProductoDetalles url={imagenItem}></ImagenCardProductoDetalles>
      <InformacionCardProductoDetalles titulo={nombre} detalles={detalles}></InformacionCardProductoDetalles>
			<EstilosCardProductoDetalles lista={lista} manejarCambioEstilo={manejarCambioEstilo}></EstilosCardProductoDetalles>
      <FinalCardProductoDetalles precio={valor} precioBase={valorBase} productoSelect={productoEstilo}></FinalCardProductoDetalles>
		</div>
	);
};

