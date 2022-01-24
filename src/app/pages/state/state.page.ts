import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from '../../services/util.service'

@Component({
  selector: 'app-state',
  templateUrl: './state.page.html',
  styleUrls: ['./state.page.scss'],
})
export class StatePage implements OnInit {
  countries: any[] = [];
  dummy: any[] = [];
  cc: any;
  ccCode: any = '';

  dummyLoad: any[] = [];

  constructor( private modalCtrl: ModalController,
    public util: UtilService) { 
      this.dummyLoad = Array(10);
      setTimeout(() => {
        this.dummyLoad = [];
        this.dummy = this.util.state;
        this.countries = this.dummy;
        console.log(this.dummy);
      }, 500);
    }

  ngOnInit() {
  }
  close() {
    this.modalCtrl.dismiss();
  }

  onSearchChange(events) {
    console.log(events);
    if (events.value !== '') {
      this.countries = this.dummy.filter((item) => {
        return item.name.toLowerCase().indexOf(events.detail.value.toLowerCase()) > -1;
      });
    } else {
      this.countries = [];
    }
  }

  okay() {
    console.log(this.ccCode);
    this.modalCtrl.dismiss(this.ccCode, 'selected');
  }

}
