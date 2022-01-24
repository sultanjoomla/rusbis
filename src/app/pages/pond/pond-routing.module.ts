import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PondPage } from './pond.page';

const routes: Routes = [
  {
    path: '',
    component: PondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PondPageRoutingModule {}
