import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import {DetailsPage} from "../pages/details/details";
import { SplashPage } from '../pages/splash/splash';
import { AboutPage } from '../pages/about/about';
import { artistListPage } from './../pages/artistList/artistList';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { DataProvider } from '../providers/data/data';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Network } from '@ionic-native/network';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    DetailsPage,
    SplashPage,
    AboutPage,
    artistListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    IonicModule.forRoot(MyApp,{
      mode: 'ios'
      }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    DetailsPage,
    artistListPage,
    SplashPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    StreamingMedia,
    AndroidPermissions,
    Network,
    { provide: ErrorHandler, useClass: IonicErrorHandler },{provide: LOCALE_ID, useValue: 'fr' },
    DataProvider,
  ]
})
export class AppModule { }
