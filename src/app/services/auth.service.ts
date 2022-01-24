import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Policy } from '../policy';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //isLoggedIn = false;
  token:any;
  resposeData : any;
  redirectUrl: string;
  constructor(
    private http: HttpClient,
    //private storage: NativeStorage,
    private env: EnvService,
    private router: Router,
    private toastController: ToastController,
    private nativeHttp: HTTP
  ) { }

  // login(phone: String) {
  //   return this.http.post(this.env.API_URL + 'login.php',
  //     {phone: phone}
  //   ).pipe(
  //     tap(token => {
  //       this.storage.setItem('token', token)
  //       .then(
  //         () => {
  //           console.log('Token Stored');
  //         },
  //         error => console.error('Error storing item', error)
  //       );
  //       this.token = token;
  //       this.isLoggedIn = true;
  //       return token;
  //     }),
  //   );
  // }

  
public login(email,password) {
    return this.http.post<any>(this.env.API_URL + 'login.php', { email,password }, {withCredentials: true})
        .pipe(map(User => {
            //this.setToken(Usermodule[0].name);
            this.resposeData = User;
            console.log(this.resposeData);
                       localStorage.setItem('User', JSON.stringify(this.resposeData) )
             return User;
             //return Usermodule;
            //localStorage.setItem('Usermodule', Usermodule);
  }));
}

get(url) {
  const header = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Basic', `12345`)
  };
  return this.http.get(this.env.API_URL + url, header);
}


public recover(email) {
  return this.http.post<any>(this.env.API_URL + 'recover.php', { email })
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}

public userregistration(email1,mobile,name,password) {
  return this.http.post<any>(this.env.API_URL + 'registration.php', { email1,mobile,name,password })
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}

public pickup(fname1,fphone1,faddress1,long1,lat1) {
  return this.http.post<any>(this.env.API_URL + 'pickup.php', { fname1,fphone1,faddress1,long1,lat1 }, {withCredentials: true})
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}


public drop(fname2,fphone2,faddress2,long2,lat2) {
  return this.http.post<any>(this.env.API_URL + 'drop.php', { fname2,fphone2,faddress2,long2,lat2 }, {withCredentials: true})
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}

public courier(tcourier,distance,distance2,length,total,info,inf) {
  return this.http.post<any>(this.env.API_URL + 'courier.php', { tcourier,distance,distance2,length,total,info,inf }, {withCredentials: true})
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}

public verify(pin) {
  return this.http.post<any>(this.env.API_URL + 'verify.php', { pin})
      .pipe(map(Usermodule => {
          
          return Usermodule;
      }));
}


  user() {
   
    return this.http.get<User>(this.env.API_URL + 'user.php', { withCredentials: true })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  
getToken() {
  return localStorage.getItem('token');
}

public readPolicies1(): Observable<Policy[]>{
  return this.http.get<Policy[]>(`${this.env.API_URL}check.php`,
  {withCredentials: true});
}

public readPolicies(): Observable<Policy[]>{
  return this.http.get<Policy[]>(`${this.env.API_URL}orders2.php`,
  {withCredentials: true});
}

uploadFile(files: File[]) {
  const formData = new FormData();
  Array.from(files).forEach(f => formData.append('userfile', f));
  return this.http.post(this.env.API_URL + 'users/upload_image', formData);
}

nativePost(url, post) {
  console.log(this.env.API_URL + url, post);
  return this.nativeHttp.post(this.env.API_URL + url, post, {
    Basic: `123456`
    
  });
}

JSON_to_URLEncoded(element, key?, list?) {
  let new_list = list || [];
  if (typeof element === 'object') {
    for (let idx in element) {
      this.JSON_to_URLEncoded(
        element[idx],
        key ? key + '[' + idx + ']' : idx,
        new_list
      );
    }
  } else {
    new_list.push(key + '=' + encodeURIComponent(element));
  }
  return new_list.join('&');
}

post(url, body) {
  const header = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Basic', `12345`)
  };
  const param = this.JSON_to_URLEncoded(body);
  console.log(param);
  return this.http.post(this.env.API_URL + url, param, header);
}

public readPolicies4(): Observable<Policy[]>{
  return this.http.get<Policy[]>(`${this.env.API_URL}info.php`,
  {withCredentials: true});
}

public readPolicies2(item: String): Observable<Policy[]>{
  return this.http.get<Policy[]>(`${this.env.API_URL}cdetails.php?item=${item}`,
  {withCredentials: true});
}

public readPolicies3(item: String): Observable<Policy[]>{
  return this.http.get<Policy[]>(`${this.env.API_URL}tdetails.php?item=${item}`,
  {withCredentials: true});
}


payment(transid){
  return this.http.post<any>(this.env.API_URL + 'payment.php', { transid}, {withCredentials: true})
  .pipe(map(Usermodule => {
      return Usermodule;
  }));
}
payment2(transid){
  return this.http.post<any>(this.env.API_URL + 'payment2.php', { transid}, {withCredentials: true})
  .pipe(map(Usermodule => {
      return Usermodule;
  }));
}

payment3(transid){
  return this.http.post<any>(this.env.API_URL + 'payment3.php', { transid}, {withCredentials: true})
  .pipe(map(Usermodule => {
      return Usermodule;
  }));
}

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
}
