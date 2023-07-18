/*-- Librerias --*/
import { nuevoHash, compararHash } from "./bcrypt.js";
import { evaluate } from 'mathjs'

/*-- Clases y controladores --*/
import { axiosGet } from "../api/axiosGet.js";
import { axiosPost } from "../api/axiosPost.js";
import { axiosPut } from "../api/axiosPut.js";
import { axiosDelete } from "../api/axiosDelete.js";
import { usuario } from "./usuario.js"
const classAxiosGet = new axiosGet();
const classAxiosPost = new axiosPost();
const classAxiosPut = new axiosPut();
const classAxiosDelete = new axiosDelete();
export class emple extends usuario  {
  constructor() {
    super();
    this.sesion = "admin";
  }

  // GET
  async productoBase() {
    return await classAxiosGet.obtenerProductoBase();
  }

   // GET
   async venta(venta) {
    return await classAxiosGet.obtenerVenta(venta);
  }

  // POST
  async insertaVenta(nuevoDatos = {}) {
    return await classAxiosPost.nuevaVenta(nuevoDatos);
  }
  
  // POST
  async insertaVentaItem(nuevoDatos = {}) {
    return await classAxiosPost.nuevaVentaItem(nuevoDatos);
  }

  // PUT
  async modificarDatosUsuario(nuevoDatos = {}) {
    return await classAxiosPut.cambiarDatosUsuario(nuevoDatos);
  }

  /*--------- METODOS VENTA  -----------*/
  /*-- Calcular descuento --*/
	calcularDescuento = ((precioIva, precioDescuento, cantidad) =>{
		return Math.round(evaluate(`(${precioIva}*${cantidad})-(${precioDescuento}*${cantidad})`));
	});

  /*-- Calcular iva --*/
	calcularIva = ((precio, iva) =>{
		return Math.round(evaluate(`(${precio}*1.${iva})-${precio}`));
	});

  /*-- Finalizar Venta --*/
	finalizarVenta = ( async (carrito, usuario) =>{
		try{
      let totalIva = 0;
      let totalDescuento = 0;
      let totalVenta = 0;

      const items = carrito.map(tupla => {
        totalIva += (this.calcularIva(tupla[0]["valor"], tupla[0]["iva"]) * tupla[0]["cantidad"]);
        totalDescuento += this.calcularDescuento(tupla[0]["valorBase"], tupla[0]["valor"], tupla[0]["cantidad"]);
        totalVenta += tupla[0]["valor"]*tupla[0]["cantidad"];
        return {
          nombreItem: tupla[0]["nombreItem"],
            informacionAdicional: tupla[0]["informacionAdicional"],
            descuento: tupla[0]["descuento"],
            iva: tupla[0]["iva"],
            cantidad: tupla[0]["cantidad"],
            valorBase: tupla[0]["valorSinIva"],
            valorIva: tupla[0]["valorBase"],
            valorDescuento: tupla[0]["valor"],
            valorTotal: (tupla[0]["valor"]*tupla[0]["cantidad"]),
            idProducto: tupla[0]["id"],
            idVenta: 0
        }
      });
      
      const venta = {
        valorIva: totalIva,
        valorDescuento: totalDescuento,
        valorTotal: totalVenta,
        estadoVenta: 3,
        observaciones: "No hay observaciones",
        cedula: usuario["cedula"]
      }

      return this.insertaVenta(venta)
      .then(resultado => {
        if(resultado === false){
          console.clear();
          throw new Error("No hay resultados almacenados");
        }

        /*-- Enviar items -*/
        items.forEach(tupla => {
          let item = tupla;
          item["idVenta"] = resultado[0]["CODIGO_VENTA"];

          this.insertaVentaItem(item)
          .then(resultado => {
            if(resultado === false){
              throw new Error("No hay resultados almacenados");
            }
          })
          .catch(function (error) {
            console.error(error);
          });
        });

        /*-- Listar datos -*/
        return this.venta(resultado[0]["CODIGO_VENTA"])
        .then(resultado => {
          if(resultado === false){
            throw new Error("No hay resultados almacenados");
          }
          return resultado;
        })
        .catch(function (error) {
          console.error(error);
        });

      }).catch(function (error) {
        console.error(error);
      });
    }catch(error){
      console.log(error);
      return false;
    }
	});

  /*--------- METODOS CARRITO  -----------*/
  async actualizarCarrito (nuevoCarrito){
    localStorage.removeItem("carritoCopia");
		localStorage.setItem("carritoCopia", JSON.stringify(nuevoCarrito));
  }
}
