import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockingPage } from './stocking.page';

const routes: Routes = [
  {
    path: '',
    component: StockingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockingPageRoutingModule {}
