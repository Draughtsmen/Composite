# How-to Guide

This guide will teach you how to write language and documentation files for Composite. All files are written in JSON.

## Language files

Language files have two major sections: **"types"** and **"templates"**. "types" represent the supported types of a language, while "templates" represent code structures such as functions, classes, etc.

### "types"

Each element in "types" must contain two key-value pairs, **"name"** and **"format"**. "name" is the name of the type (int, string, bool) as a string, and "format" is a string the specifies how Composite will display the type (see Formatting section).

### "templates"

Each element in "templates" must contain two key-value pairs, **"name"** and **"format"**. Similar to before, "name" is the string name of the template, and "format" is a string that specifies how to display the template.

### "modifiers"

If a language supports modifiers, the file may contain a key-value pair named "modifiers", along with a string array of the modifier names.

### Other

Language files also support rules which determine how a specific syntax should be formatted.

## Documentation files

Documentation files have only one major section called **"specs"**. "specs" are the specifications available for the user to modify. Each "spec" must contain "name" and "format" pairs.

Documentation files also contain three rules: **"opener"**, **"prefix"**, and **"closer"**. "opener" and "closer" specify what symbols, typically the language's comment rule, that the specification should use. **prefix** specifies what symbols go before every line in the specification. All these rules use string values.

## Formatting

As syntax varies from language to language, Composite needs each language and documentation file to declare their own formatting. Formats contain *static* and *dynamic* terms. 

Static terms represent the constant parts of a format, such as equal signs and semicolons. Dynamic terms are closed with brackets '[' and ']' and replaced with user-defined values. Supported dynamic terms are displayed below.

- [name] - The name of the defining structure.
- [value] - The value(s) the defining structure is declaring. Used in initializing variables, function parameters, and descriptions.
- [type] - The type of the defining structure, usually used for specifications. 
- [return] - Used for a function's return value.
- [modifier] - Used to define the access modifier for a template.