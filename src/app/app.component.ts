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

  constructor() {
    // Some tests, commented out for now (remove eventually)
    //let test = new CompositeClass('testname');
    //let inpjson = '{"types": [{"type": "string","format": "var $1 = $2;"},{"type": "real","format": "var $1 = $2;"},{"type": "array","format": "<...>"}],"templates": [{"name": "function","format": "<...>"},{"name": "script","format": "<...>"},{"name": "object","format": "<...>"}],"singleCommentRule": "//$1","multiCommentRule": "/*n$1*/"}';
    /*console.log("Langtest types");
    let langtest : LanguageSupportFormat = JSON.parse(inpjson);
    langtest.types.forEach(element => {
      console.log(element.type + ": " + element.format)
    });
    
    console.log("Langtest templates: "+ langtest.templates);
    console.log("Langtest single com rule: "+ langtest.singleCommentRule);*/
  }
}
