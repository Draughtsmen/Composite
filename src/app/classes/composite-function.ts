import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';

export class CompositeFunction extends Composite {
  private name:    string;
  private retType: string;
  private args:    string[];

  constructor(r: string, n: string, a:string[]) {
    super('function');
    this.retType = r;
    this.name = n;
    this.args = a;
  }

  /// @func generateStub(lang, doc)
  /// @desc Generates Function stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  generateStub(lang: LanguageSupportFormat, doc: JSON): string {
    let stub = this.getFormat(lang, this.type);

    // Fills in the function stub if there is one to work off of.
    if (stub != undefined) {
      stub = stub.replace("1", this.name);
      stub = stub.replace("2", this.args.join(', '));
      stub = stub.replace("3", this.retType);
      return stub;
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }
}
