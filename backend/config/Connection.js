const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const electron = require('electron');

// Determinar si estamos en producción
const app = electron.app || (electron.remote && electron.remote.app);
const isDev = !app.isPackaged;

let dbConfig;

// Registrar información de depuración
console.log('Entorno:', isDev ? 'Desarrollo' : 'Producción');

try {
  if (isDev) {
    // En desarrollo, usa .env
    require('dotenv').config();
    dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'superpos'
    };
    console.log('Usando configuración de .env');
  } else {
    // En producción, busca el archivo config.prod.js
    const configPath = path.join(__dirname, 'config.prod.js');
    console.log('Buscando archivo de configuración en:', configPath);
    
    if (fs.existsSync(configPath)) {
      console.log('Archivo de configuración encontrado');
      const prodConfig = require('./config.prod.js');
      dbConfig = prodConfig.database;
      console.log('Configuración cargada:', JSON.stringify({
        host: dbConfig.host,
        user: dbConfig.user,
        database: dbConfig.database
      }));
    } else {
      console.error('¡Archivo de configuración no encontrado!');
      // Valores por defecto
      dbConfig = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'bode.24451988',
        database: 'superpos'
      };
      console.log('Usando configuración por defecto');
    }
  }
} catch (error) {
  console.error('Error al cargar la configuración:', error);
}

// Agregar otras configuraciones
dbConfig.waitForConnections = true;
dbConfig.connectionLimit = 10;
dbConfig.queueLimit = 0;

console.log('Intentando conectar a MySQL con:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database
});

const connection = mysql.createPool(dbConfig);

module.exports = connection;