import { LoginPage } from './../login/login';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {

  constructor(public authService: AuthServiceProvider, public navCtrl: NavController) {

  }
  ionViewCanEnter() {
    //this.navCtrl.setRoot(LoginPage);
    //return this.authService.authenticated();
    if(this.authService.authenticated()) { // Allow entrance if there is a token (or any other validation)
      return true;
    }

    this.navCtrl.setRoot('LoginPage');    // LoginPage is my rootPage/default
    return false;

  }

}
