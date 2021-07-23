import { Composite } from './composite';
import { CompositeGroup } from './composite-group';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeProject extends Composite {
  private files: CompositeGroup[];
  private lang: LanguageSupportFormat;
  private doc: DocumentSupportFormat;

  constructor(name: string, lang: LanguageSupportFormat, doc: DocumentSupportFormat) {
    super(name, 'project');
    this.files = new Array<CompositeGroup>();
    this.lang = lang;
    this.doc = doc;
  }

  /// @func generateStub(lang, doc)
  /// @desc Sequentially generates contained exportable objects' stubs and docs.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  generateStub(lang: LanguageSupportFormat, doc: JSON): string {
    let output: string = '';
    for (var i = 0; i < this.files.length; ++i) {
      output += this.files[i].generateStub(lang, doc) + '\n\n';
    }
    return output;
  }
}
