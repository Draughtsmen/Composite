import { Component } from '@angular/core';
//import { DefaultDeserializer } from 'v8';
import { CompositeClass } from './composite-class';
import { LanguageSupportFormat } from './language-support-format';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'composite';

  constructor() {
    // Test class creation/pseudocode
    let test: string =
      '{"types": [ {"type": "ah", "format": "blah"}, {"type": "dah", "format": "flah"}], "templates": [ {"name": "class", "format" : "$1{}"}, {"name": "clasas", "format" : "pogg"}] }';
    let j: LanguageSupportFormat = JSON.parse(test);
    let finallyaclass: CompositeClass = new CompositeClass(
      'myClass',
      'public ',
      ' : mysuperclass '
    );
    console.log(finallyaclass.exportStub(j, JSON.parse(test)));
  }
}
