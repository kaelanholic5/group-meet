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
  
    user: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(public ang: AngularFireAuth) {
    }
  
  
    public login() {
      this.ang.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => { this.user = res.user.uid; console.log(res.user)});
    }

}