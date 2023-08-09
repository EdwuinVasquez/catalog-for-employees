/*-- Estilos --*/
import '../../../../../style/inputs/inputBase.css';

/*-- Librerias --*/
import { React, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import { IoMdAddCircle } from "react-icons/io";

/*-- Controladores y modificadores --*/
import { admin } from "../../../../../../backend/class/admin";
const classAdmin = new admin();

export function AgregarImagen({ manejarCambio }) {
	const [open, setOpen] = useState(false);

	/*-- Datos de imagen --*/
	const [imagen, setImagen] = useState(false);
	const [imagenNombre, setImagenNombre] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const manejarCambioImagen = (() => {
		const fileInput = document.getElementById('fileInput');
		const file = fileInput.files[0];

		if (!file) {
			alert('Por favor, seleccione una imagen.');
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function () {
			const imageBase64 = reader.result.split(',')[1];
			setImagen(imageBase64);
			setImagenNombre(file["name"]);
		};
	});

	const aplicarCambio = (() => {
		const nuevaImagen = {
			image: imagen,
			nombre: imagenNombre
		}
		classAdmin.subirImagen(nuevaImagen)
			.then((result) => {
				handleClose();
				manejarCambio();
			})
			.catch((error) => {
				console.error(error);
				return false;
			});
	});

	return (
		<>
			<Tooltip title="Agregar Imagen" onClick={handleClickOpen}>
				<div style={{
					width: "30px",
					height: "30px",
				}}>
					<IoMdAddCircle style={{
						width: "30px",
						height: "30px",
						cursor: "pointer",
					}}></IoMdAddCircle>
				</div>
			</Tooltip>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Nueva Imagen</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Seleccione la imagen
						<br /><br />
					</DialogContentText>
					<div className="campoVerificado" style={{ width: "400px", }}>
						<input id='fileInput' className="campoVerificado__campo" onChange={manejarCambioImagen} type="file" min="0" step="any" required="" autoComplete="off" />
						<label className={"campoVerificado__texto"}>Imagen</label>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={aplicarCambio}>Confirmar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};