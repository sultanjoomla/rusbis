import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API_URL = 'http://localhost/ttrlogistics/';
  API_URL = 'https://renturstatus.com/api/pay/';
  constructor() { }
}
