import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import {DetailsPage} from "../pages/details/details";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps} from "@ionic-native/google-maps";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data';
import{AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxwYBQWs7Kt0_r9-vTAvZ2ywfaCip4KAM'
    })
  ,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    DataProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
