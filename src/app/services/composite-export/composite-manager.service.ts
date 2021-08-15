import { Injectable } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CompositeClass } from 'src/app/classes/composite-class';
import { CompositeFunction } from 'src/app/classes/composite-function';
import { CompositeGroup } from 'src/app/classes/composite-group';
import { CompositeProject } from 'src/app/classes/composite-project';
import { CompositeVariable } from 'src/app/classes/composite-variable';
import { DocumentSupportFormat } from 'src/app/classes/document-support-format';
import { Composite } from '../../classes/composite';
import { LanguageSupportFormat } from '../../classes/language-support-format';

/**
 * This class describes the Composite Manager Service.
 *
 * @class CompositeManagerService (name)
 */
@Injectable({
  providedIn: 'root',
})
export class CompositeManagerService {
  public static readonly SUPPORTED_LANGUAGES: any = {
    gml: 'GML',
    'c#': 'C#',
  };
  public static readonly SUPPORTED_DOCS: any = {
    GMLDocs: 'gmldocs',
    JavaDocs: 'javadocs',
  };

  private static LANGUAGE_INFO: any;
  private static DOC_INFO: any;

  constructor() {}

  static storeConf(language: JSON, doc: JSON) {
    CompositeManagerService.LANGUAGE_INFO = language;
    CompositeManagerService.DOC_INFO = doc;
  }

  /**
   * Creates a project in Composite.
   *
   * @param {string} name - The name of the new project.
   * @param {string} language - The project's programming language.
   * @param {string} doc - The project's documentation type.
   * @return {CompositeProject} A new Composite Project.
   */
  static createProject(name: string, language: string, doc: string) {
    return new CompositeProject(
      name,
      CompositeManagerService.LANGUAGE_INFO[language],
      CompositeManagerService.DOC_INFO[doc]
    );
  }

  /**
   * Deserializes a whole Composite Project.
   *
   * @param {any} data - The Composite Project's raw data.
   * @param {string} language - A supported language.
   * @return {CompositeProject} A Composite Project.
   */
  static deserializeProject(
    data: any,
    language: string,
    doc: string
  ): CompositeProject {
    if (data['_type'] === 'CompositeProject') {
      let composite: CompositeProject = new CompositeProject(
        data['name'],
        CompositeManagerService.LANGUAGE_INFO[language],
        CompositeManagerService.DOC_INFO[doc]
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

  /**
   * Recursively deserializes Composite objects.
   *
   * @param {any} data - The data to deserialize.
   * @return {Composite} The Composite object that was deserialized.
   */
  static deserialize(data: any): Composite {
    if (data['_type'] === 'CompositeClass') {
      let composite: CompositeClass = new CompositeClass(
        data['prefix'],
        data['name'],
        data['postfix'],
        data['description']
      );

      for (let i = 0; i < data['memberVariables'].length; i++) {
        composite.addMemberVariable(
          <CompositeVariable>(
            CompositeManagerService.deserialize(data['memberVariables'][i])
          )
        );
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
    } else if (data['_type'] === 'CompositeVariable') {
      let composite: CompositeVariable = new CompositeVariable(
        data['name'],
        data['description'],
        data['variableType'],
        data['value']
      );
      return composite;
    }
    throw new Error('Invalid type');
  }
}
