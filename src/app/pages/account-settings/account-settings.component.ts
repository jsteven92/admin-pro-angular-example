import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public links!: NodeListOf<Element>;

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    /**when I use this instruccion only go one to DOM */
    this.links = document.querySelectorAll('.selector');
    this.settingService.setLinks(this.links);
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
  }

}
