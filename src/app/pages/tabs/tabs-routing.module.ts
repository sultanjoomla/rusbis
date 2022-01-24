import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
           import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          },
          {
            path: 'site',
            loadChildren: () =>
              import('../site/site.module').then(m => m.SitePageModule)
          },
          {
            path: 'expired',
            loadChildren: () =>
              import('../expired/expired.module').then(m => m.ExpiredPageModule)
          },
          {
            path: 'followers',
            loadChildren: () =>
              import('../followers/followers.module').then(m => m.FollowersPageModule)
          },
          {
            path: 'harvest',
            loadChildren: () =>
              import('../harvest/harvest.module').then(m => m.HarvestPageModule)
          },
          {
            path: 'purchase',
            loadChildren: () =>
              import('../purchase/purchase.module').then(m => m.PurchasePageModule)
          },
          {
            path: 'update',
            loadChildren: () =>
              import('../update/update.module').then(m => m.UpdatePageModule)
          },
          {
            path: 'pond',
            loadChildren: () =>
              import('../pond/pond.module').then(m => m.PondPageModule)
          },
          {
            path: 'invoice',
            loadChildren: () =>
              import('../invoice/invoice.module').then(m => m.InvoicePageModule)
          },
          {
            path: 'renew',
            loadChildren: () =>
              import('../renew/renew.module').then(m => m.RenewPageModule)
          },
          {
            path: 'preview',
            loadChildren: () =>
              import('../preview/preview.module').then(m => m.PreviewPageModule)
          },
        ]
       
      },
      {
        path: 'tab2',
        loadChildren: () => import('../support/support.module').then(m => m.SupportPageModule)
      },
      {
        path: 'tab4',
        children: [ {
          path: '',
          loadChildren: () =>
          import('../faq/faq.module').then(m => m.FaqPageModule)
        },
        {
          path: 'about',
          loadChildren: () =>
            import('../feeding/feeding.module').then(m => m.FeedingPageModule)
        },
        {
          path: 'terms',
          loadChildren: () =>
            import('../stocking/stocking.module').then(m => m.StockingPageModule)
        },
        {
          path: 'privacy',
          loadChildren: () =>
            import('../privacy/privacy.module').then(m => m.PrivacyPageModule)
        },
        {
          path: 'contact',
          loadChildren: () =>
            import('../contact/contact.module').then(m => m.ContactPageModule)
        },
        ]
      },
      
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
