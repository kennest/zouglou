import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  ILatLng
} from "@ionic-native/google-maps";
import { DataProvider } from './../../providers/data/data';

declare const google;
var markers = [];
var resUrl = 'https://zouglou-rest.herokuapp.com/uploads/';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: any;

  constructor(private _googleMaps: GoogleMaps, private _geolocation: Geolocation, public data: DataProvider, public alert: AlertController) {
    this.data.getPlaces();
    this.getPlaces();
  }
  ionViewDidLoad() {
    this.loadMap();
  }

  ionViewWillEnter() {
    this.data.getPlaces();
  }

  loadMap() {
    let abidjan = { lat: 5.3306125, lng: -4.0206121 }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: abidjan,
      mapTypeId: 'roadmap'
    });
    this.addPlaceMarkers();
    this.map.setCenter(abidjan);
  }

  getLocation() {
    return this._geolocation.getCurrentPosition();
  }

  placeMarker(loc: any, title, infos, picture) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: loc,
      title: title,
      animation: google.maps.Animation.BOUNCE
    });

    var infowindow = new google.maps.InfoWindow({
      content: "<div><h4>" + title + "</h4><img src=" + picture + " /><p>" + infos + "</p>"
      +"<button ion-button full color='primary'>Voir details</button>"
      +"</div>"
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
  }

  //DATA
  public getPlaces() {
    this.places = this.data.places;
  }

  addPlaceMarkers() {
    console.log(this.places);
    for (let key in this.places) {
      var loc = { lat: Number(this.places[key].address.lat), lng: Number(this.places[key].address.long) };
      this.placeMarker(loc, this.places[key].title, this.places[key].events[0].description, resUrl + this.places[key].picture)
    }
  }
}