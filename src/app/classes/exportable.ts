import { LanguageSupportFormat } from './language-support-format';

// An interface to enforce proper output for various code templates.
export interface Exportable {

  /// @func exportStub(lang, doc)
  /// @desc Intended to generate code stubs and documentation.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  exportStub: (lang: LanguageSupportFormat, doc: JSON) => string;
  
}
