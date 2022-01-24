import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationExtras,Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {Base64} from "@ionic-native/base64/ngx";
import { FilePath } from '@ionic-native/file-path/ngx';
import { LoadingController} from '@ionic/angular';
import { VideoPage } from '../video/video.page';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";
const baseUrl = "https://renturstatus.com/api/pay";

@Component({
  selector: 'app-site',
  templateUrl: './site.page.html',
  styleUrls: ['./site.page.scss'],
})
export class SitePage implements OnInit {
  coverImage: any = '';
  isLogin: boolean  = false;
  mediaURL;
  public userDetails: any;
  ctitle: any = '';
  url: any='';
  amount: any='';
  sstatus: any='';
  bdescription: any='';
  isNew: boolean;
  ctype: any = 'image';
  selectedVideo: string;
  uploadedVideo: string;
  videoFileUpload: FileTransferObject;
  isUploading: boolean = false;
  uploadPercent: number = 0;
  imageURI: any;
  selectedVideo1: string;
  UriData: string;

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private modalCtrl: ModalController, private camera: Camera,
    private fileTransfer: FileTransferObject,
    private transfer: FileTransfer,
    private actionSheetCtrl: ActionSheetController,
    private file: File,
    public util: UtilService,private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public api: AuthService,private router: Router,private fileChooser: FileChooser,public base64: Base64,private filePath: FilePath) { 
      const data = JSON.parse(localStorage.getItem("User"));
      this.userDetails = data;
      this.mediaURL = `https://renturstatus.com/api/pay/campaign/`+this.userDetails.id+`/`;
      this.isNew = true;
      
    }

  ngOnInit() {
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

  proceed(){

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

    const navData: NavigationExtras = {
      queryParams: {
        cover: this.coverImage,
        ctitle: this.ctitle,
        url: this.url,
        amount: this.amount,
        bdescription: this.bdescription,
        bid: this.userDetails.bid,
        ctype: this.ctype,
        sstatus: this.sstatus

      }
    };

    console.log(navData);
        this.router.navigate(['/tabs/tab1/preview'], navData);

  }

  onClick(event){
 
    if(event.detail.checked){
      this.sstatus = 1;
    }
    else{
      this.sstatus = 0;                 
    }

    console.log(this.sstatus);
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
        this.api.nativePost('upload.php', alpha).then((data) => {
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



  async openCountry() {
    //console.log('open ccode');
    const modal = await this.modalCtrl.create({
      component: VideoPage,
      backdropDismiss: false,
      showBackdrop: true,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data) {
        console.log('ok');
        this.coverImage = data.data;
      }
    });
    await modal.present();
  }

  onCountryInput(events) {
    console.log(events.detail.value);
    if (events.detail.value === 'video') {
      this.openCountry();
    }
  }

  fileChoose(){
    // choose your file from the device
    let filter={ "mime": "video/*" } 
	this.fileChooser.open(filter).then(uri => {
		//alert('uri'+JSON.stringify(uri));
        // get file path
		this.filePath.resolveNativePath(uri)
		.then(file => {
			//alert('file'+JSON.stringify(file));
			let filePath: string = file;
			if (filePath) {
                // convert your file in base64 format
				this.base64.encodeFile(filePath)
                .then((base64File: string) => {
					//alert('base64File'+JSON.stringify(base64File));
          this.selectedVideo1 = base64File;

          this.util.show();
        const alpha = {
          img:  this.selectedVideo1,
          type: 'mp4',
          bid: this.userDetails.id
        };
        console.log('parma==>', alpha);
        this.api.nativePost('uploadvideo.php', alpha).then((data) => {
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
				}, (err) => {
          this.util.errorToast(this.util.getString(err));
				});
			}
		})
		.catch(err => console.log(err));
	})
	.catch(e =>  this.util.errorToast(this.util.getString(e)));
  }


}
