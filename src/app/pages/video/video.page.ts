import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationExtras,Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';
import { File } from '@ionic-native/file/ngx';
import { LoadingController} from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";
const baseUrl = "https://renturstatus.com/api/pay";
@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  coverImage: any = '';
  selectedVideo: string;
  selectedVideo1: string;
  uploadedVideo: string;
  videoFileUpload: FileTransferObject;
  isUploading: boolean = false;
  uploadPercent: number = 0;
  public userDetails: any;
  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private modalCtrl: ModalController, private camera: Camera,
    private fileTransfer: FileTransferObject,
    private transfer: FileTransfer,
    private actionSheetCtrl: ActionSheetController,
    private file: File,
    public util: UtilService,private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public api: AuthService,private router: Router,private fileChooser: FileChooser,public filePath: FilePath, public base64: Base64) { 
      const data = JSON.parse(localStorage.getItem("User"));
      this.userDetails = data;
    }

  ngOnInit() {
  }


  
  // async cover1() {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     mode: 'md',
  //     buttons: [
  //     {
  //       text: 'Gallery',
  //       role: 'gallery',
  //       icon: 'image',
  //       handler: () => {
  //         console.log('Gallery clicked');
  //         this.upload1('gallery');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       icon: 'close',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }



  // upload1(type) {
  //   const options: CameraOptions = {
  //     mediaType: this.camera.MediaType.VIDEO,
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
  //   }

  //   this.camera.getPicture(options)
  //     .then( async (videoUrl) => {
  //       if (videoUrl) {
  //         //this.showLoader();
  //         this.util.show();
  //         this.uploadedVideo = null;
          
  //         var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
  //         var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

  //         dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
  //         try {
  //           var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
  //           var retrievedFile = await this.file.getFile(dirUrl, filename, {});

  //         } catch(err) {
  //           this.util.hide();
  //         this.util.errorToast(this.util.getString('No video file is selected'));
  //           //this.dismissLoader();
  //           //return this.presentAlert("Error","Something went wrong.");
  //         }
          
  //         retrievedFile.file( data => {
  //             //this.dismissLoader();
  //             this.util.hide();
         
  //             if (data.size > MAX_FILE_SIZE) return this.util.errorToast(this.util.getString('You cannot upload more than 10mb.'));
  //             if (data.type !== ALLOWED_MIME_TYPE) return this.util.errorToast(this.util.getString('Incorrect file type'));
  //             let win: any = window;
  //             this.selectedVideo = win.Ionic.WebView.convertFileSrc(retrievedFile.nativeURL);
  //             this.selectedVideo1 = retrievedFile.nativeURL;
  //         });




  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     });
  // }

  upload1() {
    let filter={ "mime": "video/*" } 

   this.fileChooser.open(filter).then(async (videoUrl) => {
        if (videoUrl) {
          //this.showLoader();
          this.util.show();
          this.uploadedVideo = null;
          
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
            this.util.hide();
          this.util.errorToast(this.util.getString('No video file is selected'));
            //this.dismissLoader();
            //return this.presentAlert("Error","Something went wrong.");
          }
          
          // retrievedFile.file( data => {
          //     //this.dismissLoader();
          //     this.util.hide();
         
          //     if (data.size > MAX_FILE_SIZE) return this.util.errorToast(this.util.getString('You cannot upload more than 10mb.'));
          //     if (data.type !== ALLOWED_MIME_TYPE) return this.util.errorToast(this.util.getString('Incorrect file type'));
          //     let win: any = window;
          //     this.selectedVideo = win.Ionic.WebView.convertFileSrc(retrievedFile.nativeURL);
          //     this.selectedVideo1 = retrievedFile.nativeURL;
          // });
          let win: any = window;
          this.selectedVideo = win.Ionic.WebView.convertFileSrc(retrievedFile.nativeURL);
          this.selectedVideo1 = retrievedFile.nativeURL;


        }
      },
      (err) => {
        console.log(err);
      });
  }

  cancelSelection() {
    this.selectedVideo = null;
    this.uploadedVideo = null;
  }
  uploadVideo() {
    
    var url = baseUrl +  "/uploadvideo.php";
    
    var filename1 = this.selectedVideo1;
      
    var options: FileUploadOptions = {
      fileName: filename1,
      fileKey: "video",
      mimeType: "video/mp4",
      params: {
        "bid": this.userDetails.id,
        "file": filename1

      }
    }
    console.log(options);
    this.videoFileUpload = this.transfer.create();

    this.isUploading = true;

    this.videoFileUpload.upload(this.selectedVideo1, url, options)
      .then((data)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        return JSON.parse(data.response);
      })
      .then((data) => {        
        this.uploadedVideo = data.data;
        //console.log(this.uploadedVideo);
        this.coverImage = this.uploadedVideo;
        this.modalCtrl.dismiss(this.coverImage);
        this.util.showToast(this.util.getString('Video uploaded successfully'), 'success', 'bottom');
      })
      .catch((err)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        this.util.errorToast(this.util.getString('Error while uploading video, try again'));
      });

    this.videoFileUpload.onProgress((data) => {
      this.uploadPercent = Math.round((data.loaded/data.total) * 100);
    });
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  cancelUpload() {
    this.videoFileUpload.abort();
    this.uploadPercent = 0;
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
					alert('err'+JSON.stringify(err));
				});
			}
		})
		.catch(err => console.log(err));
	})
	.catch(e => alert('uri'+JSON.stringify(e)));
  }
}
