const { contextBridge, ipcRenderer } = require('electron');

// Asegúrate de que ipcRenderer está disponible
if (ipcRenderer) {
  contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
      invoke: (channel, data) => {
        const validChannels = ['test-db-connection']; // lista de canales permitidos
        if (validChannels.includes(channel)) {
          return ipcRenderer.invoke(channel, data);
        }
        return Promise.reject(new Error(`Canal no permitido: ${channel}`));
      }
    }
  });
  console.log('✅ Bridge IPC configurado correctamente');
} else {
  console.error('❌ ipcRenderer no está disponible');
  // Proporciona un objeto simulado para evitar errores en desarrollo
  contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
      invoke: (channel) => {
        console.warn(`Llamada simulada a ${channel} - IPC no disponible`);
        return Promise.resolve({ success: true, simulated: true });
      }
    }
  });
}