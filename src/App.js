/*-- Estilos --*/
import './App.css';

/*-- Librerias --*/
import { Route, Routes, Navigate } from "react-router-dom";
import React from 'react';

/*-- Paginas Principales --*/
import { useDataContex } from "./components/view/contex.jsx";
import { Index } from "./components/view/paginaMain/index.jsx";
import { LoginFomulario } from "./components/view/forms/inicioSesionForm.jsx";
import { RegistroFomulario } from "./components/view/forms/registroForm.jsx";
import { Process } from "./components/view/paginaMain/process.jsx";

/*-- Menus --*/
import { MenuSuperAdmin } from "./components/view/menus/menuSuperAdmin.jsx";
import { MenuEmpleado } from "./components/view/menus/menuEmpleado.jsx";

/*-- Paginas de empleado administrador --*/
import { EmpleadosLista } from "./components/view/paginaMain/paginasAdmin/empleado/empleadosLista.jsx";
import { RegistroLista } from "./components/view/paginaMain/paginasAdmin/empleado/registrosLista.jsx";
import { EmpleadosListaToken } from "./components/view/paginaMain/paginasAdmin/empleado/empleadosListaToken.jsx";
import { NuevoEmpleado } from "./components/view/paginaMain/paginasAdmin/empleado/nuevoEmpleado.jsx";
import { EditarEmpleado } from "./components/view/paginaMain/paginasAdmin/empleado/editarEmpleado.jsx";

/*-- Paginas de producto administrador --*/
import { ProductoLista } from "./components/view/paginaMain/paginasAdmin/producto/productoLista.jsx";

/*-- Paginas de empleado --*/
import { CatalogoCards } from './components/view/paginaMain/paginasEmpleado/catalogo/catalogo';
import { AjustesCarrito } from './components/view/paginaMain/paginasEmpleado/catalogo/ajustesCarrito';


function App() {
	const { contexUsuario, contexMenu } = useDataContex();
  
  return (
    <div className="App">
      <div className={contexMenu === false ? "paginaMenu--desactiva" :  "paginaMenu--activa"}>
        <Routes>
          <Route path=""></Route>
          <Route path="/admin/*" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<MenuSuperAdmin />) : ( <Navigate to="/login"/>)}></Route>
          <Route path="/emple/*" element={contexUsuario == "EMPLEADO" ? (<MenuEmpleado />) : ( <Navigate to="/login"/>)}></Route>
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
              <Route path="*" element={<h1>404 No found index</h1>} />
            </Route>
            {/* RUTAS ADMINISTRADOR */}
            <Route path="/admin/*">
              <Route path="" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<h1>home</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="venta" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<h1>ventas</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="producto/*">
                <Route path="lista" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<ProductoLista />) : ( <Navigate to="/process"/>)} />
                <Route path="categorias" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<h1> Lista categorias</h1>) : ( <Navigate to="/process"/>)} />
                <Route path="ajustes" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<h1> Ajustes</h1>) : ( <Navigate to="/process"/>)} />
              </Route>
              <Route path="empleados/*">
                <Route path="lista" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<EmpleadosLista />) : ( <Navigate to="/process"/>)} />
                <Route path="nuevosRegistros" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<RegistroLista />) : ( <Navigate to="/process"/>)} />
                <Route path="token" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<EmpleadosListaToken />) : ( <Navigate to="/process"/>)} />
                <Route path="nuevo" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<NuevoEmpleado />) : ( <Navigate to="/process"/>)} />
                <Route path="ajustes" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<EditarEmpleado />) : ( <Navigate to="/process"/>)} />
              </Route>
              <Route path="salir" element={<Index />} />
              <Route path="*" element={<h1>404 No found administrador</h1>} />
            </Route>
            {/* RUTAS EMPLEADO */}
            <Route path="/emple/*">
              <Route path="" element={contexUsuario == "EMPLEADO" ? (<CatalogoCards />) : ( <Navigate to="/process"/>)} />
              <Route path="carrito" element={contexUsuario == "EMPLEADO" ? (<AjustesCarrito />) : ( <Navigate to="/process"/>)} />
              <Route path="compras" element={contexUsuario == "EMPLEADO" ? (<h1>ventas</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="historial" element={contexUsuario == "EMPLEADO" ? (<h1>ventas</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="configuracion" element={contexUsuario == "EMPLEADO" ? (<h1>ventas</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="salir" element={<Index />} />
              <Route path="*" element={<h1>404 No found empleado</h1>} />
            </Route>
          </Routes>
        </div>
        
      </div>
    </div>
  );
}

export default App;
