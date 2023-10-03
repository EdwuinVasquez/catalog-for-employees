import { regex } from "./regex";
import { closeSnackbar } from "notistack";
import { AiFillCloseCircle } from "react-icons/ai";
import { evaluate } from "mathjs";

/*-- Lista de opciones para pregunta de seguridad */
export const listaOpciones = [
  [{ key: 1, valor: "En que ciudad naciste" }],
  [{ key: 2, valor: "Cual es tu equipo deportivo favorito" }],
  [{ key: 3, valor: "Cual es el nombre de tu ciudad natal" }],
  [{ key: 4, valor: "Cual es tu deporte favorito" }],
  [{ key: 5, valor: "Nombre de tu ultima mascota" }],
  [{ key: 6, valor: "Cual es tu numero de identificación personal" }],
  [{ key: 7, valor: "En que mes naciste" }],
  [{ key: 8, valor: "En que año empezaste a trabajar en esta empresa" }],
  [{ key: 9, valor: "Cual es tu numero de telefono" }],
  [{ key: 10, valor: "En que dia naciste" }],
  [{ key: 11, valor: "Cual es tu posicion en la linea de produccion" }],
  [{ key: 12, valor: "Cual es el nombre de tu supervisor directo" }],
];

/*-- Formatear Numero en pesos --*/
export const formatearNumero = (numero) => {
  const expresion = regex.pesos;
  const remplazo = "$1.";
  return numero.toString().replace(expresion, remplazo);
};

export const formatearTexto = (texto, limite) => {
  if (texto.length >= limite) {
    return `${texto.slice(0, limite - 5)} ...`;
  }
  return texto;
};

/*-- Formatear a precio de venta --*/
export const precioVenta = (precio, iva, descuento) => {
  return Math.ceil(
    evaluate(`(${precio}*1.${iva})-((${precio}*1.${iva})*${descuento}%)`)
  );
};

/*-- Formatear a precio de Base --*/
export const precioBase = (precio, iva) => {
  return Math.ceil(evaluate(`(${precio}*1.${iva})`));
};

/*-- Asignar un nombre al estado --*/
export const nombreEstado = (valor) => {
  const dato = valor.toString();
  switch (dato) {
    case "0":
      return "Bloqueado";
    case "1":
      return "Activo";
    case "2":
      return "Cancelado";
    case "3":
      return "Pendiente";
    case "4":
      return "Entregado";
    case "5":
      return "Pago";
    default:
      return "Error";
  }
};

/*-- Subclases de los estados --*/
export const subClase = (valor) => {
  const dato = valor.toString();
  switch (dato) {
    case "0":
      return "bloqueado";
    case "1":
      return "activo";
    case "2":
      return "cancelado";
    case "3":
      return "pendiente";
    case "4":
      return "pago";
    case "5":
      return "entregado";
    default:
      return "bloqueado";
  }
};

/*-- Cerrar alerta --*/
export const cerrarAlertaAction = (snackbarId) => (
  <>
    <AiFillCloseCircle
      onClick={() => {
        closeSnackbar(snackbarId);
      }}  
    ></AiFillCloseCircle>
  </>
);

/*-- imprimir --*/
export const imprimir = () => {
  window.print();
};