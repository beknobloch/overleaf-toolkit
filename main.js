// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

// Paths to shell scripts
const upScriptPath = path.join(process.resourcesPath,'..', 'bin/up');
const stopScriptPath = path.join(process.resourcesPath,'..', 'bin/stop');
const startScriptPath = path.join(process.resourcesPath,'..', 'bin/start');
const verifyPortScriptPath = path.join(process.resourcesPath,'..', 'bin/UBR_verify-port');
const openDockerScriptPath = path.join(process.resourcesPath,'..', 'bin/UBR_open-docker');
const composeScriptPath = path.join(process.resourcesPath,'..', 'bin/docker-compose');

// const upScriptPath = path.join(__dirname, 'bin/up');
// const stopScriptPath = path.join(__dirname, 'bin/stop');
// const startScriptPath = path.join(__dirname, 'bin/start');
// const verifyPortScriptPath = path.join(__dirname, 'bin/UBR_verify-port');
// const openDockerScriptPath = path.join(__dirname, 'bin/UBR_open-docker');
// const composeScriptPath = path.join(__dirname, 'bin/docker-compose');

let bashCommand = `bash`;
if (process.platform() === "darwin") {

} else if (process.platform() === "win32") {
  const gitBashPaths = [
    "C:\\Program Files\\Git\\bin\\bash.exe",
    "C:\\Program Files (x86)\\Git\\bin\\bash.exe"
  ];

  bashCommand = gitBashPaths.find(fs.existsSync);
  if (!bashCommand) {
    console.error("Git Bash not found! Please install Git for Windows from https://gitforwindows.org/");
    require("electron").shell.openExternal("https://gitforwindows.org/");
    process.exit(1);
  }
} else {
  console.error("Unsupported OS");
  process.exit(1);
}

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
    exec(`${bashCommand} ${verifyPortScriptPath}`, (error, stdout, stderr) => {

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
function openDocker(){
  return new Promise((resolve, reject) => {
    exec(`${bashCommand} ${openDockerScriptPath}`, (error, stdout, stderr) => {

      resolve(true);
    });
  });
}
// Start Docker containers using the start script, returning a promise
function startDockerContainers() {
  return new Promise((resolve, reject) => {
    exec(`${bashCommand} ${upScriptPath}`, { env: { PATH: '/usr/local/bin:/usr/bin:/bin' } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting containers: ${error.message}`);
        reject(error);
      } else {
        console.log("Containers started:", stdout);
        resolve(true);
      }
    });
  });
}

// Stop Docker containers using the stop script
function stopDockerContainers() {
  return new Promise((resolve, reject) => {
    exec(`${bashCommand} ${stopScriptPath}`, { env: { PATH: '/usr/local/bin:/usr/bin:/bin' } }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping containers: ${error.message}`);
        reject(error);
      } else {
        console.log("Containers stopped:", stdout);
        resolve(true);
      }
    });
  });
}

function checkDockerInstalled() {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "docker -v" : "/usr/local/bin/docker -v";

    exec(command, (error, stdout) => {
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
  try {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'assets', 'icon.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadURL('http://localhost:8080/launchpad');

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error(`Page failed to load: ${errorDescription} (Error Code: ${errorCode})`);
      dialog.showErrorBox("Load Error", `The web app could not be loaded: ${errorDescription}`);
    });

    mainWindow.on('closed', () => {
      console.log("Window closed");
      mainWindow = null;
    });

    console.log('Window created successfully');
  } catch (e) {
    console.error("Window creation failed:", e);
    dialog.showErrorBox("Startup Error", `There was an issue: ${e}`);
    app.quit();
  }
}

// Electron app events
app.on('ready', async () => {
  console.log('attempting scripts')
  try{
    await enablePermissions()
    //dialog.showErrorBox("Startup Error", `1`);
    await checkDockerInstalled()
    //dialog.showErrorBox("Startup Error", `2`);
    console.log('docker exists')
    await startDockerContainers()
    //dialog.showErrorBox("Startup Error", `3`);

    await verifyPortReady()
    console.log('port 80 is open and ready for use')
    //dialog.showErrorBox("Startup Error", `4`);
    
    
    }catch(e){
      dialog.showErrorBox("Startup Error", `There was an issue: ${e}`);
      console.log('error')
      app.quit()
    }
    
    try {
      createWindow(); // Create the window only after Docker containers are started
      console.log('window opened')
    }
    catch(err){
      dialog.showErrorBox("Startup Error", `There was an issue: ${err}`);
      console.log('error')
      app.quit();
    };
});

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await stopDockerContainers();
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
