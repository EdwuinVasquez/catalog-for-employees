/*-- Librerias --*/
import { React, useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js"
import { alertaConfirmar, alertaToast, alertaInput } from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();

/*-- Titulos de la tabla --*/
const titulosTabla = ["Cedula", "Nombre", "N°compras", "Ingreso", "Contato", "Estado", "Cambiar estado", "Cambiar clave", "Eliminar empleado"]

export function EmpleadosLista() {
	/*-- Lista de empleados --*/
	const [datosMain, setDatosMain] = useState();

	/*-- Generar lista de empleados --*/
	const generarLista = async () => {
		classAdmin.usuarios()
			.then(resultado => {
				if (resultado === false) {
					throw new Error("No hay resultados almacenados");
				}
				const empleadosLista = resultado.filter(tupla =>
					tupla["ROL"] === "EMPLEADO" && tupla["USUARIO_VERIFICADO"] === "1"
				);
				const nuevosDatos = empleadosLista.map((valor) =>
					[{
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "normal",
						valor: valor["CEDULA"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "normal",
						valor: valor["NOMBRE"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "normal",
						valor: valor["NUMERO_COMPRAS"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "normal",
						valor: valor["ULTIMO_INGRESO"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "normal",
						valor: valor["CONTACTO"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "estado",
						valor: valor["USUARIO_ACTIVADO"],
						img: "",
						subClase: valor["USUARIO_ACTIVADO"],
						operacion: "",
						parametro: ""
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "boton",
						valor: "Modificar estado",
						img: "",
						subClase: "modificar",
						operacion: modificarEstadoEmpleado,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "boton",
						valor: "Nueva clave",
						img: "",
						subClase: "userUpdate",
						operacion: modificarClaveEmpleado,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CEDULA"],
						id: valor["CEDULA"],
						tipo: "boton",
						valor: "Eliminar empleado",
						img: "",
						subClase: "basurero",
						operacion: eliminarEmpleadoSistema,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}]
				);
				if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
				if (nuevosDatos.length <= 0) setDatosMain([[]]);
			}).catch(function (error) {
				setDatosMain([[]]);
			});
	}

	/*-- Modificar Empleado --*/
	const modificarEstadoEmpleado = async (cedula, dato) => {
		const nuevoEstado = {
			cedula: cedula,
			estado: dato,
		}

		classAdmin.modificarEstadoUsuario(nuevoEstado)
			.then(resultado => {
				if (resultado === false) {
					alertaToast("warning", "Ocurrió un error", 5000, "top-end");
					throw new Error("No hay resultados almacenados");
				}
				alertaToast(
					resultado[0]["RESULTADO"].toUpperCase().includes("ERROR") ? "error" : "success",
					resultado[0]["RESULTADO"],
					5000,
					"top-end");
				generarLista();
			}).catch(function (error) {
				return error;
			});
	}

	/*-- Eliminar Empleado --*/
	const eliminarEmpleadoSistema = async (cedula, dato) => {
		alertaConfirmar(
			"Segur@ que desea eliminar el empleado",
			`El empleado con el número de cédula "${cedula}" será eliminado si no cuenta con ventas registradas`,
			"warning")
			.then(confirm => {

				if (confirm) {
					classAdmin.eliminarEmpleado(cedula)
						.then(() => {
							classAdmin.usuarios(cedula)
								.then(resultado => {
									if (resultado.length == 0) {
										alertaToast(
											"success",
											"El usuario ha sido eliminado",
											5000,
											"top-end");
										generarLista();
									} else {
										alertaToast("warning", "El usuario no se pudo eliminado", 5000, "top-end");
									}
								});
						});
				}
			}).catch(function (error) {
				return error;
			});

	}

	/*-- modificar clave Empleado --*/
	const modificarClaveEmpleado = async (cedula, dato) => {
		alertaConfirmar(
			"Segur@ que desea modificar la clave del empleado",
			`CC: "${cedula}"`,
			"warning")
			.then(confirm => {
				if (confirm) {
					alertaInput()
						.then(resultado => {
							if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
							let nuevosDatos = {
								cedula: cedula,
								clave: resultado
							}
							classAdmin.cambiarClave(nuevosDatos)
								.then((resultado) => {
									alertaToast(
										"success",
										`${resultado[0]["RESULTADO"]}`,
										5000,
										"top-end");
								})
						}).catch(function (error) {
							return error;
						});
				}
			}).catch(function (error) {
				return error;
			});

	}

	return (
		<>
			<TablaMain
				buscadorNombre="Cedula o nombre"
				buscadorTitulo="Empleados"
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain}
				oculto={true}>
			</TablaMain>
		</>
	);
};