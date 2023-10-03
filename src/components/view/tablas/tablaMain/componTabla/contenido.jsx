/*-- Estilos --*/
import "../../../../style/tabla/tablaMain/contenido.css";

/*-- Importaciones --*/
import { v4 as uuidv4 } from "uuid";

/*-- Componentes --*/
import { TablaTitulos } from "./titulos";
import { TablaBody } from "./datos";

export function TablaCotenido({ titulos, contenido, actualizar }) {
  /*-- Generar tuplas --*/
  const datos = () => {
    try {
      if (contenido[0].length > 2) {
        return contenido.map((valor) => (
          <TablaBody key={uuidv4()} datos={valor}></TablaBody>
        ));
      } else {
        return <h1 key={uuidv4()}>No hay datos almacenados</h1>;
      }
    } catch (error) {
      actualizar();
    }
  };

  return (
    <>
      <section className="tabla__contenido" id="tabla__contenido--export">
        <table>
          <TablaTitulos titulos={titulos}></TablaTitulos>
          <tbody>{datos()}</tbody>
        </table>
      </section>
    </>
  );
}
