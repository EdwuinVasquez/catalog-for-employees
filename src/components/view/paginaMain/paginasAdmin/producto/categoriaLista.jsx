//importacion de librerias
import { React, useState, useEffect } from "react";
import { evaluate, round } from 'mathjs'
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";
import { admin } from "../../../../../backend/class/admin.js"
import { useDataContex } from "../../../contex.jsx"
import { alertaConfirmar, alertaInput, alertaToast } from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();

export function CategoriaLista() {
	const [datosMain, setDatosMain] = useState();

	const titulosTabla = ["Codigo", "Nombre", "Productos vinculados", "Promedio Iva", "Promedio Descuento", "Estado", "Cambiar estado", "Renombrar", "Modificar iva", "Modificar descuento", "Modificar precio en valor", "Modificar pecio en porcentaje", "Eliminar"]

	const generarLista = async () => {
		classAdmin.categorias()
			.then(resultado => {
				if (resultado === false) {
					console.clear();
					throw new Error("No hay resultados almacenados");
				}
				let productosFiltrados = resultado.filter((tupla, index) => {
					return resultado.indexOf(
						resultado.find(valor => valor["CODIGO_CATEGORIA"] == tupla["CODIGO_CATEGORIA"])
					) === index;
				});

				const nuevosDatos = productosFiltrados.map((valor) =>
					[{
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "normal",
						valor: valor["CODIGO_CATEGORIA"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "normal",
						valor: valor["NOMBRE_CATEGORIA"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "normal",
						valor: valor["NUMERO_PRODUCTOS"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "normal",
						valor: valor["PROMEDIO_IVA"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "normal",
						valor: valor["PROMEDIO_DESCUENTO"],
						img: "",
						subClase: "",
						operacion: "",
						parametro: ""
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "estado",
						valor: valor["DISPONIBILIDAD"],
						img: "",
						subClase: valor["DISPONIBILIDAD"],
						operacion: "",
						parametro: ""
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Cambiar estado",
						img: "",
						subClase: "modificar",
						operacion: modificarEstadoCategoria,
						parametro: valor["DISPONIBILIDAD"] == 1 ? 0 : 1
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Nombre",
						img: "",
						subClase: "renombrar",
						operacion: modificarNombreCategoria,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Iva",
						img: "",
						subClase: "iva",
						operacion: modificarIvaCategoria,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Descuento",
						img: "",
						subClase: "descuento",
						operacion: modificarDescuentoCategoria,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Valor",
						img: "",
						subClase: "valor",
						operacion: modificarValorNumeroCategoria,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Porcentaje",
						img: "",
						subClase: "porcentaje",
						operacion: modificarValorPorcentajeCategoria,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}, {
						key: valor["CODIGO_CATEGORIA"],
						id: valor["CODIGO_CATEGORIA"],
						tipo: "boton",
						valor: "Eliminar",
						img: "",
						subClase: "basurero",
						operacion: eliminarCategoria,
						parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1
					}]
				);
				if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
				if (nuevosDatos.length <= 0) setDatosMain([[]]);
			}).catch(function (error) {
				setDatosMain([[]]);
				console.error(error);
			});
	}

	const eliminarCategoria = async (codigo, dato) => {
		alertaConfirmar(
			"Segur@ que desea eliminar el producto",
			`El producto con el número "${codigo}" será eliminado si no cuenta con ventas registradas`,
			"warning")
			.then(confirm => {
				if (confirm) {
					classAdmin.eliminarCategoria(codigo)
						.then(resultado => {
							alertaToast(
								"success",
								"Proceso finalizado",
								5000,
								"top-end");
							generarLista();
						});
				}
			}).catch(function (error) {
				return error;
			});

	}

	const modificarEstadoCategoria = async (codigo, dato) => {
		const nuevoEstado = {
			codigo: codigo,
			estado: dato,
		}

		classAdmin.modificarEstadoCategoria(nuevoEstado)
			.then(resultado => {
				if (resultado === false) {
					console.clear();
					throw new Error("No hay resultados almacenados");
				}
				generarLista();
			}).catch(function (error) {
				console.error(error);
			});
	}

	const modificarIvaCategoria = async (codigo, dato) => {
		alertaConfirmar(
			"Segur@ que desea modificar el IVA de los productos vinculados a esta categoría",
			`Codigo: "${codigo}"`,
			"warning")
			.then(confirm => {
				if (confirm) {
					alertaInput()
						.then(resultado => {
							if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
							const nuevosDatos = {
								codigo: codigo,
								iva: resultado,
							}
							classAdmin.modificarIvaCategoria(nuevosDatos)
								.then((resultado) => {
									alertaToast(
										"success",
										`Categoría actualizada`,
										5000,
										"top-end");
									generarLista();
								})
						}).catch(function (error) {
							return error;
						});
				}
			}).catch(function (error) {
				return error;
			});
	}

	const modificarDescuentoCategoria = async (codigo, dato) => {
		alertaConfirmar(
			"Segur@ que desea modificar el descuento de los productos vinculados a esta categoría",
			`Codigo: "${codigo}"`,
			"warning")
			.then(confirm => {
				if (confirm) {
					alertaInput()
						.then(resultado => {
							if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
							const nuevosDatos = {
								codigo: codigo,
								descuento: resultado,
							}
							classAdmin.modificarDescuentoCategoria(nuevosDatos)
								.then((resultado) => {
									alertaToast(
										"success",
										`Categoría actualizada`,
										5000,
										"top-end");
									generarLista();
								})
						}).catch(function (error) {
							return error;
						});
				}
			}).catch(function (error) {
				return error;
			});
	}

	const modificarValorNumeroCategoria = async (codigo, dato) => {
		alertaConfirmar(
			"Segur@ que desea modificar el precio de los productos vinculados a esta categoría",
			`Codigo: "${codigo}"`,
			"warning")
			.then(confirm => {
				if (confirm) {
					alertaInput()
						.then(resultado => {
							if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
							const nuevosDatos = {
								codigo: codigo,
								valor: resultado,
							}
							classAdmin.modificarValorNumeroCategoria(nuevosDatos)
								.then((resultado) => {
									alertaToast(
										"success",
										`Categoría actualizada`,
										5000,
										"top-end");
									generarLista();
								})
						}).catch(function (error) {
							return error;
						});
				}
			}).catch(function (error) {
				return error;
			});
	}

	const modificarValorPorcentajeCategoria = async (codigo, dato) => {
		alertaConfirmar(
			"Segur@ que desea modificar el precio de los productos vinculados a esta categoría",
			`Codigo: "${codigo}"`,
			"warning")
			.then(confirm => {
				if (confirm) {
					alertaInput()
						.then(resultado => {
							if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
							const nuevosDatos = {
								codigo: codigo,
								porcentaje: resultado,
							}
							classAdmin.modificarValorPorcentajeCategoria(nuevosDatos)
								.then((resultado) => {
									alertaToast(
										"success",
										`Categoría actualizada`,
										5000,
										"top-end");
									generarLista();
								})
						}).catch(function (error) {
							return error;
						});
				}
			}).catch(function (error) {
				return error;
			});
	}

	const modificarNombreCategoria = async (codigo, dato) => {
		alertaConfirmar(
			"Segur@ que desea modificar el nombre de la categoría",
			`Codigo: "${codigo}"`,
			"warning")
			.then(confirm => {
				if (confirm) {
					alertaInput()
						.then(resultado => {
							if (resultado == undefined || resultado == "") throw new Error("No se ingreso un valor valido")
							const nuevosDatos = {
								codigo: codigo,
								nombre: resultado,
							}
							console.log(nuevosDatos)
							classAdmin.modificarNombreCategoria(nuevosDatos)
								.then((resultado) => {
									console.log(resultado)
									alertaToast(
										"success",
										`Categoría actualizada`,
										5000,
										"top-end");
								})
							generarLista();
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
				buscadorNombre="Codigo o nombre"
				buscadorTitulo="Categorias"
				actualizar={generarLista}
				tablaTitulos={titulosTabla}
				tablaContenido={datosMain}
				oculto={true}>
			</TablaMain>
		</>
	);
};