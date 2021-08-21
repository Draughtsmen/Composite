const {
  app,
  BrowserWindow,
  ipcMain,
  IpcMessageEvent,
  dialog,
} = require("electron");

const Store = require("electron-store");
const store = new Store();

const { v4: genUuid } = require("uuid");

const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: "src/assets/Composite-Logo.ico", // sets window icon
  });

  win.removeMenu();

  if (process.env.ANGULAR_LOAD === "server") {
    win.loadURL("http://localhost:4200");
  } else {
    win.loadFile(path.join(__dirname, "/dist/composite/index.html"));
  }

  // Open the DevTools.
  // win.webContents.openDevTools();
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

function loadDefaultData() {
  let samples = JSON.parse(fs.readFileSync(path.join(__dirname, "sample.json")));

  store.set("project-list", samples["project-list"]);
  store.set("project-store-gml-sample", samples["project-store-gml-sample"]);
  store.set("project-store-cs-sample", samples["project-store-cs-sample"]);
  return samples["project-list"];
}

// reads a directory of JSON conf files and merges them into one object
function mergeJSON(dir) {
  let files = fs.readdirSync(dir);
  let fulljson = {};

  files.forEach((file) => {
    let json = JSON.parse(fs.readFileSync(dir + file));
    fulljson[json["name"]] = json[json["name"]];
  });

  return fulljson;
}

ipcMain.on("list-projects", (event) => {
  // load conf files
  let langjson = mergeJSON(path.join(__dirname, "conf/langs/"));
  let docjson = mergeJSON(path.join(__dirname, "conf/docs/"));

  event.sender.send("load-conf", langjson, docjson);

  let list = store.get("project-list", undefined);
  if (list === undefined) {
    list = loadDefaultData();
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

ipcMain.on("export-project", (event, project) => {
  dialog
    .showOpenDialog({
      title: "Select Export Folder",
      buttonLabel: "Export",
      properties: ["openDirectory", "createDirectory", "promptToCreate"],
    })
    .then((file) => {
      if (!file.canceled) {
        project.forEach((element) => {
          let fpath = path.join(file.filePaths.toString(), element.name);
          fs.writeFile(fpath, element.data, (err) => {
            if (err) console.log(err);
          });
        });
      }
    })
    .catch(function () {
      console.log("Failed to write!");
    });
});
