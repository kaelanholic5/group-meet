import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { Interest} from '../pages/Interest/Interest';
import { Post } from '../pages/Posts/Post';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/loginService';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

const config = {
  apiKey: "AIzaSyDWjx0pNw1BBJr1_qleUKO82KfnW18iBV8",
  authDomain: "eventconnector-adfe5.firebaseapp.com",
  databaseURL: "https://eventconnector-adfe5.firebaseio.com",
  projectId: "eventconnector-adfe5",
  storageBucket: "eventconnector-adfe5.appspot.com",
  messagingSenderId: "367579159576"
};

import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    EventsPage,
    SearchPipe,
    SortPipe,
    Interest,
    Post
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    EventsPage,
    Interest
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    AngularFireAuthProvider
  ]
})



export class AppModule {}
