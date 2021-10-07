import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linkTheme = document.querySelector('#theme');
  private links!: NodeListOf<Element>;
  constructor() {

    const url = localStorage.getItem('urlTheme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);

  }

  setLinks(links: NodeListOf<Element>) {
    this.links = links;
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme!.setAttribute('href', url);
    localStorage.setItem('urlTheme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const bthThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      
      if (bthThemeUrl === currentTheme) {
        element.classList.add('working');
      }

    });
  }
}
