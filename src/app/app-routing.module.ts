import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { AuthGuard } from './core/guards/auth.guard';
import { AuthCallbackComponent } from './auth-callback.component';

const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard', 
    data: { animationState: 'One' },
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
  },
  {
    path: 'parking', 
    data: { animationState: 'Two' },
    loadChildren: () => import('./modules/parking/parking.module').then(module => module.ParkingModule),
  },
  {
    path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then(module => module.ReportsModule),
  },
  {
    path: 'users', loadChildren: () => import('./modules/users/users.module').then(module => module.UsersModule),
  },
  {
    path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(module => module.SettingsModule),
  },
  {
    path: 'auth-callback', component: AuthCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
