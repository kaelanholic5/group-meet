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

    return fireList.snapshotChanges();
  }

  getMyGroupPosts(groups: Array<any>) {
    console.log("group " + groups);
    groups.forEach(s => {
      this.database.object('groups/' + s.payload.key)
        .valueChanges().subscribe(res => { console.log("res: " + res); return res });
    });

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
    let fireList = this.database.list('groups/');//&& this.groupNameInUse(fireList, newGroupName)
    if (newGroupName != undefined && newGroupName != '') {
      let newMod = fireList.push(newGroupName);
      newMod.set({ groupName: newGroupName, events: '' });
    }
  }

  deleteGroup(groupKey: any) {
    let fireList = this.database.list('groups/' + groupKey.key);
    fireList.remove();

    let fireObject = this.database.object('userGroups');
    fireObject.snapshotChanges().subscribe(s =>{
    console.log(s.payload.val());
    s.payload.forEach(e =>{
      e.forEach(p =>{
         if(p.val().groupKey === groupKey.key){
          console.log("p "  +p.val().groupKey);
          console.log("groupKey " + groupKey.key);
          console.log("e " + e.key);
          console.log("p key " + p.key);
          //console.log(this.database.object('UserGroups/'+e.key + '/' +p.key));
        //  let removeList = this.database.list('UserGroups/' +e.key);
        console.log('userGroups/'+ e.key + '/' + p.key);
        this.database.object('userGroups/'+ e.key + '/' + p.key).remove();   
      }
      })
    })
      
    });
    //snaps.keys().next();
// .subscribe(
//   snapshots =>{
//     console.log("hey" + snapshots);
//       snapshots.forEach(s =>{
//         console.log("payloads:" + s);
//         s.payload.forEach(x =>{
//           // + x.val());
//         })
//       })
//   })
  //  })

    /*fireList.snapshotChanges().subscribe(
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
    );*/
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
    console.log("create " + newEventName);
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