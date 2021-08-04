import { Injectable } from '@angular/core';
import { DocumentSupportFormat } from 'src/app/classes/document-support-format';
import { Composite } from '../../classes/composite';
import { LanguageSupportFormat } from '../../classes/language-support-format';

/**
 * This class describes the Composite Export Service.
 *
 * @class CompositeExportService (name)
 */
@Injectable({
  providedIn: 'root',
})
export class CompositeExportService {
  public language: LanguageSupportFormat;
  public documentation: DocumentSupportFormat;

  /**
   * Constructs a new instance.
   *
   * @param {LanguageSupportFormat} l - The programming language.
   * @param {DocumentSupportFormat} d - The documentation style.
   */
  constructor(l: LanguageSupportFormat, d: DocumentSupportFormat) {
    this.language = l;
    this.documentation = d;
  }

  /**
   * Generates and returns the stubs of any provided Composite object.
   *
   * @param {Composite} compositeObj - The Composite object to generate from.
   * @return {string} The documentation and stub of the Composite object.
   */
  export(compositeObj: Composite): string {
    return compositeObj.generateStub(this.language, this.documentation);
  }
}
