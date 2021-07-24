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

  /// @func generateStub(lang, doc)
  /// @desc Generates Function stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(lang: LanguageSupportFormat, doc: DocumentSupportFormat): string {
    let stub = this.getFormat(lang, this.type);

    // Fills in the function stub if there is one to work off of.
    if (stub != undefined) {
      stub = stub.replace('1', this.name);
      stub = stub.replace('2', this.args.join(', '));
      stub = stub.replace('3', this.returnType);
      return stub;
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
