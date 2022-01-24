import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from '../../services/util.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fname: any = '';
  email: any = '';
  phone: any = '';
  password: any = ''; 
  password2: any = '';
  loggedIn: boolean;
  constructor(private navCtrl:NavController, private authService: AuthService,private router:Router,public util: UtilService) { 
  
  }




  ngOnInit() {
  }

  goToPhone() {
    this.router.navigate(['/phone']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  login() {
    console.log('login');
   
    if (!this.fname || !this.phone || !this.email || !this.password ) {
      this.util.showToast(this.util.getString('All Fields are required'), 'dark', 'bottom');
      return false;
    }

    if(this.password != this.password2){
      this.util.showToast(this.util.getString('Password does not match, enter password again'), 'dark', 'bottom');
      return false;
    }

    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.util.showToast(this.util.getString('Please enter valid email address'), 'dark', 'bottom');
      return false;
    }

      console.log('login');
      const param = {
        name: this.fname,
       
        email: this.email,
        password: this.password,
        phone: this.phone,
      };

      console.log('param', param);
      this.loggedIn = true;
      this.authService.post('registration.php', param).subscribe((data: any) => {
        this.loggedIn = false;
        console.log(data);
        if (data && data.status === 200) {
          
       
          this.util.showToast(this.util.getString('Account created successfully'), 'success', 'bottom');
          this.navCtrl.navigateRoot(['/verify-phone']);

        } else if (data && data.status === 500) {
          this.util.errorToast(data.message);
        } else {
          this.util.errorToast(this.util.getString('Unable to process your request, try again later!'));
        }
      }, error => {
        console.log(error);
        this.loggedIn = false;
        this.util.errorToast(this.util.getString('Unable to process your request, try again later!'));
      });
   
  }

}
