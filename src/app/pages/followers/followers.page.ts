import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  public userDetails: any;
  dummy: any[] = [];
  orders: any[] = [];
  mediaURL;
  constructor(public authService: AuthService,private router: Router,public util: UtilService) { 
    const data = JSON.parse(localStorage.getItem('User'));
    this.userDetails = data;
    this.mediaURL = `https://renturstatus.com/api/pay/campaign/`+this.userDetails.bid+`/`;
  }

  ionViewWillEnter() {
    this.getOrders('', false);
  }

  getOrders(event, haveRefresh) {
    this.dummy = Array(15);
    this.orders = [];
    const param = {
      bid: this.userDetails.bid
    }
    this.authService.post('followers.php', param).subscribe((data: any) => {
      console.log(data);
      this.dummy = [];
      if (data && data.status === 200 && data.data.length > 0) {
        // this.orders = data.data;
        const orders = data.data;
        orders.forEach(element => {
          if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.orders)) {
            element.orders = JSON.parse(element.orders);
            element.created_at = moment(element.created_at).format('dddd, MMMM Do YYYY');
            element.orders.forEach(order => {
              console.log(element.id, '=>', order.ctype);
              if (order.ctype && order.ctype !== '' && typeof order.ctype === 'string') {
                console.log('strings', element.id);
                order.ctype = JSON.parse(order.ctype);
                console.log(order['ctype']);
                if (order["ctype"] === undefined) {
                  order['ctype'] == 'image';
                }
              }
            });
          }

        });
        this.orders = orders;
        if (haveRefresh) {
          event.target.complete();
        }
        console.log('orderss==>?', this.orders);
      }
    }, error => {
      console.log(error);
      this.dummy = [];
      this.orders = [];
      this.util.errorToast(this.util.getString('Something went wrong'));
    });
  }

  ngOnInit() {
  }

  goToOrder(val) {
    const navData: NavigationExtras = {
      queryParams: {
        id: val.adid
      }
    }
    this.router.navigate(['/tabs/tab1/pond'], navData);
  }

  doRefresh(event) {
    console.log(event);
    this.getOrders(event, true);
  }


}
