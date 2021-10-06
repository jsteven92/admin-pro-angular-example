/**into page.html there is router-outlet, it need component module, there are 2 way for resolve this problem,
 * but the best way is call RouteModule because it has context necessary to r-outlet
 */
//import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
