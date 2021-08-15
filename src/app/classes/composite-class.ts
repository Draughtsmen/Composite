import { Composite } from './composite';
import { CompositeFunction } from './composite-function';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';
import { CompositeVariable } from './composite-variable';

/**
 * This class describes a composite class.
 *
 * @class CompositeClass (name)
 */
export class CompositeClass extends Composite {
  private modifier: string;
  private baseClass: string;
  private memberVariables: CompositeVariable[];
  private memberFunctions: CompositeFunction[];
  private subclasses: CompositeClass[];

  // TODO: Incorporate with CompoisteVariable.
  constructor(mod: string, name: string, base: string, description: string) {
    super(name, description, 'class');
    this.modifier = mod;
    this.baseClass = base;
    this.memberVariables = new Array<CompositeVariable>();
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

    data['prefix'] = this.modifier;
    data['postfix'] = this.baseClass;
    data['memberVariables'] = [];
    data['memberFunctions'] = [];
    data['subclasses'] = [];
    for (let i = 0; i < this.memberVariables.length; i++) {
      data['memberVariables'].push(this.memberVariables[i].serialize());
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
      stub = stub.replace('[modifier]', this.modifier);
      if (this.baseClass == '') {
        stub =
          stub.substring(0, stub.indexOf('[begin]')) +
          stub.substring(stub.indexOf('[end]') + 5, stub.length);
      } else {
        stub = stub.replace('[base]', this.baseClass);
        stub = stub.replace('[begin]', '');
        stub = stub.replace('[end]', '');
      }

      // Get the internals of the function (variables + functions)
      let internal: string = '';
      this.getMemberVariables().forEach((element) => {
        internal += '\n' + element.generateStub(lang, doc) + '\n';
      });
      this.getMemberFunctions().forEach((element) => {
        internal += '\n' + element.generateStub(lang, doc) + '\n';
      });
      // THIS INDENTATION IS HARD-CODED, SHOULD CHANGE BASED ON DOC
      internal = '\t' + internal;
      internal = internal.replaceAll('\n', '\n\t');
      stub = stub.replace('# #', internal);

      // Display subclasses
      this.getSubclasses().forEach((element) => {
        stub += '\n' + element.generateStub(lang, doc) + '\n';
      });
      return stub;
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }

  /**
   * Gets the prefix.
   *
   * @return {string} The prefix.
   */
  getModifier(): string {
    return this.modifier;
  }

  /**
   * Sets the prefix.
   *
   * @param {string} newPrefix - The new prefix.
   */
  setModifier(newPrefix: string): void {
    this.modifier = newPrefix;
  }

  /**
   * Gets the postfix.
   *
   * @return {string} The postfix.
   */
  getBaseClass(): string {
    return this.baseClass;
  }

  /**
   * Sets the postfix.
   *
   * @param {string} newPostfix - The new postfix.
   */
  setBaseClass(newPostfix: string): void {
    this.baseClass = newPostfix;
  }

  /**
   * Gets the member variables.
   *
   * @return {CompositeVariable[]} The member variables.
   */
  getMemberVariables(): CompositeVariable[] {
    return this.memberVariables;
  }

  /**
   * Adds a member variable.
   *
   * @param {CompositeVariable} variable - The variable.
   */
  addMemberVariable(variable: CompositeVariable): void {
    this.memberVariables.push(variable);
  }

  /**
   * Removes the specified member variable.
   *
   * @param {CompositeVariable} variable -  The variable.
   */
  removeMemberVariable(variable: CompositeVariable): void {
    let memVar = this.memberVariables.find((item) => item == variable);
    if (memVar)
      this.memberVariables.splice(this.memberVariables.indexOf(memVar), 1);
  }

  /**
   * Replaces one member variable with another.
   *
   * @param {CompositeVariable} variable - The variable to replace.
   * @param {CompositeVariable} newVariable The new variable to insert.
   */
  modifyMemberVariable(
    variable: CompositeVariable,
    newVariable: CompositeVariable
  ): void {
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
    return (<Composite[]>this.subclasses)
      .concat(this.memberFunctions)
      .concat(this.memberVariables);
  }

  /**
   * Gets the edit data for the relevant type.
   * @param lang - language support format
   * @returns the data for the relevant type
   */
  getEditData(lang: LanguageSupportFormat): any {
    let data = super.getEditData(lang);
    for(let i = 0; i < data.length; i++) {
      switch (data[i].id) {
        case "modifier":
          data[i]["value"] = this.modifier;
          break;
      }
    }
    return data;
  }

  /**
   * Sets the edit data for the relevant type
   * @param type - the specified type
   * @param data - the data for the type
   */
  setEditData(type: string, data: any) {
    switch (type) {
      case "modifier":
        this.modifier = data;
        break;
    }
  }
}
