import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeGroup extends Composite {
  private composite: Composite[];

  constructor(name: string, description: string) {
    super(name, description, 'group');
    this.composite = new Array<Composite>();
  }

  serialize(): any {
    let data: any = super.serialize();
    data['_type'] = 'CompositeGroup';
    data['composite'] = [];
    for (let i = 0; i < this.composite.length; i++) {
      data['composite'].push(this.composite[i].serialize());
    }
    return data;
  }

  /// @func generateStub(lang, doc)
  /// @desc Sequentially generates contained exportable objects' stubs and docs.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
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
      (item) => item.getName() == name
    );
    if (ExportableObject)
      this.composite.splice(this.composite.indexOf(ExportableObject), 1);
  }

  /// @func getExportableObject(name)
  /// @desc Returns the specified Composite object from the group.
  /// @arg {string} name

  getExportableObject(name: string): Composite | undefined {
    return this.composite.find((item) => item.getName() == name);
  }

  //todo: observable
  getDescendents(): Composite[] {
    return this.composite;
  }
}
