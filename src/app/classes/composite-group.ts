import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeExportableObject extends Composite {
  private composite: Composite[];

  constructor(name: string) {
    super(name, 'ExportableObject');
    this.composite = new Array<Composite>();
  }

  /// @func generateStub(lang, doc)
  /// @desc Sequentially generates contained exportable objects' stubs and docs.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(lang: LanguageSupportFormat, doc: DocumentSupportFormat): string {
    let output: string = '';
    for (var i = 0; i < this.composite.length; ++i) {
      output += this.composite[i].generateStub(lang, doc) + '\n\n';
    }
    return output;
  }

  /// @func addExportableObject(obj)
  /// @desc Adds a new Composite object to track.
  /// @arg {CompositeExportableObject} obj

  addExportableObject(obj: Composite): void {
    this.composite.push(obj);
  }

  /// @func removeExportableObject(name)
  /// @desc Removes a Composite object from the group.
  /// @arg {string} name

  removeExportableObject(name: string): void {
    let ExportableObject = this.composite.find(
      item => item.getName() == name
    );
    if(ExportableObject)
      this.composite.splice(this.composite.indexOf(ExportableObject), 1);
  }

  /// @func getExportableObject(name)
  /// @desc Returns the specified Composite object from the group.
  /// @arg {string} name

  getExportableObject(name: string): Composite | undefined {
    return this.composite.find(item => item.getName() == name);
  }

}
