import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UpdatePage } from '../update/update.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public userDetails: any;
  today = new Date();
  pp;
  total: any;
  constructor(private router: Router,private alertCtrl: AlertController,private authService: AuthService,private navCtrl: NavController) {
    const data = JSON.parse(localStorage.getItem('User'));
    this.userDetails = data;
    this.pp = 'https://renturstatus.com/api/pay/logo/'+this.userDetails.bid+`/`+this.userDetails.image;
    const pop = localStorage.getItem('pop');
      console.log(this.pp);
        this.getPopup();
        this.getPopup1();
     
  }

  ngOnInit() {
  }

  goToSite() {
    this.router.navigate(['/tabs/tab1/site']);
  }

  goToPond() {
    this.router.navigate(['/tabs/tab1/pond']);
  }

  history() {
    this.router.navigate(['/tabs/tab1/purchase']);
  }

  update() {
    this.router.navigate(['/tabs/tab1/update']);
  }

  getPopup1() {
    const param = {
      bid: this.userDetails.id
    };

    this.authService.post('sales1.php', param).subscribe(async (data: any) => {
      console.log('message', data);
      if (data && data.status === 200 ) {
        const info = data;
       this.total = info.data[0].total;
       console.log('total', this.total);
      }
    }, error => {
      console.log(error);
    });
  }


  getPopup() {
    const param = {
      bid: this.userDetails.id
    };

    
    this.authService.post('check.php', param).subscribe(async (data: any) => {
      console.log('popup message', data);
      if (data && data.status === 200) {
        const info = data;
        if (info && info.shown === '1') {
          const alertCtrl = await this.alertCtrl.create({
            header: `Dear, ` +this.userDetails.username,
            message: 'You need to update your Business Information!',
            mode: 'ios',
            //cssClass:'my-custom-class',
            buttons: [
              
              {
                text: 'OK',
                handler: () => {
                  this.router.navigate(['/tabs/tab1/update']);
                }
              }
            ]
          });
          localStorage.setItem('pop', 'true');
          alertCtrl.present();
        }
      }
    }, error => {
      console.log(error);
    });
  }

  stock() {
    this.router.navigate(['/stocking']);
  }

  feed() {
    this.router.navigate(['/feeding']);
  }

  water() {
    this.router.navigate(['/purchase']);
  }
  profile() {
    this.router.navigate(['/profile']);
  }

  expired(){
    this.router.navigate(['/tabs/tab1/expired']);
  }

  follow(){
    this.router.navigate(['/tabs/tab1/followers']);
  }


  harvest() {
    this.router.navigate(['/tabs/tab1/harvest']);
  }

  logout() {
   
    localStorage.clear();
    this.navCtrl.navigateRoot(['/login']);
  
  }

}
