/*-- Librerias --*/
import { useState } from "react";
import { useSnackbar } from "notistack";

/*-- Componentes --*/
import { CardProducto } from "../cards/cardProducto/cardProducto.jsx";
import { PaginadorBasico } from "../paginador/paginado.jsx";
import { Buscador } from "../inputs/buscador.jsx";

/*-- Clases y controladores --*/
import { emple } from "../../../backend/class/empleado.js";
import { useDataContex } from "../contex.jsx";
import {
  cerrarAlertaAction as action,
  precioVenta,
  precioBase,
} from "../../../backend/funcioneGenerales.js";
const classEmple = new emple();

/*-- Variables iniciales --*/
const paginaInicial = 0;
const elementosPorPagina = 20;

export function CatalogoCardsConfiguracion({ cerrar, actualizar }) {
  /*-- Carrito de compras --*/
  const { carrito, setCarrito } = useDataContex();

  /*-- Alerta --*/
  const { enqueueSnackbar } = useSnackbar();

  /*-- Lista de catalogo completa --*/
  const [datosCompletos, setDatosCompletos] = useState();

  /*-- Lista de productos sin detalles de estilos --*/
  const [datosMain, setDatosMain] = useState();

  /*-- Lista de productos en pantalla --*/
  const [datosFiltrados, setDatosFiltrados] = useState();

  /*-- numero de paginas  --*/
  const [numeroPaginas, setNumeroPaginas] = useState();

  /*-- Localizacion de la pagina --*/
  const [paginaActual, setPaginaActual] = useState(paginaInicial);

  /*-- Producto a ver sus detalles --*/
  const [idProductosSeleccionado, setIdProductosSeleccionado] = useState(0);

  /*-- Carrito a ver sus detalles --*/
  const [carritoActivo, setCarritoActivo] = useState(false);

  /*-- Asignar la imagen --*/
  const imagenItem = (imagenBase, imagenItem) => {
    return imagenItem.length >= 6 ? imagenItem : imagenBase;
  };

  /*-- Generar la lista de productos --*/
  const generarLista = async () => {
    classEmple
      .productoBase()
      .then((resultado) => {
        if (resultado === false) {
          console.clear();
          throw new Error("No hay resultados almacenados");
        }

        const nuevosDatosCompletos = resultado.map((valor) => [
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

        const nuevosDatos = resultado.map((valor) => [
          {
            key: `${valor["NOMBRE_PRODUCTO"]} - ${valor["NOMBRE_ESTILO"]}`,
            id: `${valor["NOMBRE_PRODUCTO"]} - ${valor["NOMBRE_ESTILO"]}`,
            nombre: `${valor["NOMBRE_PRODUCTO"]} - ${valor["NOMBRE_ESTILO"]}`,
            img: imagenItem(valor["IMAGEN_PRINCIPAL"], valor["IMAGEN_EXTRA"]),
            valor: precioVenta(
              valor["PRECIO_BASE"],
              valor["IVA"],
              valor["DESCUENTO"]
            ),
            valorBase: precioBase(valor["PRECIO_BASE"], valor["IVA"]),
            detalles: valor["DETALLES"],
            buscarProducto: setIdProductosSeleccionado,
          },
        ]);

        if (nuevosDatos.length > 0) {
          setDatosMain(nuevosDatos);
          setDatosFiltrados(nuevosDatos);
          setDatosCompletos(nuevosDatosCompletos);
          setNumeroPaginas(Math.ceil(nuevosDatos.length / elementosPorPagina));
        } else {
          setDatosMain([[]]);
          setDatosFiltrados([[]]);
          setDatosCompletos([[]]);
          setNumeroPaginas(1);
        }
      })
      .catch(function (error) {
        setDatosMain([[]]);
        console.error(error);
      });
  };

  /*-- Cargar item doble clic --*/
  const cargarItem = (activador) => {
    if (idProductosSeleccionado != 0) {
      const productoSelect = datosCompletos.find((valor) =>
        valor[0]["nombreItem"].includes(idProductosSeleccionado)
      );
      if (productoSelect != 0 && productoSelect[0] != undefined) {
        if (carrito.length <= 0) {
          setCarrito([productoSelect]);
          classEmple.actualizarCarrito([productoSelect]);
        } else {
          let buscarProducto = carrito.some(
            (value) => value[0]["nombreItem"] == productoSelect[0]["nombreItem"]
          );
          if (buscarProducto) {
            modificarProductoCarrito(productoSelect);
          } else {
            agregarNuevoProductoCarrito(productoSelect);
          }
          actualizar();
          cerrar();
        }
        enqueueSnackbar(`Producto agregado al carrito`, {
          variant: "success",
          autoHideDuration: 1500,
          action,
        });
      } else {
        enqueueSnackbar(`No has seleccionado un color`, {
          variant: "error",
          autoHideDuration: 1500,
          action,
        });
      }
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
    classEmple.actualizarCarrito(nuevoCarrito);
  };

  /*-- Agregar item en cantidad 1 --*/
  const agregarNuevoProductoCarrito = (producto) => {
    let nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    classEmple.actualizarCarrito(nuevoCarrito);
  };

  /*-- Cargar datos de pagina en pantalla --*/
  const datos = () => {
    try {
      const corteInicio = paginaActual * elementosPorPagina;
      const corteFinal = corteInicio + elementosPorPagina;
      const listaElementosPagina = datosFiltrados.slice(
        corteInicio,
        corteFinal
      );
      if (datosFiltrados[0].length >= 1) {
        return listaElementosPagina.map((valor) => (
          <CardProducto
            key={valor[0]["key"]}
            nombre={valor[0]["nombre"]}
            detalles={valor[0]["detalles"]}
            imagen={valor[0]["img"]}
            valor={valor[0]["valor"]}
            id={valor[0]["id"]}
            buscarProducto={setIdProductosSeleccionado}
            carrito={setCarritoActivo}
            setDetalles={cargarItem}
          ></CardProducto>
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
        setNumeroPaginas(Math.ceil(datosMain.length / elementosPorPagina));
        return;
      }
      let nuevosDatos = datosMain.filter((tupla) => {
        return tupla[0]["nombre"].toUpperCase().includes(buscar);
      });

      if (nuevosDatos.length > 0) {
        setPaginaActual(0);
        setDatosFiltrados(nuevosDatos);
        setNumeroPaginas(Math.ceil(nuevosDatos.length / elementosPorPagina));
      } else {
        setDatosFiltrados(datosMain);
        setNumeroPaginas(Math.ceil(datosMain.length / elementosPorPagina));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <Buscador
          placeholder="buscar"
          manejarClick={BuscarElementos}
        ></Buscador>
      </div>
      <div className={`contenedor__grid  `}>{datos()}</div>
      <div className={``}>
        <PaginadorBasico
          numeroPaginas={numeroPaginas}
          navegar={setPaginaActual}
        ></PaginadorBasico>
      </div>
    </>
  );
}
