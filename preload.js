const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startContainers: () => ipcRenderer.invoke('start-containers'),
  stopContainers: () => ipcRenderer.invoke('stop-containers'),
  onLogMessage: (callback) => ipcRenderer.on('log-message', callback),
  onShareIP: (callback) => ipcRenderer.on('share-ip-message', (event, ip) => callback(ip))
});