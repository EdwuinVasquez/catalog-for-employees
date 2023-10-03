/*-- Hoja de estilo --*/
import "../../../../style/tabla/tablaMain/datos.css";
import "react-lazy-load-image-component/src/effects/blur.css";

/*-- Librerias --*/
import { useState, forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";

/*-- Componentes --*/
import { BotonTabla } from "./boton";

/*-- clases y controladores --*/
import { useDataContex } from "../../../contex";
import {
  formatearNumero,
  nombreEstado,
  subClase,
  imprimir,
} from "../../../../../backend/funcioneGenerales.jsx";
import { maximixarImagen } from "../../../../../backend/swetAlert2.js";

/*-- Activar transicion --*/
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function TablaBody({ datos }) {
  /*-- ruta basica de imagenes --*/
  const { urlBaseImg } = useDataContex();

  /*-- Datos seleccionados en el select --*/
  const [estadoNombre, setEstadoNombre] = useState([]);

  /*-- Estado de datos adicioneles --*/
  const [openMas, setOpenMas] = useState(false);

  /*-- Estado de datos adicioneles --*/
  const [openEstado, setOpenEstado] = useState(false);

  /*-- Mostrar datos adicionales--*/
  const handleClickOpenMas = () => {
    setOpenMas(true);
  };

  /*-- Ocultar Datos adiccionales --*/
  const handleCloseMas = () => {
    setOpenMas(false);
  };

  /*-- Mostrar datos adicionales--*/
  const handleClickOpenEstado = () => {
    setOpenEstado(true);
  };

  /*-- Ocultar Datos adiccionales --*/
  const handleCloseEstado = () => {
    setOpenEstado(false);
  };

  /*-- Ocultar Datos adiccionales --*/
  const handleCloseEstadoModificar = (operacion, parametro) => {
    const nuevoEstado = {
      codigo: parametro["codigo"],
      cedula: parametro["cedula"],
      estado: estadoNombre,
    };
    operacion(nuevoEstado);
    setOpenEstado(false);
  };

  /*-- Generar una fila en la tabla --*/
  const generarTupla = (tupla) => {
    let key = tupla["tipo"];
    let id = tupla["id"];
    let valor = tupla["valor"];
    let img = tupla["img"];
    let subClase = tupla["subClase"];
    let operacion = tupla["operacion"];
    let parametro = tupla["parametro"];
    return tipo(key, id, valor, img, subClase, operacion, parametro);
  };

  /*-- Asignar etiquetas segun tipo (Image, hexadecimal) --*/
  const element = (tipo, valor) => {
    if (tipo == 1) {
      return (
        <>
          <LazyLoadImage
            className="dato--estiloImagen"
            src={`${urlBaseImg}${valor}`}
            alt=""
            effect="blur"
          />
        </>
      );
    } else if (tipo == 0) {
      return (
        <>
          <button
            className="dato--estiloColor"
            style={{
              backgroundColor: valor,
            }}
          ></button>
        </>
      );
    }
  };

  /*-- actualizar los datos del selector --*/
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const nuevoFiltro = typeof value === "string" ? value.split(",") : value;
    setEstadoNombre(nuevoFiltro);
  };

  /*-- actualizar los datos con input --*/
  const enviarInputDato = (e, operacion, parametro) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      operacion(e, parametro);
    }
  };

  /*-- Tipos de datos en la fila --*/
  const tipo = (key, id, valor, url, subClaseValor, operacion, parametro) => {
    switch (key) {
      case "boton":
        return (
          <td key={uuidv4()} className="dato--boton">
            {" "}
            <BotonTabla
              operacion={operacion}
              id={id}
              parametro={parametro}
              icono={subClaseValor}
              nombre={valor}
            ></BotonTabla>{" "}
          </td>
        );
      case "normal":
        return (
          <td key={uuidv4()} className="dato--normal">
            {" "}
            {valor}{" "}
          </td>
        );
      case "estado":
        return (
          <td key={uuidv4()} className="dato--estado">
            {" "}
            <strong>
              <p className={"estado  estado--" + subClase(subClaseValor)}>
                {" "}
                {nombreEstado(valor)}{" "}
              </p>
            </strong>{" "}
          </td>
        );
      case "estilo":
        return (
          <td key={uuidv4()} className="dato--estilo">
            {element(subClaseValor, valor)}
          </td>
        );
      case "costo":
        return (
          <td key={uuidv4()} className="dato--costo">
            {" "}
            <strong>${formatearNumero(valor)}</strong>{" "}
          </td>
        );
      case "imag":
        return (
          <td key={uuidv4()} className="dato--imag">
            <LazyLoadImage
              onClick={() => maximixarImagen(`${urlBaseImg}${url}`, valor)}
              src={`${urlBaseImg}${url}`}
              alt=""
              effect="blur"
            />
          </td>
        );
      case "botonCantidad":
        return (
          <td key={uuidv4()} className="dato--normal">
            <div className="card__botonCantidad">
              <button
                className="card__botonCantidad--boton"
                onClick={() => operacion(parametro, "-")}
              >
                -
              </button>
              <div className="card__botonCantidad--cantidad">{valor}</div>
              <button
                className="card__botonCantidad--boton"
                onClick={() => operacion(parametro, "+")}
              >
                +
              </button>
            </div>
          </td>
        );
      case "inputNumber":
        return (
          <td key={uuidv4()} className="dato--normal">
            <input
              className="card__inputNumberTabla"
              type="number"
              defaultValue={valor}
              step="any"
              min="0"
              onKeyDown={(e) => enviarInputDato(e, operacion, parametro)}
            ></input>
          </td>
        );
      case "inputText":
        return (
          <td key={uuidv4()} className="dato--normal">
            <input
              className="card__inputTextTabla"
              type="text"
              defaultValue={valor}
              step="any"
              min="0"
              onKeyDown={(e) => enviarInputDato(e, operacion, parametro)}
            ></input>
          </td>
        );
      case "botonMas":
        return (
          <td key={uuidv4()} className="dato--boton">
            <BotonTabla
              variant="outlined"
              operacion={handleClickOpenMas}
              id={id}
              parametro={parametro}
              icono={subClaseValor}
              nombre={valor}
            ></BotonTabla>
            <Dialog
              fullScreen
              open={openMas}
              onClose={handleCloseMas}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseMas}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Cerrar
                  </Typography>
                  <Button autoFocus color="inherit" onClick={imprimir}>
                    Imprimir
                  </Button>
                </Toolbar>
              </AppBar>
              <div>{operacion(parametro)}</div>
            </Dialog>
          </td>
        );
      case "cambiarEstadoCompra":
        return (
          <td key={uuidv4()} className="dato--normal">
            <Tooltip title="Estado" placement="bottom">
              <div>
                <Button variant="outlined" onClick={handleClickOpenEstado}>
                  Estado
                </Button>
                <Dialog open={openEstado} onClose={handleCloseEstado}>
                  <DialogTitle>Selecciona los estados</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <strong>Pendiente: </strong>Solicitud de compra sin
                      procesamiento. <br />
                      <strong>Cancelado: </strong>Solicitud de compra rechazada
                      o cancelada. <br />
                      <strong>Paga: </strong>Solicitud de compra con un pago
                      exitoso. <br />
                      <strong>Entregada: </strong>Solicitud de compra la cual ya
                      fue entregada. <br />
                      <br />
                    </DialogContentText>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Nuevo estado
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={estadoNombre}
                          label="Nuevo estado"
                          onChange={handleChange}
                        >
                          <MenuItem value={2}>Cancelado</MenuItem>
                          <MenuItem value={5}>Paga</MenuItem>
                          <MenuItem value={4}>Entregada</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() =>
                        handleCloseEstadoModificar(operacion, parametro)
                      }
                    >
                      Aplicar
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Tooltip>
          </td>
        );
      default:
        return <td key={uuidv4()}> "valor no recibido" </td>;
    }
  };

  return <tr key={uuidv4()}>{datos.map((data) => generarTupla(data))}</tr>;
}
