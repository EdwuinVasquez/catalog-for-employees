/*-- Estilos --*/
import "../../style/menus/menuSuperAdmin.css";
import "../../style/menus/components/opcion.css";

/*-- Componentes --*/
import { OpcionMenu } from "./components/opcion.jsx";
import { CabezeraMenu } from "./components/cabezeraMenu.jsx";
import { BotonMenu } from "../botones/botonMenu.jsx";

/*-- Clases y controladores  --*/
import { useDataContex } from "../contex.jsx";

export function MenuEmpleado() {
  const { contexMenu } = useDataContex();

  return (
    <>
      <div
        className={
          contexMenu === false ? "menu--desactivado" : "menu--activado"
        }
      >
        <nav className="menu">
          <CabezeraMenu></CabezeraMenu>
          <BotonMenu estado={contexMenu}></BotonMenu>
          <ul className="lista">
            <OpcionMenu
              opciones={false}
              ruta=""
              icono="MdLocalGroceryStore"
              nombre="Catalogo"
            ></OpcionMenu>
            <OpcionMenu
              opciones={false}
              ruta="compras"
              icono="MdWorkHistory"
              nombre="Mis pedidos"
            ></OpcionMenu>
            <OpcionMenu
              opciones={false}
              ruta="ajustes"
              icono="RiSettings4Fill"
              nombre="Configuracion"
            ></OpcionMenu>
            <OpcionMenu
              opciones={false}
              ruta="salir"
              icono="ImExit"
              nombre="Cerrar sesion"
            ></OpcionMenu>
          </ul>
        </nav>
      </div>
    </>
  );
}
