export interface LanguageSupportFormat {
  types: Array<type>;
  templates: Array<template>;
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
