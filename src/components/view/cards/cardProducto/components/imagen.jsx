/*-- Estilos --*/
import '../../../../style/cardProducto/components/imagen.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import {	React } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

/*-- Clases y controladores --*/
import { useDataContex } from "../../../contex.jsx";

export function ImagenCardProducto({url}) {
	const { urlBaseImg } = useDataContex();

	return(
    <div className="cardProducto__imagen">
      <LazyLoadImage className="cardProducto__imagen--imgen" src={`${urlBaseImg}${url}`} alt="" effect="blur"/> 
    </div>
	);
};

