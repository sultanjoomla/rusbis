import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  content: any;
  loaded: boolean;
  constructor(private router: Router,private alertCtrl: AlertController,private authService: AuthService,private navCtrl: NavController,public util: UtilService) {
    const param = {
      id: 2
    };
    this.loaded = false;
    this.authService.post('terms.php', param).subscribe((data: any) => {
      // console.log(data);
      this.loaded = true;
      if (data && data.status === 200 && data.data.length > 0) {
        const info = data.data[0];
        this.content = info.content;
        //console.log(this.content);
      }
    }, error => {
      console.log(error);
      this.loaded = true;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
   }

  ngOnInit() {
  }

  getContent() {
    return this.content;
  }

  back() {
    this.navCtrl.back();
  }

}
