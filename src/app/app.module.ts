import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import {DetailsPage} from "../pages/details/details";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps} from "@ionic-native/google-maps";
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    AdminPage,
    LoginPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    AdminPage,
    LoginPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    DataProvider
  ]
})
export class AppModule { }
