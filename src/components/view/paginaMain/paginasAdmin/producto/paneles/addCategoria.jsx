/*-- Librerias --*/
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import { IoMdAddCircle } from "react-icons/io";

/*-- Componentes --*/
import { CampoVerificado } from "../../../../inputs/inputBase";

/*-- Controladores y modificadores --*/
import { regex } from "../../../../../../backend/regex";
import { admin } from "../../../../../../backend/class/admin";
const classAdmin = new admin();

export function AgregarCategoria({ manejarCambio }) {
  const [open, setOpen] = useState(false);

  const [nombre, setNombre] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const manejarCambioNombre = (dato) => {
    setNombre(dato.trim());
  };

  const aplicarCambio = () => {
    const nuevosDatos = {
      nombre: nombre,
    };

    classAdmin
      .nuevaCategoria(nuevosDatos)
      .then((result) => {
        manejarCambio();
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  return (
    <>
      <Tooltip title="Agregar Categoria" onClick={handleClickOpen}>
        <div
          style={{
            width: "30px",
            height: "30px",
          }}
        >
          <IoMdAddCircle
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          ></IoMdAddCircle>
        </div>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Categoria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            escriba el nombre de la categoria
            <br />
            <br />
          </DialogContentText>
          <CampoVerificado
            id="nombre"
            expresion={regex.any}
            texto="Nombre"
            tipo="text"
            manejarCambio={manejarCambioNombre}
          ></CampoVerificado>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={aplicarCambio}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
