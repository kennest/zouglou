import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailsPage} from "../details/details";
import {Http, Response} from "@angular/http";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  artists: any;
  events: any;
  url: string = 'http://zouglou.herokuapp.com/consumer/artistsAll';

  constructor(public navCtrl: NavController, public http: Http) {
    this.getArtists();
  }

  getArtists() {
    return new Promise(resolve => {
      this.http.get(this.url)
        .map(results => results.json())
        .subscribe(data => {
          this.artists = data;
          resolve(this.artists);
          console.log(this.artists);
        });
    });
  }

  showDetails(artist) {
    console.log(artist);
    try {
      this.navCtrl.push(DetailsPage, {'artist': artist});
    } catch (e) {
      console.log(e);
    }
  }
}
