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
  public inactiveevents:any;
  public similar: any;
  constructor(public http: Http, public loader: LoadingController) {
    console.log('Hello DataProvider Provider');
  }

  getPlaces() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000
    });
    loader.present();
    return this.http.get(this.url + 'api/places')
      .map(res => res.json())
      .subscribe(data => {
        this.places = data;
        loader.dismiss();
      });
  }

  getactiveEvents() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000
    });
    loader.present();
    return this.http.get(this.url + 'api/activeevents')
      .map(res => res.json())
      .subscribe(data => {
        this.events = data;
        console.log('active:', data);
        loader.dismiss();
      });
  }

  getInactiveEvents() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000
    });
    loader.present();
    return this.http.get(this.url + 'api/inactiveevents')
      .map(res => res.json())
      .subscribe(data => {
        this.inactiveevents = data;
        console.log('active:', data);
        loader.dismiss();
      });
  }

  getSimilarEvents(query: string) {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000
    });
    loader.present();
    return this.http.get(this.url + 'api/similar/' + query)
      .map(res => res.json())
      .subscribe(data => {
        this.similar = data;
        console.log('Similar:', this.similar);
        loader.dismiss();
      });
  }

  getArtists() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000
    });
    loader.present();
    return this.http.get(this.url + 'api/allartists')
      .map(res => res.json())
      .subscribe(data => {
        this.places = data;
        loader.dismiss();
      });
  }

}
