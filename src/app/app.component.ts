import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDWjx0pNw1BBJr1_qleUKO82KfnW18iBV8",
  authDomain: "eventconnector-adfe5.firebaseapp.com",
  databaseURL: "https://eventconnector-adfe5.firebaseio.com",
  projectId: "eventconnector-adfe5",
  storageBucket: "eventconnector-adfe5.appspot.com",
  messagingSenderId: "367579159576"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
