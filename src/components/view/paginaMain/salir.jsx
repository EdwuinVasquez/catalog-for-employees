/*-- Librerias --*/
import { useDataContex } from "../contex";

export function Salir() {
  const {
    urlBase,
    setContexMenu,
    setContexUsuario,
    setContexUsuarioLogin,
    setCarrito,
  } = useDataContex();
  localStorage.removeItem("usuario");
  localStorage.removeItem("carritoCopia");
  setContexMenu(false);
  setContexUsuario(null);
  setContexUsuarioLogin(null);
  setCarrito([]);
  window.location.href = `${urlBase}`;
  return (
    <>
      <h1>Cerrando</h1>
    </>
  );
}
