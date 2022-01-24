import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, MenuController, NavController, Platform } from '@ionic/angular';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userDetails: any;
  constructor(private platform: Platform,private router: Router,
    private navCtrl: NavController,public util: UtilService,public api: AuthService,) {
      const data = JSON.parse(localStorage.getItem("User"));
      this.userDetails = data;
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.backgroundColorByHexString('#45C261');
     // this.splashScreen.hide();


      this.platform.backButton.subscribe(async () => {
        console.log('Back Button --------------->>>', this.router.url, 'ad', this.router.isActive('/tabs/', true));

        if (this.router.url === '/tabs/tab1/site' || this.router.url === '/tabs/tab1/expired' ||
          this.router.url === '/tabs/tab1/harvest' || this.router.url === '/tabs/tab1/followers'
          || this.router.url === '/login') {
          console.log('can close');
          this.navCtrl.navigateRoot(['/tabs/tab1']);
        } else if (this.router.url === '/tabs/tab1') {
          navigator['app'].exitApp();
        }
      });
      // if (this.platform.is('cordova')) {
      //   setTimeout(async () => {
      //     await this.oneSignal.startInit(environment.onesignal.appId, environment.onesignal.googleProjectNumber);
      //     await this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      //     this.oneSignal.getIds().then((data) => {
      //       localStorage.setItem('fcm', data.userId);

      //       const param = {
      //         bid: this.userDetails.id,
      //         token: data.userId
      //       };
        
            
      //       this.api.post('addtoken.php', param).subscribe(async (data: any) => {
          
      //       }, error => {
      //         console.log(error);
      //       });


      //       const uid = localStorage.getItem('User');
      //       if (uid && uid !== null && uid !== 'null') {
      //         const param = {
      //           id: uid,
      //           fcm_token: data.userId
      //         };
         
      //       }

      //     });
      //     await this.oneSignal.endInit();
      //   }, 1000);
      // }
    });
  }

  public selectedIndex = 0;
  public appPages = [

{
        title: 'Home',
        url: '/dashboard',
        icon: 'home'
      },
      {
        title: 'Create Ads',
        url: '/profile',
        icon: 'grid'
      },
      {
        title: 'Active Ads',
        url: '/profile',
        icon: 'help-buoy'
      }
  ];
  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
  profile() {
    this.router.navigate(['/profile']);
  }
}
