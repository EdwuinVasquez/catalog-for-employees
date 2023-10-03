/*-- Librerias --*/
import { useState, useEffect } from "react";

/*-- Componentes --*/
import { CardProducto } from "../../../cards/cardProducto/cardProducto.jsx";
import { PaginadorBasico } from "../../../paginador/paginado.jsx";
import { Buscador } from "../../../inputs/buscador.jsx";
import { CarritoBoton } from "../../../badge/carrito.jsx";
import { CardProductoDetalles } from "../../../cards/cardProductoDetalles/cardProductoDetalles.jsx";
import { CarritoCatalogo } from "../../../carrito/carrito.jsx";
import { PageNotAvaible } from "../../page403.jsx";

/*-- Clases y controladores --*/
import { emple } from "../../../../../backend/class/empleado.js";
import {
  precioBase,
  precioVenta,
} from "../../../../../backend/funcioneGenerales.jsx";
const classEmple = new emple();

/*-- Variables iniciales --*/
const paginaInicial = 0;
const elementosPorPagina = 20;

export function CatalogoCards() {
  /*-- Vista de detalles activada --*/
  const [detallesActivo, setDetallesActivo] = useState(false);

  /*-- Vista de catalogo --*/
  const [catalogoEstado, setCatalogoEstado] = useState(false);

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

  useEffect(() => {
    if (idProductosSeleccionado === 0) {
      setDetallesActivo(false);
      setIdProductosSeleccionado(-1);
    }
  }, []);

  /*-- Generar la lista de productos --*/
  const generarLista = async () => {
    classEmple
      .productoBase()
      .then((resultado) => {
        if (resultado === false) {
          console.clear();
          throw new Error("No hay resultados almacenados");
        }
        let productosFiltrados = resultado.filter((tupla, index) => {
          return (
            resultado.indexOf(
              resultado.find(
                (valor) => valor["CODIGO_PRODUCTO"] == tupla["CODIGO_PRODUCTO"]
              )
            ) === index &&
            tupla["PRODUCTO_DISPONIBLE"] == 1 &&
            tupla["CATEGORIA_DISPONIBLE"] == 1
          );
        });

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
            estadoDetalles: detallesActivo,
          },
        ]);

        const nuevosDatos = productosFiltrados.map((valor) => [
          {
            key: valor["CODIGO_PRODUCTO"],
            id: valor["CODIGO_PRODUCTO"],
            nombre: valor["NOMBRE_PRODUCTO"],
            img: valor["IMAGEN_PRINCIPAL"],
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
            setDetalles={setDetallesActivo}
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
        setPaginaActual(0);
        setDatosFiltrados([[]]);
        setNumeroPaginas(Math.ceil(nuevosDatos.length / elementosPorPagina));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*-- Cargar vista de datos detallados --*/
  const datosDetallados = () => {
    try {
      let productosSeleccionado = datosCompletos.filter(
        (tupla) =>
          tupla[0]["id"] == idProductosSeleccionado &&
          tupla[0]["disponible"] == 1
      );
      if (productosSeleccionado.length < 1) {
        productosSeleccionado = datosCompletos.filter(
          (tupla) => tupla[0]["id"] == idProductosSeleccionado
        );
      }
      return (
        <>
          <CardProductoDetalles
            key={productosSeleccionado[0][0]["key"]}
            nombre={productosSeleccionado[0][0]["nombre"]}
            detalles={productosSeleccionado[0][0]["detalles"]}
            imagen={productosSeleccionado[0][0]["img"]}
            valor={productosSeleccionado[0][0]["valor"]}
            valorBase={productosSeleccionado[0][0]["valorBase"]}
            lista={productosSeleccionado}
            id={productosSeleccionado[0][0]["id"]}
            estadoDetalle={detallesActivo}
            setEstadoDetalle={setDetallesActivo}
          ></CardProductoDetalles>
        </>
      );
    } catch (error) {}
  };

  const catalogoActivo = (catalogoEstado) => {
    if (!catalogoEstado) {
      classEmple
        .home()
        .then((resultado) => {
          if (resultado[0]["ESTADO_CATALOGO"] == 1) {
            setCatalogoEstado(true);
          }
        })
        .catch(function (error) {
          return 0;
        });
    }

    if (catalogoEstado) {
      return (
        <>
          <div className="contenedor__buscador">
            <Buscador
              placeholder="buscar"
              manejarClick={BuscarElementos}
            ></Buscador>
          </div>
          <div className="contenedor__badge">
            <CarritoBoton manejarClick={setCarritoActivo}></CarritoBoton>
          </div>
          <div
            className={` ${carritoActivo ? " " : "carritoCatalogo--desactiva"}`}
          >
            <CarritoCatalogo manejarClick={setCarritoActivo}></CarritoCatalogo>
          </div>
          <div className={`contenedor__grid  `}>{datos()}</div>
          <div className={`contenedor__paginador`}>
            <PaginadorBasico
              numeroPaginas={numeroPaginas}
              navegar={setPaginaActual}
            ></PaginadorBasico>
          </div>
          <div
            className={`contenedor__detallesProducto  ${
              detallesActivo && idProductosSeleccionado != 0
                ? ""
                : "contenedor__detallesProducto--desactiva"
            }`}
          >
            {datosDetallados()}
          </div>
        </>
      );
    } else {
      return (
        <>
          <PageNotAvaible></PageNotAvaible>{" "}
        </>
      );
    }
  };

  return <>{catalogoActivo(catalogoEstado)}</>;
}

/*-- Asignar la imagen --*/
const imagenItem = (imagenBase, imagenItem) => {
  return imagenItem.length >= 6 ? imagenItem : imagenBase;
};
