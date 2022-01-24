import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import {AuthService } from 'src/app/services/auth.service';
import { Policy } from '../../policy';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Rave, RavePayment, Misc } from 'rave-ionic4'; 
//import { RavePaymentData,RaveOptions  } from 'angular-rave';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  item: any;
  public policies: any;
  pol: any;
  mediaURL;
  loaded: boolean;
  //ref: any;
  public userDetails: any;
  //public public_key = 'pk_test_ba11de29f90ea61f2417cdcb39a79746375c9d92'; //Put your paystack Test or Live Key here
  //public channels = ['bank', 'card', 'ussd', 'qr'];
  public email: any;
  public amount;
  public random_id: any;

  constructor(private route: ActivatedRoute,
    private router: Router,private authService: AuthService,public util: UtilService,  private rave: Rave, 
    private ravePayment: RavePayment, 
    private misc: Misc,
    private iab: InAppBrowser) { 
      const data = JSON.parse(localStorage.getItem("User"));
      this.userDetails = data;
      this.email = this.userDetails.email;
      this.loaded = false;
      this.mediaURL = `https://renturstatus.com/api/pay/campaign/`+this.userDetails.bid+`/`;
    }

    paymentFailure() {
      this.util.errorToast(this.util.getString('Payment cancelled'));
    }
  
    // paymentSuccess(res: RavePaymentData) {
    //   const param = { 
    //     transid: res.tx_ref,
    //     email: this.userDetails.email 
    //   };
    //   console.log(res);
    //   this.util.show();
    //   this.authService.post('verifypayment.php', param).subscribe((data: any) => {
        
    //     console.log(data);
    //     this.util.hide();
    //     if (data && data.status === 200) {
    //       this.util.showToast(this.util.getString('Payment updated successfully'), 'success', 'bottom');
          
    //       this.router.navigate(['/tabs/tab1/harvest']);
    //     } else {
    //       this.util.errorToast(this.util.getString('Something went wrong'));
    //     }
    //   }, error => {
       
    //     this.util.hide();
    //     this.util.errorToast(this.util.getString('Something went wrong'));
    //     console.log('error', error);
    //   });
    //   // Verify the transaction
    // }
  
    paymentInit() {
      console.log('Payment about to begin');
    }

    

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('data=>', data);
      if (data.hasOwnProperty('item')) {
        this.item = data.item;
        //this.getOrder();
      }
    });

    this.authService.readPolicies2(this.item).subscribe((policies: Policy[])=>{
      this.policies = policies;
      this.pol = policies[0];
      
      this.loaded = true;
      console.log(this.policies);
      this.amount = this.pol.amount;
      this.random_id = this.pol.transid;
      console.log('amount=>', this.amount);
    })
  }

  ravePay() {
    this.rave.init(false, "FLWPUBK_TEST-ca9df908254c30e3979cc78324c720d9-X") //true = production, false = test
    .then(_ => {
      var paymentObject = this.ravePayment.create({
        customer_email: this.email,
        amount: +this.amount,
        customer_phone: "234099940409",
        currency: "NGN",
        txref: this.random_id,
        meta: [{
            metaname: "flightID",
            metavalue: "AP1234"
        }]
    })
      this.rave.preRender(paymentObject)
        .then(secure_link => {
          secure_link = secure_link +" ";
          const browser: InAppBrowserObject = this.rave.render(secure_link, this.iab);
          browser.on("loadstop")
              .subscribe((event: InAppBrowserEvent) => {
                if(event.url.indexOf('https://renturstatus.com/webhook.php') != -1) {
                  if(this.rave.paymentStatus('url') == 'failed') {
                    console.log("failed Message");
                  }else {
                    console.log("Transaction Succesful");

                  }
                  browser.close()
                }
              })
        }).catch(error => {
          // Error or invalid paymentObject passed in
          console.log ("error", error);
        })
    })

  }



  paymentDone(ref: any) {
    const param = { 
      transid: ref.reference,
      email: this.userDetails.email 
    };
    console.log(ref);
    this.util.show();
    this.authService.post('verifypayment.php', param).subscribe((data: any) => {
      
      console.log(data);
      this.util.hide();
      if (data && data.status === 200) {
        this.util.showToast(this.util.getString('Payment updated successfully'), 'success', 'bottom');
        
        this.router.navigate(['/tabs/tab1/harvest']);
      } else {
        this.util.errorToast(this.util.getString('Something went wrong'));
      }
    }, error => {
     
      this.util.hide();
      this.util.errorToast(this.util.getString('Something went wrong'));
      console.log('error', error);
    });
    console.log(ref) //ref contains the response from paystack after successful payment
  }

  //Event triggered if User cancel the payment
  paymentCancel() {
    //this.util.hide();
    this.util.errorToast(this.util.getString('Payment cancelled'));
    console.log('gateway closed')
  }

  

}
