//importacion de librerias
import { React } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "../../../../style/tabla/tablaMain/cabezera.css";

export function TablaTitulos({titulos}) {
  return(
    <>
    <thead >
      <tr>
	      {
					titulos.map((titulo) =>
						<th key={titulo} className="tablaMain__cabezera--titulos"> {titulo} </th>
					)
				}
      </tr>
    </thead>
    </>
	);
};