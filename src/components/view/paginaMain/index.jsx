/*-- Estilos --*/
import "../../style/forms/inicioSesionForm.css";

/*-- Librerias --*/
import { useEffect } from "react";
import { Link } from "react-router-dom";

/*-- Componentes --*/
import { BotonSencillo } from "../botones/botonSencillo.jsx";
import { Logo } from "../logos/logo.jsx";
import { TituloCentradolo } from "../titulos/tituloCentrado.jsx";
import { SubtituloCentrado } from "../subtitulos/subtituloCentrado.jsx";

export function Index() {
  useEffect(() => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("carritoCopia");
  });
  return (
    <div className="contenedor--centrado">
      <form className="loginFomulario">
        <Logo></Logo>
        <TituloCentradolo texto="Rimoplasticas S.A"></TituloCentradolo>
        <SubtituloCentrado texto="Bienvenido al catalogo de los empleados, antes de empezar ingrese a su cuenta"></SubtituloCentrado>
        <Link to="/login">
          <BotonSencillo
            texto="Ingresar"
            manejarClik={() => {
              console.log();
            }}
          ></BotonSencillo>
        </Link>
        <Link to="/registro">
          <BotonSencillo
            texto="Registrarse"
            manejarClik={() => {
              console.log();
            }}
          ></BotonSencillo>
        </Link>
      </form>
    </div>
  );
}
