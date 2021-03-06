import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UsersComponent } from './maintenance/users/users.component';


/**item router child section 4 class 35 */
const routes: Routes = [
    {
        /**add childrens path, this pages load with template diferenct of login and register */
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme' } },
            { path: 'promise', component: PromiseComponent, data: { title: 'Promise example' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs examples' } },
            { path: 'profile', component: ProfilesComponent, data: { title: 'user profile' } },


            { path: 'users', component: UsersComponent, data: { title: 'user application' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
