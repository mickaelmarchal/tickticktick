import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection/collection-page.component';
import { EditPageComponent } from './containers/edit/edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },

  {
    path: 'edit/:id',
    component: EditPageComponent
    //    canActivate: [BookExistsGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimersRoutingModule {}
