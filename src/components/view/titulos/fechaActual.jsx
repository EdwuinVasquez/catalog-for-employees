/*-- Estilos --*/
import '../../style/titulos/fechaActual.css';

/*-- Librerias --*/
import { React } from "react";

export function FechaActual() {
	return (
		<>
			<p className="fechaActual">actualizada el:  {generarFecha()} </p>
		</>
	);
};

/*-- Generar fecha actual --*/
const generarFecha = () => {
	const today = new Date();
	const now = today.toLocaleString();
	return now;
}
