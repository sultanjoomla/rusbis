import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';
import { StatePage } from '../state/state.page';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  coverImage: any = '';
  isLogin: boolean  = false;
  isNew: boolean;
  
  public userDetails: any;
  mediaURL;

  bphone: any = '';
  baddress: any = '';
  binfo: any = '';
  id: any = '';
  st: any = '';
  edit_flag: boolean;
  ccCode: any = '';
  countries: any[] = [];
  dummy: any[] = [];
  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController, private camera: Camera,
    private fileTransfer: FileTransferObject,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    public util: UtilService,
    public api: AuthService) { 
      const data = JSON.parse(localStorage.getItem("User"));
      this.dummy = this.util.state;
      this.userDetails = data;
      this.mediaURL = `https://renturstatus.com/api/pay/logo/`+this.userDetails.id+`/`;
      this.isNew = true;
      this.edit_flag = true;
      this.id = this.userDetails.bid;
      this.coverImage = this.userDetails.image;
    this.getVenue();
    }

    getVenue() {
      const param = {
        id: this.id
      };
      this.util.show();
      this.api.post('binfo.php', param).subscribe((datas: any) => {
        console.log(datas);
        this.util.hide();
        if (datas && datas.status === 200 && datas.data.length) {
          const info = datas.data[0];
          console.log('-------->', info);
          this.bphone = info.bphone;
          this.binfo = info.binfo;
          this.baddress = info.baddress;
          this.ccCode = info.bstate;
          //this.cover = info.blogo;
        } else {
          this.util.errorToast(this.util.getString('Something went wrong'));
        }
      }, error => {
        this.util.hide();
        console.log(error);
        this.util.errorToast(this.util.getString('Something went wrong'));
      });
    }

  ngOnInit() {
  }

  onCountryInput(events) {
    console.log(events.detail.value);
    if (events.value !== '') {
      this.countries = this.dummy.filter((item) => {
        return item.name.toLowerCase().indexOf(events.detail.value.toLowerCase()) > -1;
      });
    } else {
      this.countries = [];
    }
  }

  selectedCC(item) {
    this.countries = [];
    console.log(item);
    this.ccCode = '+' + item.name;
  }

  create() {

    const param = {
     
      cover: this.coverImage,
      bphone: this.bphone,
      binfo: this.binfo,
      baddress: this.baddress,
      state: this.ccCode,
      bid: this.userDetails.id
 
    };
    this.isLogin = true;
    console.log('*****', param);

    this.util.show();
    this.api.post('binsert.php', param).subscribe((data: any) => {
      this.isLogin = false;
      console.log(data);
      this.util.hide();
      if (data && data.status === 200) {
        this.util.showToast(this.util.getString(``+data.message), 'success', 'bottom');
        this.navCtrl.back();
      } else {
        this.util.errorToast(this.util.getString('Something went wrong'));
      }
    }, error => {
      this.isLogin = true;
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong'));
      console.log('error', error);
    });
  }

  select() {
    this.navCtrl.navigateForward('/state');
  }

  submit() {

    if (!this.bphone || this.bphone === '') {
      this.util.errorToast(this.util.getString('Please enter phone number'));
      return false;
    }
    if (!this.baddress || this.baddress === '') {
      this.util.errorToast(this.util.getString('Please enter business address'));
      return false;
    }
    if (!this.coverImage || this.coverImage === '') {
      this.util.errorToast(this.util.getString('Please add business logo'));
      return false;
    }
    if (!this.binfo || this.binfo === '') {
      this.util.errorToast(this.util.getString('Please add business description'));
      return false;
    }
    if (this.isNew) {
      console.log('new');
      this.create();
    } else {
      console.log('update');
      this.update();
    }
  }

  update() {

   
    const param = {
      cover: this.coverImage,
      bphone: this.bphone,
      binfo: this.binfo,
      baddress: this.baddress,
      bid: this.userDetails.id,
      state: this.ccCode
    };

    console.log('*****', param);
    this.isLogin = true;
    this.util.show();
    this.api.post('bupdate.php', param).subscribe((data: any) => {
      this.isLogin = false;
      console.log(data);
      this.util.hide();
      if (data && data.status === 200) {
        this.util.showToast(this.util.getString('Business information updated successfully'), 'success', 'bottom');
        this.navCtrl.back();
      } else {
        this.util.errorToast(this.util.getString('Something went wrong'));
      }
    }, error => {
      this.isLogin = true;
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong'));
      console.log('error', error);
    });
  }

  async cover() {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'md',
      buttons: [{
        text: 'Camera',
        role: 'camera',
        icon: 'camera',
        handler: () => {
          console.log('Camera clicked');
          this.upload('camera');
        }
      },
      {
        text: 'Gallery',
        role: 'gallery',
        icon: 'image',
        handler: () => {
          console.log('Gallery clicked');
          this.upload('gallery');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async openCountry() {
    //console.log('open ccode');
    const modal = await this.modalCtrl.create({
      component: StatePage,
      backdropDismiss: false,
      showBackdrop: true,
    });
    modal.onDidDismiss().then((data) => {
      //console.log(data);
      if (data) {
        console.log('ok');
        this.ccCode = data.data;
        console.log(this.ccCode);
      }
    });
    await modal.present();
  }

  upload(type) {
    try {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: type === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
      };
      this.camera.getPicture(options).then((url) => {
        console.log('url->', url);
        this.util.show();
        const alpha = {
          img: url,
          type: 'jpg',
          bid: this.userDetails.id
        };
        console.log('parma==>', alpha);
        this.api.nativePost('uploadlogo.php', alpha).then((data) => {
          this.util.hide();
          console.log('data', JSON.parse(data.data));
          const info = JSON.parse(data.data);
          this.coverImage = info;
          console.log('cover image', this.coverImage);
        }, error => {
          console.log(error);
          this.util.hide();
          this.util.errorToast(this.util.getString('Something went wrong'));
        }).catch(error => {
          console.log(error);
          this.util.hide();
          this.util.errorToast(this.util.getString('Something went wrong'));
        });
      });

    } catch (error) {
      console.log('error', error);
    }
  }

}
