import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

/**
 * This class describes a composite function.
 *
 * @class CompositeFunction (name)
 */
export class CompositeFunction extends Composite {
  private returnType: string;
  private args: string[];

  constructor(
    name: string,
    description: string,
    returnType: string,
    args: string[]
  ) {
    super(name, description, 'function');
    this.returnType = returnType;
    this.args = args;
  }

  /**
   * Serializes the CompositeFunction for external storage in JSON.
   *
   * @return {any} The JSON-serialized form of the CompositeFunction.
   */
  serialize(): any {
    let data: any = super.serialize();
    data['_type'] = 'CompositeFunction';
    data['returnType'] = this.returnType;
    data['args'] = [];
    for (let i = 0; i < this.args.length; i++) {
      data['args'].push(this.args[i]);
    }
    return data;
  }

  /**
   * Generates the documentation and stub according to chosen templates.
   *
   * @param {LanguageSupportFormat} lang - The chosen programming language.
   * @param {DocumentSupportFormat} doc - The chosen documentation style.
   * @return {string} Function documentation and stub.
   */
  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    let docs = this.getDoc(doc);
    let docStub: string = '';

    // Get the documentation prefix if able.
    let prefix = docs.prefix;
    if (prefix == undefined) prefix = '';

    // Document the function outline if able.
    let functStub = docs.specs.find((i) => i.name == 'function')?.format;
    if (functStub != undefined) {
      functStub = functStub.replace('[name]', this.name);
      functStub = functStub.replace('[value]', this.args.join(', '));
      functStub += '\n';

      docStub += prefix + functStub;
    }

    // Document the function description if able.
    let descStub = docs.specs.find((i) => i.name == 'description')?.format;
    if (descStub != undefined) {
      descStub = descStub.replace('[value]', this.description);
      descStub += '\n';

      docStub += prefix + descStub;
    }

    // Document the function parameters if able.
    // TODO: Integrate with CompositeVariable.
    let paramStub = docs.specs.find((i) => i.name == 'parameter')?.format;
    if (paramStub != undefined) {
      let reversion = paramStub;
      for (var index = 0; index < this.args.length; index++) {
        let param = this.args[index];
        paramStub = paramStub.replace('[name]', this.args[index]);
        paramStub += '\n';

        docStub += prefix + paramStub;
        paramStub = reversion;
      }
    }

    // Fill in the function stub if there is one to work off of.
    let stub = this.getLangFormat(lang, this.type);
    if (stub != undefined) {
      stub = stub.replaceAll('[return]', this.returnType);
      stub = stub.replace('[name]', this.name);
      stub = stub.replace('[value]', this.args.join(', '));

      return docStub + '\n' + stub;
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }

  /**
   * Gets the arguments.
   *
   * @return {string[]} The arguments.
   */
  getArguments(): string[] {
    return this.args;
  }

  /**
   * Sets the arguments.
   *
   * @param {string[]} newArgs - The new arguments.
   */
  setArguments(newArgs: string[]): void {
    this.args = newArgs;
  }

  /**
   * Gets the return type.
   *
   * @return {string} The return type.
   */
  getReturnType(): string {
    return this.returnType;
  }

  /**
   * Sets the return type.
   *
   * @param {string} newReturnType - The new return type.
   */
  setReturnType(newReturnType: string): void {
    this.returnType = newReturnType;
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
          data[i]['value'] = this.returnType;
          break;
        case 'arguments':
          data[i]['value'] = this.args;
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
        this.returnType = data;
        break;
      case 'arguments':
        this.args = data;
        break;
    }
  }
}
