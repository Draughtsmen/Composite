import { Component } from '@angular/core';
import { CompositeClass } from './composite-class';
import { LanguageSupportFormat } from './language-support-format';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'composite';

  constructor() {}
}
