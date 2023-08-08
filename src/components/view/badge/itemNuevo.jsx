/*-- Librerias --*/
import { React, useState, forwardRef } from "react";
import { BiCartAdd } from "react-icons/bi";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

/*-- clases y controladores --*/
import { CatalogoBaseAdmin } from "./catalogoBase/catalogoBase";

/*-- Activar transicion --*/
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function AgregarItem({ actualizar }) {
	/*-- Estado de datos adicioneles --*/
	const [open, setOpen] = useState(false);

	/*-- Mostrar datos adicionales--*/
	const handleClickOpen = () => {
		setOpen(true);
		actualizar();
	};

	/*-- Ocultar Datos adiccionales --*/
	const handleClose = () => {
		setOpen(false);
		actualizar();
	};

	return (
		<div className="contenedor__badge">
			<div onClick={handleClickOpen}>
				<BiCartAdd style={{ width: "35px", height: "35px" }}></BiCartAdd>
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
					</Toolbar>
				</AppBar>
				<div>
					<CatalogoBaseAdmin cerrar={handleClose} actualizar={actualizar}></CatalogoBaseAdmin>
				</div>
			</Dialog>
		</div>

	);
};