import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  public url: string = 'https://zouglou-rest.herokuapp.com/';
  public places: any;
  public events: any;
  public inactiveevents: any;
  public similar: any;
  public artists: any;
  public artist: any;
  public place: any;
  public event: any;
  constructor(public http: Http, public loader: LoadingController) {
    console.log('Hello DataProvider Provider');
  }

  getPlaces() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/places')
        .map(res => res.json())
        .subscribe(data => {
          this.places = data;
          resolve(this.places);
          loader.dismiss();
        });
    });
  }

  getactiveEvents() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      return this.http.get(this.url + 'api/activeevents')
        .map(res => res.json())
        .subscribe(data => {
          this.events = data;
          resolve(this.events);
          loader.dismiss();
        });
    });
  }

  getInactiveEvents() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/inactiveevents')
        .map(res => res.json())
        .subscribe(data => {
          this.inactiveevents = data;
          resolve(this.inactiveevents);
          loader.dismiss();
        });
    });
  }

  getSimilarEvents(query: string) {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/similar/' + query)
        .map(res => res.json())
        .subscribe(data => {
          this.similar = data;
          resolve(this.similar);
          loader.dismiss();
        });
    });
  }

  getArtists() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/artists')
        .map(res => res.json())
        .subscribe(data => {
          this.artists = data;
          resolve(this.artists);
          loader.dismiss();
        });
    });
  }

  getArtist(id) {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/artist/' + id)
        .map(res => res.json())
        .subscribe(data => {
          this.artist = data;
          resolve(this.artist);
          loader.dismiss();
        });
    });
  }

  getEvent(id) {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/event/' + id)
        .map(res => res.json())
        .subscribe(data => {
          this.event = data;
          resolve(this.event);
          loader.dismiss();
        });
    });
  }

  getPlace(id) {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000,
      spinner:"dots"
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.url + 'api/place/' + id)
        .map(res => res.json())
        .subscribe(data => {
          this.place = data;
          resolve(this.place);
          loader.dismiss();
        });
    });
  }


}
