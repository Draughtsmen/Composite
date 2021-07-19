import { Component } from '@angular/core';
import { CompositeClass } from './classes/composite-class';
import { LanguageSupportFormat } from './classes/language-support-format';

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
