import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.page.html',
  styleUrls: ['./verify-phone.page.scss'],
})
export class VerifyPhonePage implements OnInit {
  isLogin: boolean  = false;
  userCode: any = '';
  item: any;
  email: any;
  resendCode: boolean;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '*',
    inputClass: 'ip_class',
    inputStyles: {
      'width': '40px',
      'height': '40px',
    }
  };


  constructor(private route: ActivatedRoute,private navCtrl:NavController,private authService: AuthService,private router: Router,public util: UtilService,private modalCtrl: ModalController) {
    // this.resendCode = false;
    // this.sendOTP();
    // setTimeout(() => {
    //   this.resendCode = true;
    // }, 10000);
   }

   onOtpChange(event) {
    console.log(event);
    this.userCode = event;
  }

  sendOTP() {
    this.email = this.item;

    const param = {
     
      email: this.email
    };
    console.log(param);
    this.util.show();
    this.authService.post('resend.php', param).subscribe((data: any) => {
      console.log(data);
    
      this.util.hide();

      this.util.showToast(this.util.getString('Verification code sent successfully'), 'success', 'bottom');
    }, error => {
      console.log(error);
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }


  continue() {
    console.log(this.userCode);
    if (this.userCode === '' || !this.userCode) {
      this.util.errorToast(this.util.getString('Not valid code'));
      return false;
    }
    if (this.userCode) {
      const param = {
        
        otp: this.userCode
      };
      this.util.show();
      this.authService.post('verify.php', param).subscribe((data: any) => {
        console.log(data);
        this.util.hide();
        if (data && data.status === 200) {
          this.util.hide();
          this.navCtrl.navigateForward(['login']);
          this.util.showToast(this.util.getString('Account verification successful'), 'success', 'bottom');
        } else {
          if (data && data.status === 500 && data.data && data.data.message) {
            this.util.errorToast(data.data.message);
            return false;
          }
          this.util.errorToast(this.util.getString('Something went wrong'));
          return false;
        }
      }, error => {
        this.util.hide();
        console.log(error);
        this.util.errorToast(this.util.getString('Something went wrong'));
      });
    } else {
      this.util.errorToast(this.util.getString('Not valid code'));
      return false;
    }
  }

  resend() {
    this.sendOTP();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('data=>', data);
      if (data.hasOwnProperty('item')) {
        this.item = data.item;
        //this.getOrder();
      }
    });

  }

}
