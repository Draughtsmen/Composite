export interface Exportable {
  //heading: string;
  exportStub: (lang: JSON, doc: JSON) => string;
}
