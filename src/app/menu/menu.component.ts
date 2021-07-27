import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompositeProject } from '../classes/composite-project';
import { IpcService } from '../ipc.service';
import { CompositeManagerService } from '../services/composite-export/composite-manager.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  Manager: any = CompositeManagerService;
  projects: any = {};

  objectKeys: any = Object.keys;

  newProjectForm = new FormGroup({
    name: new FormControl(''),
    language: new FormControl('')
  });

  constructor(private modalService: NgbModal, private ipcService: IpcService, private ngZone: NgZone, private router: Router) {
    
  }

  ngOnInit(): void {
    this.ipcService.on('list-projects-reply', (event, res) => {
      this.ngZone.run(() => {
        this.projects = res;
      })
    });
    this.ipcService.send("list-projects");
    this.ipcService.on('new-project-reply', (event, res) => {
      this.ipcService.send("list-projects");
    });
    this.ipcService.on('delete-project-reply', (event, res) => {
      this.ipcService.send("list-projects");
    })
  }

  open(content: any) {
    this.newProjectForm.reset();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    // }, (reason) => {
      
    // });
  }

  openProject(id: string) {
    this.router.navigate(['project', id]);
  }
  
  deleteProject(id: string) {
    this.ipcService.send('delete-project', id);
  }

  onNewProjectSubmit(modal: any) {
    let name = this.newProjectForm.get('name')?.value;
    let language = this.newProjectForm.get('language')?.value;
    this.ipcService.send('new-project', name, language, CompositeManagerService.createProject(name, language).serialize());
    modal.close();
  }

}
