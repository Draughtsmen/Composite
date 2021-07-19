import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';

export class CompositeGroup extends Composite {

  private composite: Composite[];

  constructor() {
    super();
    this.composite = new Array<Composite>();
  }

  /// @func exportStub(lang, doc)
  /// @desc Sequentially generates contained exportable objects' stubs and docs.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  exportStub(lang: LanguageSupportFormat, doc: JSON): string {
    let output: string = "";
    for(var i = 0; i < this.composite.length; ++i) {
      output += this.composite[i].exportStub(lang, doc) + "\n\n"; 
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
