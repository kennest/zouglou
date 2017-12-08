import { DetailsPage } from './../details/details';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from './../../providers/data/data';
import { NavParams } from 'ionic-angular/navigation/nav-params';

declare const google;
var resUrl = 'http://www.sciantonela.com/zouglou/public/uploads/';
var panel;
var calculate;
var direction;
var mypos;
var places;
var map;
var x = 0;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;

  public places: any;
  public oneplace: any;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private _geolocation: Geolocation,
    public data: DataProvider,
    public alert: AlertController,
    public navparams: NavParams
  ) {
    this.oneplace = this.navparams.get('place');
  }
  ionViewDidLoad() {
    this.init();
  }

  init() {
    if(this.oneplace){
      places = this.oneplace;
      this.places = places;
      this.loadOne();
      this.platform.ready().then(() => {
        this.locateMe();
      });
    }else{
    this.data.getPlaces()
      .then(data => {
        places = data;
        this.places = places;
        console.log("places:", places);
        this.loadMap();
        this.platform.ready().then(() => {
          this.locateMe();
        });
      });
  }
}

  loadMap() {
    let abidjan = { lat: 5.3306125, lng: -4.0206121 }
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: abidjan,
      mapTypeId: 'roadmap'
    });
    this.addPlaceMarkers();
    map.setCenter(abidjan);
  }

  loadOne(){
    let abidjan = { lat: 5.3306125, lng: -4.0206121 }
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: abidjan,
      mapTypeId: 'roadmap'
    });
    this.addOneplaceMarker();
    map.setCenter(abidjan);
  }

  addOneplaceMarker(){
    var coord = {
      lat: Number(places.address.lat),
      lng: Number(places.address.long)
    };
    console.log("coord", coord);
    this.placeMarker(coord, places);
  }
  addPlaceMarkers() {
    for (let key in places) {
      var coord = {
        lat: Number(places[key].address.lat),
        lng: Number(places[key].address.long)
      };
      console.log("coord", coord);
      this.placeMarker(coord, places[key]);
      x++;
    }
  }

  placeMarker(loc: any, places) {
    var marker = new google.maps.Marker({
      map: map,
      position: loc,
      title: places.title,
      animation: google.maps.Animation.BOUNCE
    });

    var infowindow = new google.maps.InfoWindow({
      content: this.genContent(places)

    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

    marker.addListener('click', function () {
      calculate(mypos, marker.getPosition());
    });


    direction = new google.maps.DirectionsRenderer({
      map: map,
      panel: panel
    });

    calculate = function (origin, destination) {
      origin = origin; // Le point départ
      destination = destination; // Le point d'arrivé
      if (origin && destination) {
        var request = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.DirectionsTravelMode.DRIVING // Type de transport
        }
        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function (response, status) { // Envoie de la requête pour calculer le parcours
          if (status == google.maps.DirectionsStatus.OK) {
            direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
          }
        });
      } //http://code.google.com/intl/fr-FR/apis/maps/documentation/javascript/reference.html#DirectionsRequest
    }
  }

  //DATA

  genContent(places: any) {
    var content = `<div style='float:left'><img id='infohead' height='80' width='80' src=${resUrl + places.picture} ></div>
 <div style='float:right; padding: 10px;'><b>${places.title}</b>
 <p>Evénement</p>
<p>${places.events[0].title}</p>
 </div>
<br/>${places.address.commune}<br/></div>`;
    return content;
  }

  showDetails(event): void {
    console.log(event);
    try {
      this.navCtrl.push(DetailsPage, { 'event': event });
    } catch (e) {
      console.log(e);
    }
  }

  locateMe() {
    this._geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      mypos = latLng;
      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: 'Votre Position',
        animation: google.maps.Animation.BOUNCE,
        icon: image
      });

    }, (err) => {
      console.log(err);
    });
  }

  filterEvent(ev: any) {
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      //Filtre 
      places = this.places.filter((item) => {
        var i = 0;
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.address.commune.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.events[i].artists[i].name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          i = +1;
          console.log(item);
          this.loadMap();
          this.locateMe();
          return true;
        }
        i = +1;
        return false;
      });
    } else {
      this.init();
    }
  }

  //Affiche le trajet jusqu'a un point

}