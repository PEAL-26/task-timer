require("update-electron-app")();

import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("public/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitido quando a janela é fechada.
  mainWindow.on("closed", function () {});
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
