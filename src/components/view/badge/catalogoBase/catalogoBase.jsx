/*-- Librerias --*/
import { useState } from "react";
import { useSnackbar } from "notistack";

/*-- Componentes --*/
import { Buscador } from "../../inputs/buscador.jsx";

/*-- Clases y controladores --*/
import { admin } from "../../../../backend/class/admin.js";
import { useDataContex } from "../../contex.jsx";
import { ItemCatalogoBase } from "./itemCatalogo.jsx";
import { v4 as uuidv4 } from "uuid";
import {
  cerrarAlertaAction as action,
  precioBase,
  precioVenta,
} from "../../../../backend/funcioneGenerales.jsx";
const classAdmin = new admin();

export function CatalogoBaseAdmin() {
  /*-- Carrito de compras --*/
  const { carrito, setCarrito } = useDataContex();

  /*-- Alerta --*/
  const { enqueueSnackbar } = useSnackbar();

  /*-- Lista de productos sin detalles de estilos --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Lista de productos en pantalla --*/
  const [datosFiltrados, setDatosFiltrados] = useState();

  /*-- Asignar la imagen --*/
  const imagenItem = (imagenBase, imagenItem) => {
    return imagenItem.length >= 6 ? imagenItem : imagenBase;
  };

  /*-- Generar la lista de productos --*/
  const generarLista = async () => {
    classAdmin
      .productoBase()
      .then((resultado) => {
        if (resultado === false) {
          console.clear();
          throw new Error("No hay resultados almacenados");
        }

        const nuevosDatos = resultado.map((valor) => [
          {
            key: valor["CODIGO_PRODUCTO"],
            id: valor["CODIGO_PRODUCTO"],
            nombre: valor["NOMBRE_PRODUCTO"],
            iva: valor["IVA"],
            descuento: valor["DESCUENTO"],
            img: valor["IMAGEN_PRINCIPAL"],
            valor: precioVenta(
              valor["PRECIO_BASE"],
              valor["IVA"],
              valor["DESCUENTO"]
            ),
            valorBase: precioBase(valor["PRECIO_BASE"], valor["IVA"]),
            valorSinIva: valor["PRECIO_BASE"],
            detalles: valor["DETALLES"],
            nombreItem: `${valor["NOMBRE_PRODUCTO"]} - ${valor["NOMBRE_ESTILO"]}`,
            cantidad: 1,
            estilo: valor["NOMBRE_ESTILO"],
            imgItem: imagenItem(
              valor["IMAGEN_PRINCIPAL"],
              valor["IMAGEN_EXTRA"]
            ),
            disponible: valor["DISPONIBLE"],
            stock: valor["STOCK"],
            tipoContenido: valor["TIPO_CONTENIDO"],
            contenido: valor["CONTENIDO"],
            informacionAdicional: valor["INFORMACION_ADICIONAL"],
          },
        ]);

        if (nuevosDatos.length > 0) {
          setDatosMain(nuevosDatos);
          setDatosFiltrados(nuevosDatos);
        } else {
          setDatosMain([[]]);
          setDatosFiltrados([[]]);
        }
      })
      .catch(function (error) {
        setDatosMain([[]]);
        console.error(error);
      });
  };

  /*-- Cargar item doble clic --*/
  const cargarItem = (productoSelect) => {
    if (productoSelect != 0 && productoSelect[0] != undefined) {
      if (carrito.length <= 0) {
        setCarrito([productoSelect]);
        classAdmin.actualizarCarrito([productoSelect]);
      } else {
        let buscarProducto = carrito.some(
          (value) => value[0]["nombreItem"] == productoSelect[0]["nombreItem"]
        );
        if (buscarProducto) {
          modificarProductoCarrito(productoSelect);
        } else {
          agregarNuevoProductoCarrito(productoSelect);
        }
      }
      enqueueSnackbar(`Producto agregado al carrito`, {
        variant: "success",
        autoHideDuration: 5000,
        action,
      });
    } else {
      enqueueSnackbar(`No has seleccionado un color`, {
        variant: "error",
        autoHideDuration: 5000,
        action,
      });
    }
  };

  /*-- Aumentar la cantidad de un item --*/
  const modificarProductoCarrito = (producto) => {
    let nuevoCarrito = carrito.map((item) => {
      if (item[0]["nombreItem"] == producto[0]["nombreItem"]) {
        item[0]["cantidad"]++;
        return item;
      } else {
        return item;
      }
    });
    setCarrito(nuevoCarrito);
    classAdmin.actualizarCarrito(nuevoCarrito);
  };

  /*-- Agregar item en cantidad 1 --*/
  const agregarNuevoProductoCarrito = (producto) => {
    let nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    classAdmin.actualizarCarrito(nuevoCarrito);
  };

  /*-- Cargar datos de pagina en pantalla --*/
  const datos = () => {
    try {
      if (datosFiltrados[0].length >= 1) {
        return datosFiltrados.map((valor) => (
          <ItemCatalogoBase
            key={uuidv4()}
            codigo={valor[0]["id"]}
            nombre={valor[0]["nombreItem"]}
            imagen={valor[0]["imgItem"]}
            contenido={valor[0]["contenido"]}
            tipoContenido={valor[0]["tipoContenido"]}
            valor={valor[0]["valor"]}
            manejarClick={cargarItem}
            parametros={valor}
          ></ItemCatalogoBase>
        ));
      } else {
        return <h1>No hay datos almacenados</h1>;
      }
    } catch (error) {
      generarLista();
    }
  };

  /*-- Filtar elementos --*/
  const BuscarElementos = (buscar) => {
    try {
      if (datosMain[0].length <= 0 || buscar == "" || buscar == null) {
        setDatosFiltrados(datosMain);
        return;
      }
      let nuevosDatos = datosMain.filter((tupla) => {
        return tupla[0]["nombre"].toUpperCase().includes(buscar);
      });

      if (nuevosDatos.length > 0) {
        setDatosFiltrados(nuevosDatos);
      } else {
        setDatosFiltrados(datosMain);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div>
          <Buscador
            placeholder="buscar"
            manejarClick={BuscarElementos}
          ></Buscador>
        </div>
      </div>
      <div>
        <ul style={{ width: "94%" }}>{datos()}</ul>
      </div>
    </>
  );
}
