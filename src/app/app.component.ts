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

  constructor() {}
}
