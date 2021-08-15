// An interface to catch language information stored in JSON files
export interface LanguageSupportFormat {
  project: Array<project>;
  name: string;
  types: Array<type>;
  templates: Array<template>;
  modifiers: Array<string>;
  singleCommentRule: string;
  multiCommentRule: string;
}

interface project {
  name: string;
  type: string;
  append: string;
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
  data: any;
}
