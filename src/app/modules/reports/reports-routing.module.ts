import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    pathMatch: 'full'
  },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}