// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require("fs");

let mainWindow;
let isQuitting = false;

// Paths to shell scripts
const upScriptPath = path.join(process.resourcesPath,'..', 'bin/up');
const stopScriptPath = path.join(process.resourcesPath,'..', 'bin/stop');
const startScriptPath = path.join(process.resourcesPath,'..', 'bin/start');
const verifyPortScriptPath = path.join(process.resourcesPath,'..', 'bin/UBR_verify-port');
const openDockerScriptPath = path.join(process.resourcesPath,'..', 'bin/UBR_open-docker');
const composeScriptPath = path.join(process.resourcesPath,'..', 'bin/docker-compose');

// Function to get the appropriate bash command based on the OS
function getBashCommand() {
  if (process.platform === "win32") {
    return "wsl bash -c";
  } else if (process.platform === "darwin") {
    return "bash -c";
  } else {
    console.error("Unsupported OS");
    process.exit(1);
  }
}

// Function to convert Windows path to WSL path
function toWslPath(winPath) {
  return winPath
    .replace(/^([A-Za-z]):/, (_, drive) => `/mnt/${drive.toLowerCase()}`)
    .replace(/\\/g, '/');
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
  if (process.platform === 'win32') return Promise.resolve();

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
function verifyPortReady(bashCommand){
  const scriptPath = process.platform === 'win32' ? toWslPath(verifyPortScriptPath) : verifyPortScriptPath;
  const quotedScriptPath = `"${scriptPath}"`;
  const command = `${bashCommand} ${quotedScriptPath}`;
  return execCommand(command, { env: { PATH: process.env.PATH } }).then(() => true);
}

// Start Docker containers using the start script, returning a promise
function startDockerContainers(bashCommand) {
  const scriptPath = process.platform === 'win32' ? toWslPath(upScriptPath) : upScriptPath;
  const quotedScriptPath = `"${scriptPath}"`;
  const command = `${bashCommand} ${quotedScriptPath}`;
  return execCommand(command, { env: { PATH: process.env.PATH } });
}

// Stop Docker containers using the stop script
function stopDockerContainers(bashCommand) {
  const scriptPath = process.platform === 'win32' ? toWslPath(stopScriptPath) : stopScriptPath;
  const quotedScriptPath = `"${scriptPath}"`;
  const command = `${bashCommand} ${quotedScriptPath}`;
  return execCommand(command, { env: { PATH: process.env.PATH } });
}

// Check that docker is installed and available
function checkDockerInstalled() {
  const command = "docker -v";
  return execCommand(command).then(stdout => {
    console.log("Docker is available:", stdout);
    return true;
  }).catch(() => {
    console.error("Docker is not installed or not accessible.");
    throw new Error("Docker is not installed or not accessible.");
  });
}

// Create the Electron browser window and load the URL only after Docker containers are started

let loadingWindow;
let closingWindow;
let sharehelpWindow;

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 500,
    height: 400,
    resizable: false,
    movable: true,
    frame: false,
    transparent: false,
    show: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  loadingWindow.loadFile(path.join(__dirname, 'src', 'loading.html'));
  loadingWindow.once('ready-to-show', () => loadingWindow.show());
}

function sendLog(msg) {
  if (loadingWindow && loadingWindow.webContents) {
    loadingWindow.webContents.send('log-message', msg);
  }
  console.log(msg);
}

function createClosingWindow() {
  closingWindow = new BrowserWindow({
    width: 420,
    height: 185,
    resizable: false,
    movable: true,
    frame: false,
    transparent: false,
    show: false,
    center: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  closingWindow.loadFile(path.join(__dirname, 'src', 'closing.html'));
  closingWindow.once('ready-to-show', () => closingWindow.show());
}

async function createSharehelpWindow() {
  sharehelpWindow = new BrowserWindow({
    width: 500,
    height: 450,
    resizable: false,
    movable: true,
    frame: true,
    transparent: false,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  sharehelpWindow.loadFile(path.join(__dirname, 'src', 'sharehelp.html'));
  sharehelpWindow.once('ready-to-show', async () => {
    sharehelpWindow.show();
    try {
      const ip = await execCommand(`ipconfig getifaddr en0`);
      sharehelpWindow.webContents.send('share-ip-message', ip.trim());
    } catch (err) {
      console.error("Failed to get IP address:", err);
    }
  });
}

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

    mainWindow.on('close', (event) => {
      if (!isQuitting) {
        event.preventDefault();

        const choice = dialog.showMessageBoxSync(mainWindow, {
          type: 'question',
          buttons: ['Cancel', 'Quit'],
          defaultId: 1,
          cancelId: 0,
          title: 'Confirm Quit',
          message: 'Are you sure you want to quit Underbranch?',
        });

        if (choice === 1) {
          isQuitting = true;
          mainWindow.close();
          app.quit();
        }
      }
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

const bashCommand = getBashCommand();
console.log("Using bash command:", bashCommand);

// Set PATH for non-Windows platforms
if (process.platform !== 'win32') {
  try {
    const shellPath = require('child_process')
      .execSync(`${process.env.SHELL} -ilc 'echo $PATH'`)
      .toString().trim();
    process.env.PATH = shellPath;
    console.log('Updated PATH from shell:', process.env.PATH);
  } catch (e) {
    console.warn("Failed to sync PATH from shell:", e.message);
  }
}

// Electron app events
app.on('ready', async () => {
  createLoadingWindow();
  sendLog("Starting Underbranch...");

  try {
    sendLog("Setting script permissions...");
    await enablePermissions();

    sendLog("Checking Docker installation...");
    await checkDockerInstalled();

    sendLog("Starting Docker containers...");
    await startDockerContainers(bashCommand);

    sendLog("Verifying port availability...");
    await verifyPortReady(bashCommand);

    sendLog("All systems go. Launching main window...");
    createWindow();
    createSharehelpWindow();
    loadingWindow.close();
  } catch (e) {
    dialog.showErrorBox("Startup Error", `There was an issue: ${e}`);
    sendLog(`Startup failed: ${e}`);
    app.quit();
  }
});

app.on('before-quit', async (event) => {
  event.preventDefault();
  createClosingWindow();
  try {
    await stopDockerContainers(bashCommand);
  } catch (err) {
    console.warn("Failed to stop Docker containers:", err);
  } finally {
    app.exit();
  }
});

ipcMain.handle('start-containers', async () => {
  try {
    await startDockerContainers(bashCommand);
    return { status: 'success' };
  } catch (err) {
    return { status: 'error', message: err.message || err };
  }
});

ipcMain.handle('stop-containers', async () => {
  try {
    await stopDockerContainers(bashCommand);
    return { status: 'success' };
  } catch (err) {
    return { status: 'error', message: err.message || err };
  }
});
