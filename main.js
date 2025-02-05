// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

// Paths to shell scripts
// const upScriptPath = path.join(process.resourcesPath,'..', 'bin/up');
// const stopScriptPath = path.join(process.resourcesPath,'..', 'bin/stop');
// const startScriptPath = path.join(process.resourcesPath,'..', 'bin/start');
// const verifyPortScriptPath = path.join(process.resourcesPath,'..', 'bin/verify-port');
// const openDockerScriptPath = path.join(process.resourcesPath,'..', 'bin/open-docker');
// const composeScriptPath = path.join(process.resourcesPath,'..', 'bin/docker-compose');

const upScriptPath = path.join(__dirname, 'bin/up');
const stopScriptPath = path.join(__dirname, 'bin/stop');
const startScriptPath = path.join(__dirname, 'bin/start');
const verifyPortScriptPath = path.join(__dirname, 'bin/UBR_verify-port');
const openDockerScriptPath = path.join(__dirname, 'bin/UBR_open-docker');
const composeScriptPath = path.join(__dirname, 'bin/docker-compose');

function enablePermissions(){
  return new Promise((resolve, reject) => {
    exec(`chmod +x ${upScriptPath}`)
    exec(`chmod +x ${stopScriptPath}`)
    exec(`chmod +x ${verifyPortScriptPath}`)
    exec(`chmod +x ${openDockerScriptPath}`)
    exec(`chmod +x ${startScriptPath}`)
    exec(`chmod +x ${composeScriptPath}`)
    resolve(true)
  });
}
function verifyPortReady(){
  return new Promise((resolve, reject) => {
    exec(`bash ${verifyPortScriptPath}`, (error, stdout, stderr) => {

      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      resolve(true);
    });
  });
}
// Start Docker containers using the start script, returning a promise
function startDockerContainers() {
  return new Promise((resolve, reject) => {
    exec(`bash ${upScriptPath}`, (error, stdout, stderr) => {
      
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      resolve(true);
    });
    /*exec(`bash ${startScriptPath}`, { env: { PATH: '/usr/local/bin:/usr/bin:/bin' } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting containers: ${error.message}`);
        reject(error);
      } else {
        console.log("Containers started:", stdout);
        resolve(true);
      }
    });*/
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
    icon: __dirname+ '/assets/icon',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the web app at http://localhost:3000/launchpad
  mainWindow.loadURL('http://localhost/launchpad');
}

// Electron app events
app.on('ready', async () => {
  console.log('attempting scripts')
  try{
    await enablePermissions()

    await checkDockerInstalled()
    console.log('docker exists')
    await startDockerContainers()
   console.log('container started')
    await verifyPortReady()
    console.log('port 80 is open and ready for use')
    
    
    }catch(e){
      dialog.showErrorBox("Startup Error", `There was an issue: ${e}`);
      console.log('error')
      app.quit()
    }
    
    try {
      createWindow(); // Create the window only after Docker containers are started
      mainWindow.webContents.openDevTools();
      console.log('window opened')
    }
    catch(err){
      dialog.showErrorBox("Startup Error", `There was an issue: ${err}`);
      console.log('error')
      app.quit();
    };
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
