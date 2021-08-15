import { Composite } from './composite';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

/**
 * This class describes a composite group.
 *
 * @class CompositeGroup (name)
 */
export class CompositeGroup extends Composite {
  private composite: Composite[];

  constructor(name: string, description: string) {
    super(name, description, 'group');
    this.composite = new Array<Composite>();
  }

  /**
   * Serializes the CompositeGroup for external storage in JSON.
   *
   * @return {any} The JSON-serialized form of the CompositeGroup.
   */
  serialize(): any {
    let data: any = super.serialize();
    data['_type'] = 'CompositeGroup';
    data['composite'] = [];
    for (let i = 0; i < this.composite.length; i++) {
      data['composite'].push(this.composite[i].serialize());
    }
    return data;
  }

  /**
   * Generates the documentation and stub according to chosen templates.
   *
   * @param {LanguageSupportFormat} lang - The chosen programming language.
   * @param {DocumentSupportFormat} doc - The chosen documentation style.
   * @return {string} Group documentation and stub.
   */
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

  /**
   * Adds a Composite object.
   *
   * @param {Composite} obj - The object.
   */
  addCompositeObject(obj: Composite): void {
    this.composite.push(obj);
  }

  /**
   * Removes a Composite object.
   *
   * @param {string} name - The name of the object to remove.
   */
  removeCompositeObject(name: string): void {
    let CObject = this.composite.find((item) => item.getName() == name);
    if (CObject) this.composite.splice(this.composite.indexOf(CObject), 1);
  }

  /**
   * Gets the named Composite object.
   *
   * @param {string} name - The name of the object to get from the group.
   * @return {(Composite|undefined)} The Composite object.
   */
  getCompositeObject(name: string): Composite | undefined {
    return this.composite.find((item) => item.getName() == name);
  }

  //
  // todo: observable
  //
  // @return {Composite[]} The descendents.
  //
  getDescendents(): Composite[] {
    return this.composite;
  }

  /**
   * Sets the edit data for the relevant type
   * @param type - the specified type
   * @param data - the data for the type
   */
  setEditData(type: string, data: any) {
    switch (type) {
      //No relevant items for a group currently
    }
  }
}
