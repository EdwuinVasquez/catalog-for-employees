/*-- Estilos --*/
import "./App.css";

/*-- Librerias --*/
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

/*-- Paginas Principales --*/
import { useDataContex } from "./components/view/contex.jsx";
import { Index } from "./components/view/paginaMain/index.jsx";
import { LoginFomulario } from "./components/view/forms/inicioSesionForm.jsx";
import { RegistroFomulario } from "./components/view/forms/registroForm.jsx";
import { Process } from "./components/view/paginaMain/process.jsx";
import { PageNotFound } from "./components/view/paginaMain/page404";
import { ControladorAjustes } from "./components/view/paginaMain/ajustes/ajustesMain";
import { Salir } from "./components/view/paginaMain/salir";

/*-- Menus --*/
import { MenuSuperAdmin } from "./components/view/menus/menuSuperAdmin.jsx";
import { MenuEmpleado } from "./components/view/menus/menuEmpleado.jsx";

/*-- Pagina Home de admin --*/
import { HomeAdmin } from "./components/view/paginaMain/paginasAdmin/home/home";

/*-- Paginas de empleado ADMIN --*/
import { EmpleadosLista } from "./components/view/paginaMain/paginasAdmin/empleado/empleadosLista.jsx";
import { RegistroLista } from "./components/view/paginaMain/paginasAdmin/empleado/registrosLista.jsx";
import { EmpleadosListaToken } from "./components/view/paginaMain/paginasAdmin/empleado/empleadosListaToken.jsx";

/*-- Paginas de producto ADMIN--*/
import { ProductoLista } from "./components/view/paginaMain/paginasAdmin/producto/productoLista.jsx";
import { CategoriaLista } from "./components/view/paginaMain/paginasAdmin/producto/categoriaLista";
import { ProductoCRUD } from "./components/view/paginaMain/paginasAdmin/producto/producto";

/*-- Paginas de reporte ADMIN--*/
import { ReporteComprasAdmin } from "./components/view/paginaMain/paginasAdmin/reportes/reporteVentas";
import { HomeGraficos } from "./components/view/paginaMain/paginasAdmin/home/grafos.jsx";

/*-- Paginas de compra ADMIN --*/
import { ListaComprasAdmin } from "./components/view/paginaMain/paginasAdmin/ventas/listaVentas";
import { AjustesCompra } from "./components/view/paginaMain/paginasAdmin/ventas/ajustesCompra";

/*-- Paginas de EMPlEADO --*/
import { CatalogoCards } from "./components/view/paginaMain/paginasEmpleado/catalogo/catalogo";
import { AjustesCarrito } from "./components/view/paginaMain/paginasEmpleado/catalogo/ajustesCarrito";
import { ListaCompras } from "./components/view/paginaMain/paginasEmpleado/pedidos";

function App() {
  const { contexUsuario, contexMenu } = useDataContex();

  const patallasMain = () => {
    let ruta = window.location.href;
    ruta = ruta.toUpperCase();
    return ruta.includes("REGISTRO") || ruta.includes("LOGIN") ? false : true;
  };

  return (
    <div className="App">
      <div
        className={
          contexMenu === false && patallasMain()
            ? "paginaMenu--desactiva"
            : "paginaMenu--activa"
        }
      >
        <Routes>
          <Route
            path="/emple/*"
            element={
              contexUsuario == "EMPLEADO" ? (
                <MenuEmpleado />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/admin/*"
            element={
              contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                <MenuSuperAdmin />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
        </Routes>
      </div>
      <div className="paginaContenido">
        <div className="paginaContenido--menu"></div>
        <div className={`paginaContenido--informacion `}>
          {/* RUTAS GLOBAL */}
          <Routes>
            <Route path="">
              <Route path="/" element={<Index />} />
              <Route path="/login/*" element={<LoginFomulario />} />
              <Route path="/registro/*" element={<RegistroFomulario />} />
              <Route path="/process/*" element={<Process />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            {/* RUTAS EMPLEADO */}
            <Route path="/emple/*">
              <Route
                path=""
                element={
                  contexUsuario == "EMPLEADO" ? (
                    <CatalogoCards />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route
                path="carrito"
                element={
                  contexUsuario == "EMPLEADO" ? (
                    <AjustesCarrito />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route
                path="compras"
                element={
                  contexUsuario == "EMPLEADO" ? (
                    <ListaCompras />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route
                path="ajustes"
                element={
                  contexUsuario == "EMPLEADO" ? (
                    <ControladorAjustes />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route path="salir" element={<Salir />} />
              <Route path="*" element={<h1>404 No found empleado</h1>} />
            </Route>
            {/* RUTAS ADMINISTRADOR */}
            <Route path="/admin/*">
              <Route
                path=""
                element={
                  contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                    <HomeAdmin />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route path="ventas/*">
                <Route
                  path="lista"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <ListaComprasAdmin />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
                <Route
                  path="editar"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <AjustesCompra />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
              </Route>
              <Route
                path="reporte"
                element={
                  contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                    <ReporteComprasAdmin />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route
                path="grafico"
                element={
                  contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                    <HomeGraficos />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route path="producto/*">
                <Route
                  path="lista"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <ProductoLista />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
                <Route
                  path="categorias"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <CategoriaLista />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
                <Route
                  path="ajustes"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <ProductoCRUD />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
              </Route>
              <Route path="empleados/*">
                <Route
                  path="lista"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <EmpleadosLista />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
                <Route
                  path="nuevos"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <RegistroLista />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
                <Route
                  path="token"
                  element={
                    contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                      <EmpleadosListaToken />
                    ) : (
                      <Navigate to="/process" />
                    )
                  }
                />
              </Route>
              <Route
                path="ajustes"
                element={
                  contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (
                    <ControladorAjustes />
                  ) : (
                    <Navigate to="/process" />
                  )
                }
              />
              <Route path="salir" element={<Salir />} />
              <Route path="*" element={<h1>404 No found administrador</h1>} />
            </Route>
            {/* RUTA NOT FOUND */}
            <Route path="*"></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
