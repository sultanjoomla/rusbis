import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  div_type;
  loggedIn: boolean;
  email: any;
  id: any;
  otp: any;
  password: any;
  repass: any;
  constructor(private authService: AuthService,private router: Router, public util: UtilService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private alertController: AlertController
){ 
  this.div_type = 1;
  this.email = '';
  this.otp = '';
  this.password = '';
  this.repass = '';
}

  ngOnInit() {
  }

  sendOTP() {
    console.log(this.email, ';sendOTPDriver');
    if (!this.email) {
      this.util.showToast(this.util.getString('email address is required'), 'dark', 'bottom');
      return false;
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.util.showToast(this.util.getString('Please enter valid email'), 'dark', 'bottom');
      return false;
    }
    this.loggedIn = true;
    const param = {
      email: this.email
    };
    this.authService.post('sendotp.php', param).subscribe((data: any) => {
      console.log(data);
      this.loggedIn = false;
      if (data && data.status === 200) {
        //this.id = data.data.id;
        this.loggedIn = false;
        this.div_type = 2;
      } else {
        if (data && data.status === 500 && data.data && data.data.message) {
          this.util.errorToast(data.data.message);
          return false;
        }
        this.util.errorToast(this.util.getString('Something went wrong'));
        return false;
      }
    }, error => {
      console.log(error);
      this.loggedIn = false;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  verifyOTP() {
    // this.div_type = 3;
    if (!this.otp || this.otp === '') {
      this.util.showToast(this.util.getString('otp is required'), 'dark', 'bottom');
      return false;
    }
    this.loggedIn = true;
    const param = {
      //id: this.id,
      otp: this.otp
    };
    this.authService.post('verify2.php', param).subscribe((data: any) => {
      console.log(data);
      this.loggedIn = false;
      if (data && data.status === 200) {
        this.loggedIn = false;
        this.div_type = 3;
      } else {
        if (data && data.status === 500 && data.data && data.data.message) {
          this.util.errorToast(data.data.message);
          return false;
        }
        this.util.errorToast(this.util.getString('Something went wrong'));
        return false;
      }
    }, error => {
      console.log(error);
      this.loggedIn = false;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  sendEmail() {
    console.log('pwddd0<<<<<<', this.password);
    if (!this.password || !this.repass || this.password === '' || this.repass === '') {
      this.util.errorToast(this.util.getString('All Field are required'));
      return false;
    }
    const param = {
      email: this.email,
      pwd: this.password
    };
    this.loggedIn = true;
    this.authService.post('updatepass.php', param).subscribe((data: any) => {
      console.log(data);
      this.loggedIn = false;
      if (data && data.status === 200) {
        this.loggedIn = false;
        this.util.showToast(this.util.getString('Password updated successfully'), 'success', 'bottom');
        this.back();
      } else {
        if (data && data.status === 500 && data.message) {
          this.util.errorToast(data.message);
          return false;
        }
        this.util.errorToast(this.util.getString('Something went wrong'));
        return false;
      }
    }, error => {
      console.log(error);
      this.loggedIn = false;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  back() {
    this.navCtrl.back();
  }




}
