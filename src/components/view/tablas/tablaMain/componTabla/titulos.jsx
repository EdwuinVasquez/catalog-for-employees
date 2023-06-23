//importacion de librerias
import { React } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "../../../../style/tabla/tablaMain/buscador.css"

export function TablaTitulos({titulos}) {
  return(
    <>
    <thead>
      <tr>
	      {
					titulos.map((titulo) =>
						<th key={titulo}> {titulo} </th>
					)
				}
      </tr>
    </thead>
    </>
	);
};