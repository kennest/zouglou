import {Component, ViewChild, ElementRef} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker
} from "@ionic-native/google-maps";


declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(private _googleMaps: GoogleMaps, private _geolocation: Geolocation) {

  }

  ionViewDidLoad(){

    let loc:LatLng;
    this.initMap();

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{

      this.getLocation().then(res=>{
        loc=new LatLng(res.coords.latitude,res.coords.longitude);
        this.moveCamera(loc);
      }).catch(err=>{
        console.log(err);
      });

    });
  }

  initMap() {
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element);
  }

  getLocation(){
    return this._geolocation.getCurrentPosition();
  }

  moveCamera(loc:LatLng){
    let cameraPos: CameraPosition<any>={
    target:loc,
      zoom:15,
      tilt:10,
    };

    this.map.moveCamera(cameraPos);
  }

  placeMarker(loc:LatLng){
    let marker:Marker;
    marker.setPosition(loc);
  }
}
