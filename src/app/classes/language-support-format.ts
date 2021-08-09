// An interface to catch language information stored in JSON files
export interface LanguageSupportFormat {
  name: string;
  extension: string;
  types: Array<type>;
  templates: Array<template>;
  modifiers: Array<string>;
  singleCommentRule: string;
  multiCommentRule: string;
}

// A helper interface to store types ('int', 'string', etc.).
interface type {
  name: string;
  format: string;
}

// A helper interface to store templates ('class {}', 'function()', etc).
interface template {
  id: string;
  name: string;
  format: string;
}
