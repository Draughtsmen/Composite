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

ipcMain.once("load-samples", () => {
  let samples = JSON.parse(JSON.stringify({
    "project-list": {
      "gml-sample": {
        "name": "GMLSAMPLEPROJECT",
        "language": "gml",
        "doc": "gmldocs"
      },
      "cs-sample": {
        "name": "C#SAMPLEPROJECT",
        "language": "c#",
        "doc": "gmldocs"
      }
    },
    "project-store-gml-sample": {
      "id": "gml-sample",
      "name": "GMLSAMPLEPROJECT",
      "language": "gml",
      "doc": "gmldocs",
      "data": {
        "_type": "CompositeProject",
        "name": "GMLSAMPLEPROJECT",
        "files": [
          {
            "_type": "CompositeGroup",
            "name": "FILENAME.gml",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": [
              {
                "_type": "CompositeFunction",
                "name": "FUNCTIONNAME",
                "description": "DEFAULT DESCRIPTION",
                "type": "function",
                "args": []
              },
              {
                "_type": "CompositeVariable",
                "name": "VARIABLENAME",
                "description": "DEFAULT DESCRIPTION",
                "type": "variable",
                "variableType": "boolean",
                "value": "true"
              }
            ]
          },
          {
            "_type": "CompositeGroup",
            "name": "GIVEMEAFUNCTION.gml",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": []
          },
          {
            "_type": "CompositeGroup",
            "name": "GIVEMEVARIABLE.gml",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": []
          },
          {
            "_type": "CompositeGroup",
            "name": "MODIFYME.gml",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": [
              {
                "_type": "CompositeFunction",
                "name": "CHANGEME",
                "description": "DEFAULT DESCRIPTION",
                "type": "function",
                "args": [
                  "CHANGETHISARGUMENT"
                ]
              },
              {
                "_type": "CompositeFunction",
                "name": "DONOTCHANGE",
                "description": "DEFAULT DESCRIPTION",
                "type": "function",
                "args": []
              }
            ]
          }
        ]
      }
    },
    "project-store-cs-sample": {
      "id": "cs-sample",
      "name": "C#SAMPLEPROJECT",
      "language": "c#",
      "doc": "gmldocs",
      "data": {
        "_type": "CompositeProject",
        "name": "C#SAMPLEPROJECT",
        "files": [
          {
            "_type": "CompositeGroup",
            "name": "STARTFILE.cs",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": [
              {
                "_type": "CompositeClass",
                "name": "CLASSNAME",
                "description": "DEFAULT DESCRIPTION",
                "type": "class",
                "prefix": "public",
                "postfix": "",
                "memberVariables": [
                  {
                    "_type": "CompositeVariable",
                    "name": "MEMBERVARIABLE",
                    "description": "DEFAULT DESCRIPTION",
                    "type": "variable",
                    "variableType": "int",
                    "value": "100"
                  }
                ],
                "memberFunctions": [
                  {
                    "_type": "CompositeFunction",
                    "name": "MEMBERFUNCTION",
                    "description": "DEFAULT DESCRIPTION",
                    "type": "function",
                    "returnType": "bool",
                    "args": []
                  }
                ],
                "subclasses": []
              }
            ]
          },
          {
            "_type": "CompositeGroup",
            "name": "C#FILENAME.cs",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": [
              {
                "_type": "CompositeFunction",
                "name": "C#FUNCTION",
                "description": "DEFAULT DESCRIPTION",
                "type": "function",
                "returnType": "string",
                "args": []
              },
              {
                "_type": "CompositeVariable",
                "name": "C#VARIABLE",
                "description": "DEFAULT DESCRIPTION",
                "type": "variable",
                "variableType": "string",
                "value": "hello"
              }
            ]
          },
          {
            "_type": "CompositeGroup",
            "name": "ANOTHERFILE.cs",
            "description": "DEFAULT DESCRIPTION",
            "type": "group",
            "composite": [
              {
                "_type": "CompositeClass",
                "name": "FORMEMBERFUNCTION",
                "description": "DEFAULT DESCRIPTION",
                "type": "class",
                "prefix": "public",
                "postfix": "",
                "memberVariables": [],
                "memberFunctions": [],
                "subclasses": []
              },
              {
                "_type": "CompositeClass",
                "name": "MODIFYME",
                "description": "DEFAULT DESCRIPTION",
                "type": "class",
                "prefix": "private",
                "postfix": "",
                "memberVariables": [
                  {
                    "_type": "CompositeVariable",
                    "name": "CHANGEME",
                    "description": "DEFAULT DESCRIPTION",
                    "type": "variable",
                    "variableType": "string",
                    "value": "Change me!"
                  },
                  {
                    "_type": "CompositeVariable",
                    "name": "DONOTCHANGE",
                    "description": "DEFAULT DESCRIPTION",
                    "type": "variable",
                    "variableType": "string",
                    "value": "Don't change me!"
                  }
                ],
                "memberFunctions": [],
                "subclasses": []
              }
            ]
          }
        ]
      }
    }
  }));

  store.set("project-list", samples["project-list"]);
  store.set("project-store-gml-sample", samples["project-store-gml-sample"]);
  store.set("project-store-cs-sample", samples["project-store-cs-sample"]);
});

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
    store.set("project-list", {});
  }

  // check if project list is empty
  if (!Object.keys(list).length) {
    event.sender.send("load-samples-reply");
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
