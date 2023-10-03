/*-- Estilos --*/
import "../../../../style/reporte/filtros.css";

/*-- Librerias --*/
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

/*-- Componentes --*/
import { BotonSencillo } from "../../../botones/botonSencillo";

export function BuscadorSelect({ lista, manejarCambio, manejarClick }) {
  /*-- buscar enviar compra seleccionada --*/
  const buscarCompra = (e) => {
    if (e.target.outerText != undefined)
      manejarCambio(e.target.outerText.toUpperCase().trim());
  };

  return (
    <>
      <div
        className="contenedor__buscador"
        style={{ width: "550px", gap: "8px" }}
      >
        <h4>Compra: </h4>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={lista}
          onChange={buscarCompra}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Compra" />}
        />
        <Tooltip title="Modificar" placement="bottom">
          <div style={{ width: "70px" }}>
            <BotonSencillo
              texto="Modificar"
              manejarClik={() => manejarClick()}
            ></BotonSencillo>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
