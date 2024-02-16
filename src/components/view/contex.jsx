import { createContext, useState, useContext } from "react";

export const DataContext = createContext();
export function DataContextProvider(props) {
  const urlBaseImg = `http://10.10.10.9/catalogo-api/galeria/`;
  const [contexMenu, setContexMenu] = useState(false);
  const [contexUsuario, setContexUsuario] = useState(null);
  const [contexUsuarioLogin, setContexUsuarioLogin] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const valor = {
    contexUsuario,
    setContexUsuario,
    contexMenu,
    setContexMenu,
    contexUsuarioLogin,
    setContexUsuarioLogin,
    urlBaseImg,
    carrito,
    setCarrito,
  };

  return (
    <DataContext.Provider value={valor}>{props.children}</DataContext.Provider>
  );
}

export function useDataContex() {
  const contex = useContext(DataContext);

  if (!contex) {
    throw new Error("No existe ningun contexto");
  }
  return contex;
}
