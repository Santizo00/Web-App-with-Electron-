require('dotenv').config();
const db = require('./config/Connection');
const { ipcMain } = require('electron');

// Función para inicializar la base de datos
async function initDatabase() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ Conexión exitosa a la base de datos:', rows);
    return { success: true, data: rows };
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    return { success: false, error: error.message };
  }
}

// Registrar el manejador IPC para la prueba de conexión
ipcMain.handle('test-db-connection', async () => {
  return await initDatabase();
});

// Inicializar la base de datos al cargar
initDatabase();

module.exports = {
  db,
  initDatabase
};