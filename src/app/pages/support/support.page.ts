import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from '../../services/util.service';
import { NavController, IonContent } from '@ionic/angular';
@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;
  id = "0";
  name: any;
  msg: any = '';
  messages: any[] = [];
  uid: any;
  loaded: boolean;
  yourMessage: boolean;
  interval: any;
  public userDetails: any;
  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,public util: UtilService,public authService: AuthService) { 
      const data = JSON.parse(localStorage.getItem('User'));
      this.userDetails = data;
      this.uid = this.userDetails.bid;
        this.loaded = false;
        this.name = this.userDetails.username;
        
      this.interval = setInterval(() => {
        console.log('calling in interval');
        this.getChats();
      }, 12000);
     
    }

    ionViewDidLeave() {
      console.log('leave');
      clearInterval(this.interval);
    }

  ngOnInit() {
  }

  getChats() {
    // store _ opponent
    const param = {
      id: this.id + '_' + this.uid,
      oid: this.id
    };
    this.authService.post('chatsread.php', param).subscribe((data: any) => {
      console.log(data);
      this.loaded = true;
      this.yourMessage = true;
      if (data && data.status === 200) {
        this.messages = data.data;
        this.myContent.scrollToBottom(300);
      }
    }, error => {
      console.log(error);
      this.loaded = true;
      this.yourMessage = true;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  back() {
    this.navCtrl.back();
  }

  sendMessage() {
    // store to opponent
    console.log(this.msg);
    if (!this.msg || this.msg === '') {
      return false;
    }
    const msg = this.msg;
    this.msg = '';
    const param = {
      room_id: this.id,
      uid: this.id + '_' + this.uid,
      from_id: this.uid,
      message: msg,
      message_type: 'business',
      status: 1,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    this.myContent.scrollToBottom(300);
    this.yourMessage = false;
    this.authService.post('chats.php', param).subscribe((data: any) => {
      console.log(data);
      if (data && data.status === 200) {
        this.getChats();
      } else {
        this.yourMessage = true;
      }
    }, error => {
      console.log(error);
      this.yourMessage = true;
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

}
