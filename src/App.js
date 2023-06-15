import { LoginFomulario } from "./components/view/forms/inicioSesionForm.jsx";
import { RegistroFomulario } from "./components/view/forms/registroForm.jsx";
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginFomulario></LoginFomulario>
      <RegistroFomulario></RegistroFomulario>
    </div>
  );
}

export default App;
