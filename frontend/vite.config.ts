import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // 🔹 Hace que las rutas sean relativas en producción
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: "dist",
  },
});
