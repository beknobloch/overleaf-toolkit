// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

// Paths to your start and stop shell scripts
const startScriptPath = path.join(__dirname, 'bin/up');
const stopScriptPath = path.join(__dirname, 'bin/stop');

// Start Docker containers using the start script, returning a promise
function startDockerContainers() {
  return new Promise((resolve, reject) => {

    /*exec(`bash ${startScriptPath}`, { env: { PATH: '/usr/local/bin:/usr/bin:/bin' } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting containers: ${error.message}`);
        reject(error);
      } else {
        console.log("Containers started:", stdout);
        resolve(true);
      }
    });*/
    resolve(true)
  });
}

// Stop Docker containers using the stop script
function stopDockerContainers() {
  exec(`bash ${stopScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error stopping containers: ${error.message}`);
      dialog.showErrorBox('Error', `Could not stop Docker containers: ${error.message}`);
    } else {
      console.log("Containers stopped:", stdout);
      mainWindow.webContents.send('docker-status', 'stopped');
    }
  });
}

function checkDockerInstalled() {
  return new Promise((resolve, reject) => {
    exec('/usr/local/bin/docker -v', (error, stdout) => {
      if (error) {
        console.error("Docker is not installed or not accessible.");
        reject("Docker is not installed or not accessible.");
      } else {
        console.log("Docker is available:", stdout);
        resolve(true);
      }
    });
  });
}

// Create the Electron browser window and load the URL only after Docker containers are started
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the web app at http://localhost:3000/launchpad
  mainWindow.loadURL('http://localhost/login');
}

// Electron app events
app.on('ready', () => {
  checkDockerInstalled()
    .then(() => startDockerContainers())
    .then(() => {
      createWindow(); // Create the window only after Docker containers are started
      mainWindow.webContents.send('docker-status', 'running');
    })
    .catch((err) => {
      dialog.showErrorBox("Startup Error", `There was an issue: ${err}`);
      app.quit();
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopDockerContainers();
    app.quit();
  }
});

ipcMain.on('start-containers', () => {
  startDockerContainers().then(() => {
    mainWindow.webContents.send('docker-status', 'running');
  });
});

ipcMain.on('stop-containers', () => {
  stopDockerContainers();
  mainWindow.webContents.send('docker-status', 'stopped');
});
