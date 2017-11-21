import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  event: any;
  id: number;

  constructor(public navCtrl: NavController, private http: Http, private navparams: NavParams, private load: LoadingController) {
    this.initData();
  }


  initData() {
    this.event = this.navparams.get('event');
    console.log(this.event);
  }
}
