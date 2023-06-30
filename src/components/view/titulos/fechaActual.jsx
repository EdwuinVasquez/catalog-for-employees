//importacion de librerias
import {React } from "react";
import '../../style/titulos/fechaActual.css'

export function FechaActual() {
    const generarFecha = () =>{
      const today = new Date();
			const now = today.toLocaleString();
			return now;
    }
	return(
		<>
		<p className="fechaActual">actualizada el:  {generarFecha()} </p>
		</>
	);
};

