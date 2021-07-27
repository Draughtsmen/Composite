import { Composite } from './composite';
import { CompositeFunction } from './composite-function';
import { LanguageSupportFormat } from './language-support-format';
import { DocumentSupportFormat } from './document-support-format';

export class CompositeClass extends Composite {
  private prefix: string;
  private postfix: string;
  private memberVariables: string[];
  private memberFunctions: CompositeFunction[];
  private subclasses: CompositeClass[];

  constructor(pre: string, name: string, post: string) {
    super(name, 'class');
    this.prefix = pre;
    this.postfix = post;
    this.memberVariables = new Array<string>();
    this.memberFunctions = new Array<CompositeFunction>();
    this.subclasses = new Array<CompositeClass>();
  }

  serialize(): any {
    let data: any = super.serialize();
    data["_type"] = "CompositeClass";

    data["prefix"] = this.prefix;
    data["postfix"] = this.postfix;
    data["memberVariables"] = [];
    data["memberFunctions"] = [];
    data["subclasses"] = [];
    for (let i = 0; i < this.memberVariables.length; i++) {
      data["memberVariables"].push(this.memberVariables[i]);
    }
    for (let i = 0; i < this.memberFunctions.length; i++) {
      data["memberFunctions"].push(this.memberFunctions[i].serialize());
    }
    for (let i = 0; i < this.subclasses.length; i++) {
      data["subclasses"].push(this.subclasses[i].serialize());
    }
    return data;
  }

  /// @func generateStub(lang, doc)
  /// @desc Generates Class stub and documentation in a provided language.
  /// @arg {LanguageSupportFormat} lang
  /// @arg {DocumentSupportFormat} doc

  generateStub(
    lang: LanguageSupportFormat,
    doc: DocumentSupportFormat
  ): string {
    let stub = this.getFormat(lang, this.type);

    // Fills in the class stub if there is one to work off of.
    if (stub != undefined) {
      return stub.replace('$1', this.prefix + this.name + this.postfix);
    } else return 'Critical failure: could not find type ' + this.type + '.';
  }

  /// @func getPrefix()
  /// @desc Returns the class prefix.

  getPrefix(): string {
    return this.prefix;
  }

  /// @func setPrefix(newPrefix)
  /// @desc Sets a new prefix for the class.
  /// @arg {string} newPrefix

  setPrefix(newPrefix: string): void {
    this.name = newPrefix;
  }

  /// @func getPostfix()
  /// @desc Returns the class postfix.

  getPostfix(): string {
    return this.prefix;
  }

  /// @func setPostfix(newPostfix)
  /// @desc Sets a new postfix for the class.
  /// @arg {string} newPostfix

  setPostfix(newPostfix: string): void {
    this.name = newPostfix;
  }

  /// @func getMemberVariables()
  /// @desc Returns the class's member variables.

  getMemberVariables(): string[] {
    return this.memberVariables;
  }

  /// @func addMemberVariable(variable)
  /// @desc Adds a new member variable to the class.
  /// @arg {string} variable

  addMemberVariable(variable: string): void {
    this.memberVariables.push(variable);
  }

  /// @func removeMemberVariable(variable)
  /// @desc Removes a member variable from the class.
  /// @arg {string} variable

  removeMemberVariable(variable: string): void {
    let memVar = this.memberVariables.find((item) => item == variable);
    if (memVar)
      this.memberVariables.splice(this.memberVariables.indexOf(memVar), 1);
  }

  /// @func modifyMemberVariable(variable, newVariable)
  /// @desc Exchanges one member variable for another.
  /// @arg {string} variable
  /// @arg {string} newVariable

  modifyMemberVariable(variable: string, newVariable: string): void {
    let oldVar = this.memberVariables.find((item) => item == variable);
    if (oldVar)
      this.memberVariables[this.memberVariables.indexOf(oldVar)] = newVariable;
  }

  /// @func getMemberFunctions()
  /// @desc Returns the class's member functions.

  getMemberFunctions(): CompositeFunction[] {
    return this.memberFunctions;
  }

  /// @func addMemberFunction(func)
  /// @desc Adds a new member function to the class.
  /// @arg {CompositeFunction} func

  addMemberFunction(func: CompositeFunction): void {
    this.memberFunctions.push(func);
  }

  /// @func removeMemberFunction(name)
  /// @desc Removes a member function from the class.
  /// @arg {string} name

  removeMemberFunction(name: string): void {
    let memFunc = this.memberFunctions.find((item) => item.getName() == name);
    if (memFunc)
      this.memberFunctions.splice(this.memberFunctions.indexOf(memFunc), 1);
  }

  /// @func modifyMemberFunction(name, newName, newArgs, newReturnType)
  /// @desc Modifies the function's information.
  /// @arg {string} name
  /// @arg {string} newName
  /// @arg {string[]} newArgs
  /// @arg {string} newReturnType

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

  /// @func getSubclasses()
  /// @desc Returns this class's subclasses.

  getSubclasses(): CompositeClass[] {
    return this.subclasses;
  }

  /// @func assignSubclass(CClass)
  /// @desc Assigns a subclass to this class.
  /// @arg {CompositeClass} CClass

  assignSubclass(CClass: CompositeClass): void {
    this.subclasses.push(CClass);
  }

  /// @func removeSubclass(name)
  /// @desc Removes a subclass from the class.
  /// @arg {string} name

  removeSubclass(name: string): void {
    let subclass = this.subclasses.find((item) => item.getName() == name);
    if (subclass) this.subclasses.splice(this.subclasses.indexOf(subclass), 1);
  }

  /// @func replaceSubclass(name, newCClass)
  /// @desc Replaces the named subclass with the new one.
  /// @arg {string} name
  /// @arg {CompositeClass} newCClass

  replaceSubclass(name: string, newCClass: CompositeClass): void {
    let oldSubclass = this.subclasses.find((item) => item.getName() == name);
    if (oldSubclass)
      this.subclasses[this.subclasses.indexOf(oldSubclass)] = newCClass;
  }

  getDescendents(): Composite[] {
    return (<Composite[]> this.subclasses).concat(this.memberFunctions);
  }
}
