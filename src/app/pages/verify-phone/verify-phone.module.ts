import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPhonePageRoutingModule } from './verify-phone-routing.module';

import { VerifyPhonePage } from './verify-phone.page';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    VerifyPhonePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyPhonePage]
})
export class VerifyPhonePageModule {}
