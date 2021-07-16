export interface LanguageSupportFormat {
  types: type[];
  templates: template[];
  singleCommentRule: string;
}

interface type {
  type: string;
  format: string;
}

interface template {
  name: string;
  format: string;
}
