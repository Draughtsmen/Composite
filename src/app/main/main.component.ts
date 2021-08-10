import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { sandboxed } from 'process';
import { Composite } from '../classes/composite';
import { CompositeClass } from '../classes/composite-class';
import { CompositeFunction } from '../classes/composite-function';
import { CompositeGroup } from '../classes/composite-group';
import { CompositeProject } from '../classes/composite-project';
import { CompositeVariable } from '../classes/composite-variable';
import { IpcService } from '../ipc.service';
import { CompositeManagerService } from '../services/composite-export/composite-manager.service';

/**
 * This class describes the main component of the frontend.
 *
 * @class MainComponent (name)
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  project: CompositeProject | null;
  modalComposite: any = null;
  currComposite: Composite | null = null;
  currTypes: any = [];
  newCompositeForm: FormGroup = new FormGroup({});
  fullProject: any;

  /**
   * Constructs a new instance of the Main frontend component.
   *
   * @param {NgModal} modalService
   * @param {IpcService} ipcService
   * @param {ActivatedRoute} routeb
   * @param {NgZone} ngZone
   */
  constructor(
    private modalService: NgbModal,
    private ipcService: IpcService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    ipcService.on('load-project-reply', (event, res) => {
      this.ngZone.run(() => {
        this.fullProject = res;
        this.project = CompositeManagerService.deserializeProject(
          res['data'],
          this.fullProject.language,
          this.fullProject.doc
        );
      });
    });

    this.project = null;
    ipcService.send('load-project', this.route.snapshot.params.id);
  }

  /**
   * Serializes and saves the Composite Project.
   */
  saveComposite() {
    this.fullProject.data = this.project?.serialize();
    this.ipcService.send('save-project', this.fullProject);
  }

  /**
   * Adds either a CompositeGroup or a Composite object to the project.
   *
   * @param {(Composite|number)} newComposite - The new composite to add.
   */
  addComposite(newComposite: Composite) {
    if (this.modalComposite == null) {
      this.project?.addGroup(<CompositeGroup>newComposite);
    } else if (this.modalComposite instanceof CompositeGroup) {
      (<CompositeGroup>this.modalComposite).addCompositeObject(newComposite);
    }
  }

  /**
   * **Called on new composite submit.
   *
   * @param {any} modal - The modal to close on completion of the function.
   */
  onNewCompositeSubmit(modal: any) {
    let name = this.newCompositeForm.get('name')?.value;
    let description = this.newCompositeForm.get('description')?.value;
    // Iterate through current context

    for (const item of this.currTypes) {
      // Give all files the proper extension
      if (item['id'] === 'file') {
        if (item.hasOwnProperty('append')) {
          //todo: better implementation
          name += item['append'];
        }
        this.addComposite(new CompositeGroup(name, description));
        // Expand functions with their arguments and return values
      } else if (item['id'] === 'function') {
        let arr = <FormArray>(
          this.newCompositeForm.get('function')?.get('arguments')
        );
        let strArr: string[] = [];
        for (let i = 0; i < arr.length; i++) {
          strArr.push(arr.at(i).value);
        }
        this.addComposite(
          new CompositeFunction(
            name,
            description,
            this.newCompositeForm.get('function')?.get('return')?.value,
            strArr
          )
        );
        // Expand variables with their types and values
      } else if (item['id'] === 'variable') {
        // REMOVE HARD CODING, was just this for testing
        this.addComposite(
          new CompositeVariable(name, description, 'string', 'testvalue')
        );
        // Expand classes with their info
      } else if (item['id'] === 'class') {
        // HAS DEFAULT "PRE" and "POST", will change later
        this.addComposite(new CompositeClass('pre', name, 'post', description));
      }
    }
    this.saveComposite();
    modal.close();
  }

  /**
   * Gets the FormControl array from a doubly-specified Composite Form element.
   *
   * @param {string} id - The identifier.
   * @param {string} subId - The sub identifier.
   * @return {FormControl[]} The array controls.
   */
  getArrayControls(id: string, subId: string): FormControl[] {
    return <FormControl[]>(
      (<FormArray>this.newCompositeForm.get(id)?.get(subId)).controls
    );
  }

  /**
   * Adds a new array field to the doubly-specified Composite Form.
   *
   * @param {string} id - The identifier.
   * @param {string} subId - The sub identifier.
   */
  addArrayField(id: string, subId: string) {
    (<FormArray>this.newCompositeForm.get(id)?.get(subId)).push(
      new FormControl('')
    );
  }

  /**
   * Removes the indexed array field from the doubly-specified Composite Form.
   *
   * @param {string} id - The identifier.
   * @param {string} subId - The sub identifier.
   * @param {number} index - The index.
   */
  removeArrayField(id: string, subId: string, index: number) {
    (<FormArray>this.newCompositeForm.get(id)?.get(subId)).removeAt(index);
  }

  /**
   * **Opens a new composite.
   *
   * @param {any} content - The content.
   * @param {any} currentComposite - The current composite.
   */
  openNewComposite(content: any, currentComposite: any) {
    if (currentComposite == null) {
      //Project root
      this.currTypes = this.project?.lang.project;
    } else if (currentComposite instanceof CompositeGroup) {
      this.currTypes = this.project?.lang.templates;
    }
    this.modalComposite = currentComposite;
    let typeSet = false;
    let compositeForm: any = {
      name: new FormControl(''),
    };
    for (const item of this.currTypes) {
      if (!typeSet) {
        compositeForm['type'] = new FormControl(item['id']);
        typeSet = true;
      }
      if (item.hasOwnProperty('data')) {
        let group: any = {};
        for (const dataItem of item['data']) {
          if (dataItem['type'] === 'array') {
            group[dataItem['id']] = new FormArray([]);
          } else if (dataItem['type'] === 'string') {
            group[dataItem['id']] = new FormControl('');
          }
        }
        compositeForm[item['id']] = new FormGroup(group);
      }
    }
    this.newCompositeForm = new FormGroup(compositeForm);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  /**
   * Checks if a provided Composite object can have descendants.
   *
   * @param {Composite} component - The component to check.
   * @return {boolean} True if component can have descendants.  False otherwise.
   */
  componentCanMakeDescendents(component: Composite): boolean {
    if (component instanceof CompositeGroup) {
      return (
        this.project?.lang != undefined &&
        this.project.lang.hasOwnProperty('project') &&
        this.project.lang.project.length > 0
      );
    } else if (component instanceof CompositeFunction) {
      return (
        // RETURNING FALSE AT THE MOMENT SINCE VARIABLE SUPPORT DOESN'T WORK
        false
      );
    } else if (component instanceof CompositeClass) {
      return (
        this.project?.lang != undefined &&
        this.project.lang.templates.find((t) => t.id === 'class') != undefined
      );
    }
    return false;
  }

  /**
   * Selects the component as the current Composite object to display.
   *
   * @param {(Composite|null)} component - The component.
   */
  showComponent(component: Composite | null) {
    this.currComposite = component;
  }

  /**
   * Deletes the chosen Composite object from the Composite project.
   *
   * @param {Composite} component - The component to delete.
   * @param {any} parentComponent - The parent component if it is a Group.
   */
  deleteComponent(component: Composite, parentComponent: any) {
    if (parentComponent == null) {
      this.project?.removeGroup(component.getName());
    } else {
      if (parentComponent instanceof CompositeGroup) {
        parentComponent.removeCompositeObject(component.getName());
      }
    }
    this.saveComposite();
  }
}
