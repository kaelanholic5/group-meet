import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/loginService';
import { Observable } from 'rxjs/Observable';
import { InterestPage } from '../Interest/Interest';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase,
  AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {InterestGroupServiceProvider} from "../../providers/interestGroupService";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  interestGroups: any[];
  database: AngularFireDatabase;

  constructor(public navCtrl: NavController,
              public af: AngularFireDatabase,
              interestGroupService: InterestGroupServiceProvider) {
    this.database = af;
    console.log("getting groups");
    interestGroupService.getAllGroups().subscribe(s => {
       this.interestGroups = s;
    });
  }

  goToInterestPage(groupKey: any) {
    this.navCtrl.push(InterestPage, { 'groupId': groupKey.key });
  }

}
