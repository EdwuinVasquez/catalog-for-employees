import { LoginFomulario } from "./components/view/forms/inicioSesionForm.jsx";
import { RegistroFomulario } from "./components/view/forms/registroForm.jsx";
import { MenuSuperAdmin } from "./components/view/menus/menuSuperAdmin.jsx";
import { Index } from "./components/view/paginaMain/index.jsx";
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuSuperAdmin></MenuSuperAdmin>
      {/* <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login/*" element={<LoginFomulario />} />
        <Route path="/registro/*" element={<RegistroFomulario />} />
        <Route path="*" element={<RegistroFomulario />} />
      </Routes> */}
    </div>
  );
}

export default App;
