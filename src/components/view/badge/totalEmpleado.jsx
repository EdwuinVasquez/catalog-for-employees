/*-- Estilos --*/
import '../../style/badge/total.css';

/*-- Librerias --*/
import { React, useState, forwardRef } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

/*-- clases y controladores --*/
import { useDataContex } from "../contex";
import { VentaIndividual } from '../venta/ventaIndividual';
import { emple } from '../../../backend/class/empleado';
import { formatearNumero, imprimir } from '../../../backend/funcioneGenerales';
const classEmple = new emple();

/*-- Activar transicion --*/
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function CarritoTotalEmpleado({ manejarClick }) {
	/*-- Estado global --*/
	const { carrito, setCarrito, contexUsuarioLogin } = useDataContex();

	/*-- Estado de datos adicioneles --*/
	const [open, setOpen] = useState(false);

	/*-- Lista de compra --*/
	const [listasVenta, setListasVenta] = useState(false);

	/*-- Mostrar datos adicionales--*/
	const handleClickOpen = () => {
		setOpen(true);
	};

	/*-- Ocultar Datos adiccionales --*/
	const handleClose = () => {
		setOpen(false);
	};

	/*-- Calcular costo --*/
	const calcularCosto = (() => {
		const total = carrito.reduce((valorAnterior, valorActual) => {
			return valorAnterior + (valorActual[0]["valor"] * valorActual[0]["cantidad"]);
		}, 0);
		return formatearNumero(total);
	});

	/*-- Finalizar Venta --*/
	const finalizarVenta = (() => {
		classEmple.finalizarVenta(carrito, contexUsuarioLogin)
			.then((resultado) => {
				localStorage.removeItem('carritoCopia');
				setListasVenta(resultado);
				handleClickOpen();
				manejarClick([[]]);
				setCarrito([]);
			})
			.catch((error) => {
				console.log(error);
			});
	});

	/*-- generar datos --*/
	const generar = ((lista) => {
		return <>
			<VentaIndividual lista={lista}></VentaIndividual>
		</>
	})
	return (
		<><div className="carritoTotal">
			<div className="carritoTotal__total">
				<h3>Total: </h3>
				<h3>${calcularCosto()}</h3>
			</div>
			<div className="carritoTotal__boton"
				onClick={finalizarVenta}>
				<button
					className="carritoTotal__boton  carritoTotal__boton--verde"
				>Finalizar compra</button>
			</div>
		</div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Cerrar
						</Typography>
						<Button autoFocus color="inherit" onClick={imprimir}>
							Imprimir
						</Button>
					</Toolbar>
				</AppBar>
				<div>
					{generar(listasVenta)}
				</div>
			</Dialog>
		</>
	);
};