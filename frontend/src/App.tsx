import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Menu from "./pages/ConnectionView";
import UsuariosCompradores from "./pages/UsuariosCompradores";
import UsuariosProveedores from "./pages/UsuariosProveedores";
import Proveedores from "./pages/Proveedores";
import Sucursales from "./pages/Sucursales";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Menu />} />
        <Route path="usuarios-comprados" element={<UsuariosCompradores />} />
        <Route path="usuarios-proveedor" element={<UsuariosProveedores />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="sucursales" element={<Sucursales />} />
      </Route>
    </Routes>
  );
}
