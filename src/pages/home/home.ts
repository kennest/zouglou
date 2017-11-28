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
    this.init();
  }

  ionViewDidLoad() {
    this.data.getInactiveEvents();
  }

  init() {
    this.data.getactiveEvents()
      .then(data => {
        this.events = data;
      });

    this.data.getInactiveEvents()
      .then(data => {
        this.inactiveevents = data;
      });
  }

  showDetails(event) {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event, 'query': event.place.address.commune });
    } catch (e) {
      console.log(e);
    }
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      //Filtre événements d'actualités
      this.events = this.events.filter((item) => {
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.place.title.toLowerCase().indexOf(val.toLowerCase()) > -1||
          item.place.address.commune.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.place.address.quartier.toLowerCase().indexOf(val.toLowerCase()) > -1){
          return true
        }
        return false
      });

      //Filtre evenements depassés
      this.inactiveevents = this.inactiveevents.filter((item) => {
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.place.title.toLowerCase().indexOf(val.toLowerCase()) > -1||
          item.place.address.commune.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.place.address.quartier.toLowerCase().indexOf(val.toLowerCase()) > -1){
          return true
        }
        return false
      });


    } else {
      this.init();
    }
  }
}
