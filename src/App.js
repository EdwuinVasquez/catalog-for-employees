import { LoginFomulario } from "./components/view/forms/inicioSesionForm.jsx";
import { RegistroFomulario } from "./components/view/forms/registroForm.jsx";
import { MenuSuperAdmin } from "./components/view/menus/menuSuperAdmin.jsx";
import { Index } from "./components/view/paginaMain/index.jsx";
import { Process } from "./components/view/paginaMain/process.jsx";
import { EmpleadosLista } from "./components/view/paginaMain/paginasAdmin/empleadosLista.jsx";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { useDataContex } from "./components/view/contex.jsx";
import './App.css';

function App() {
	const { contexUsuario, setContexUsuario, contexMenu, setContexMenu } = useDataContex();
  
  return (
    <div className="App">
      <div className={contexMenu === false ? "paginaMenu--desactiva" : "paginaMenu--activa"}>
        <Routes>
          <Route path=""></Route>
          <Route path="/admin/*" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<MenuSuperAdmin />) : ( <Navigate to="/login"/>)}></Route>
        </Routes>
      </div>
      <div className="paginaContenido">
        <div className="paginaContenido--menu"></div>
        <div className="paginaContenido--informacion">
          <Routes>
            <Route path="">
              <Route path="/" element={<Index />} />
              <Route path="/login/*" element={<LoginFomulario />} />
              <Route path="/registro/*" element={<RegistroFomulario />} />
              <Route path="/process/*" element={<Process />} />
              <Route path="*" element={<h1>404 No found index</h1>} />
            </Route>
            <Route path="/admin/*">
              <Route path="" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<h1>home</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="venta" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<h1>ventas</h1>) : ( <Navigate to="/process"/>)} />
              <Route path="empleados/lista" element={contexUsuario == "ADMIN" || contexUsuario == "SUPER" ? (<EmpleadosLista />) : ( <Navigate to="/process"/>)} />
              <Route path="*" element={<h1>404 No found administrador</h1>} />
            </Route>
          </Routes>
        </div>
        
      </div>
    </div>
  );
}

export default App;
