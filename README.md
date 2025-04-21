# Web-App-with-Electron-
Aplicación de escritorio multiplataforma construida con Electron, React, Tailwind CSS y Node.js. Incluye integración con bases de datos locales (MySQL) y estructura modular para frontend, backend y lógica de sistema. Ideal como base para desarrollos fullstack con interfaz moderna y backend local.


Estructura de carpetas:

estructura/
├── backend/                  # Backend en Node.js (conexión y lógica MySQL)
│   ├── config/
│   │   ├── config.prod.js    # Configuración para producción
│   │   └── Connection.js     # Pool de conexión MySQL
│   ├── controllers/          # (Opcional) Controladores de lógica
│   ├── routes/               # (Opcional) Rutas si usas Express
│   ├── services/             # Servicios de negocio o SQL
│   ├── .env                  # Variables para entorno de desarrollo
│   └── index.js              # Archivo principal, expone lógica y conexión
│
├── electron/                 # Configuración de Electron
│   ├── main.js               # Entrada principal de la app
│   └── preload.js            # Bridge entre Electron y el frontend
│
├── frontend/                 # Aplicación React con Vite y TypeScript
│   ├── dist/                 # Carpeta generada tras build (no modificar)
│   ├── public/               # Recursos públicos (favicon, etc)
│   ├── src/
│   │   ├── assets/           # Imágenes, íconos, etc.
│   │   ├── components/       # Componentes compartidos (Sidebar, Layout...)
│   │   ├── pages/            # Vistas de navegación (Home, Usuarios, etc.)
│   │   ├── services/         # Servicios (alertas, loading...)
│   │   ├── styles/           # Archivos CSS y Tailwind personalizados
│   │   ├── global.d.ts       # Tipado global para acceso a `window.electron`
│   │   └── main.tsx          # Punto de entrada de React
│   ├── index.html            # Plantilla base HTML para Vite
│   ├── vite-env.d.ts
│   └── App.tsx               # Root del router
│
├── node_modules/
│
├── .env                      # Variables globales si deseas (opcional)
├── .gitignore
├── package.json              # Configuración raíz (scripts, electron-builder)
├── postcss.config.js         # Configuración PostCSS
├── tailwind.config.js        # Configuración de Tailwind
├── tsconfig.json             # Configuración global de TypeScript
├── vite.config.ts            # Configuración de Vite
└── README.md                 # 📄 Este archivo



Scripts
-Iniciar la aplicación
🔹 Solo frontend (modo web)
   npm run dev --prefix frontend

🔹 Electron + frontend en vivo (modo desarrollo completo)
   npm start


-Construir la aplicación para producción
 1. Compilar el frontend
    npm run build --prefix frontend

 2. Construir la aplicación Electron
    npm run package

-Instalacion de dependencias del proyecto completo (raiz, backend, frontend)
🔹 npm run install-all
