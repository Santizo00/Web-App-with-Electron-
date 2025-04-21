export {};

declare global {
  interface Window {
    electron?: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
        on(channel: string, listener: (...args: any[]) => void): void;
        // Otros métodos personalizados si usás más funciones en preload.js
      };
    };
  }
}
