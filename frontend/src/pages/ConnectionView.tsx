import { useState } from "react";

export default function ConnectionView() {
  const [message, setMessage] = useState<string>("🔄 Esperando prueba...");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const testConnection = async () => {
    try {
      setIsLoading(true);

      if (!window.electron || !window.electron.ipcRenderer) {
        setMessage("⚠️ IPC no disponible. ¿Estás en modo web?");
        setIsLoading(false);
        return;
      }

      const result = await window.electron.ipcRenderer.invoke("test-db-connection") as {
        success: boolean;
        message: string;
        error?: string;
      };

      if (result.success) {
        setMessage(`✅ ${result.message || "Conexión exitosa"}`);
      } else {
        setMessage(`❌ ${result.message || "Fallo en la conexión"}: ${result.error || "Desconocido"}`);
      }

      setIsLoading(false);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? `❌ Error: ${err.message}` : "❌ Error desconocido");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
            🚀 Prueba de conexión
          </h1>

          <button
            className={`w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg 
              font-medium shadow-lg hover:from-blue-700 hover:to-indigo-700 
              active:scale-95 transition-all duration-200 flex items-center justify-center
              ${isLoading ? "opacity-80 cursor-wait" : ""}`}
            onClick={testConnection}
            disabled={isLoading}
          >
            <span className="mr-2">
              {isLoading ? "⏳" : "🔌"}
            </span>
            {isLoading ? "Probando..." : "Testear conexión"}
          </button>

          <div className="mt-6 p-4 rounded-lg bg-white/15 backdrop-blur border border-white/10">
            <p
              className={`font-medium ${
                message.includes("✅")
                  ? "text-green-300"
                  : message.includes("❌")
                  ? "text-red-300"
                  : "text-white"
              }`}
            >
              {message}
            </p>
          </div>

          <div className="mt-8 text-xs text-white/60 flex items-center justify-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                message.includes("✅") ? "bg-green-400" : "bg-blue-400"
              } animate-pulse`}
            ></div>
            <span>Sistema de conexión v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
