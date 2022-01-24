import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockingPageRoutingModule } from './stocking-routing.module';

import { StockingPage } from './stocking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockingPageRoutingModule
  ],
  declarations: [StockingPage]
})
export class StockingPageModule {}
