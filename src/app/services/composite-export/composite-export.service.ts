import { Injectable } from '@angular/core';
import { DocumentSupportFormat } from 'src/app/classes/document-support-format';
import { Composite } from '../../classes/composite';
import { LanguageSupportFormat } from '../../classes/language-support-format';

@Injectable({
  providedIn: 'root',
})
export class CompositeExportService {
  public language: LanguageSupportFormat;
  public documentation: DocumentSupportFormat;

  constructor(l: LanguageSupportFormat, d: DocumentSupportFormat) {
    this.language = l;
    this.documentation = d;
  }

  /// @func export(compositeObj)
  /// @desc Runs exportStub on any provided Composite object.
  /// @arg {Composite} compositeObj

  export(compositeObj: Composite): string {
    return compositeObj.generateStub(this.language, this.documentation);
  }
}
