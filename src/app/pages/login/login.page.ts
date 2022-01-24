import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from '../../services/util.service';
import { MenuController, ModalController, NavController } from '@ionic/angular';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any = '';
    password: any = '';
    loggedIn: boolean;
  constructor(private authService: AuthService,private router: Router,public util: UtilService,private navCtrl: NavController
){
  this.loggedIn = false;
}

  ngOnInit() {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    console.log('login');
    if (!this.email || !this.password) {
      this.util.showToast(this.util.getString('All Fields are required'), 'dark', 'bottom');
      return false;
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.util.showToast(this.util.getString('Please enter valid email'), 'dark', 'bottom');
      return false;
    }
    this.loggedIn = true;
    const param = {
      email: this.email,
      password: this.password
    };
    this.authService.post('login.php', param).subscribe((data: any) => {
      this.loggedIn = false;
      console.log(data);
      if (data && data.status === 200) {
        if (data && data.data[0]) {
          if (data.data[0].verified === '1') {
            localStorage.setItem('User', JSON.stringify(data.data[0]) )

            console.log(data.data[0]);
           
       

            this.navCtrl.navigateRoot(['']);
          }
          
          else if (data.data[0].verified === '0') {
            localStorage.setItem('User', JSON.stringify(data.data[0]) )

            console.log(data.data);
           
       

            const navData: NavigationExtras = {
              queryParams: {
                item: this.email
              }
            };
            this.router.navigate(['/verify-phone'], navData);
          }
          
          // else {
          //   console.log('not valid');
          //   swal.fire({
          //     title: this.util.getString('Error'),
          //     text: this.util.getString('Your account does not exist'),
          //     icon: 'error',
          //     showConfirmButton: true,
          //     showCancelButton: true,
          //     confirmButtonText: this.util.getString('Create new account?'),
          //     backdrop: false,
          //     background: 'white'
          //   });
          //       this.router.navigate(['register']);
              
            
          // }
        }
      } else if (data && data.status === 500) {
        this.util.errorToast(data.message);
        this.password = '';
      }
      else if (data && data.status === 201) {
        this.util.errorToast(data.message);
        this.email = '';
        this.password = '';
        this.router.navigate(['register']);
      }
      else {
        this.util.errorToast(this.util.getString('Unable to process your request, try again later'));
      }
    }, error => {
      console.log(error);
      this.loggedIn = false;
      this.util.errorToast(this.util.getString('Unable to process your request, try again later'));
    });

  }


  goToForgot() {
    this.router.navigate(['/forgot']);
  }

  goToPhone() {
    this.router.navigate(['/phone']);
  }

}
