import { Component } from '@angular/core';
import { Post } from '../Posts/Post';
import { NavController, NavParams, Events } from 'ionic-angular';
import {InterestGroupServiceProvider} from "../../providers/interestGroupService";

@Component({
    selector: 'page-Interest',
    templateUrl: 'Interest.html'
})

export class InterestPage {
    interestName: string;
    interestGroup: any;
    groupId: string;
    errorMessage: string = '';

    parent: InterestPage;
    children: Array<InterestPage>;
  posts: any[];
  events: any[];
    icon: ImageBitmap;
    globalInterests: Array<string>;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public interestGroupService: InterestGroupServiceProvider) {
      console.log("initializing");
        this.groupId = navParams.get('groupId');
        interestGroupService.getGroup(this.groupId).subscribe(g => {
          this.interestName = g.payload.val().group;
        });
        this.interestGroupService.getPosts(this.groupId).subscribe(p => {
            this.posts = p;
        });
      this.interestGroupService.getEvents(this.groupId).subscribe(e => {
        this.events = e;
      });

    }

    addPost(newPostName: string) {
      this.interestGroupService.createNewPost(newPostName, this.groupId);
    }

    addEvent(newEventName: string, newEventLocation: string) {
      if (!newEventName || !newEventLocation) {
        this.errorMessage = 'Please enter a name and location for the event';
        return;
      }

      this.interestGroupService.createNewEvent(newEventName, newEventLocation, this.groupId);
    }

}
