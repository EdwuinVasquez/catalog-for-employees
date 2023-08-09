/*-- Librerias --*/
import { React, useState } from "react";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin";
import { InformacionHome } from "./info";
const classAdmin = new admin();

export function HomeAdmin() {
	/*-- informacion general de la app --*/
	const [infoGeneral, setInfoGeneral] = useState();

	/*-- Generar lista de ventas --*/
	const generarInfo = async () => {
		classAdmin.home()
			.then(resultado => {
				setInfoGeneral(resultado[0]);
			}).catch(function (error) {
				setInfoGeneral([]);
				console.error(error);
			});
	};

	return (
		<>
			<InformacionHome datos={infoGeneral} generarInfo={generarInfo}></InformacionHome>
		</>
	);
};
