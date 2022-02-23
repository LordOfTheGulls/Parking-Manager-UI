import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { AuthGuard } from './core/auth/auth.guard';
import { AuthCallbackComponent } from './auth-callback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard],
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
