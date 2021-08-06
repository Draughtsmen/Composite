import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompositeProject } from '../classes/composite-project';
import { IpcService } from '../ipc.service';
import { CompositeManagerService } from '../services/composite-export/composite-manager.service';

/**
 * This class describes the sidebar menu component of the frontend.
 *
 * @class Component (name)
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  Manager: any = CompositeManagerService;
  projects: any = {};

  objectKeys: any = Object.keys;

  newProjectForm = new FormGroup({
    name: new FormControl(''),
    language: new FormControl(''),
  });

  /**
   * Constructs a new instance of the sidebar menu.
   *
   * @param {modalService} modalService
   * @param {ipcService} ipcService
   * @param {NgZone} ngZone
   * @param {Router} router
   */
  constructor(
    private modalService: NgbModal,
    private ipcService: IpcService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  /**
   * Adds IpcService event-response functionality.
   */
  ngOnInit(): void {
    // To be run after the "list-projects" event is sent and received.
    this.ipcService.on('list-projects-reply', (event, res) => {
      this.ngZone.run(() => {
        this.projects = res;
      });
    });

    // To be run after the "new-project" event is sent and received.
    this.ipcService.on('new-project-reply', (event, res) => {
      this.ipcService.send('list-projects');
    });

    // To be run after the "delete-project" event is sent and received.
    this.ipcService.on('delete-project-reply', (event, res) => {
      this.ipcService.send('list-projects');
    });

    // Always list the Composite projects that the user has on their computer.
    this.ipcService.send('list-projects');
  }

  /**
   * Opens the chosen Composite project.
   *
   * @param {any} content - The Composite project to open.
   */
  open(content: any) {
    this.newProjectForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  /**
   * Navigates the user's browser to the identified project's page.
   *
   * @param {string} id - The project identifier.
   */
  openProject(id: string) {
    this.router.navigate(['project', id]);
  }

  /**
   * Tells the IpcService to send a message to delete the project of a given id.
   *
   * @param {string} id - The project identifier.
   */
  deleteProject(id: string) {
    this.ipcService.send('delete-project', id);
  }

  /**
   * Called on new project submit.
   *
   * @param {any} modal The modal
   */
  onNewProjectSubmit(modal: any) {
    let name = this.newProjectForm.get('name')?.value;
    let language = this.newProjectForm.get('language')?.value;
    this.ipcService.send(
      'new-project',
      name,
      language,
      CompositeManagerService.createProject(name, language).serialize()
    );
    modal.close();
  }
}
