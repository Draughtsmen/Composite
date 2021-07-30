import { Composite } from './composite';
import { CompositeGroup } from './composite-group';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeProject {
  private name: string;
  public files: CompositeGroup[];
  public lang: LanguageSupportFormat;
  public doc: DocumentSupportFormat;

  constructor(
    name: string,
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ) {
    this.files = new Array<CompositeGroup>();
    this.name = name;
    this.lang = lang;
    this.doc = doc;
  }

  /// @func exportProject(lang, doc)
  /// @desc Exports the whole project.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {JSON} doc

  exportProject(): string {
    let output: string = '';
    for (var i = 0; i < this.files.length; ++i) {
      output +=
        "//Start of file '" +
        this.files[i].getName() +
        "'\n" +
        this.files[i].generateStub(this.lang, this.doc);
    }
    return output;
  }

  /// @func addGroup(obj)
  /// @desc Adds a new CompositeGroup to track.
  /// @arg {CompositeGroup} obj

  addGroup(obj: CompositeGroup): void {
    this.files.push(obj);
  }

  /// @func removeGroup(name)
  /// @desc Removes a CompositeGroup from the project.
  /// @arg {string} name

  removeGroup(name: string): void {
    let group = this.files.find((item) => item.getName() == name);
    if (group) this.files.splice(this.files.indexOf(group), 1);
  }

  /// @func getGroup(name)
  /// @desc Returns the specified CompositeGroup in the project.
  /// @arg {string} name

  getGroup(name: string): CompositeGroup | undefined {
    return this.files.find((item) => item.getName() == name);
  }

  /// @func getName()
  /// @desc Returns the project name.

  getName(): string {
    return this.name;
  }

  /// @func setName(newName)
  /// @desc Sets a new project name.
  /// @arg {string} newName

  setName(newName: string) {
    this.name = newName;
  }

  serialize(): any {
    let data: any = {};
    data['_type'] = 'CompositeProject';

    data['name'] = this.name;
    data['files'] = [];

    for (let i = 0; i < this.files.length; i++) {
      data['files'].push(this.files[i].serialize());
    }
    return data;
  }
}
