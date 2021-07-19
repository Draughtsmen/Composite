import { LanguageSupportFormat } from './language-support-format';

// An interface to enforce proper output for code templates
export interface Exportable {

  // Takes in language information and documentation and returns a string representing the code template
  exportStub: (lang: LanguageSupportFormat, doc: JSON) => string;
  
}
