import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetailsPage } from "../details/details";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places:any;
  events: any;
  url:string='https://zouglou-rest.herokuapp.com/';

  constructor(public navCtrl: NavController, public http: Http, public loader: LoadingController, public data: DataProvider) {
    this.data.getPlaces();
    this.getPlaces();
  }


  getPlaces() {
      this.places = this.data.places;
  }

  showDetails(event) {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event });
    } catch (e) {
      console.log(e);
    }
  }
}
