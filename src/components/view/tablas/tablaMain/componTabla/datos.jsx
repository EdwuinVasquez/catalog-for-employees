/*-- Hoja de estilo --*/
import "../../../../style/tabla/tablaMain/datos.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

/*-- Librerias --*/
import { React, useState, forwardRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

/*-- Componentes --*/
import { BotonTabla } from "./boton";

/*-- clases y controladores --*/
import swal from'sweetalert2';
import { useDataContex } from "../../../contex";
import { regex } from "../../../../../backend/regex";

/*-- Activar transicion --*/
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function TablaBody({datos}) {
	/*-- ruta basica de imagenes --*/
	const { urlBaseImg } = useDataContex();

	/*-- Estado de datos adicioneles --*/
	const [open, setOpen] = useState(false);

	/*-- Mostrar datos adicionales--*/
	const handleClickOpen = () => {
		setOpen(true);
	};
  
	/*-- Ocultar Datos adiccionales --*/
	const handleClose = () => {
	  setOpen(false);
	};

	/*-- imprimir --*/
	const imprimir = () => {
	  window.print();
	};

	/*-- Mostrar Imagen en gran escala --*/
	const maximixarImagen = (url, nombre) => {
		swal.fire({
			title: `${nombre}`,
			imageUrl: `${url}`,
			imageWidth: 400,
			imageHeight: 200,
		})
	}

	/*-- Formatear Numero en pesos --*/
	const formatearNumero = (numero) =>{
		const expresion = regex.pesos;
		const remplazo = "$1.";
		return numero.toString().replace(expresion, remplazo);
	}
	
	/*-- Generar una fila en la tabla --*/
	const generarTupla = (tupla) =>{
		console.clear();
		let key = tupla["tipo"]; 
		let id = tupla["id"]; 
		let valor = tupla["valor"]; 
		let img = tupla["img"]; 
		let subClase = tupla["subClase"]; 
		let operacion = tupla["operacion"]; 
		let parametro = tupla["parametro"]; 
		return tipo(key, id, valor, img, subClase, operacion, parametro)
	}

	/*-- Asignar un nombre al estado --*/
	const estadoNombre = (valor) =>{
		switch (valor) {
			case "0":
				return "Bloqueado";
			case "1":
				return "Activo";
			case "2":
				return "Cancelado";
			case "3":
				return "Pendiente";
			case "4":
				return "Entregado";
			case "5":
				return "Pago";
			default:
				return "Error";
		}
	}

	/*-- Subclases de los estados --*/
	const subClase = (valor) =>{
		switch (valor) {
			case "0":
				return "bloqueado";
			case "1":
				return "activo";
			case "2":
				return "cancelado";
			case "3":
				return "pendiente";
			case "4":
				return "pago";
			case "5":
				return "entregado";
			default:
				return "bloqueado";
		}
	}

	/*-- Tipos de datos en la fila --*/
	const tipo = (key, id, valor, url, subClaseValor, operacion, parametro) => {
		switch (key) {
			case "boton":
				return <td className="dato--boton" >  <BotonTabla operacion={operacion} id={id} parametro={parametro} icono={subClaseValor} nombre={valor}></BotonTabla> </td>
			case "normal":
				return <td className="dato--normal"> {valor} </td>
			case "estado":
					return <td className="dato--estado"> <strong><p className={"estado  estado--"+ subClase(subClaseValor)}> {estadoNombre(valor)} </p></strong> </td>
			case "costo":
				return <td className="dato--costo"> <strong>${formatearNumero(valor)}</strong> </td>
			case "imag":
				return <>
				<td className="dato--imag"> 
					<LazyLoadImage onClick={() => maximixarImagen(`${urlBaseImg}${url}`, valor)} src={`${urlBaseImg}${url}`} alt="" effect="blur"/> 
				</td>
				</>
			case "botonCantidad":
				return <>
				<td className="dato--normal">
					<div className="card__botonCantidad">
						<button className="card__botonCantidad--boton" onClick={() => operacion(parametro, "-")} >-</button>
						<div className="card__botonCantidad--cantidad">{valor}</div>
						<button className="card__botonCantidad--boton"  onClick={() => operacion(parametro, "+")}>+</button>
					</div>
				</td>
				</>
			case "botonMas":
				return <>
				<td className="dato--boton">
					<BotonTabla variant="outlined" operacion={handleClickOpen} id={id} parametro={parametro} icono={subClaseValor} nombre={valor}></BotonTabla>
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
						{operacion(parametro)}
						</div>
					</Dialog>
					</td>
				</>
			default:
				return <td> "valor no recibido" </td>
		}
	}

  return(
  <>
    <tr key={datos[0]["key"]}>
			{
				datos.map((data) => 
					generarTupla(data)
				)
			}
    </tr>
	</>
	);
};