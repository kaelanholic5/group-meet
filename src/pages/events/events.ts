import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, 
  AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

    database: AngularFireDatabase;
    events: any[];
    groupId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public af: AngularFireDatabase) {
        this.database = af;
        this.groupId = navParams.get("groupId");
        console.log(this.groupId);
        this.getEvents();
  }

  getEvents() {
    let fireList = this.database.list("groups/" + this.groupId + "/events");

    fireList.snapshotChanges().subscribe(s => {
     // s.forEach(x => this.groups.push(x.key.toString()));
      this.events = s;
     // s.forEach(x => this.groups.push(x));
    });
  }

  public createNewEvent(newEventName: string) {
    console.log("create " + newEventName);
    if (newEventName != undefined) {
      let fireList = this.database.list("groups/" +this.groupId + '/events/');
      let newMod = fireList.push(newEventName);
      newMod.set({name: newEventName, createDTM: Date.now()});
    }
  }

  public deleteEvent(eventKey: any) {
    let fireList = this.database.list("groups/" + this.groupId + "/events/" + eventKey);
    fireList.remove();
  }

}
