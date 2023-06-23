//importacion de librerias
import { React } from "react";
import { TablaTitulos } from "./titulos";
import "../../../../style/tabla/tablaMain/temporal.css"
import { TablaBody } from "./datos";

export function TablaCotenido({titulos, contenido, tipo}) {
  return(
    <>
    <section className="table__body">
      <table>
        <TablaTitulos titulos={titulos}></TablaTitulos>
        <tbody>
          {
						contenido.map((valor) =>
							<TablaBody datos={valor}></TablaBody>
						)
					}
        </tbody>
      </table>
		</section>
		</>
	);
};

{/* <tr>
    <td> 1 </td>
    <td> <img src="images/Zinzu Chan Lee.jpg" alt="" />Zinzu Chan Lee</td>
    <td> Seoul </td>
    <td> 17 Dec, 2022 </td>
    <td>
        <p className="status      shipped delivered cancelled pending">Delivered</p>
    </td>
    <td> <strong> $128.90 </strong></td>
</tr> */}