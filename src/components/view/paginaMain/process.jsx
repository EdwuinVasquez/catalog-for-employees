/*-- Librerias --*/
import { React, useEffect, useState } from "react";

/*-- Clases y controladores --*/
import { usuario } from "../../../backend/class/usuario";
import { useDataContex } from "../contex";
const classUsuario = new usuario();

export function Process() {
	const [contador, setContador] = useState(5);
	const { urlBase, setContexUsuario, setContexUsuarioLogin, setCarrito } = useDataContex();


	const recargar = (() => {
		window.location.reload()
	})

	const login = ((n) => {
		if(n == 5){
			setContador(6);
			try {
				let datosAlmacenados = JSON.parse(localStorage.getItem("usuario"));
				let datosAlmacenadosCarrito = JSON.parse(localStorage.getItem("carritoCopia"));
				classUsuario.ingresar(datosAlmacenados['cedula'], datosAlmacenados['clave'])
					.then(resultado => {
						if (resultado[0]['CEDULA'] == undefined) {
							window.location.href = `${urlBase}`;
							throw new Error("NO SE ENCONTRARON DATOS");
						}
	
						let sesion = {
							cedula: resultado[0]['CEDULA'],
							clave: resultado[0]['CLAVE'],
							nombre: resultado[0]['NOMBRE'],
							rol: resultado[0]['ROL'],
							conctacto: resultado[0]['CONTACTO']
						};
						localStorage.removeItem("usuario");
						localStorage.setItem("usuario", JSON.stringify(sesion));
	
						setContexUsuario(resultado[0]['ROL']);
						setContexUsuarioLogin(sesion);
						if (datosAlmacenadosCarrito !== undefined && datosAlmacenadosCarrito !== null) {
							setCarrito(datosAlmacenadosCarrito);
						}
	
						switch (resultado[0]['ROL']) {
							case "SUPER":
								window.location.href = `${urlBase}admin`;
								break;
							case "ADMIN":
								window.location.href = `${urlBase}admin`;
								break;
							case "EMPLEADO":
								window.location.href = `${urlBase}emple`;
								break;
							default:
								window.location.href = `${urlBase}`;
								break;
						}
					})
					.catch(function (error) {
						recargar();
						window.location.href = `${urlBase}`;
						return error;
					});
			} catch (error) {
				recargar();
			}
		}
	});

	const patallasMain = () => {
		let ruta = window.location.href;
		ruta = ruta.toUpperCase();
		if (ruta.includes("PROCESS")) {
			login(contador);
		}
	};

	patallasMain();

	return (
		<>
			<h1 style={{ cursor: "pointer" }} onClick={() => recargar()}>Procesando, recarga la página o presióname en caso de tardar más de {contador} segundos</h1>
		</>
	);
};