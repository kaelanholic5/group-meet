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

  getMyGroupPosts(groups:Array<any>){
    console.log("group " + groups );
     groups.forEach(s =>{
       this.database.object('groups/' + s.payload.key)
      .valueChanges().subscribe(res =>{console.log("res: " +res);return res});
  });

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
    let fireList = this.database.list('groups/');
    if (newGroupName != undefined && !this.groupNameInUse(fireList, newGroupName)) {
      
      let newMod = fireList.push(newGroupName);
      newMod.set({ group: newGroupName, events: '' });
    }
  }

  groupNameInUse(list, name){
    let fireList = list.snapshotChanges;
    let fire = null;
    let inUse = false;
    for( fire in fireList){
      if(fire.groupName == name){
        inUse = true;
        break;
      }
    } 
    return inUse;
  }

  groupKeyInUse(list, key){
    let fireList = list.snapshotChanges;
    let fire = null;
    let inUse = false;
    for( fire in fireList){
      console.log("key: "+fire.key);
      if(fire.key == key){
        inUse = true;
        console.log("you are already subscribed to that group."); 
        break;
      }
    } 
    return inUse;
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
    if (groupKey != undefined && this.groupKeyInUse(fireList, groupKey)) {

      // should check to see if it exists

      
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
