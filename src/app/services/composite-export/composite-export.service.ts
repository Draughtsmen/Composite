import { Injectable } from '@angular/core';
import { Composite } from '../../classes/composite';
import { LanguageSupportFormat } from '../../classes/language-support-format';

@Injectable({
  providedIn: 'root',
})
export class CompositeExportService {
  public language: LanguageSupportFormat;
  public documentation: JSON;

  constructor(l: LanguageSupportFormat, d: JSON) {
    this.language = l;
    this.documentation = d;
  }

  /// @func export(compositeObj)
  /// @desc Runs exportStub on any provided Composite object.
  /// @arg {Composite} compositeObj

  export(compositeObj: Composite): string {
    return compositeObj.exportStub(this.language, this.documentation);
  }
}
