import { Exportable } from './exportable';

export class CompositeClass implements Exportable {
  private name: string;

  constructor(n: string) {
    this.name = n;
    console.log('Something is happening ahhh');
  }

  exportStub(lang: JSON, doc: JSON) {
    return 'a';
  }
}
