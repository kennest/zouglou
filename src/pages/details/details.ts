import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from "@angular/http";
import { DataProvider } from '../../providers/data/data';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  event: any;
  id: number;
  public similar: any;
  public similarevents=[];
  resUrl: string = 'https://zouglou-rest.herokuapp.com/uploads/';
  constructor(public navCtrl: NavController, private data: DataProvider, private navparams: NavParams, private load: LoadingController, private stream: StreamingMedia) {
    this.init();
  }

  init() {
    this.similarevents=[];
    this.event = this.navparams.get('event');
    this.data.getSimilarEvents(this.event.place.address.commune)
      .then(data => {
        this.similar = data;
        console.log("similar:", this.similar);
      for(var i=0;i<(this.similar.length);i++){
        this.similar[i].events.forEach(e => {
       this.similarevents.push(e);
       console.log("push"+i, e.title);
        });
      }
      console.log("similar-2:", this.similarevents);
      });
  }

  ionViewDidLoad() {
    this.event = this.navparams.get('event');
    console.log('Details log:', this.event);
  }
  showDetails(event) {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event, 'query': event.place.address.commune });
    } catch (e) {
      console.log(e);
    }
  }
  streamAudio(url: string) {
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      initFullscreen: false,
    };
    this.stream.playAudio(url, options);
  }

  stopStream() {
    this.stream.stopAudio()
  }
}
