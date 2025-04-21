import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Users, Store, Briefcase, User, Home, LogOut } from "lucide-react";



export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Disparar evento para actualizar componentes
    window.dispatchEvent(new Event("storage"));
    
    // Navegar al login
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-15"
      } bg-gradient-to-b from-blue-800 to-blue-700 text-white min-h-screen flex flex-col transition-all duration-300 shadow-xl`}
    >
      {/* Header del Sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-white-600/30">
        <span className={`${isOpen ? "block" : "hidden"} text-xl font-semibold`}>
          {"Sistema de Gestión"}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-blue-600/20 rounded-full transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Opciones Comunes para todos los usuarios */}
      <nav className="flex-1">
        <Link
          to="/"
          className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"} p-4 hover:bg-blue-600/20 transition-all duration-200`}
        >
          <Home className="w-6 h-6 text-white" />
          {isOpen && <span className="text-sm font-medium text-white">Inicio</span>}
        </Link>
        
        <Link
          to="usuarios-comprados"
          className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"} p-4 hover:bg-blue-600/20 transition-all duration-200`}
        >
          <Users className="w-6 h-6 text-white" />
          {isOpen && <span className="text-sm font-medium text-white">Usuario Proveedor</span>}
        </Link>
        
        <Link
          to="usuarios-proveedor"
          className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"} p-4 hover:bg-blue-600/20 transition-all duration-200`}
        >
          <User className="w-6 h-6 text-white" />
          {isOpen && <span className="text-sm font-medium text-white">Usuario Comprador</span>}
        </Link>
        
        <Link
          to="proveedores"
          className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"} p-4 hover:bg-blue-600/20 transition-all duration-200`}
        >
          <Briefcase className="w-6 h-6 text-white" />
          {isOpen && <span className="text-sm font-medium text-white">Proveedores</span>}
        </Link>
        
        <Link
          to="sucursales"
          className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"} p-4 hover:bg-blue-600/20 transition-all duration-200`}
        >
          <Store className="w-6 h-6 text-white" />
          {isOpen && <span className="text-sm font-medium text-white">Sucursales</span>}
        </Link>
      </nav>

      {/* Sección del Usuario y Logout */}
      <div className="p-4 border-t border-white-600/30">
        <div className="flex items-center justify-between space-x-2">
          {isOpen && (
            <div className="flex items-center space-x-2 min-w-0">
              <User className="w-6 h-6 text-white flex-shrink-0" />
              <span className="text-sm font-medium text-white break-words line-clamp-2">
                {"Usuario"}
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center p-2 hover:bg-blue-600/20 rounded-lg transition-all duration-200 flex-shrink-0"
          >
            <LogOut className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </aside>
  );
}