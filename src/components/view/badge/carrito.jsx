/*-- Librerias --*/
import { Badge } from "@mui/material";
import { BsCart3 } from "react-icons/bs";

/*-- clases y controladores --*/
import { useDataContex } from "../contex";

export function CarritoBoton({ manejarClick }) {
  /*-- Estado global --*/
  const { carrito, setContexMenu } = useDataContex();

  /*-- Activar visor de carrito --*/
  const procesarClick = () => {
    setContexMenu(false);
    manejarClick(true);
  };

  /*-- Calcular numero de items --*/
  const calcularItems = () => {
    try {
      if (carrito[0] != undefined) {
        const total = carrito.reduce((valorAnterior, valorActual) => {
          return valorAnterior + parseInt(valorActual[0]["cantidad"]);
        }, 0);
        return total;
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };

  return (
    <div onClick={procesarClick}>
      <Badge color="primary" badgeContent={calcularItems()} showZero>
        <BsCart3></BsCart3>
      </Badge>
    </div>
  );
}
