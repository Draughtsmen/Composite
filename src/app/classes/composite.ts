import { LanguageSupportFormat } from './language-support-format';

export abstract class Composite {
  protected readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  /// @func generateStub(lang, doc)
  /// @desc Generates a Composite type's code stub and documentation.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  generateStub(lang: LanguageSupportFormat, doc: JSON): string {
    return 'ERROR: exportStub() NOT OVERRIDDEN.';
  }

  /// @func getFormat(lang, type)
  /// @desc Utility function to return a template stub if one exists.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {String} type

  getFormat(lang: LanguageSupportFormat, type: string): string | undefined {
    return lang.templates.find((i) => i.name == type)?.format;
  }
}
