import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'timers',
    loadChildren: './timers/timers.module#TimersModule'
  },

  {
    path: 'reports',
    loadChildren: './reports/reports.module#ReportsModule'
  },

  // default route
  {
    path: '',
    redirectTo: '/timers',
    pathMatch: 'full'
  }
  /*
  // TODO 404
  {
      path: '**',
      component: AppPage404Component,
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
