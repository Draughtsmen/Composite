import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeClass extends Composite {
  private prefix: string;
  private postfix: string;
  private memberVariables: string[];

  constructor(name: string, before: string, after: string) {
    super(name, 'class');
    this.prefix = before;
    this.postfix = after;
    this.memberVariables = new Array<string>();
  }

  /// @func generateStub(lang, doc)
  /// @desc Generates Class stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(lang: LanguageSupportFormat, doc: DocumentSupportFormat): string {
    let stub = this.getFormat(lang, this.type);

    // Fills in the class stub if there is one to work off of.
    if (stub != undefined) {
      return stub.replace('$1', this.prefix + this.name + this.postfix);
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }
}
