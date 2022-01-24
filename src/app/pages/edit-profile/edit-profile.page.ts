import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public userDetails: any;
  btnText = 'Edit Profile';
  constructor(private navCtrl: NavController) { 
    const data = JSON.parse(localStorage.getItem("User"));
    this.userDetails = data[0];
  }

  ngOnInit() {
  }

  EditProfile() {
    if (this.btnText === 'Edit Profile') {
      this.btnText = 'Save';
    } else {
      this.btnText = 'Edit Profile';
    }
  }

  goBack() {
    this.navCtrl.back();
  }

}
