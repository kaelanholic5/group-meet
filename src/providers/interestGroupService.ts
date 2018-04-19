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
    if (newPostName != undefined) {
      if (newPostText == undefined) {
        newPostText = "";
      }
      let fireList = this.database.list("groups/" + groupId + '/posts/');
      let newMod = fireList.push({ name: newPostName, createDTM: Date.now(), text: newPostText });
    }
  }

  getPosts(groupId: string): Observable<any> {
    let fireList = this.database.list("groups/" + groupId + "/posts");
<<<<<<< HEAD

    return fireList.snapshotChanges();
  }

  getMyGroupPosts (groups: Array<any>): Array<any> {
    console.log("Getting my group posts");
    let myPosts = Array<any>();
    let counter: number = 0;
    groups.forEach(s => {
      let path = 'groups/' + s.payload.val().groupKey + '/posts';
      console.log(path);
      this.database.list(path).snapshotChanges().map(res => {
          res.forEach(s => {myPosts.push(s.payload.val())});
        }).toPromise().then(res => {console.log("sucess")}).catch(res => {console.log("failure")});
    });
    return myPosts;
  }


=======
    return fireList.snapshotChanges();
  }

  getMyGroupPosts(groups: Array<any>) {
    console.log("group " + groups);
    groups.forEach(s => {
      this.database.object('groups/' + s.payload.key)
        .valueChanges().subscribe(res => { console.log("res: " + res); return res });
    });
  }

>>>>>>> c3cb1ae88dd34694598379b486c188dc1b232025
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
<<<<<<< HEAD

    let fireObject = this.database.object('userGroups');
    fireObject.snapshotChanges().subscribe(s =>{
    console.log(s.payload.val());
    s.payload.forEach(e => {
=======
    let fireObject = this.database.object('userGroups');
    fireObject.snapshotChanges().subscribe(s => {
      console.log(s.payload.val());
      s.payload.forEach(e => {
>>>>>>> c3cb1ae88dd34694598379b486c188dc1b232025
        e.forEach(p => {
          if (p.val().groupKey === groupKey.key) {
            this.database.object('userGroups/' + e.key + '/' + p.key).remove();
          }
          return false;
<<<<<<< HEAD
        });
        return false;
      }
    )
=======
        })
     return false; })

>>>>>>> c3cb1ae88dd34694598379b486c188dc1b232025
    });
  }

  createUserGroup(groupKey: any) {
    if (this.loginService.user.value === null) {
      console.log("not authenticated - cant add group");
      return;
    }
    let fireList = this.database.list('userGroups/' + this.loginService.user.uid);
    let inUse = false;
<<<<<<< HEAD

=======
>>>>>>> c3cb1ae88dd34694598379b486c188dc1b232025
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

  createNewEvent(newEventName: string, newEventLocation: string, groupId: string) {
    if (newEventName != undefined) {
      let fireList = this.database.list("groups/" + groupId + '/events/');
      let newMod = fireList.push(newEventName);
      newMod.set({ name: newEventName, location: newEventLocation, createDTM: Date.now() });
    }
  }

  deleteEvent(eventKey: any, groupId: string) {
    let fireList = this.database.list("groups/" + groupId + "/events/" + eventKey);
    fireList.remove();
  }
}