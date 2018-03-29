import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";
import { LoginServiceProvider } from "./loginService";

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

  createNewPost(newPostName: string, groupId: string, newPostText) {
    if (newPostName != undefined ) {
      if(newPostText == undefined){
        newPostText = "";
      }
      let fireList = this.database.list("groups/" + groupId + '/posts/');
      let newMod = fireList.push({ name: newPostName, createDTM: Date.now(), text: newPostText});
    }
  }

  getMyGroupPosts(group:any){
    let fireList = null;
    group.forEach(s =>{
      fireList = this.database.list('groups/' + s.key)
    })
    return fireList.snapshotChanges();
  }
  

  getMyGroups(user:any) {
    if (user.value === null) {
      console.log("not authenticated :(");
      return;
    } else {
      console.log("you are authenticated! " + user.uid);
    }
    let fireList = this.database.list('userGroups/' + user.uid);

    return fireList.snapshotChanges();
  }

  createNewGroup(newGroupName: string) {
    console.log("create " + newGroupName);
    if (newGroupName != undefined) {
      let fireList = this.database.list('groups/');
      let newMod = fireList.push(newGroupName);
      newMod.set({ group: newGroupName, events: '' });
    }
  }

  deleteGroup(groupKey: any) {
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

  createUserGroup(groupKey: any) {
    if (this.loginService.user.value === null) {
      console.log("not authenticated - cant add group");
      return;
    }

    if (groupKey != undefined) {

      // should check to see if it exists

      let fireList = this.database.list('userGroups/' + this.loginService.user.uid);
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

  public createNewEvent(newEventName: string, groupId: string) {
    console.log("create " + newEventName);
    if (newEventName != undefined) {
      let fireList = this.database.list("groups/" + groupId + '/events/');
      let newMod = fireList.push(newEventName);
      newMod.set({ name: newEventName, createDTM: Date.now() });
    }
  }

  public deleteEvent(eventKey: any, groupId: string) {
    let fireList = this.database.list("groups/" + groupId + "/events/" + eventKey);
    fireList.remove();
  }
}
