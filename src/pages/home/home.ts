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
  inactiveevents:any;
  url: string = 'https://zouglou-rest.herokuapp.com/';

  constructor(public navCtrl: NavController, public http: Http, public loader: LoadingController, public data: DataProvider) {
   
  }

  ionViewDidLoad(){
    this.data.getactiveEvents();
    this.data.getInactiveEvents();
    this.getActiveEvents();
    this.getInactiveEvents();
  }
  getActiveEvents() {
    this.events = this.data.events;
    console.log('active:', this.events);
  }

  getInactiveEvents(){
    this.inactiveevents=this.data.inactiveevents;
    console.log('inactive:', this.inactiveevents);
  }

  showDetails(event) {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event,'query':event.place.address.commune});
    } catch (e) {
      console.log(e);
    }
  }
}
