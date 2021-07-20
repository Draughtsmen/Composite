import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';

export class CompositeClass extends Composite {
  private name: string;
  private prefix: string;
  private postfix: string;
  private memberVariables: string[];

  constructor(n: string, before: string, after: string) {
    super('class');
    this.name = n;
    this.prefix = before;
    this.postfix = after;
    this.memberVariables = new Array<string>();
  }

  /// @func generateStub(lang, doc)
  /// @desc Generates Class stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  generateStub(lang: LanguageSupportFormat, doc: JSON): string {
    let stub = this.getFormat(lang, this.type);

    // Fills in the class stub if there is one to work off of.
    if (stub != undefined) {
      return stub.replace('$1', this.prefix + this.name + this.postfix);
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }
}