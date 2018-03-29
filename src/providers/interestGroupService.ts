import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "angularfire2/database";
import {LoginServiceProvider} from "./loginService";

@Injectable()
export class InterestGroupServiceProvider {

  database: AngularFireDatabase;

  constructor(public af: AngularFireDatabase,
              public loginService: LoginServiceProvider) {
    this.database = af;
  }

  getAllGroups(): Observable<any> {
    let fireList = this.database.list('groups/');

    return fireList.snapshotChanges();
  }

  getGroup(groupId: string): Observable<any> {
    let fireList = this.database.object('groups/' + groupId);

    return fireList.snapshotChanges();
  }

  createNewPost(newPostName: string, groupId: string) {
    if (newPostName != undefined) {
      let fireList = this.database.list("groups/" + groupId + '/posts/');
      let newMod = fireList.push(newPostName);
      newMod.set({name: newPostName, createDTM: Date.now()});
    }
  }

  getPosts(groupId: string): Observable<any> {
    let fireList = this.database.list("groups/" + groupId + "/posts");

    return fireList.snapshotChanges();
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
      return s;
      //s.forEach(groupId => console.log(groupId.payload.val().groupName));
    });
  }

  createNewGroup(newGroupName: string) {
    console.log("create " + newGroupName);
    if (newGroupName != undefined) {
      let fireList = this.database.list('groups/');
      let newMod = fireList.push(newGroupName);
      newMod.set({group: newGroupName, events: ''});
    }
  }

  deleteGroup(groupKey: any) {
    let fireList = this.database.list('groups/' + groupKey.key);
    fireList.remove();

    //delete user group references
    fireList = this.database.list('userGroups');
    /*fireList.snapshotChanges().subscribe(
      snapshots => {
        snapshots.forEach(s => {
            s.payload.forEach(x => {
              if (x.val().groupKey === groupKey.key) {
                this.database.object('userGroups/' + s.key + '/' + x.key).remove();
              }
            });
          });
      }
    );*/
  }

  createUserGroup(groupKey: any) {
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

  getEvents(groupId: string): Observable<any> {
    let fireList = this.database.list("groups/" + groupId + "/events");

    return fireList.snapshotChanges();
  }

  createNewEvent(newEventName: string, newEventLocation: string, groupId: string) {
    console.log("create " + newEventName);
    if (newEventName != undefined) {
      let fireList = this.database.list("groups/" + groupId + '/events/');
      let newMod = fireList.push(newEventName);
      newMod.set({name: newEventName, location: newEventLocation, createDTM: Date.now()});
    }
  }

  deleteEvent(eventKey: any, groupId: string) {
    let fireList = this.database.list("groups/" + groupId + "/events/" + eventKey);
    fireList.remove();
  }
}
