import { Injectable } from '@angular/core';
import { Exportable } from '../../classes/exportable';
import { LanguageSupportFormat } from '../../classes/language-support-format';

@Injectable({
  providedIn: 'root',
})
export class CompositeExportService {

  language: LanguageSupportFormat;
  documentation: JSON;

  constructor(l: LanguageSupportFormat, d: JSON) {
    this.language = l;
    this.documentation = d;
  }

  /// @func export(e)
  /// @desc Runs exportStub on any provided Exportable object.
  /// @arg {Exportable} e

  export(e: Exportable): string {
    return e.exportStub(this.language, this.documentation);
  }
  
}
