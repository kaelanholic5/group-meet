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
      public interestGroupService: InterestGroupServiceProvider,
      public loginService: LoginServiceProvider) {
    this.database = af;
    this.interestGroupService.getAllGroups().subscribe(s => {
      this.interestGroups = s;
    });
  }

  goToInterestPage(groupKey: any) {
    this.navCtrl.push(InterestPage, { 'groupId': groupKey.key });
  }

  createUserGroup(group: any) {
    this.interestGroupService.createUserGroup(group);
  }
  createNewGroup(group: any) {
    this.interestGroupService.createNewGroup(group);
  }

  deleteGroup(group: any){
    this.interestGroupService.deleteGroup(group);
  }

}
