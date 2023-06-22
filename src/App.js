import { LoginFomulario } from "./components/view/forms/inicioSesionForm.jsx";
import { RegistroFomulario } from "./components/view/forms/registroForm.jsx";
import { MenuSuperAdmin } from "./components/view/menus/menuSuperAdmin.jsx";
import { Index } from "./components/view/paginaMain/index.jsx";
import { EmpleadosLista } from "./components/view/paginaMain/paginasAdmin/empleadosLista.jsx";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import './App.css';

function App() {

  const loggin = "ad";

  return (
    <div className="App">
      <Routes>
        <Route path="">
          <Route path="/" element={<Index />} />
          <Route path="/login/*" element={<LoginFomulario />} />
          <Route path="/registro/*" element={<RegistroFomulario />} />
          <Route path="*" element={<h1>404 No found</h1>} />
        </Route>
        <Route path="/admin/*">
          <Route path="home" element={loggin == "ad" ? (<MenuSuperAdmin />) : ( <Navigate to="/login"/>)} />
          <Route path="venta" element={loggin == "ad" ? (<MenuSuperAdmin />) : ( <Navigate to="/login"/>)} />
          <Route path="empleados/lista" element={loggin == "ad" ? (<EmpleadosLista />) : ( <Navigate to="/login"/>)} />
          <Route path="*" element={<h1>404 No found</h1>} />
        </Route>
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
