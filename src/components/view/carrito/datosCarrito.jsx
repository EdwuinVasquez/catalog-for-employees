/*-- Estilos --*/
import "../../style/carrito/datos.css";
import "react-lazy-load-image-component/src/effects/blur.css";

/*-- Librerias --*/
import { LazyLoadImage } from "react-lazy-load-image-component";

/*-- Componentes --*/
import { GrFormClose } from "react-icons/gr";

/*-- Clases y controladores --*/
import { useDataContex } from "../contex";
import {
  formatearNumero,
  formatearTexto,
} from "../../../backend/funcioneGenerales";

export function CarritoCatalogoItems({
  nombre,
  cantidad,
  valorUnidad,
  imagenItem,
  manejarClick,
  parametros,
}) {
  const { urlBaseImg } = useDataContex();

  const calcularCosto = (cantidad, valor) => {
    const total = cantidad * valor;
    return formatearNumero(total);
  };

  return (
    <div className="carritoCatalogo__item">
      <div className="carritoCatalogo__imagen">
        <LazyLoadImage
          src={`${urlBaseImg}${imagenItem}`}
          alt=""
          className="carritoCatalogo__imagen--img"
          effect="blur"
        />
      </div>
      <div className="carritoCatalogo__datos">
        <section>
          <span className="carritoCatalogo__datos--nombre" title={nombre}>
            {formatearTexto(nombre, 55)}
          </span>
        </section>
        <section>
          <span className="carritoCatalogo__datos--cantidad">
            {cantidad} x
            <span className="carritoCatalogo__datos--precio">
              {" "}
              ${calcularCosto(1, valorUnidad)}
            </span>
          </span>
        </section>
      </div>
      <GrFormClose
        className="carritoCatalogo__icono"
        onClick={() => manejarClick(parametros)}
      ></GrFormClose>
    </div>
  );
}
