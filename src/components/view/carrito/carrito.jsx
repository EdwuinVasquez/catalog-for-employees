/*-- Estilos --*/
import "../../style/carrito/carrito.css";
import "react-lazy-load-image-component/src/effects/blur.css";

/*-- Librerias --*/
import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

/*-- Componentes --*/
import { CarritoCatalogoItems } from "./datosCarrito";
import { VentaIndividual } from "../venta/ventaIndividual";

/*-- Clases y controladores --*/
import { useDataContex } from "../contex";
import { emple } from "../../../backend/class/empleado.js";
import {
  cerrarAlertaAction as action,
  formatearNumero,
  imprimir,
} from "../../../backend/funcioneGenerales";
const classEmple = new emple();

/*-- Activar transicion --*/
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CarritoCatalogo({ manejarClick }) {
  /*-- Carrito estado global --*/
  const { carrito, setCarrito, contexUsuarioLogin } = useDataContex();

  /*-- Borrar Item --*/
  const { enqueueSnackbar } = useSnackbar();

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

  /*-- Ocultar carrito --*/
  const cerrarDetalles = () => {
    manejarClick(false);
  };

  /*-- Calcular costo --*/
  const calcularCosto = () => {
    const total = carrito.reduce((valorAnterior, valorActual) => {
      return (
        valorAnterior + valorActual[0]["cantidad"] * valorActual[0]["valor"]
      );
    }, 0);
    return formatearNumero(total);
  };

  /*-- Borrar Item --*/
  const eliminarProductoCarrito = (producto) => {
    let nuevoCarrito = carrito.filter(
      (item) => item[0]["nombreItem"] !== producto[0]["nombreItem"]
    );
    setCarrito(nuevoCarrito);
    enqueueSnackbar(`Se elimino un producto del carrito`, {
      variant: "info",
      action,
    });
    classEmple.actualizarCarrito(nuevoCarrito);
  };

  /*-- Finalizar Venta --*/
  const finalizarVenta = () => {
    classEmple
      .finalizarVenta(carrito, contexUsuarioLogin)
      .then((resultado) => {
				if(resultado !== undefined){
					localStorage.removeItem("carritoCopia");
					setListasVenta(resultado);
					handleClickOpen();
					setCarrito([]);
				}else{
					enqueueSnackbar(`Ocurrio un error al cargar los productos`, {
						variant: "error",
						action,
					});
				}
      })
      .catch((error) => {
				enqueueSnackbar(`Ocurrio un error al cargar los productos`, {
					variant: "error",
					action,
				});
        return error;
      });
  };

  /*-- generar datos --*/
  const generar = (lista) => {
    return (
      <>
        <VentaIndividual lista={lista}></VentaIndividual>
      </>
    );
  };

  return (
    <>
      <div className="carritoCatalogo">
        <div className="carritoCatalogo__tituloSuperios">
          <span className="carritoCatalogo__tituloSuperios--titulo">
            Carrito de compra
          </span>
          <div onClick={cerrarDetalles}>
            <span>✖ Cerrar</span>
          </div>
        </div>
        <div className="carritoCatalogo__lista">
          {carrito.map((item) => {
            return (
              <CarritoCatalogoItems
                key={item[0]["nombreItem"]}
                nombre={item[0]["nombreItem"]}
                cantidad={item[0]["cantidad"]}
                valorUnidad={item[0]["valor"]}
                imagenItem={item[0]["imgItem"]}
                manejarClick={eliminarProductoCarrito}
                parametros={item}
              ></CarritoCatalogoItems>
            );
          })}
        </div>
        <div className="carritoCatalogo__valor">
          <section className="carritoCatalogo__valor--section">
            <h3 className="carritoCatalogo__valor--titulo">Total:</h3>
            <span className="carritoCatalogo__valor--precio">
              ${calcularCosto()}
            </span>
          </section>
          <section className="carritoCatalogo__valor--section">
            <Link to="carrito">
              <button className="carritoCatalogo__boton  carritoCatalogo__boton--gris">
                Ver carrito
              </button>
            </Link>
          </section>
          <section className="carritoCatalogo__valor--section">
            <button
              className="carritoCatalogo__boton  carritoCatalogo__boton--verde"
              onClick={finalizarVenta}
            >
              Finalizar compra
            </button>
          </section>
        </div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
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
          <div>{generar(listasVenta)}</div>
        </Dialog>
      </div>
    </>
  );
}
