import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransferObject,FileTransfer } from '@ionic-native/file-transfer/ngx';
import { fancyAnimation } from './animations';
import { File } from '@ionic-native/file/ngx';
import { Angular4PaystackModule } from 'angular4-paystack';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {Base64} from "@ionic-native/base64/ngx";
import { FilePath } from '@ionic-native/file-path/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; 
//import { AngularRaveModule } from 'angular-rave';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    navAnimation: fancyAnimation
  }), 
   //AngularRaveModule.forRoot('FLWPUBK-XXXXXXXXXXXXXXXXXXX'),
  AppRoutingModule,NgOtpInputModule,HttpClientModule, Angular4PaystackModule.forRoot('pk_live_deafd011074cdad3e2106bf7bdde0fff67fcd390')],
  providers: [Camera,
    FileTransferObject,
    HTTP,
    Printer,
    File,
    FileTransfer,
    AndroidPermissions,
    Diagnostic,
    //OneSignal,
    Base64,
    FileChooser, 
    FilePath,
    SocialSharing,
    InAppBrowser, Rave, RavePayment, Misc,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
