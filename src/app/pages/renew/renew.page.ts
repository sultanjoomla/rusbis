import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from '../../services/util.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.page.html',
  styleUrls: ['./renew.page.scss'],
})
export class RenewPage implements OnInit {
  public userDetails: any;
  mediaURL;
  id: any;
  loaded: boolean;
  orders: any;
  ctitle: any = '';
  url: any='';
  amount: any='';
  bdescription: any='';
  coverImage: any = '';
  ctype: any = '';
  isNew: boolean;
  isLogin: boolean  = false;
  constructor(public authService: AuthService,private router: Router,public util: UtilService, private navCtrl: NavController,
    private alertController: AlertController,private route: ActivatedRoute) { 
      const data = JSON.parse(localStorage.getItem('User'));
    this.userDetails = data;
    this.mediaURL = `https://renturstatus.com/api/pay/campaign/`+this.userDetails.bid+`/`;
    this.route.queryParams.subscribe((data) => {
      console.log(data);
      if (data && data.id) {
        this.id = data.id;
        this.loaded = false;
        this.getOrder();
      } else {
        this.navCtrl.back();
      }
    });
    this.isNew = true;
    }

    back() {
      this.navCtrl.back();
    }

    submit() {
      console.log(this.ctype);
      if (!this.ctitle || this.ctitle === '') {
        this.util.errorToast(this.util.getString('Please enter campaign title'));
        return false;
      }
  
      if (!this.ctype || this.ctype === '') {
        this.util.errorToast(this.util.getString('Please select campaign campaign'));
        return false;
      }
  
      if (!this.bdescription || this.bdescription === '') {
        this.util.errorToast(this.util.getString('Please enter cmpaign description'));
        return false;
      }
      if (!this.coverImage || this.coverImage === '') {
        this.util.errorToast(this.util.getString('Please add campaign image/video'));
        return false;
      }
      if (!this.amount || this.amount === '') {
        this.util.errorToast(this.util.getString('Please enter budget amount'));
        return false;
      }
  
      if (this.ctype =='image' && this.amount < 499) {
        this.util.errorToast(this.util.getString('Budget amount cannot be less than ₦500.00'));
        return false;
      }
  
      if (this.ctype =='video' && this.amount < 999) {
        this.util.errorToast(this.util.getString('Budget amount cannot be less than ₦1000.00'));
        return false;
      }
    
      if (this.isNew) {
        console.log('new');
        this.create();
      } else {
        console.log('update');
        //this.update();
      }
  
      
    }

    create() {

    const param = {
     
      cover: this.coverImage,
      ctitle: this.ctitle,
      url: this.url,
      amount: this.amount,
      bdescription: this.bdescription,
      bid: this.userDetails.bid,
      ctype: this.ctype
 
    };
   
    console.log('*****', param);
  
    this.isLogin = true;
    this.util.show();
    this.authService.post('adcreate.php', param).subscribe((data: any) => {
      this.isLogin = false;
      console.log(data);
      this.util.hide();
      if (data && data.status === 200) {
        this.util.showToast(this.util.getString('Campaign information added successfully'), 'success', 'bottom');
        const navData: NavigationExtras = {
          queryParams: {
            item: data.transid
          }
        };
        console.log(navData);
        this.router.navigate(['/tabs/tab1/invoice'], navData);
      } else {
        this.isLogin = true;
        this.util.errorToast(this.util.getString('Something went wrong'));
      }
    }, error => {
      this.isLogin = true;
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong'));
      console.log('error', error);
    });
  }
  
    getOrder() {
      const param = {
        id: this.id
      };
      this.authService.post('cc1.php', param).subscribe((data: any) => {
        console.log(data);
        this.loaded = true;
        if (data && data.status === 200 && data.data.length > 0) {
          const info = data.data[0];
          console.log(info);
          //this.orderDetail = JSON.parse(info.notes);
          //console.log('driver???? ======>', this.orderDetail);
          
         
  
         this.orders = info;
         this.ctitle = info.adTitle;
         this.ctype = info.ctype;
         this.url = info.url;
         this.bdescription = info.adDescription;
         this.coverImage = info.fileUrl;
         this.amount = info.amount;

         //console.log(this.orders);
         //console.log(this.ctitle);
    
        } else {
          this.util.errorToast(this.util.getString('Something went wrong'));
        }
      }, error => {
        console.log(error);
        this.loaded = true;
        this.util.errorToast(this.util.getString('Something went wrong'));
      });
    }

  ngOnInit() {
  }

}
