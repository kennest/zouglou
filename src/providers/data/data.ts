import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular';
import {Http} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  url:'http://zouglou.herokuapp.com';
  artists: any;
  events: any;
  constructor(public http: Http,private load:LoadingController) {
    console.log('Hello DataProvider Provider');
  }


  public getAllArtists(){
    this.http.get('http://zouglou.herokuapp.com/consumer/artistsAll').map(res => res.json()).subscribe(data => {
      this.artists=data;
      return data;
      });

  }

}
