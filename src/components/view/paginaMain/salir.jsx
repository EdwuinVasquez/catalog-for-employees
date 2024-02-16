/*-- Librerias --*/
import { useDataContex } from "../contex";
import { useNavigate } from "react-router-dom";

export function Salir() {
  const navigate = useNavigate();

  const {
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
  navigate("/login");
  return (
    <>
      <h1>Cerrando</h1>
    </>
  );
}
