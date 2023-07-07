/*-- Estilos --*/
import '../../../style/cardProducto/cardProducto.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React } from "react";

/*-- Componentes --*/
import { ImagenCardProducto } from './components/imagen';
import { InformacionCardProducto } from './components/informacion';
import { FinalCardProducto } from './components/finalCard';

/*-- Clases y controladores --*/

export function CardProducto({nombre, detalles, imagen, valor, id, buscarProducto}) {
	return(
		<div className="cardProducto">
            <ImagenCardProducto url={imagen}></ImagenCardProducto>
            <InformacionCardProducto titulo={nombre} detalles={detalles}></InformacionCardProducto>
            <FinalCardProducto precio={valor} id={id} buscarProducto={buscarProducto}></FinalCardProducto>
		</div>
	);
};
