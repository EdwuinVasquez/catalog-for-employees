/*-- Librerias --*/
import { useNavigate } from "react-router-dom";

/*-- Clases y controladores --*/
import { usuario } from "../../../backend/class/usuario";
import { useDataContex } from "../contex";
const classUsuario = new usuario();

export function Process() {
  const { setContexUsuario, setContexUsuarioLogin, setCarrito } = useDataContex();
  const navigate = useNavigate();

  const login = () => {
    try {
      let datosAlmacenados = JSON.parse(localStorage.getItem("usuario"));
      let datosAlmacenadosCarrito = JSON.parse(
        localStorage.getItem("carritoCopia")
      );
      classUsuario
        .ingresar(datosAlmacenados["cedula"], datosAlmacenados["clave"])
        .then((resultado) => {
          if (resultado[0]["CEDULA"] == undefined) {
            navigate("/process");
            throw new Error("NO SE ENCONTRARON DATOS");
          }

          let sesion = {
            cedula: resultado[0]["CEDULA"],
            clave: resultado[0]["CLAVE"],
            nombre: resultado[0]["NOMBRE"],
            rol: resultado[0]["ROL"],
            conctacto: resultado[0]["CONTACTO"],
          };
          localStorage.removeItem("usuario");
          localStorage.setItem("usuario", JSON.stringify(sesion));

          setContexUsuario(resultado[0]["ROL"]);
          setContexUsuarioLogin(sesion);
          if (
            datosAlmacenadosCarrito !== undefined &&
            datosAlmacenadosCarrito !== null
          ) {
            setCarrito(datosAlmacenadosCarrito);
          }

          switch (resultado[0]["ROL"]) {
            case "SUPER":
              navigate("/admin");
              break;
            case "ADMINISTRADOR":
              navigate("/admin");
              break;
            case "EMPLEADO":
              navigate("/emple");
              break;
            default:
              navigate("/login");
              break;
          }
        })
        .catch(function (error) {
          console.log(error)
          return error;
        });
    } catch (error) {
      navigate("/login");
      console.log(error)
    }
  };

  login();

  return (
    <>
      <h1 style={{ cursor: "pointer" }}>
        Procesando, recarga la página o presióname en caso de tardar más de segundos
      </h1>
    </>
  );
}
