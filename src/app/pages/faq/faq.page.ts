import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  public userDetails: any;
  
  pp;
  constructor(private router: Router,private alertCtrl: AlertController,private authService: AuthService,private navCtrl: NavController) {
    const data = JSON.parse(localStorage.getItem('User'));
    this.userDetails = data;
    this.pp = 'https://ttrconsult.com.ng/api/pay/logo/'+this.userDetails.bid+`/`+this.userDetails.image;

      
  }

  ngOnInit() {
  }

  goToAbout(){
    this.router.navigate(['/tabs/tab4/about']);
  }

  goToTerms(){
    this.router.navigate(['/tabs/tab4/terms']);
  }

  privacy(){
    this.router.navigate(['/tabs/tab4/privacy']);
  }

  update(){
    this.router.navigate(['/tabs/tab1/update']);
  }

  contact(){
    this.router.navigate(['/tabs/tab4/contact']);
  }

  reset(){
    this.router.navigate(['/forgot']);
  }

}
