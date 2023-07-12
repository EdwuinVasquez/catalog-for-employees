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

export function CardProducto({nombre, detalles, setDetalles, imagen, valor, id, buscarProducto, carrito}) {
	return(
		<div className="cardProducto">
            <ImagenCardProducto url={imagen}></ImagenCardProducto>
            <InformacionCardProducto titulo={nombre} detalles={detalles}></InformacionCardProducto>
            <FinalCardProducto precio={valor} activarDetalles={setDetalles} id={id} buscarProducto={buscarProducto} carrito={carrito}></FinalCardProducto>
		</div>
	);
};
