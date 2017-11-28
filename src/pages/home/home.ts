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
  places: any;
  events: any;
  inactiveevents: any;
  url: string = 'https://zouglou-rest.herokuapp.com/';

  constructor(public navCtrl: NavController, public http: Http, public loader: LoadingController, public data: DataProvider) {
    this.data.getactiveEvents()
      .then(data => {
        this.events = data;
      });

      this.data.getInactiveEvents()
      .then(data => {
        this.inactiveevents = data;
      });
  }

  ionViewDidLoad() {
    this.data.getInactiveEvents();
  }

  showDetails(event) {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event, 'query': event.place.address.commune });
    } catch (e) {
      console.log(e);
    }
  }
}
