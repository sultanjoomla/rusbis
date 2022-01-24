import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../purchase/purchase.module').then(m => m.PurchasePageModule)
      },
      {
        path: 'tab3',
       loadChildren: () => import('../update/update.module').then(m => m.UpdatePageModule)
      },
      {
        path: '',
        redirectTo: '/tab/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabPageRoutingModule { }
