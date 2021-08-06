import { Composite } from './composite';
import { CompositeGroup } from './composite-group';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

/**
 * This class describes a composite project.
 *
 * @class CompositeProject (name)
 */
export class CompositeProject {
  private name: string;
  public files: CompositeGroup[];
  public lang: LanguageSupportFormat;
  public doc: DocumentSupportFormat;

  /**
   * Constructs a new instance.
   *
   * @param {string} name - The name of the project.
   * @param {LanguageSupportFormat} lang - The chosen programming language.
   * @param {DocumentSupportFormat} doc - The chosen documentation style.
   */
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

  /**
   * Generates all of the project's stubs in order.
   *
   * @return {string} All code stubs and documentation in the project.
   */
  exportProject(): string {
    let output: string = '';
    for (var i = 0; i < this.files.length; ++i) {
      output +=
        "/* Start of file '" +
        this.files[i].getName() +
        "' */\n\n" +
        this.files[i].generateStub(this.lang, this.doc);
    }
    return output;
  }

  /**
   * Adds a CompositeGroup to the project.
   *
   * @param {CompositeGroup} obj - The CompositeGroup to add.
   */
  addGroup(obj: CompositeGroup): void {
    this.files.push(obj);
  }

  /**
   * Removes the named CompositeGroup from the project.
   *
   * @param {string} name - The name of the group to remove.
   */
  removeGroup(name: string): void {
    let group = this.files.find((item) => item.getName() == name);
    if (group) this.files.splice(this.files.indexOf(group), 1);
  }

  /**
   * Gets the named group from the project.
   *
   * @param {string} name - The name of the group to get.
   * @return {(CompositeGroup|undefined)} The group from the project.
   */
  getGroup(name: string): CompositeGroup | undefined {
    return this.files.find((item) => item.getName() == name);
  }

  /**
   * Gets the project name.
   *
   * @return {string} The project name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the project name.
   *
   * @param {string} newName - The new project name.
   */
  setName(newName: string) {
    this.name = newName;
  }

  /**
   * Serializes the Composite Project for external storage in JSON.
   *
   * @return {any} The JSON-serialized form of the Composite Project.
   */
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
