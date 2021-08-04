import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

/**
 * This abstract class describes a Composite object.
 *
 * @class Composite (name)
 */
export abstract class Composite {
  protected readonly type: string;
  protected name: string;
  protected description: string;

  constructor(name: string, description: string, type: string) {
    this.name = name;
    this.description = description;
    this.type = type;
  }

  /**
   * Generates the documentation and stub according to chosen templates.
   *
   * @param {LanguageSupportFormat} lang - The chosen programming language.
   * @param {DocumentSupportFormat} doc - The chosen documentation style.
   * @return {string} A Composite object's documentation and stub.
   */
  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    return 'ERROR: exportStub() NOT OVERRIDDEN.';
  }

  /**
   * Gets the language format.
   *
   * @param {LanguageSupportFormat} lang - The language format.
   * @param {string} type - The type to find in the language format.
   * @return {(string|undefined)} A template stub if one exists.
   */
  getLangFormat(lang: LanguageSupportFormat, type: string): string | undefined {
    return lang.templates.find((i) => i.name == type)?.format;
  }

  /**
   * Gets the documentation format.
   *
   * @param {DocumentSupportFormat} doc - The document?
   * @return {DocumentSupportFormat} The documentation format.
   */
  getDoc(doc: DocumentSupportFormat): DocumentSupportFormat {
    return doc;
  }

  /**
   * Gets the name.
   *
   * @return {string} The name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name.
   *
   * @param {string} newName - The new name.
   */
  setName(newName: string): void {
    this.name = newName;
  }

  /**
   * Gets the description.
   *
   * @return {string} The description.
   */
  getDescription(): string {
    return this.description;
  }

  /**
   * Sets the description.
   *
   * @param {string} newDescription - The new description.
   */
  setDescription(newDescription: string): void {
    this.description = newDescription;
  }

  /**
   * Gets the descendents.
   *
   * @return {Array<Composite>} The descendents.
   */
  getDescendents(): Array<Composite> {
    return [];
  }

  /**
   * Serializes the Composite object for external storage in JSON.
   *
   * @return {any} The JSON-serialized form of the Composite object.
   */
  serialize(): any {
    let data: any = {};
    data['_type'] = 'Composite';
    data['name'] = this.name;
    data['description'] = this.description;
    data['type'] = this.type;
    return data;
  }
}
