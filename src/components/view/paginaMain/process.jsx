//importacion de librerias
import { React, useEffect } from "react";
import { useDataContex } from "../contex";
import { usuario } from "../../../backend/class/usuario";
const classUsuario = new usuario();

export function Process() {
	const { urlBase, setContexUsuario, setContexUsuarioLogin, setCarrito } = useDataContex();
	
	useEffect(() => {
		try {
			let datosAlmacenados = JSON.parse(localStorage.getItem("usuario"));
			let datosAlmacenadosCarrito = JSON.parse(localStorage.getItem("carritoCopia"));
		  classUsuario.ingresar(datosAlmacenados['cedula'], datosAlmacenados['clave'])
		  .then(resultado =>{
		  	if(resultado[0]['CEDULA'] == undefined){
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
			if(datosAlmacenadosCarrito !== undefined && datosAlmacenadosCarrito !== null){
				setCarrito(datosAlmacenadosCarrito);
			}
		  	
		  	switch (resultado[0]['ROL']) {
		  		case "SUPER":
		  			window.location.href = `${urlBase}admin`;
		  			break;
		  		case "ADMIN":
		  			window.location.href = `${urlBase}admin`;
		  			break;
		  		case "V-V":
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
        console.error(error);
      });
		} catch (error) {
			window.location.href = `${urlBase}`;
		}
	});

  return(
		<>
		<h1>Procesando</h1>
		</>
	);
};