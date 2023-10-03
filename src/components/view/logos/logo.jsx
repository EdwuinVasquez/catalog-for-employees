/*-- Estilos --*/
import "../../style/logos/logo.css";

/*-- Imagnes --*/
import { logo } from "./img.jsx";

export function Logo() {
  return (
    <>
      <div className="logo">
        <img className="logo__imagen" src={logo} alt="" />
      </div>
    </>
  );
}
