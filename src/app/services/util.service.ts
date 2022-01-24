
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
// import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    loader: any;
    isLoading = false;
    public translations: any[] = [];
    details: any;

    public state = [
        {id: 1, name:'Abia'},
        {id: 2, name: 'Adamawa'},
        {id: 3, name: 'Akwa Ibom'},
        {id: 4, name: 'Anambra'},
        {id: 5, name: 'Bauchi'},
        {id: 6, name: 'Bayelsa'},
        {id: 7, name: 'Benue'},
        {id: 8, name: 'Borno'},
        {id: 9, name: 'Cross River'},
        {id: 10, name: 'Delta'},
        {id: 11, name: 'Ebonyi'},
        {id: 12, name: 'Edo'},
        {id: 13, name: 'Ekiti'},
        {id: 14, name: 'Enugu'},
        {id: 15, name: 'FCT'},
        {id: 16, name: 'Gombe'},
        {id: 17, name: 'Imo'},
        {id: 18, name: 'Jigawa'},
        {id: 19, name: 'Kaduna'},
        {id: 20, name: 'Kano'},
        {id: 21, name: 'Katsina'},
        {id: 22, name: 'Kebbi'},
        {id: 23, name: 'Kogi'},
        {id: 24, name: 'Kwara'},
        {id: 25, name: 'Lagos'},
        {id: 26, name: 'Nasarawa'},
        {id: 27, name: 'Niger'},
        {id: 28, name: 'Ogun'},
        {id: 29, name: 'Ondo'},
        {id: 30, name: 'Osun'},
        {id: 31, name: 'Oyo'},
        {id: 32, name: 'Plateau'},
        {id: 33, name: 'Rivers'},
        {id: 34, name: 'Sokoto'},
        {id: 35, name: 'Taraba'},
        {id: 36, name: 'Yobe'},
        {id: 37, name: 'Zamfara'}
      ];

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private toastCtrl: ToastController,
        public router: Router,
        private navCtrl: NavController,
        private api: AuthService,
        private menuCtrl: MenuController
    ) {
    }

    /*
    Start Loader
    Call this method to Start your Loader
    */
    async show(msg?) {
        this.isLoading = true;
        return await this.loadingCtrl.create({
            message: msg,
            spinner: 'bubbles',
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async hide() {
        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }

    /*
      Show Warning Alert Message
      param : msg = message to display
      Call this method to show Warning Alert,
      */
    async showWarningAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: 'Warning',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    async showSimpleAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: '',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    /*
     Show Error Alert Message
     param : msg = message to display
     Call this method to show Error Alert,
     */
    async showErrorAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: 'Error',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    /*
       param : email = email to verify
       Call this method to get verify email
       */
    async getEmailFilter(email) {
        const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!(emailfilter.test(email))) {
            const alert = await this.alertCtrl.create({
                header: 'Warning',
                message: 'Please enter valid email',
                buttons: ['OK']
            });
            await alert.present();
            return false;
        } else {
            return true;
        }
    }

  


    /*
      Show Toast Message on Screen
       param : msg = message to display, color= background
       color of toast example dark,danger,light. position  = position of message example top,bottom
       Call this method to show toast message
       */

    showToast(msg, colors, positon) {
        this.translate(msg).then(async (data) => {
            const toast = await this.toastCtrl.create({
                message: data,
                duration: 2000,
                color: colors,
                position: positon
            });
            toast.present();
        });

    }

    async shoNotification(msg, colors, positon) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 4000,
            color: colors,
            position: positon,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

    errorToast(msg) {
        this.translate(msg).then(async (data) => {
            const toast = await this.toastCtrl.create({
                message: data,
                duration: 2000,
            });
            toast.present();
        });
    }

    apiErrorHandler(err) {
        // console.log('Error got in service =>', err)
        if (err.status === -1) {
            this.showErrorAlert('Failed To Connect With Server');
        } else if (err.status === 401) {
            this.showErrorAlert('Unauthorized Request!');
            this.navCtrl.navigateRoot('/login');
        } else if (err.status === 500) {
            this.showErrorAlert('Somethimg Went Wrong..');
        }
    }

    translate(str): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const value = this.translations[str];
            if (value && value !== undefined) {
                console.log('hope');
                resolve(value);
            } else {
                console.log('nope');
                resolve(str);
            }
        });
    }

    getString(str) {
        if (this.translations[str]) {
            return this.translations[str];
        }
        return str;
    }

    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
