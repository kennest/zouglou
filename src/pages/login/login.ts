import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
code:any;
  constructor(public authService: AuthServiceProvider) {

  }

  login() {
    this.authService.login(this.code);
  }

  logout() {
    this.authService.logout();
  }
}
