import { Injectable } from '@angular/core';
import { Exportable } from './exportable';
import { LanguageSupportFormat } from './language-support-format';

@Injectable({
  providedIn: 'root',
})
export class CompositeExportService {
  //
  language: LanguageSupportFormat;
  documentation: JSON;

  //
  constructor(l: LanguageSupportFormat, d: JSON) {
    this.language = l;
    this.documentation = d;
  }

  //
  export(e: Exportable): string {
    return e.exportStub(this.language, this.documentation);
  }
}
