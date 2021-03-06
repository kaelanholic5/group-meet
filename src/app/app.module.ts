import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { InterestPage } from '../pages/Interest/Interest';
import { SearchPage } from '../pages/search/search';
import { PostPage } from '../pages/Posts/Post';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { PopoverPage } from '../pages/popover/popover';
import { PopoverInterestPage } from '../pages/popover/popoverInterest';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/loginService';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import {MobileHomeDisplayService} from "../providers/mobileHomeDisplayControlService";
import {MobileGroupDisplayService} from "../providers/mobileGroupDisplayControlService";

import { AgmCoreModule } from '@agm/core';
import {AutosizeInput} from '../directives/autosize/autosizeinput';
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
import {InterestGroupServiceProvider} from "../providers/interestGroupService";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    EventsPage,
    SearchPipe,
    SortPipe,
    InterestPage,
    SearchPage,
    PopoverPage,
    PopoverInterestPage,
    PostPage,
    AutosizeInput
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGQUeBq2MTP30sc2gT8AHhDGsxlLOs_a8',
      libraries: [ 'places' ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    EventsPage,
    SearchPage,
    InterestPage,
    PopoverPage,
    PopoverInterestPage,
    PostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    AngularFireAuthProvider,
    InterestGroupServiceProvider,
    MobileHomeDisplayService,
    MobileGroupDisplayService
  ]
})



export class AppModule {}
