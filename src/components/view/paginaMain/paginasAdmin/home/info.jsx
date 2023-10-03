/*-- Librerias --*/
import { Link } from "react-router-dom";
import "../../../../style/paginaMain/home.css";

/*-- clases y controladores --*/
import { admin } from "../../../../../backend/class/admin";
const classAdmin = new admin();

export function InformacionHome({ datos, generarInfo }) {
  const modificarEstado = (datos) => {
    classAdmin
      .estadoCatalogo(datos)
      .then((resultado) => {
        generarInfo();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const informacion = (data) => {
    try {
      const nuevoEstado = { estado: data["ESTADO_CATALOGO"] == 1 ? 0 : 1 };
      const mensajeCatalogo =
        data["ESTADO_CATALOGO"] == 1
          ? "El catálogo, sé encuentra activa con todos los productos disponibles"
          : "El catálogo, sé encuentra bloqueada";
      return (
        <div className="informacionHome">
          <div
            className={`cardHome  ${
              data["ESTADO_CATALOGO"] == 1
                ? "cardHome--catalogoActivo"
                : "cardHome--catalogoBloqueado"
            }`}
          >
            <div
              className={`cardHome-img  ${
                data["ESTADO_CATALOGO"] == 1
                  ? "cardHome__img--catalogoActivo"
                  : "cardHome__img--catalogoBloqueado"
              }`}
            ></div>
            <div className="cardHome-info">
              <p className="text-body">
                <span className="cardHome__titulo"> Catalogo </span> <br />
                <span className="cardHome__texto">
                  {" "}
                  {mensajeCatalogo}{" "}
                </span>{" "}
                <br />
              </p>
              <p
                className="cardHome-boton "
                onClick={() => modificarEstado(nuevoEstado)}
              >
                Modificar
              </p>
            </div>
          </div>
          <div className="cardHome  cardHome--ventas">
            <div className="cardHome-img  cardHome__img--ventas"></div>
            <div className="cardHome-info">
              <p className="text-body">
                <span className="cardHome__titulo"> Ventas </span> <br />
                <span className="cardHome__texto">
                  {" "}
                  Entregadas: {data["VENTA_ENTREGADA"]}{" "}
                </span>{" "}
                <br />
                <span className="cardHome__texto">
                  {" "}
                  Pagas: {data["VENTA_PAGA"]}{" "}
                </span>{" "}
                <br />
                <span className="cardHome__texto">
                  {" "}
                  Rechazadas: {data["VENTA_CANCELADA"]}{" "}
                </span>{" "}
                <br />
                <span className="cardHome__texto">
                  {" "}
                  Pendientes: {data["VENTA_PENDIENTE"]}{" "}
                </span>{" "}
                <br />
              </p>
              <Link to="ventas/lista" className="opcion__link">
                <p className="cardHome-boton ">Entrar</p>
              </Link>
            </div>
          </div>
          <div className="cardHome  cardHome--producto">
            <div className="cardHome-img  cardHome__img--producto"></div>
            <div className="cardHome-info">
              <p className="text-body">
                <span className="cardHome__titulo"> Productos </span> <br />
                <span className="cardHome__texto">
                  {" "}
                  Activos: {data["PRODUCTO_ACTIVO"]}{" "}
                </span>{" "}
                <br />
                <span className="cardHome__texto">
                  {" "}
                  Desactivos: {data["PRODUCTOS_DESACTIVOS"]}{" "}
                </span>{" "}
                <br />
              </p>
              <Link to="producto/lista" className="opcion__link">
                <p className="cardHome-boton ">Entrar</p>
              </Link>
            </div>
          </div>
          <div className="cardHome  cardHome--usuario">
            <div className="cardHome-img  cardHome__img--usuario"></div>
            <div className="cardHome-info">
              <p className="text-body">
                <span className="cardHome__titulo"> Usuarios </span> <br />
                <span className="cardHome__texto">
                  {" "}
                  Activos: {data["USUARIOS_ACTIVOS"]}{" "}
                </span>{" "}
                <br />
                <span className="cardHome__texto">
                  {" "}
                  Bloqueados: {data["USUARIOS_BLOQUEADOS"]}{" "}
                </span>{" "}
                <br />
                <span className="cardHome__texto">
                  {" "}
                  Sin verificar: {data["USURIOS_SIN_VERIFICAR"]}{" "}
                </span>{" "}
                <br />
              </p>
              <Link to="empleados/lista" className="opcion__link">
                <p className="cardHome-boton ">Entrar</p>
              </Link>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      generarInfo();
      return <h1>Esperando datos</h1>;
    }
  };
  return <>{informacion(datos)}</>;
}
