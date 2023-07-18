/*-- Estilos --*/
import '../../../../style/cardProductoDetalles/components/imagen.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import {	React } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

/*-- Clases y controladores --*/
import { useDataContex } from "../../../contex.jsx";

export function ImagenCardProductoDetalles({url}) {
	/*-- Url base de la carpeta images --*/
	const { urlBaseImg } = useDataContex();

	return(
    <div className="cardProductoDetalles__imagen">
      <LazyLoadImage className="cardProductoDetalles__imagen--imgen" src={`${urlBaseImg}${url}`} alt="" effect="blur"/> 
    </div>
	);
};

