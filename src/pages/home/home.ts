import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/loginService';
import { Observable } from 'rxjs/Observable';
import { EventsPage } from '../events/events';

import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabaseModule, AngularFireDatabase,
  AngularFireList, AngularFireObject
} from 'angularfire2/database';
import * as firebase from 'firebase/app';

interface event {
  date: string;
  time: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  groups: any[];
  myGroups: any[];
  eventsForGroups: any[] = [];
  database: AngularFireDatabase;
  userId: string;

  constructor(public navCtrl: NavController,
    public af: AngularFireDatabase,
    public navParams: NavParams,
    public loginService: LoginServiceProvider) {
    this.database = af;
    this.getGroups();
    //this.groups.forEach(g => 
    // this.getEvents(g));
  }

  getMyGroups() {
    if (this.loginService.user.value === null) {
      console.log("not authenticated :(");
      return;
    } else {
      console.log("you are authenticated! " + this.loginService.user);
    }
    let fireList = this.database.list('userGroups/' + this.loginService.user);

    fireList.snapshotChanges().subscribe(s => {
      this.myGroups = s;
      s.forEach(groupId => console.log(groupId.payload.val().groupName));
    });
  }

  getGroups() {
    let fireList = this.database.list('groups/');

    console.log("getting groups");
    fireList.snapshotChanges().subscribe(s => {
      this.groups = s;
    });
  }

  ionViewDidLoad() {
  }

  public getEvents(groupKey: any) {
    //this.navCtrl.parent.select(1);
    this.navCtrl.push(EventsPage, { 'groupId': groupKey.key });
  }

  public createNewGroup(newGroupName: string) {
    console.log("create " + newGroupName);
    if (newGroupName != undefined) {
      let fireList = this.database.list('groups/');
      let newMod = fireList.push(newGroupName);
      newMod.set({ group: newGroupName, events: '' });
    }
  }

  public deleteGroup(groupKey: any) {
    let fireList = this.database.list('groups/' + groupKey.key);
    fireList.remove();

    //delete user group references
    fireList = this.database.list('userGroups');
    fireList.snapshotChanges().subscribe(
      snapshots => {
        snapshots.forEach(s => {
          s.payload.forEach(x => {
            if (x.val().groupKey === groupKey.key) {
              this.database.object('userGroups/' + s.key + '/' + x.key).remove();
            }
          });
        }
        );
      }
    );
  }

  public createUserGroup(groupKey: any) {
    if (this.loginService.user.value === null) {
      console.log("not authenticated - cant add group");
      return;
    }

    if (groupKey != undefined) {

      // should check to see if it exists

      let fireList = this.database.list('userGroups/' + this.loginService.user);
      let newMod = fireList.push(groupKey.key);
      newMod.set({
        groupKey: groupKey.key,
        groupName: groupKey.payload.val().group
      });
    }
  }
}
