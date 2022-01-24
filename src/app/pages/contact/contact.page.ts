import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationExtras,Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';
import { File } from '@ionic-native/file/ngx';
import { LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public userDetails: any;
  username: any='';
  email: any='';
  message: any='';
  isLogin: boolean  = false;
  isNew: boolean;

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private modalCtrl: ModalController, private camera: Camera,
    private fileTransfer: FileTransferObject,
    private transfer: FileTransfer,
    private actionSheetCtrl: ActionSheetController,
    private file: File,
    public util: UtilService,private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public api: AuthService,private router: Router) { 
      const data = JSON.parse(localStorage.getItem("User"));
      this.userDetails = data;
      this.username= this.userDetails.username;
      this.email=this.userDetails.email;
      this.isNew = true;
    }

  ngOnInit() {
  }

  create() {

    const param = {
     
      bid: this.userDetails.bid,
      email: this.email,
      fname: this.username,
      message: this.message
 
    };
   
    console.log('*****', param);
  
    this.isLogin = true;
    this.util.show();
    this.api.post('contact.php', param).subscribe((data: any) => {
      this.isLogin = false;
      console.log(data);
      this.util.hide();
      if (data && data.status === 200) {
        this.util.showToast(this.util.getString('Message submitted successfully'), 'success', 'bottom');
        this.message='';
        this.router.navigate(['/tabs/tab4']);
      } else {
        this.util.errorToast(this.util.getString('Something went wrong, try again later'));
      }
    }, error => {
      this.isLogin = true;
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong, try again later'));
      console.log('error', error);
    });
  }

  submit() {
   
    if (!this.message || this.message === '') {
      this.util.errorToast(this.util.getString('Please enter complain or enquiry'));
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

}
