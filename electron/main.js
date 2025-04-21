const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

// En la parte superior de main.js
const fs = require('fs');
const logPath = path.join(app.getPath('userData'), 'logs.txt');

function log(message) {
  fs.appendFileSync(logPath, `${new Date().toISOString()}: ${message}\n`);
}

// Usa esta función en puntos críticos
log('Aplicación iniciada');

// ✅ Cargar variables de entorno para backend
if (!app.isPackaged) {
  require('dotenv').config({ path: path.resolve(__dirname, '../Backend/.env') });
}

// ✅ Recarga automática en desarrollo
if (isDev) {
  try {
    require('electron-reloader')(module);
  } catch (err) {
    console.log('🔄 electron-reloader no disponible');
  }
}

// 🔁 Ventana principal
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
  });

  try {
    if (isDev) {
      win.loadURL('http://localhost:3000');
    } else {
      // Usa app.getAppPath() para obtener la ruta base correcta
      const indexPath = path.join(app.getAppPath(), 'frontend/out/index.html');
      console.log('🧭 Cargando:', indexPath);
      win.loadFile(indexPath);
    }
  } catch (error) {
    dialog.showErrorBox('Error al cargar la ventana', error.message);
  }

  win.on('closed', () => {
    win = null;
  });
}

// En main.js
app.whenReady().then(() => {
  console.log('App ready');
  
  try {
    console.log('Cargando backend...');
    require('../backend/index');
    console.log('Backend cargado correctamente');
  } catch (error) {
    console.error('Error cargando backend:', error);
    dialog.showErrorBox('Error al iniciar el backend', error.message);
  }

  console.log('Creando ventana...');
  createWindow();
  console.log('Ventana creada correctamente');
});

// ✅ Salir por completo al cerrar ventanas (en Windows y Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
