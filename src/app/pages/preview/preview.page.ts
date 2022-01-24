import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute,NavigationExtras,Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  coverImage: any = '';
  isLogin: boolean  = false;
  mediaURL;
  public userDetails: any;
  ctitle: any;
  url: any;
  amount: any;
  sstatus: any;
  bdescription: any;
  isNew: boolean;
  ctype: any;
  cover: any;
  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private modalCtrl: ModalController, public util: UtilService,public api: AuthService,private router: Router,) { 
      const data = JSON.parse(localStorage.getItem("User"));
      this.userDetails = data;
      this.mediaURL = `https://renturstatus.com/api/pay/campaign/`+this.userDetails.id+`/`;
      this.isNew = true;
    }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('data=>', data);
     
        this.ctitle = data.ctitle;
        this.url = data.url;
        this.amount = data.amount;
        this.bdescription = data.bdescription;
        this.ctype = data.ctype;
        this.coverImage = data.cover;
        this.sstatus = data.sstatus;
        //this.getOrder();
      
    });
  }

  create() {

    const param = {
     
      cover: this.coverImage,
      ctitle: this.ctitle,
      url: this.url,
      amount: this.amount,
      bdescription: this.bdescription,
      bid: this.userDetails.bid,
      ctype: this.ctype,
      sstatus: this.sstatus
 
    };
   
    console.log('*****', param);
  
    this.isLogin = true;
    this.util.show();
    this.api.post('adcreate.php', param).subscribe((data: any) => {
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

  submit() {

  
    if (this.isNew) {
      console.log('new');
      this.create();
    } else {
      console.log('update');
      //this.update();
    }

  
    
  }

  back(){
    this.navCtrl.back();
  }


}
