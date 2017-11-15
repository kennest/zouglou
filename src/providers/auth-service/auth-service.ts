import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  data: any = {};
  token: any;
  private isLoggedIn = false;

  constructor(private http: Http) { }

  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login(code): void {
    var link = 'http://localhost:8000/login';
    var myData = JSON.stringify({ code: code });

    this.http.post(link, myData)
      .subscribe(data => {
        this.data.response = data["_body"];
        console.log("Oooops!");
      });
    this.isLoggedIn = true;
  }


  // Logout a user, destroy token and remove
  // every information related to a user
  logout(): void {
    this.isLoggedIn = false;
  }

  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated(): boolean {
    return this.isLoggedIn;
  }

}
