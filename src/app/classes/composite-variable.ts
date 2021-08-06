import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

/**
 * This class describes a composite variable.
 *
 * @class CompositeVariable (name)
 */
export class CompositeVariable extends Composite {
  private variableType: string;

  constructor(
    name: string,
    description: string,
    variableType: string
  ) {
    super(name, description, 'variable');
    this.variableType = variableType;
  }

  /**
   * Generates the documentation and stub according to chosen templates.
   *
   * @param {LanguageSupportFormat} lang - The chosen programming language.
   * @param {DocumentSupportFormat} doc - The chosen documentation style.
   * @return {string} Variable documentation and stub.
   */
  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    let docs = this.getDoc(doc);
    let docStub: string = '';

    // Fill in the variable stub if there is one to work off of.
    let stub = this.getLangFormat(lang, this.type);
    if (stub != undefined) {
      return docStub + '\n' + stub;
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }

  /**
   * Serializes the CompositeVariable for external storage in JSON.
   *
   * @return {any} The JSON-serialized form of the CompositeVariable.
   */
  serialize(): any {
    let data: any = super.serialize();
    data['_type'] = 'CompositeVariable';
    return data;
  }

  /**
   * Gets the variable type.
   *
   * @return {string} The variable type.
   */
  getVariableType(): string {
    return this.variableType;
  }

  /**
   * Sets the variable type.
   *
   * @param {string} newVariableType - The new variable type.
   */
  setReturnType(newVariableType: string): void {
    this.variableType = newVariableType;
  }
}
