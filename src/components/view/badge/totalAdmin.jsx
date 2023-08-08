/*-- Estilos --*/
import '../../style/badge/total.css';

/*-- Librerias --*/
import { React } from "react";

/*-- clases y controladores --*/
import { useDataContex } from "../contex";
import { admin } from '../../../backend/class/admin';
import { formatearNumero } from '../../../backend/funcioneGenerales';
import { alertaToast } from '../../../backend/swetAlert2';
const classAdmin = new admin();

export function CarritoTotalAdmin({ manejarClick, cedula, codigo }) {
	/*-- Estado global --*/
	const { carrito } = useDataContex();

	/*-- Calcular costo --*/
	const calcularCosto = (() => {
		const total = carrito.reduce((valorAnterior, valorActual) => {
			return valorAnterior + (valorActual[0]["valor"] * valorActual[0]["cantidad"]);
		}, 0);
		if (!(cedula != undefined && cedula != "") && !(codigo != undefined && codigo != "")) return formatearNumero(0);
		return formatearNumero(total);
	});

	/*-- Finalizar Venta --*/
	const finalizarVenta = (() => {
		if (carrito.length >= 1) {
			classAdmin.finalizarActualizacionVenta(carrito, cedula, codigo)
				.then((resultado) => {
					alertaToast("success",
						`La venta N°${resultado[0]["VENTA_CODIGO_VENTA"]} ha sido modificada y su estado cambio a pendiente`,
						5000,
						"top-end");
					manejarClick();
				})
				.catch((error) => {
					alertaToast("error",
						`Ocurrio un error al tratar de aplicar los cambios`,
						5000,
						"top-end");
				});
		} else {
			alertaToast("warning",
				`No hay productos vinculados`,
				5000,
				"top-end");
		}
	});

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
				>Finalizar</button>
			</div>
		</div>
		</>
	);
};