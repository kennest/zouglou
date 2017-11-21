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
  public places:any;
  public events: any;

  constructor(public http: Http, public loader: LoadingController) {
    console.log('Hello DataProvider Provider');
    this.getPlaces();
  }

  getPlaces() {
    let loader = this.loader.create({
      content: 'Chargement des Informations...',
      duration: 8000
    });
    loader.present();
     return this.http.get(this.url + 'api/places')
      .map(res=>res.json())
        .subscribe(data => {
          this.places=data;
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
        .subscribe(data => {
          this.places=data;
          loader.dismiss();
        });


  }

}
