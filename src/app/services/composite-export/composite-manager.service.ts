import { Injectable } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CompositeClass } from 'src/app/classes/composite-class';
import { CompositeFunction } from 'src/app/classes/composite-function';
import { CompositeGroup } from 'src/app/classes/composite-group';
import { CompositeProject } from 'src/app/classes/composite-project';
import { DocumentSupportFormat } from 'src/app/classes/document-support-format';
import { Composite } from '../../classes/composite';
import { LanguageSupportFormat } from '../../classes/language-support-format';

@Injectable({
  providedIn: 'root',
})
export class CompositeManagerService {
  public static readonly SUPPORTED_LANGUAGES: any = {
    "GML": "gml"
  }; 
  private static readonly LANGUAGE_INFO: any = {
    "gml": {
      "language": {
        "types": [
          {
            "type": "string",
            "format": "1# = \"2\"#;"
          },
          {
            "type:": "real",
            "format": "1# = 2#;"
          },
          {
            "type": "array",
            "format": "1 = array_create(2);"
          },
              {
                  "type": "boolean",
                  "format": "1# = 2#;"
              },
              {
                  "type": "enum",
                  "format": "enum 1 {#\n2\n#}"
              }
        ],
      
        "templates": [
          {
            "name": "function",
            "format": "function 1(2) {\n\treturn3;\n}"
          },
          {
            "name": "script",
            "format": ""
          }
        ],
      
        "singleCommentRule": "//1",
        "multiCommentRule": "/*\n1\n*/"
      
      },
      "docs": {
        "specs": [
            {
                "spec": "function",
                "format": "@function 1(2)"
            },
            {
                "spec": "description",
                "format": "@description 1"
            },
            {
                "spec": "parameter",
                "format": "@param {1} 2 3"
            }
        ],
    
        "container": [
            {
                "prefix": "/// "   
            }
        ]
    }
    }
  }

  constructor() {
  }

  static createProject(name: string, language: string) {
    return new CompositeProject(name, CompositeManagerService.LANGUAGE_INFO[language]["language"], CompositeManagerService.LANGUAGE_INFO[language]["docs"]);
  }

  static deserializeProject(data: any, language: string): CompositeProject {
    if (data["_type"] === "CompositeProject") {
      let composite: CompositeProject = new CompositeProject(data["name"], CompositeManagerService.LANGUAGE_INFO[language]["language"], CompositeManagerService.LANGUAGE_INFO[language]["docs"]);
      for (let i = 0; i < data["files"].length; i++) {
        composite.addGroup(<CompositeGroup>CompositeManagerService.deserialize(data["files"][i]));
      }
      return composite;
    }
    throw new Error("Invalid type");
  }

  //maybe put this in Composite instead?
  static deserialize(data: any): Composite {
    if (data["_type"] === "CompositeClass") {
      let composite: CompositeClass = new CompositeClass(data["prefix"], data["name"], data["postfix"]);
      for (let i = 0; i < data["memberVariables"].length; i++) {
        composite.addMemberVariable(data["memberVariable"][i]);
      }
      for (let i = 0; i < data["memberFunctions"].length; i++) {
        composite.addMemberFunction(<CompositeFunction>CompositeManagerService.deserialize(data["memberFunctions"][i]));
      }
      for (let i = 0; i < data["subclasses"].length; i++) {
        composite.assignSubclass(<CompositeClass>CompositeManagerService.deserialize(data["subclasses"][i]));
      }
      return composite;
    } else if (data["_type"] === "CompositeFunction") {
      let composite: CompositeFunction = new CompositeFunction(data["name"], data["returnType"], data["args"]);
      return composite;
    } else if (data["_type"] === "CompositeGroup") {
      let composite: CompositeGroup = new CompositeGroup(data["name"]);
      for (let i = 0; i < data["composite"].length; i++) {
        composite.addExportableObject(CompositeManagerService.deserialize(data["composite"][i]));
      }
      return composite;
    }
    throw new Error("Invalid type");
  }

}
