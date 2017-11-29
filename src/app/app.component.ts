import { AboutPage } from './../pages/about/about';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import {DetailsPage} from "../pages/details/details";
import { SplashPage } from '../pages/splash/splash';
import { artistListPage } from '../pages/artistList/artistList';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MapPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private permission:AndroidPermissions) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Liste des Evenements', component: HomePage },
      { title: 'Liste des Artistes', component: artistListPage },
      { title: 'Zouglou Maps', component: MapPage },
      { title: 'A-propos', component: AboutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.permission.requestPermissions([this.permission.PERMISSION.LOCATION_HARDWARE, this.permission.PERMISSION.INTERNET]);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  exitApp(){
    this.platform.exitApp();
 }
}
