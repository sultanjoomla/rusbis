import { Component, OnInit } from '@angular/core';
import { AlertController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  logout() {
   
    localStorage.clear();
    this.navCtrl.navigateRoot(['/login']);
  
  }
}
