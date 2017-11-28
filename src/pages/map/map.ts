import { DetailsPage } from './../details/details';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from './../../providers/data/data';

declare const google;
var markers = [];
var resUrl = 'https://zouglou-rest.herokuapp.com/uploads/';
var panel;
var initialize;
var calculate;
var direction;
var mypos;
var places;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public places: any;
  constructor(public platform: Platform, public navCtrl: NavController, private _geolocation: Geolocation, public data: DataProvider, public alert: AlertController) {
    this.data.getPlaces()
      .then(data => {
        places = data;
      });
      this.platform.ready().then(() => {
      this.locateMe();
    });
  }
  ionViewDidLoad(){
   this.loadMap();
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

  addPlaceMarkers() {
    for (let key in places) {
     var coord={
       lat:Number(places[key].address.lat),
       lng:Number(places[key].address.long)
      };
     this.placeMarker(coord, places[key]);
    }
  }

  placeMarker(loc: any, places) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: loc,
      title: places.title,
      animation: google.maps.Animation.BOUNCE
    });

    var infowindow = new google.maps.InfoWindow({
      content: "<div><h4>" + places.events[0].title + " à *" + places.title + "*</h4><img src=" + resUrl + places.picture + " /><p>" + places.events[0].description + "</p>"
        + "<button ion-button full color='primary'>Voir details</button>"
        + "</div>"
    });

    marker.addListener('dblclick', function () {
      infowindow.open(this.map, marker);
    });

    marker.addListener('click', function () {
      calculate(mypos, marker.getPosition());
    });


    direction = new google.maps.DirectionsRenderer({
      map: this.map,
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
        map: this.map,
        position: latLng,
        title: 'Votre Position',
        animation: google.maps.Animation.BOUNCE,
        icon: image
      });

    }, (err) => {
      console.log(err);
    });
  }

  //Affiche le trajet jusqu'a un point

}