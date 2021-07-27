import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export abstract class Composite {
  protected readonly type: string;
  protected name: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  /// @func generateStub(lang, doc)
  /// @desc Generates a Composite type's code stub and documentation.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    return 'ERROR: exportStub() NOT OVERRIDDEN.';
  }

  /// @func getFormat(lang, type)
  /// @desc Utility function to return a template stub if one exists.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {String} type

  getFormat(lang: LanguageSupportFormat, type: string): string | undefined {
    return lang.templates.find((i) => i.name == type)?.format;
  }

  /// @func getName()
  /// @desc Returns the project name.

  getName(): string {
    return this.name;
  }

  /// @func setName(newName)
  /// @desc Sets a new name for the component.
  /// @arg {string} newName

  setName(newName: string): void {
    this.name = newName;
  }

  getDescendents(): Array<Composite> {
    return [];
  }

  serialize(): any {
    let data: any = {};
    data["_type"] = "Composite";
    data["name"] = this.name;
    data["type"] = this.type;
    return data;
  };
}
