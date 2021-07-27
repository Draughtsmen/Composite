// An interface to fetch documentation formatting stored in JSON files
export interface DocumentSupportFormat {
  specs: Array<spec>;
  opener: string;
  prefix: string;
  closer: string;
}

// A helper interface to store specs
interface spec {
  type: string;
  format: string;
}
