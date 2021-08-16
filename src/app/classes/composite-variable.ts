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
  private value: string;

  constructor(
    name: string,
    description: string,
    variableType: string,
    value: string
  ) {
    super(name, description, 'variable');
    this.variableType = variableType;
    this.value = value;
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
    let docStub: string = '';

    // Get the documentation prefix if able.
    let prefix = doc.prefix;
    if (prefix == undefined) prefix = '';

    // Document the variable if able.
    let varStub = doc.specs.find((i) => i.name == 'variable')?.format;
    if (varStub != undefined) {
      varStub = varStub.replace('[name]', this.name);
      varStub = varStub.replace('[type]', this.variableType);
      varStub = varStub.replace('[value]', this.description);
      varStub += '\n';

      docStub += prefix + varStub;
    }

    // Fill in the variable stub if there is one to work off of.
    let stub = lang.types.find((i) => i.name == this.variableType)?.format;
    if (stub != undefined) {
      stub = stub.replace('[name]', this.name);
      stub = stub.replace('[value]', this.value);

      return docStub + stub;
    } else if (stub == undefined && docStub.length > 0) {
      return docStub;
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
    data['variableType'] = this.variableType;
    data['value'] = this.value;
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

  /**
   * Gets the value of the variable.
   *
   * @return {string} The value.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Sets the value of the variable.
   *
   * @param {string} newValue - The new value.
   */
  setValue(newValue: string): void {
    this.value = newValue;
  }

  /**
   * Removes a Composite object from this class.
   * @param composite - the Composite object to remove.
   */
  removeComposite(composite: Composite): void {
    return; //No Composite objects in this class.
  }

  /**
   * Gets the edit data for the relevant type.
   * @param lang - language support format
   * @returns the data for the relevant type
   */
  getEditData(lang: LanguageSupportFormat): any {
    let data = super.getEditData(lang);
    for (let i = 0; i < data.length; i++) {
      switch (data[i].id) {
        case 'type':
          data[i]['value'] = this.variableType;
          break;
        case 'enter':
          data[i]['value'] = this.value;
          break;
      }
    }
    return data;
  }

  /**
   * Sets the edit data for the relevant type
   * @param type - the specified type
   * @param data - the data for the type
   */
  setEditData(type: string, data: any) {
    switch (type) {
      case 'type':
        this.variableType = data;
        break;
      case 'enter':
        this.value = data;
        break;
    }
  }
}
