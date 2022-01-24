import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from '../../services/util.service';
import { NavController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-pond',
  templateUrl: './pond.page.html',
  styleUrls: ['./pond.page.scss'],
})
export class PondPage implements OnInit {
  public userDetails: any;
  id: any;
  loaded: boolean;
  orderDetail: any[] = [];
  orders: any;
  payMethod: any;
  status: any[] = [];
  datetime: any;
  isDelivered: boolean;
  mediaURL;

  text: string='';
  imgurl:string= '';
  link: string='https://renturstatus.com';


  constructor(public authService: AuthService,private router: Router,public util: UtilService, private navCtrl: NavController,
    private alertController: AlertController,private route: ActivatedRoute,private socialSharing: SocialSharing,) { 
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
  }

  back() {
    this.navCtrl.back();
  }

  ShareGeneric(parameter){
    const url = this.link
    const text = this.text
    const img = this.imgurl
    this.socialSharing.share(text, null, img, url)
  }

  ShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link)
  }

  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, this.imgurl, null /* url */, this.link)
  }

  SendEmail(){
    this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com'])
  }

  SendTwitter(){
    this.socialSharing.shareViaTwitter(this.text, this.imgurl, this.link)
  }

  SendInstagram(){
    this.socialSharing.shareViaInstagram(this.text, this.imgurl)
  }


  getOrder() {
    const param = {
      id: this.id
    };
    this.authService.post('cc.php', param).subscribe((data: any) => {
      console.log(data);
      this.loaded = true;
      if (data && data.status === 200 && data.data.length > 0) {
        const info = data.data;
        const info1 = data.data[0];
        console.log(info);
        //this.orderDetail = JSON.parse(info.notes);
        //console.log('driver???? ======>', this.orderDetail);
        
        this.status = info.status;
        console.log('order status--------------------', this.status);

       this.orders = info;
       console.log(this.orders);
       this.text = info1.adDescription;
       this.imgurl = this.mediaURL + info1.fileUrl;
  
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

  renew(val) {
    const navData: NavigationExtras = {
      queryParams: {
        id: val.adid
      }
    }
    this.router.navigate(['/tabs/tab1/renew'], navData);
  }

}
