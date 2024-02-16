/*-- Librerias --*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js";
import {
  alertaConfirmar,
  alertaToast,
} from "../../../../../backend/swetAlert2.js";
import { useDataContex } from "../../../contex.jsx";
const classAdmin = new admin();

/*-- Titulos de la tabla --*/
const titulosTabla = [
  "Cedula",
  "Nombre",
  "N°compras",
  "Ingreso",
  "Contato",
  "Estado",
  "Token",
];

export function EmpleadosListaToken() {
  const { setCarrito } = useDataContex();
  const navigate = useNavigate();

  /*-- Lista de empleados --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Generar Lista de empleados --*/
  const generarLista = async () => {
    classAdmin
      .usuarios()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        const empleadosLista = resultado.filter(
          (tupla) =>
            tupla["ROL"] === "EMPLEADO" && tupla["USUARIO_VERIFICADO"] === "1"
        );
        const nuevosDatos = empleadosLista.map((valor) => [
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "normal",
            valor: valor["CEDULA"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "normal",
            valor: valor["NOMBRE"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "normal",
            valor: valor["NUMERO_COMPRAS"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "normal",
            valor: valor["ULTIMO_INGRESO"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "normal",
            valor: valor["CONTACTO"],
            img: "",
            subClase: "",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "estado",
            valor: valor["USUARIO_ACTIVADO"],
            img: "",
            subClase: valor["USUARIO_ACTIVADO"],
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "boton",
            valor: "Activar token",
            img: "",
            subClase: "login",
            operacion: modificarEstadoEmpleado,
            parametro: valor["USUARIO_ACTIVADO"] == 1 ? 0 : 1,
          },
        ]);
        if (nuevosDatos.length > 0) setDatosMain(nuevosDatos);
        if (nuevosDatos.length <= 0) setDatosMain([[]]);
      })
      .catch(function (error) {
        setDatosMain([[]]);
      });
  };

  /*-- Modificar el estado del empleado y activa el token--*/
  const modificarEstadoEmpleado = async (cedula, dato) => {
    const nuevoEstado = {
      cedula: cedula,
      estado: 1,
    };
    localStorage.removeItem("carritoCopia");
    setCarrito([]);

    alertaConfirmar(
      "Segur@ que deseas activar el Token",
      `Ingresarás en la cuenta del empleado, si el empleado está bloqueado será activado y tu cuenta de administrador será cerrada`,
      "warning"
    )
      .then((confirm) => {
        if (confirm) {
          classAdmin
            .modificarEstadoUsuario(nuevoEstado)
            .then((resultado) => {
              if (resultado === false) {
                alertaToast("warning", "Ocurrió un error", 5000, "top-end");
                throw new Error("No hay resultados almacenados");
              }
              classAdmin
                .usuarios(cedula)
                .then((resultado) => {
                  if (resultado[0]["CEDULA"] == undefined) {
                    alertaToast("warning", "Ocurrió un error", 5000, "top-end");
                    throw new Error(resultado);
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
                  navigate("/process");
                })
                .catch(function (error) {
                  return error;
                });
            })
            .catch(function (error) {
              return error;
            });
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <>
      <TablaMain
        buscadorNombre="Cedula o nombre"
        buscadorTitulo="Empleados Token"
        actualizar={generarLista}
        tablaTitulos={titulosTabla}
        tablaContenido={datosMain}
        oculto={true}
      ></TablaMain>
    </>
  );
}
