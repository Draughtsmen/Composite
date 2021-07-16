import { LanguageSupportFormat } from './language-support-format';

export interface Exportable {
  //heading: string;
  exportStub: (lang: LanguageSupportFormat, doc: JSON) => string;
}
