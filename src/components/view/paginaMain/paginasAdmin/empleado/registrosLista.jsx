/*-- Librerias --*/
import { useState } from "react";

/*-- Componentes --*/
import { TablaMain } from "../../../tablas/tablaMain/tablaMain.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js";
import {
  alertaConfirmar,
  alertaToast,
} from "../../../../../backend/swetAlert2.js";
const classAdmin = new admin();

/*-- Titulos de la tabla --*/
const titulosTabla = [
  "Cedula",
  "Nombre",
  "Registro",
  "Contato",
  "Estado",
  "Verificar",
];

export function RegistroLista() {
  /*-- Lista de nuevos registros --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Generar la lista de nuevos registros --*/
  const generarLista = async () => {
    classAdmin
      .usuarios()
      .then((resultado) => {
        if (resultado === false) {
          throw new Error("No hay resultados almacenados");
        }
        const empleadosLista = resultado.filter(
          (tupla) =>
            tupla["ROL"] === "EMPLEADO" && tupla["USUARIO_VERIFICADO"] === "0"
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
            valor: valor["FECHA_REGISTRO"],
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
            valor: "3",
            img: "",
            subClase: "3",
            operacion: "",
            parametro: "",
          },
          {
            key: valor["CEDULA"],
            id: valor["CEDULA"],
            tipo: "boton",
            valor: "Activar",
            img: "",
            subClase: "usuarioCheck",
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

  /*-- Activar el empleado --*/
  const modificarEstadoEmpleado = async (cedula, dato) => {
    const nuevoEstado = {
      cedula: cedula,
      estado: dato,
    };

    alertaConfirmar(
      "Seguro que desea verificar el usuario como empleado",
      `Cedula: ${cedula}`,
      "warning"
    ).then((confirm) => {
      if (confirm) {
        classAdmin
          .modificarEstadoVerificadoUsuario(nuevoEstado)
          .then((resultado) => {
            if (resultado === false) {
              alertaToast("warning", "Ocurrió un error", 5000, "top-end");
              throw new Error("No hay resultados almacenados");
            }
            alertaToast(
              resultado[0]["RESULTADO"].toUpperCase().includes("ERROR")
                ? "error"
                : "success",
              resultado[0]["RESULTADO"],
              5000,
              "top-end"
            );
            generarLista();
          })
          .catch(function (error) {
            return error;
          });
      }
    });
  };

  return (
    <>
      <TablaMain
        buscadorNombre="Cedula o nombre"
        buscadorTitulo="Sin verificar"
        actualizar={generarLista}
        tablaTitulos={titulosTabla}
        tablaContenido={datosMain}
        oculto={true}
      ></TablaMain>
    </>
  );
}
