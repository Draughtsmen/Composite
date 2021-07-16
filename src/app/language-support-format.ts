// An interface to catch JSON.parse() for language information stored in JSON files
export interface LanguageSupportFormat {
  types: Array<type>;
  templates: Array<template>;
  modifiers: Array<string>;
  singleCommentRule: string;
  multiCommentRule: string;
}
// A helper interface to store types ('int', 'string', etc.)
interface type {
  type: string;
  format: string;
}
// A helper interface to store templates ('class {}', 'function()', etc)
interface template {
  name: string;
  format: string;
}

