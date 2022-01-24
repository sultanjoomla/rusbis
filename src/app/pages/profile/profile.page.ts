import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/services/util.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userDetails: any;
  pp;
  contact = {
    name: '',
    email: '',
    message: '',
    status: '0',
    date: moment().format('YYYY-MM-DD')
  };
  constructor(private router: Router,public util: UtilService,private authService: AuthService,private navCtrl: NavController) {
    const data = JSON.parse(localStorage.getItem("User"));
    this.userDetails = data;
    this.pp = 'https://renturstatus.com/api/pay/logo/'+this.userDetails.bid+`/`+this.userDetails.image;

   }

  ngOnInit() {
  }


  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  submit() {
    console.log('contact', this.contact);
    if (this.contact.name === '' || this.contact.email === '' || this.contact.message === '') {
      this.util.errorToast(this.util.getString('All Fields are required'));
      return false;
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.contact.email)) {
      this.util.errorToast(this.util.getString('Please enter valid email'));
      return false;
    }

    this.util.show();
    this.authService.post('contacts/save', this.contact).subscribe((data: any) => {
      this.util.hide();
      const param = {
        email: this.contact.email
      };
      this.authService.post('users/contactResponse', param).subscribe((data: any) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
      this.contact.email = '';
      this.contact.name = '';
      this.contact.message = '';
      if (data && data.status === 200) {
        this.success();
      } else {
        this.util.errorToast(this.util.getString('Something went wrong'));
      }
    }, error => {
      console.log(error);
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  success() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: this.util.getString('message sent successfully')
    });
    this.navCtrl.back();
  }

}
