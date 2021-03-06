import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginServiceProvider {

  user: any = null;
  loggedIn: boolean = false;
  constructor(public ang: AngularFireAuth) {
  }

  login() {
     return Observable.fromPromise(this.ang.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => { this.user = res.user;console.log(res.user); console.log(res.user.uid); this.loggedIn = true; })
      .catch(res => { this.loggedIn = false; }));
  }

  logout() {
    this.ang.auth.signOut().then( res => this.user = null );
  }

}
