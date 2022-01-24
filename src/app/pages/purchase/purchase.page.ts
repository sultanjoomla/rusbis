import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from '../../services/util.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  public userDetails: any;
  dummy: any[] = [];
  orders: any[] = [];
  mediaURL;

  constructor(public authService: AuthService,private router: Router,public util: UtilService,private printer: Printer) { 
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
    this.authService.post('history1.php', param).subscribe((data: any) => {
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
              console.log(element.id, '=>', order.status);
              if (order.status && order.status !== '' && typeof order.status === 'string') {
                console.log('strings', element.id);
                order.ctype = JSON.parse(order.ctype);
                console.log(order['status']);
                if (order["status"] === undefined) {
                  order['status'] == 'Not Paid';
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

  // printOrder() {
  //   console.log('print receipt');
  //   const options: PrintOptions = {
  //     name: 'RentUrStatus Summary',
  //     duplex: false,
  //   };
  //   const order = this.orderString.join('');
  //   const content = '<div style="padding: 20px;display: flex;flex-direction: column;"> <h2 style="text-align: center;">RentUrStatus Payment Summary</h2> <p style="float: left;margin:0px;"><b>' + this.userDetails.username + '</b></p> <p style="float: left;margin:0px;"><b> ' + this.userDetails.email + ' </b></p> <p style="float: left;margin:0px;">' + this.orders[0].created_at + ' </p> </div>' + order
  //     + '<p style="border-bottom: 1px solid black;margin:10px 0px;"> <span style="float: left;font-weight: bold;">Campaign Type</span> <span style="float: right;font-weight: bold; text-transform: capitalize;">' + this.orders[0].ctype +
  //     '</span> </p> <br><p style="border-bottom: 1px solid black;margin:10px 0px;"> <span style="float: left;font-weight: bold;">Campaign Title</span> <span style="float: right; text-transform: capitalize;">' + this.orders[0].adTitle +
  //     '</span> </p> <br> <p style="border-bottom: 1px solid black;margin:40px 0px;"> <span style="float: left;font-weight: bold;">Campaign Description</span> <span style="float: right; text-transform: capitalize;">' + this.orders[0].adDescription +
  //     '</span> </p> <br> <p style="border-bottom: 1px solid black;margin:10px 0px;"> <span style="float: left;font-weight: bold;">Campaign Balance</span> <span style="float: right;font-weight: bold;">₦' + this.orders[0].campaignBalance +
  //     '</span> </p> <br> <p style="border-bottom: 1px solid black;margin:10px 0px;"> <span style="float: left;font-weight: bold;">Total Amount Paid</span> <span style="float: right;font-weight: bold;">₦' + this.orders[0].amount + '</span> </p>';
  //   console.log(content);
  //   this.printer.print(content, options).then((data) => {
  //     console.log(data);
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }

  goToOrder(val) {
    const navData: NavigationExtras = {
      queryParams: {
        item: val.adid
      }
    }
    this.router.navigate(['/invoice'], navData);
  }

  doRefresh(event) {
    console.log(event);
    this.getOrders(event, true);
  }


}
