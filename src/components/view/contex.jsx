import { React, createContext, useState, useContext } from 'react';

export const DataContext = createContext();
export function DataContextProvider(props) {
  
  const urlBase = `${window.location.protocol}//${window.location.host}/build/#/`;
  // const urlBaseImg = `${window.location.protocol}//${window.location.host}/build/`;
  const urlBaseImg = `http://localhost/build/static/media/galeria/`;
  const [contexMenu, setContexMenu] = useState(false);
  const [contexUsuario, setContexUsuario] = useState(null);
  const [contexUsuarioLogin, setContexUsuarioLogin] = useState(null);
	const [detallesActivo, setDetallesActivo] = useState(false);

  const valor = {contexUsuario, setContexUsuario, contexMenu, setContexMenu, contexUsuarioLogin, setContexUsuarioLogin, urlBase, urlBaseImg, detallesActivo, setDetallesActivo};

  return (
    <DataContext.Provider value={valor}>
        {props.children}
    </DataContext.Provider>
  );
}

export function useDataContex() {
    const contex = useContext(DataContext);

    if(!contex){
        throw new Error("No existe ningun contexto");
    }
    return contex;
}