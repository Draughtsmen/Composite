import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeFunction extends Composite {
  private returnType: string;
  private args: string[];

  constructor(name: string, returnType: string, args: string[]) {
    super(name, 'function');
    this.returnType = returnType;
    this.args = args;
  }

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

  /// @func generateStub(lang, doc)
  /// @desc Generates Function stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    let docs = this.getDoc(doc);

    let docStub = docs.specs.find((i) => i.name == 'function')?.format;
    if (docStub != undefined) {
      docStub = docStub.replace('[name]', this.name);
      docStub = docStub.replace('[value]', this.args.join(', '));
      docStub += '\n';
      // todo: @description, @param
    } else {
      docStub = '';
    }
    // Fills in the function stub if there is one to work off of.
    let stub = this.getLangFormat(lang, this.type);
    if (stub != undefined) {
      stub = stub.replace('[return]', this.returnType);
      stub = stub.replace('[name]', this.name);
      stub = stub.replace('[value]', this.args.join(', '));
      // stub = stub.replace(
      //   '3',
      //   this.returnType == '' ? '' : ' ' + this.returnType
      // );
      return docStub + stub;
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }

  /// @func getArguments()
  /// @desc Returns the function's arguments.

  getArguments(): string[] {
    return this.args;
  }

  /// @func setArguments(newArgs)
  /// @desc Replaces the function's arguments with new ones.
  /// @arg {string[]} newArgs

  setArguments(newArgs: string[]): void {
    this.args = newArgs;
  }

  /// @func getReturnType()
  /// @desc Returns the function's return type.

  getReturnType(): string {
    return this.returnType;
  }

  /// @func setReturnType(newReturnType)
  /// @desc Sets a new function return type.
  /// @arg {string} newReturnType

  setReturnType(newReturnType: string): void {
    this.returnType = newReturnType;
  }
}
