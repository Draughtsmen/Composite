import { CompositeClass } from './composite-class.ts';

export class FunctionGenerate implements Exportable {
  private name:    string;
  private args:    string[];
  private retType: string;

  constructor(r: string, n: string, a:string[]) {
    this.retType = r;
    this.name    = n;
    this.args    = a;
  }
  functionGenerate(format: string;){
    format.replace("1",name);
    format.replace("2",args.join(', '));
    format.replace("3",retType);
    return format;
  }
}
