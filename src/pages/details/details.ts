import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from "@angular/http";
import { DataProvider } from '../../providers/data/data';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { AudioProvider, ITrackConstraint } from 'ionic-audio';
import { MapPage } from '../map/map';

var globTracks = [];
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  event: any;
  id: number;
  public similar: any;
  public similarevents = [];

  finaltracks: any[];
  allTracks: any[];
  currentIndex: number = -1;
  currentTrack: ITrackConstraint;
  resUrl: string = 'http://www.sciantonela.com/zouglou/public/uploads/';
  constructor(private _cdRef: ChangeDetectorRef, private _audioProvider: AudioProvider, public navCtrl: NavController, private data: DataProvider, private navparams: NavParams, private load: LoadingController, private stream: StreamingMedia) {
    this.init();
    this.event.artists.forEach(a => {
      let track = {
        src: this.resUrl + a.urlsample,
        artist: a.name,
        title: 'Extrait',
        art: this.resUrl + a.avatar,
        preload: 'none' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      };
      globTracks.push(track);
    });
    this.finaltracks = globTracks;
  }

  init() {
    this.similarevents = [];
    this.finaltracks = [];
    this.allTracks = [];
    globTracks = [];
    this.event = this.navparams.get('event');
    this.data.getSimilarEvents(this.event.place.address.commune)
      .then(data => {
        this.similar = data;
        for (var i = 0; i < (this.similar.length); i++) {
          this.similar[i].events.forEach(e => {
            this.similarevents.push(e);
          });
        }
      });
  }

  ionViewDidLoad() {
    this.event = this.navparams.get('event');
    this.allTracks = this._audioProvider.tracks;
  }
  showDetails(event) {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event, 'query': event.place.address.commune });
    } catch (e) {
      console.log(e);
    }
  }

  play(track: ITrackConstraint, index: number) {
    this.currentTrack = track;
    this.currentIndex = index;
  }

  next() {
    // if there is a next track on the list play it
    if (this.allTracks.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.allTracks.length - 1) {
      let i = this.currentIndex + 1;
      let track = this.allTracks[i];
      this.play(track, i);
      this._cdRef.detectChanges();  // needed to ensure UI update
    } else if (this.currentIndex == -1 && this.allTracks.length > 0) {
      // if no track is playing then start with the first track on the list
      this.play(this.allTracks[0], 0);
    }
  }

  onTrackFinished(track: any) {
    this.next();
  }

  clear() {
    this.allTracks = [];
  }

  showOnMap(place_id: number) {
    this.data.getOnePlace(place_id).then(data => {
      console.log("One Place:",data);
      this.navCtrl.push(MapPage, {'place':data});
    },
      err => {

      })
  }
}
