// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require("fs");

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
if (process.platform === "darwin") {

} else if (process.platform === "win32") {
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

try {
  const shellPath = require('child_process').execSync(
    `${process.env.SHELL} -ilc 'echo $PATH'`
  ).toString().trim();

  process.env.PATH = shellPath;
  console.log('Updated PATH from shell:', process.env.PATH);
} catch (e) {
  console.warn("Failed to sync PATH from shell:", e.message);
}

// Function to execute shell commands and return a promise
function execCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}\n${error.message}`);
        reject(error);
      } else {
        if (stderr) console.warn(`stderr: ${stderr}`);
        resolve(stdout);
      }
    });
  });
}

// Function to enable permissions for the scripts
function enablePermissions(){
  const scripts = [
    upScriptPath,
    stopScriptPath,
    startScriptPath,
    verifyPortScriptPath,
    openDockerScriptPath,
    composeScriptPath
  ];

  return Promise.all(
    scripts.map(script => new Promise((resolve, reject) => {
      exec('chmod +x ' + script, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error setting permissions for ${script}: ${error.message}`);
          reject(error);
        } else {
          resolve();
        }
      });
    }))
  );
}

// Verify if the port is ready using the verify script, returning a promise
function verifyPortReady(){
  return execCommand(`${bashCommand} ${verifyPortScriptPath}`, { env: { PATH: process.env.PATH } }).then(() => true);
}

// Start Docker containers using the start script, returning a promise
function startDockerContainers() {
  return execCommand(`${bashCommand} ${upScriptPath}`, { env: { PATH: process.env.PATH } });
}

// Stop Docker containers using the stop script
function stopDockerContainers() {
  return execCommand(`${bashCommand} ${stopScriptPath}`, { env: { PATH: process.env.PATH } });
}

// Check that docker is installed and available
function checkDockerInstalled() {
  const command = process.platform === "win32" ? "docker -v" : "/usr/local/bin/docker -v";
  return execCommand(command).then(stdout => {
    console.log("Docker is available:", stdout);
    return true;
  }).catch(() => {
    console.error("Docker is not installed or not accessible.");
    throw new Error("Docker is not installed or not accessible.");
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
        contextIsolation: true,
        nodeIntegration: false,
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
      console.error('Startup sequence failed:', e);
      app.quit()
    }
    
    try {
      createWindow(); // Create the window only after Docker containers are started
      console.log('window opened')
    }
    catch(err){
      dialog.showErrorBox("Startup Error", `There was an issue: ${err}`);
      console.error('Startup sequence failed:', e);
      app.quit();
    };
});

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await stopDockerContainers();
    app.quit();
  }
});

ipcMain.handle('start-containers', async () => {
  try {
    await startDockerContainers();
    return { status: 'success' };
  } catch (err) {
    return { status: 'error', message: err.message || err };
  }
});

ipcMain.handle('stop-containers', async () => {
  try {
    await stopDockerContainers();
    return { status: 'success' };
  } catch (err) {
    return { status: 'error', message: err.message || err };
  }
});
