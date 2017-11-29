import { NavController,NavParams,ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataProvider } from './../../providers/data/data';

@Component({
  selector: 'artist-list',
  templateUrl: 'artistList.html'
})
export class artistListPage {
   public artists: any;
   public artist: any;
   public resUrl:string="https://zouglou-rest.herokuapp.com/uploads/";
  constructor(public data: DataProvider, public nav: NavController,public navparams:NavParams,public modalCtrl:ModalController) {
   this.init();
   this.artist=this.navparams.get('artist');
  }
  show(event,artist) {
    this.nav.push(artistListPage, {artist:artist});
  }

  presentArtist(artist) {
    let artistModal = this.modalCtrl.create(artistListPage, {artist:artist});
    artistModal.present();
  }

  init(){
    this.data.getArtists()
    .then(data => {
      this.artists = data;
      console.log("artists", data);
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
  this.artist=null;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.artists = this.artists.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }else{
      this.init();
    }
  }
}