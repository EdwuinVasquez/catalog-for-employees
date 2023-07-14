/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/cabezera.css";

/*-- Importaciones --*/
import { React } from "react";

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