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
import ThenableReference = firebase.database.ThenableReference;

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
      let fireList = this.database.list("groups/" + groupId + '/posts/');
      return fireList.push({ name: newPostName, createDTM: Date.now(), text: newPostText });

  }

  getPosts(groupId: string): Observable<any> {
    let fireList = this.database.list("groups/" + groupId + "/posts");

    return fireList.snapshotChanges();
  }

  getMyGroupPosts (groups: Array<any>): Array<any> {
    let myPosts = Array<any>();
    let counter: number = 0;
    groups.forEach(s => {
      let path = 'groups/' + s.payload.val().groupKey + '/posts';
      console.log(path);
      this.database.list(path).snapshotChanges().map(res => {
          res.forEach(s => {myPosts.push(s.payload.val()); });
          myPosts.sort(function(a,b){return b.createDTM - a.createDTM });
        }).toPromise().then(res => {console.log("sucess"); }).catch(res => {console.log("failure")});
    });
    return myPosts;
  }

  getMyGroupEvents (groups: Array<any>): Array<any> {
    let myEvents = Array<any>();
    let counter: number = 0;
    groups.forEach(s => {
      let path = 'groups/' + s.payload.val().groupKey + '/events';
      console.log(path);
      this.database.list(path).snapshotChanges().map(res => {
          res.forEach(s => {myEvents.push(s.payload.val()); });
          myEvents.sort(function(a,b){return b.createDTM - a.createDTM });
        }).toPromise().then(res => {console.log("sucess"); }).catch(res => {console.log("failure")});
    });
    return myEvents;
  }

  getMyGroups(user: any) {
    if (user.value === null) {
      console.log("not authenticated :(");
      return;
    } else {
      console.log("you are authenticated! " + user.uid);
    }
    console.log(user.uid);
    let fireList = this.database.list('userGroups/' + user.uid);

    return fireList.snapshotChanges();
  }

  createNewGroup(newGroupName: string) {
    console.log("create " + newGroupName);
    let fireList = this.database.list('groups/');
    let alreadyExists = false;
    if (newGroupName != undefined && newGroupName != '') {
      fireList.snapshotChanges().subscribe(s => {
        s.forEach(e => {
          console.log(e.payload.val().groupName);
          if (e.payload.val().groupName === newGroupName) {
            alreadyExists = true;
          }
        })
        if (!alreadyExists) {
          let newMod = fireList.push(newGroupName);
          newMod.set({ groupName: newGroupName, events: '' });
        }
      })
    }
  }

  deleteGroup(groupKey: any) {
    let fireList = this.database.list('groups/' + groupKey.key);
    fireList.remove();

    let fireObject = this.database.object('userGroups');
    fireObject.snapshotChanges().subscribe(s =>{
    console.log(s.payload.val());
    s.payload.forEach(e => {
        e.forEach(p => {
          if (p.val().groupKey === groupKey.key) {
            this.database.object('userGroups/' + e.key + '/' + p.key).remove();
          }
          return false;
        });
        return false;
      }
    )
    });
  }

  createUserGroup(groupKey: any) {
    if (this.loginService.user.value === null) {
      console.log("not authenticated - cant add group");
      return;
    }
    let fireList = this.database.list('userGroups/' + this.loginService.user.uid);
    let inUse = false;

    if (groupKey != undefined) {
      fireList.snapshotChanges().subscribe(
        snapshots => {
          snapshots.forEach(s => {
            s.payload.forEach(x => {
              if (x.val() === groupKey.key) {
                inUse = true;
              }
              return false;
            });
          });
          if (!inUse) {
            let newMod = fireList.push(groupKey.key);
            newMod.set({
              groupKey: groupKey.key,
              groupName: groupKey.payload.val().groupName
            });
          }
        })
    }
  }

  getEvents(groupId: string): Observable<any> {
    let fireList = this.database.list("groups/" + groupId + "/events");
    return fireList.snapshotChanges();
  }

  createNewEvent(groupId: string, name: string, location: string, date: string, time: string): ThenableReference {
      let fireList = this.database.list("groups/" + groupId + '/events/');
      return fireList.push({ name: name, location: location, date: date, time: time, createDTM: Date.now()});
  }

  deleteEvent(eventKey: any, groupId: string) {
    let fireList = this.database.list("groups/" + groupId + "/events/" + eventKey);
    fireList.remove();
  }
}
