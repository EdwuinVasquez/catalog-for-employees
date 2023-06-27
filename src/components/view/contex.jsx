import { React, createContext, useState, useContext } from 'react';

export const DataContext = createContext();
export function DataContextProvider(props) {
  
  const [contexMenu, setContexMenu] = useState(false);
  const [contexUsuario, setContexUsuario] = useState("ADMIN");

  const valor = {contexUsuario, setContexUsuario, contexMenu, setContexMenu};

  return (
    <DataContext.Provider value={valor}>
        {props.children}
    </DataContext.Provider>
  );
}

export function useDataContex(params) {
    const contex = useContext(DataContext);

    if(!contex){
        throw new Error("No existe ningun contexto");
    }
    return contex;
}