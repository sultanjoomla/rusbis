import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToVerifyPhone() {
    this.router.navigate(['/verify-phone']);
  }

}
