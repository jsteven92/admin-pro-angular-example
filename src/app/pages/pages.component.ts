import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

/**we changed assets/custom.js and added all code in a const. in this instruccion we said to angular 
 * that customInitFunction() exists and it should trust us that this function exist in a global context
 */
declare function customInitFunction():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})

export class PagesComponent implements OnInit {

  /**way of import service */
  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    customInitFunction();
  }

}
