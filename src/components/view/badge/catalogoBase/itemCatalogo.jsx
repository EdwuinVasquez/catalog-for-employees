/*-- Estilos --*/
import 'react-lazy-load-image-component/src/effects/blur.css';
import "../../../style/badge/catalogoBase/itemsCatalogoBase.css"

/*-- Librerias --*/
import { React } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDataContex } from "../../contex";
import { MdOutlineShoppingCart } from "react-icons/md";

/*-- Clases y controladores --*/
import { formatearNumero } from "../../../../backend/funcioneGenerales.js";

export function ItemCatalogoBase({ codigo, nombre, imagen, contenido, tipoContenido, valor, manejarClick, parametros }) {
	/*-- ruta basica de imagenes --*/
	const { urlBaseImg } = useDataContex();

	/*-- Asignar etiquetas segun tipo (Image, hexadecimal) --*/
	const element = ((tipo, valor) => {
		if (tipo == 1) {
			return <>
				<LazyLoadImage
					className="itemCatalogoBase__estilo--imagen"
					src={`${urlBaseImg}${valor}`} alt="" effect="blur" />
			</>
		} else if (tipo == 0) {
			return <>
				<button className="itemCatalogoBase__estilo--color"
					style={{
						backgroundColor: valor,
					}}
				></button>
			</>
		}
	})

	return (
		<><li className="itemCatalogoBase">
			<label className="itemCatalogoBase__texto">{codigo}</label>
			<div className="itemCatalogoBase__imagen">
				<LazyLoadImage className='itemCatalogoBase__imagen' src={`${urlBaseImg}${imagen}`} alt="" effect="blur" />
			</div>
			<label className="itemCatalogoBase__texto">{nombre}</label>
			<di className="itemCatalogoBase__estilo">
				{element(tipoContenido, contenido)}
			</di>
			<label className="itemCatalogoBase__valor">${formatearNumero(valor)}</label>
			<div className="itemCatalogoBase__boton  itemCatalogoBase__boton--boton" onClick={() => manejarClick(parametros)}>
				<MdOutlineShoppingCart className="itemCatalogoBase__boton--svg" ></MdOutlineShoppingCart>
			</div>
		</li></>
	);
};