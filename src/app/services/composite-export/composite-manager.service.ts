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
    GML: 'gml',
  };
  private static readonly LANGUAGE_INFO: any = {
    gml: {
      language: {
        types: [
          {
            name: 'string',
            format: '[name] = "[value]";',
          },
          {
            name: 'real',
            format: '[name] = [value];',
          },
          {
            name: 'array',
            format: '[name] = array_create([value]);',
          },
          {
            name: 'boolean',
            format: '[name] = [value];',
          },
          {
            name: 'enum',
            format: 'enum [name] {\n[value]\n}',
          },
        ],
        templates: [
          {
            name: 'function',
            format: 'function [name]([value]) {\n\treturn [return];\n}',
          },
          {
            name: 'script',
            format: '',
          },
        ],
        singleCommentRule: '//[value]',
        multiCommentRule: '/*\n[value]\n*/',
      },
      docs: {
        specs: [
          {
            name: 'function',
            format: '@function [name]([value])',
          },
          {
            name: 'description',
            format: '@description [value]',
          },
          {
            name: 'parameter',
            format: '@param {[type]} [name] [value]',
          },
        ],
        prefix: '/// ',
      },
    },
  };

  constructor() {}

  static createProject(name: string, language: string) {
    return new CompositeProject(
      name,
      CompositeManagerService.LANGUAGE_INFO[language]['language'],
      CompositeManagerService.LANGUAGE_INFO[language]['docs']
    );
  }

  static deserializeProject(data: any, language: string): CompositeProject {
    if (data['_type'] === 'CompositeProject') {
      let composite: CompositeProject = new CompositeProject(
        data['name'],
        CompositeManagerService.LANGUAGE_INFO[language]['language'],
        CompositeManagerService.LANGUAGE_INFO[language]['docs']
      );
      for (let i = 0; i < data['files'].length; i++) {
        composite.addGroup(
          <CompositeGroup>CompositeManagerService.deserialize(data['files'][i])
        );
      }
      return composite;
    }
    throw new Error('Invalid type');
  }

  //maybe put this in Composite instead?
  static deserialize(data: any): Composite {
    if (data['_type'] === 'CompositeClass') {
      let composite: CompositeClass = new CompositeClass(
        data['prefix'],
        data['name'],
        data['postfix'],
        data['description']
      );
      for (let i = 0; i < data['memberVariables'].length; i++) {
        composite.addMemberVariable(data['memberVariable'][i]);
      }
      for (let i = 0; i < data['memberFunctions'].length; i++) {
        composite.addMemberFunction(
          <CompositeFunction>(
            CompositeManagerService.deserialize(data['memberFunctions'][i])
          )
        );
      }
      for (let i = 0; i < data['subclasses'].length; i++) {
        composite.assignSubclass(
          <CompositeClass>(
            CompositeManagerService.deserialize(data['subclasses'][i])
          )
        );
      }
      return composite;
    } else if (data['_type'] === 'CompositeFunction') {
      let composite: CompositeFunction = new CompositeFunction(
        data['name'],
        data['description'],
        data['returnType'],
        data['args']
      );
      return composite;
    } else if (data['_type'] === 'CompositeGroup') {
      let composite: CompositeGroup = new CompositeGroup(
        data['name'],
        data['description']
      );
      for (let i = 0; i < data['composite'].length; i++) {
        composite.addCompositeObject(
          CompositeManagerService.deserialize(data['composite'][i])
        );
      }
      return composite;
    }
    throw new Error('Invalid type');
  }
}
