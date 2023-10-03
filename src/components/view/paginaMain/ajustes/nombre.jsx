/*-- Estilos --*/
import "../../../style/menus/components/opcion.css";

/*-- Librerias --*/
import { useState } from "react";

/*-- Componentes --*/
import { CampoVerificado } from "../../inputs/inputBase";
import { BotonSencillo } from "../../botones/botonSencillo";

/*-- Controladores y modificadores --*/
import { regex } from "../../../../backend/regex";
import { useDataContex } from "../../contex";
import { usuario } from "../../../../backend/class/usuario";
import { alertaClasica, alertaToast } from "../../../../backend/swetAlert2";
const classUsuario = new usuario();

export function AjustesNombre() {
  const { contexUsuarioLogin } = useDataContex();

  const [nombre, setNombre] = useState(false);

  const [nombreValido, setNombreValido] = useState(false);

  /*-- manejar cambio del nombre en el input --*/
  const manejarCambioNombre = (dato, correcto) => {
    setNombreValido(correcto);
    setNombre(dato.trim());
  };

  /*--- Enviar datos a la api para aplicar cambio --*/
  const aplicarCambio = () => {
    const nuevosDatos = {
      cedula: contexUsuarioLogin["cedula"],
      nombre: nombre,
    };

    if (nombreValido) {
      classUsuario
        .cambiarNombre(nuevosDatos)
        .then((result) => {
          alertaClasica("success", "Nombre modificado de manera exitosa", 5000);
        })
        .catch((error) => {
          alertaClasica("error", "Ha ocurrido un error", 5000);
        });
    } else {
      alertaToast(
        "error",
        `Hay datos vacios o no se encuentran en el formato correcto`,
        5000,
        "top-end"
      );
    }
  };
  return (
    <>
      <CampoVerificado
        id="nombres"
        expresion={regex.nombre}
        texto="Nombre"
        tipo="text"
        manejarCambio={manejarCambioNombre}
      ></CampoVerificado>
      <div style={{ width: "92%" }}>
        <BotonSencillo
          texto="Guardar"
          manejarClik={aplicarCambio}
        ></BotonSencillo>
      </div>{" "}
    </>
  );
}
