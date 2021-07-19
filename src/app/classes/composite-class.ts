import { TokenType } from '@angular/compiler/src/ml_parser/lexer';
import { Exportable } from './exportable';
import { LanguageSupportFormat } from './language-support-format';

export class CompositeClass implements Exportable {

  private readonly term: string = 'class';
  private name: string;
  private prefix: string;
  private postfix: string;
  private memberVariables: string[];

  constructor(n: string, before: string, after: string) {
    this.name = n;
    this.prefix = before;
    this.postfix = after;
    this.memberVariables = new Array<string>();
  }

  /// @func exportStub(lang, doc)
  /// @desc Generates Class stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  exportStub(lang: LanguageSupportFormat, doc: JSON) {
    // Get the language formatting for classes in this language.
    let stub: string | undefined = lang.templates.find(
      (i) => i.name == this.term
    )?.format;

    // Ensure the language stub format exists, fail otherwise.
    if (stub != undefined)
      return stub.replace('$1', this.prefix + this.name + this.postfix);
    else
      return 'Critical failure: could not find type ' + this.term + '.';
  }

}
