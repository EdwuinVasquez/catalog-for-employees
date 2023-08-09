/*-- Librerias --*/
import { React, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/*-- Componentes --*/
import { TablaMain } from "../../../../tablas/tablaMain/tablaMain";
import { BotonSencillo } from "../../../../botones/botonSencillo";

const titulosTabla = ["Nombre estilo", "Imagen", "Estilo", "Estado", "Cambiar Estado", "Eliminar"]

export function ListaItemProducto({ datosTabla, cambiarEstado, eliminarItem, imagenes, agregar }) {
	/*-- Datos tabla --*/
	const [nuevoProducto, setNuevoProducto] = useState({
		estiloInfo: "",
		tipoContenidoInfo: "",
		contenidoHexaInfo: "#000",
		contenidoImgInfo: "",
		imagenExtraInfo: "",
		estadoInfo: ""
	});

	/*-- Datos tabla --*/
	const [tablaDatos, setTablaDatos] = useState([[]]);

	/*-- Datos tabla --*/
	const [datosNow, setDatosNow] = useState([[]]);

	const verificarDatosActuales = ((datos) => {
		if (datosNow !== datos) {
			setDatosNow(datos);
			generarListaTabla(datos);
		}
		return <></>
	});

	const generarListaTabla = (productoListaCompleta) => {
		if (productoListaCompleta.length >= 1) {
			const nuevosDatos = productoListaCompleta.map((valor, index) =>
				[{
					key: `${valor[0]["nombreItem"]}${index}`,
					id: valor[0]["nombreItem"],
					tipo: "normal",
					valor: valor[0]["nombreItem"],
					img: "",
					subClase: "",
					operacion: "",
					parametro: ""
				}, {
					key: `${valor[0]["nombreItem"]}${index}`,
					id: valor[0]["nombreItem"],
					tipo: "imag",
					valor: valor[0]["imgItem"],
					img: valor[0]["imgItem"],
					subClase: "",
					operacion: "",
					parametro: ""
				}, {
					key: `${valor[0]["nombreItem"]}${index}`,
					id: valor[0]["nombreItem"],
					tipo: "estilo",
					valor: valor[0]["contenido"],
					img: "",
					subClase: valor[0]["tipoContenido"],
					operacion: "",
					parametro: ""
				}, {
					key: `${valor[0]["nombreItem"]}${index}`,
					id: valor[0]["nombreItem"],
					tipo: "estado",
					valor: valor[0]["disponible"],
					img: "",
					subClase: valor[0]["disponible"],
					operacion: "",
					parametro: ""
				}, {
					key: `${valor[0]["nombreItem"]}${index}`,
					id: valor[0]["nombreItem"],
					tipo: "boton",
					valor: "Cambiar Estado",
					img: "",
					subClase: "modificar",
					operacion: cambiarEstado,
					parametro: valor[0]["disponible"] == 0 ? 1 : 0
				}, {
					key: `${valor[0]["nombreItem"]}${index}`,
					id: valor[0]["nombreItem"],
					tipo: "boton",
					valor: "Eliminar",
					img: "",
					subClase: "basurero",
					operacion: eliminarItem,
					parametro: valor[0]["nombreItem"]
				}]
			);
			setTablaDatos(nuevosDatos);
		} else {
			setTablaDatos([[]]);
		}
	}

	const value = ((e, id) => {
		let nuevosDatos = nuevoProducto;
		nuevosDatos[id] = e.target.value.trim();
		setNuevoProducto(nuevosDatos);
	})

	const listaImagenes = ((json) => {
		const listaToSting = JSON.stringify(json);
		const lista = Object.values(JSON.parse(listaToSting));
		if (lista != false) {
			return <>
				{
					lista.map((value) => {
						return <option value={value}>{value}</option>
					})
				}
			</>
		}
		return <option key="1232" defaultValue="no hay datos">no hay datos</option>
	})

	const agregarProducto = (() => {
		agregar(nuevoProducto);
	});

	return (
		<div style={{ width: "92%" }}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Agregar estilo producto</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						{/*-- Nombre Estilo --*/}
						<div className="campoVerificado">
							<input id='productoNombreBase' className="campoVerificado__campo" onChange={(e) => value(e, "estiloInfo")} type="text" required="" autoComplete="off" />
							<label className={"campoVerificado__texto"}>Nombre estilo</label>
						</div>
						{/*-- Tipo contenido --*/}
						<div className="selectBase" style={{ width: "92%" }}>
							<select id='productoEstadoBase' className="selectBase__select" onChange={(e) => value(e, "tipoContenidoInfo")} required="" autoComplete="off">
								<option selected={true} defaultValue="NAN" disabled="disabled">seleccione una opcion</option>
								<option value="1">Imagen</option>
								<option value="0">Color</option>
							</select>
							<i className="selectBase__flecha"></i>
							<label className={"selectBase__texto  "} >Tipo contenido</label>
						</div>
						{/*-- Contenido --*/}
						<div style={{ width: "92%", display: "grid", gridTemplateColumns: "30% 1fr", }}>
							<div className="campoVerificado">
								<input style={{ width: "80%", height: "45px" }} list='' className="campoVerificado__campo" onChange={(e) => value(e, "contenidoHexaInfo")} type="color" required="" autoComplete="off" />
								<label className={"campoVerificado__texto"}>Contenido en color</label>
							</div>
							<div className="selectBase" style={{ width: "100%", height: "45px" }}>
								<select id='productoEstadoBase' className="selectBase__select" onChange={(e) => value(e, "contenidoImgInfo")} required="" autoComplete="off">
									<option selected={true} defaultValue="NAN" disabled="disabled">seleccione una opcion</option>
									{listaImagenes(imagenes)}
								</select>
								<i className="selectBase__flecha"></i>
								<label className={"selectBase__texto  "} >Contenido en imagen</label>
							</div>
						</div>
						{/*-- Imagen extra --*/}
						<div className="selectBase" style={{ width: "92%" }}>
							<select id='productoEstadoBase' className="selectBase__select" onChange={(e) => value(e, "imagenExtraInfo")} required="" autoComplete="off">
								<option selected={true} defaultValue=""></option>
								{listaImagenes(imagenes)}
							</select>
							<i className="selectBase__flecha"></i>
							<label className={"selectBase__texto  "} >Imagen extra</label>
						</div>
						{/*-- Estado --*/}
						<div className="selectBase" style={{ width: "92%" }}>
							<select id='productoEstadoBase' className="selectBase__select" onChange={(e) => value(e, "estadoInfo")} required="" autoComplete="off">
								<option selected={true} defaultValue="NAN" disabled="disabled">seleccione una opcion</option>
								<option value="1">Activo</option>
								<option value="0">Bloqueado</option>
							</select>
							<i className="selectBase__flecha"></i>
							<label className={"selectBase__texto  "} >Estado</label>
						</div>
						{/*-- BotonSencillo --*/}
						<div style={{ width: "92%" }}>
							<BotonSencillo texto="Agregar Estilo" manejarClik={agregarProducto}></BotonSencillo>
						</div>
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion >
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
					onClick={() => generarListaTabla(datosTabla)}
				>
					<Typography>Estilos vinculados</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<div style={{ height: "400px" }}>
							<TablaMain
								buscadorNombre="Codigo o nombre"
								buscadorTitulo="Productos"
								actualizar={generarListaTabla}
								tablaTitulos={titulosTabla}
								tablaContenido={tablaDatos}
								oculto={true}>
							</TablaMain>
						</div>
					</Typography>
				</AccordionDetails>
			</Accordion>
			<br />
			{verificarDatosActuales(datosTabla)}
		</div>
	);
};