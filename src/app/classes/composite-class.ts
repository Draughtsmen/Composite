import { Composite } from './composite';
import { CompositeFunction } from './composite-function';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

/**
 * This class describes a composite class.
 *
 * @class CompositeClass (name)
 */
export class CompositeClass extends Composite {
  private prefix: string;
  private postfix: string;
  private memberVariables: string[];
  private memberFunctions: CompositeFunction[];
  private subclasses: CompositeClass[];

  // TODO: Incorporate with CompoisteVariable.
  constructor(pre: string, name: string, post: string, description: string) {
    super(name, description, 'class');
    this.prefix = pre;
    this.postfix = post;
    this.memberVariables = new Array<string>();
    this.memberFunctions = new Array<CompositeFunction>();
    this.subclasses = new Array<CompositeClass>();
  }

  /**
   * Serializes the CompositeClass for external storage in JSON.
   *
   * @return {any} The JSON-serialized form of the CompositeClass.
   */
  serialize(): any {
    let data: any = super.serialize();
    data['_type'] = 'CompositeClass';

    data['prefix'] = this.prefix;
    data['postfix'] = this.postfix;
    data['memberVariables'] = [];
    data['memberFunctions'] = [];
    data['subclasses'] = [];
    for (let i = 0; i < this.memberVariables.length; i++) {
      data['memberVariables'].push(this.memberVariables[i]);
    }
    for (let i = 0; i < this.memberFunctions.length; i++) {
      data['memberFunctions'].push(this.memberFunctions[i].serialize());
    }
    for (let i = 0; i < this.subclasses.length; i++) {
      data['subclasses'].push(this.subclasses[i].serialize());
    }
    return data;
  }

  /**
   * Generates the documentation and stub according to chosen templates.
   *
   * @param {LanguageSupportFormat} lang - The chosen programming language.
   * @param {DocumentSupportFormat} doc - The chosen documentation style.
   * @return {string} Class documentation and stub.
   */
  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    let stub = this.getLangFormat(lang, this.type);

    // Fills in the class stub if there is one to work off of.
    if (stub != undefined) {
      stub = stub.replace('[name]', this.name);
      return stub;
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }

  /**
   * Gets the prefix.
   *
   * @return {string} The prefix.
   */
  getPrefix(): string {
    return this.prefix;
  }

  /**
   * Sets the prefix.
   *
   * @param {string} newPrefix - The new prefix.
   */
  setPrefix(newPrefix: string): void {
    this.name = newPrefix;
  }

  /**
   * Gets the postfix.
   *
   * @return {string} The postfix.
   */
  getPostfix(): string {
    return this.prefix;
  }

  /**
   * Sets the postfix.
   *
   * @param {string} newPostfix - The new postfix.
   */
  setPostfix(newPostfix: string): void {
    this.name = newPostfix;
  }

  /**
   * Gets the member variables.
   *
   * @return {string[]} The member variables.
   */
  getMemberVariables(): string[] {
    return this.memberVariables;
  }

  /**
   * Adds a member variable.
   *
   * @param {string} variable - The variable.
   */
  addMemberVariable(variable: string): void {
    this.memberVariables.push(variable);
  }

  /**
   * Removes the specified member variable.
   *
   * @param {string} variable -  The variable.
   */
  removeMemberVariable(variable: string): void {
    let memVar = this.memberVariables.find((item) => item == variable);
    if (memVar)
      this.memberVariables.splice(this.memberVariables.indexOf(memVar), 1);
  }

  /**
   * Replaces one member variable with another.
   *
   * @param {string} variable - The variable to replace.
   * @param {string} newVariable The new variable to insert.
   */
  modifyMemberVariable(variable: string, newVariable: string): void {
    let oldVar = this.memberVariables.find((item) => item == variable);
    if (oldVar)
      this.memberVariables[this.memberVariables.indexOf(oldVar)] = newVariable;
  }

  /**
   * Gets the member functions.
   *
   * @return {CompositeFunction[]} The member functions.
   */
  getMemberFunctions(): CompositeFunction[] {
    return this.memberFunctions;
  }

  /**
   * Adds a member function.
   *
   * @param {CompositeFunction} func - The member function to add.
   */
  addMemberFunction(func: CompositeFunction): void {
    this.memberFunctions.push(func);
  }

  /**
   * Removes a member function.
   *
   * @param {string} name - The name of the member function to remove.
   */
  removeMemberFunction(name: string): void {
    let memFunc = this.memberFunctions.find((item) => item.getName() == name);
    if (memFunc)
      this.memberFunctions.splice(this.memberFunctions.indexOf(memFunc), 1);
  }

  /**
   * Modifies all of a chosen class function's information.
   *
   * @param {string} name - The name of the function to modify.
   * @param {string} newName - The new function name.
   * @param {string[]} newArgs - The new function arguments.
   * @param {string} newReturnType - The new function return type.
   */
  modifyMemberFunction(
    name: string,
    newName: string,
    newArgs: string[],
    newReturnType: string
  ): void {
    let func = this.memberFunctions.find((item) => item.getName() == name);
    if (func) {
      func.setName(newName);
      func.setArguments(newArgs);
      func.setReturnType(newReturnType);
    }
  }

  /**
   * Gets the subclasses.
   *
   * @return {CompositeClass[]} The subclasses.
   */
  getSubclasses(): CompositeClass[] {
    return this.subclasses;
  }

  /**
   * Assigns a subclass to this class.
   *
   * @param {CompositeClass} CClass - The CompositeClass to register a subclass.
   */
  assignSubclass(CClass: CompositeClass): void {
    this.subclasses.push(CClass);
  }

  /**
   * Removes a subclass.
   *
   * @param {string} name - The name of the subclass to de-register.
   */
  removeSubclass(name: string): void {
    let subclass = this.subclasses.find((item) => item.getName() == name);
    if (subclass) this.subclasses.splice(this.subclasses.indexOf(subclass), 1);
  }

  /**
   * Replaces the named subclass with a new one.
   *
   * @param {string} name - The name of the subclass to replace.
   * @param {CompositeClass} newCClass - The new CompositeClass to insert.
   */
  replaceSubclass(name: string, newCClass: CompositeClass): void {
    let oldSubclass = this.subclasses.find((item) => item.getName() == name);
    if (oldSubclass)
      this.subclasses[this.subclasses.indexOf(oldSubclass)] = newCClass;
  }

  /**
   * Gets the descendents.
   *
   * @return {Composite[]} The descendents.
   */
  getDescendents(): Composite[] {
    return (<Composite[]>this.subclasses).concat(this.memberFunctions);
  }
}
