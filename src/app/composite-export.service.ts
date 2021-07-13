import { Injectable } from '@angular/core';
import { Exportable } from './exportable';

@Injectable({
  providedIn: 'root'
})
export class CompositeExportService {

  // 
  language: JSON;
  documentation: JSON;

  // 
  constructor(l: JSON, d: JSON) {
    this.language = l;
    this.documentation = d;
  }

  // 
  export(e: Exportable): string {
    return e.exportStub(this.language, this.documentation);
  }
}
