// An interface to fetch documentation formatting stored in JSON files
export interface DocumentSupportFormat {
  specs: Array<spec>;
  container: Array<string>;
}
  
// A helper interface to store specs
interface spec {
  type: string;
  format: string;
}
  