import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PondPageRoutingModule } from './pond-routing.module';

import { PondPage } from './pond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PondPageRoutingModule
  ],
  declarations: [PondPage]
})
export class PondPageModule {}
