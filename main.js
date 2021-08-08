const { app, BrowserWindow, ipcMain, IpcMessageEvent } = require("electron");

const Store = require("electron-store");
const store = new Store();

const { v4: genUuid } = require("uuid");

const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.ANGULAR_LOAD === "server") {
    win.loadURL("http://localhost:4200");
  } else {
    win.loadFile(path.join(__dirname, "/dist/composite/index.html"));
  }

  // Open the DevTools.
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("list-projects", (event) => {
  let list = store.get("project-list", undefined);
  if (list === undefined) {
    store.set("project-list", {});
  }
  event.sender.send("list-projects-reply", store.get("project-list"));
});

ipcMain.on("load-project", (event, id) => {
  let project = store.get("project-store-" + id, undefined);
  if (project === undefined) {
    project = { status: "error", error: "Project not found." };
  }
  event.sender.send("load-project-reply", project);
});

ipcMain.on("save-project", (event, project) => {
  store.set("project-store-" + project.id, project);
  event.sender.send("save-project-reply", { status: "success" });
});

ipcMain.on("delete-project", (event, id) => {
  let list = store.get("project-list", {});
  delete list[id];
  store.set("project-list", list);
  store.delete("project-store-" + id);
  event.sender.send("delete-project-reply", { status: "success" });
});

/*
{
  id: <uuid>
  name: <name>
  language: <language>
  data: <composite data>
}
*/
ipcMain.on("new-project", (event, name, language, doc, baseData) => {
  let list = store.get("project-list", {});
  let uuid = genUuid();
  list[uuid] = { name: name, language: language, doc: doc };
  store.set("project-list", list);
  let project = {
    id: uuid,
    name: name,
    language: language,
    doc: doc,
    data: baseData,
  };
  store.set("project-store-" + uuid, project);
  event.sender.send("new-project-reply", project);
});
