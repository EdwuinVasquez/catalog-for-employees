/*-- Estilos --*/
import "../../../../style/reporte/filtros.css";

/*-- Librerias --*/
import { React, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';

/*-- Componentes --*/
import { BotonSencillo } from "../../../botones/botonSencillo";

/*-- Ajustes del select --*/
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

/*-- Datos del select --*/
const names = [
	'Pendiente',
	'Cancelado',
	'Pago',
	'Entregado',
];

export function FiltrosDatosTabla({ estadoFiltro, valueFechaInicial, valueFechaFinal, fechaInicial, fechaFinal, filtarDatos }) {
	/*-- Datos seleccionados en el select --*/
	const [estadoNombre, setEstadoNombre] = useState([]);

	/*-- estado abierto o cerrado de los filtros de estado --*/
	const [estadoFiltros, setEstadofiltros] = useState(false);

	/*-- desplegar el selector de filtro --*/
	const desplegarEstadoFiltros = () => {
		setEstadofiltros(true);
	};

	/*-- cerrar el selector de filtro --*/
	const cerrarEstadoFiltros = () => {
		setEstadofiltros(false);
	};

	/*-- actualizar los datos del selector --*/
	const manejarCambioFiltroEstado = (event) => {
		const {
			target: { value },
		} = event;
		const nuevoFiltro = typeof value === 'string' ? value.split(',') : value;
		setEstadoNombre(nuevoFiltro);
		estadoFiltro(nuevoFiltro.reduce((acumulador, dato) => `${acumulador} ${dato}`, ""));
	};

	/*-- actualizar fecha inicial --*/
	const modificarFechaInicial = (e) => {
		fechaInicial(`${e.target.value} 00:00:05`);
	};

	/*-- actualizar fecha final --*/
	const modificarFechaFinal = (e) => {
		fechaFinal(`${e.target.value} 23:59:55`);
	};

	return (
		<div className="contenedor__buscador" style={{ width: "550px", gap: "8px" }}>
			<h4>Filtros: </h4>
			<Tooltip title="Fecha inicio" placement="bottom">
				<input
					className="filtrosTabla__input--fecha"
					defaultValue={valueFechaInicial}
					onChange={modificarFechaInicial}
					type="date">
				</input>
			</Tooltip>
			<Tooltip title="Fecha final" placement="bottom">
				<input
					className="filtrosTabla__input--fecha"
					defaultValue={valueFechaFinal}
					onChange={modificarFechaFinal}
					type="date">
				</input>
			</Tooltip>
			<Tooltip title="Estado" placement="bottom">
				<div>
					<Button variant="outlined" onClick={desplegarEstadoFiltros}>
						Estado
					</Button>
					<Dialog open={estadoFiltros} onClose={cerrarEstadoFiltros}>
						<DialogTitle>Selecciona los estados</DialogTitle>
						<DialogContent>
							<DialogContentText>
								<strong>Pendiente: </strong>Solicitud de compra sin procesamiento. <br />
								<strong>Cancelado: </strong>Solicitud de compra rechazada o cancelada.  <br />
								<strong>Paga: </strong>Solicitud de compra con un pago exitoso.  <br />
								<strong>Entregada: </strong>Solicitud de compra la cual ya fue entregada.  <br />
							</DialogContentText>
							<div>
								<FormControl sx={{ m: 1, width: 500 }}>
									<InputLabel id="demo-multiple-checkbox-label">Estado</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={estadoNombre}
										onChange={manejarCambioFiltroEstado}
										input={<OutlinedInput label="Estado" />}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={MenuProps}
									>
										{names.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={estadoNombre.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={cerrarEstadoFiltros}>Aplicar</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Tooltip>
			<Tooltip title="Filtar" placement="bottom">
				<div style={{ width: "45px" }}>
					<BotonSencillo texto="Filtar" manejarClik={() => filtarDatos()}></BotonSencillo>
				</div>
			</Tooltip>
		</div>
	);
};