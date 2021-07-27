import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Composite } from '../classes/composite';
import { CompositeClass } from '../classes/composite-class';
import { CompositeFunction } from '../classes/composite-function';
import { CompositeGroup } from '../classes/composite-group';
import { CompositeProject } from '../classes/composite-project';
import { IpcService } from '../ipc.service';
import { CompositeManagerService } from '../services/composite-export/composite-manager.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  project: CompositeProject | null;
  modalComposite: any = null;
  currComposite: Composite | null = null;
  currTypes: any = [];
  projectTypes: any = {
    "project": [
      {
        id: "file",
        name: "File",
        type: "group",
        append: ".gml"
      }
    ],
    "group": [
      {
        id: "function",
        name: "Function",
        type: "function",
        data: [
          {
            id: "return",
            name: "Return Type",
            type: "string"
          },
          {
            id: "arguments",
            name: "Arguments",
            type: "array"
          }
        ]
      },
      {
        id: "variable",
        name: "Variable",
        type: "variable",
        disabled: true
      }
    ]
  }
  newCompositeForm: FormGroup = new FormGroup({
    
  });
  fullProject: any;
  
  constructor(private modalService: NgbModal, private ipcService: IpcService, private route: ActivatedRoute, private ngZone: NgZone) { 
    ipcService.on('load-project-reply', (event, res) => {
      this.ngZone.run(() => {
        this.fullProject = res;
        this.project = CompositeManagerService.deserializeProject(res["data"], this.fullProject.language);
      })
    });

    this.project = null;
    ipcService.send('load-project', this.route.snapshot.params.id);
  }

  ngOnInit(): void {

  }

  saveComposite() {
    this.fullProject.data = this.project?.serialize();
    this.ipcService.send("save-project", this.fullProject);
  }

  addComposite(newComposite: Composite) {
    if (this.modalComposite == null) {
      this.project?.addGroup(<CompositeGroup> newComposite);
    } else if(this.modalComposite instanceof CompositeGroup) {
      (<CompositeGroup>this.modalComposite).addExportableObject(newComposite);
    }
  }

  onNewCompositeSubmit(modal: any) {
    let name = this.newCompositeForm.get("name")?.value;
    for (const item of this.currTypes) {
      if (item["type"] === "group") {
        if (item.hasOwnProperty("append")) { //todo: better implementation
          name += item["append"];
        }
        this.addComposite(new CompositeGroup(name));
      } else if (item["type"] === "function") {
        let arr = (<FormArray>this.newCompositeForm.get('function')?.get('arguments'));
        let strArr: string[] = [];
        for (let i = 0; i < arr.length; i++) {
          strArr.push(arr.at(i).value);
        }
        this.addComposite(new CompositeFunction(name, this.newCompositeForm.get("function")?.get("return")?.value, strArr));
      }
    }
    this.saveComposite();
    modal.close();
  }

  getArrayControls(id: string, subId: string): FormControl[] {
    return (<FormControl[]>(<FormArray>this.newCompositeForm.get(id)?.get(subId)).controls);
  }

  addArrayField(id: string, subId: string) {
    (<FormArray>this.newCompositeForm.get(id)?.get(subId)).push(new FormControl(''));
  }

  removeArrayField(id: string, subId: string, index: number) {
    (<FormArray>this.newCompositeForm.get(id)?.get(subId)).removeAt(index);
  }

  openNewComposite(content: any, currentComposite: any) {
    
    if (currentComposite == null) { //Project root
      this.currTypes = this.projectTypes['project'];
    } else if(currentComposite instanceof CompositeGroup) {
      this.currTypes = this.projectTypes['group'];
    }
    this.modalComposite = currentComposite;
    let typeSet = false;
    let compositeForm: any = {
      "name": new FormControl('')
    };
    for (const item of this.currTypes) {
      if (!typeSet) {
        compositeForm["type"] = new FormControl(item["id"]);
        typeSet = true;
      }
      if (item.hasOwnProperty('data')) {
        let group: any = {};
        for (const dataItem of item["data"]) {
          if (dataItem["type"] === "array") {
            group[dataItem["id"]] = new FormArray([]);
          } else if(dataItem["type"] === "string") {
            group[dataItem["id"]] = new FormControl('');
          }
        }
        compositeForm[item['id']] = new FormGroup(group);
      }
    }
    this.newCompositeForm = new FormGroup(compositeForm);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  componentCanMakeDescendents(component: Composite): boolean {
    if (component instanceof CompositeGroup) {
      return this.projectTypes.hasOwnProperty('group') && this.projectTypes["group"].length > 0;
    } else if(component instanceof CompositeFunction) {
      return this.projectTypes.hasOwnProperty('function') && this.projectTypes["function"].length > 0;
    } else if(component instanceof CompositeClass) {
      return this.projectTypes.hasOwnProperty('class') && this.projectTypes["class"].length > 0;
    }
    return false;
  }

  showComponent(component: Composite | null) {
    this.currComposite = component;
  }

  deleteComponent(component: Composite, parentComponent: any) {
    if (parentComponent == null) {
      this.project?.removeGroup(component.getName());
    } else {
      if (parentComponent instanceof CompositeGroup) {
        parentComponent.removeExportableObject(component.getName());
      }
    }
    this.saveComposite();
  }

}
