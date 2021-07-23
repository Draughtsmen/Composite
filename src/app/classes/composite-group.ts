import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';

export class CompositeGroup extends Composite {
  private composite: Composite[];

  constructor(name: string) {
    super(name, 'group');
    this.composite = new Array<Composite>();
  }

  /// @func generateStub(lang, doc)
  /// @desc Sequentially generates contained exportable objects' stubs and docs.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  generateStub(lang: LanguageSupportFormat, doc: JSON): string {
    let output: string = '';
    for (var i = 0; i < this.composite.length; ++i) {
      output += this.composite[i].generateStub(lang, doc) + '\n\n';
    }
    return output;
  }

  /// @func addExportableObject(obj)
  /// @desc Adds an object for the group to track.
  /// @arg {Exportable} obj

  addExportableObject(obj: Composite) {
    this.composite.push(obj);
  }
}
