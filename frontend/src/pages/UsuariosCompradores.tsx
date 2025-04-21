import { useEffect } from "react";

export default function UsuariosCompradores() {
  useEffect(() => {
    document.title = "Usuarios Comprados - Sistema";
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Bienvenido a Usuarios Comprados
        </h1>
        <p className="text-gray-600 mb-4">
          Esta página le permite gestionar los usuarios comprados en el sistema.
        </p>
        <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">
              Listado de Usuarios Comprados
            </h2>
          </div>
          <div className="p-4 text-gray-500 italic">
            El contenido se cargará aquí...
          </div>
        </div>
      </div>
    </div>
  );
}
