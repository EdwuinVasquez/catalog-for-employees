/*-- Estilos --*/
import "../../style/botones/botonLink.css";

export function BotonLink({ texto, manejarClick }) {
  return (
    <div>
      <a onClick={() => manejarClick()} className="botonLink">
        {texto}
      </a>
    </div>
  );
}
