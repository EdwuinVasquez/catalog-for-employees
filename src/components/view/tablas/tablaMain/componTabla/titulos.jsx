/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/cabezera.css";
import { v4 as uuidv4 } from 'uuid';

/*-- Importaciones --*/
import { React } from "react";

export function TablaTitulos({ titulos }) {
  return (
    <>
      <thead >
        <tr>
          {
            titulos.map((titulo) =>
              <th key={uuidv4()} className="tablaMain__cabezera--titulos"> {titulo} </th>
            )
          }
        </tr>
      </thead>
    </>
  );
};