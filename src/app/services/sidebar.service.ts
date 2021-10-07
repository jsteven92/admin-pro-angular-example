import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress', url: 'progress' },
        { title: 'Grraficas', url: 'grafica1' }
      ]
    }
  ];
  constructor() { }
}
