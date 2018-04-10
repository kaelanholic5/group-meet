import { Component } from '@angular/core';
import { Post } from '../Posts/Post';
import { NavController, NavParams, Events } from 'ionic-angular';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { FormControl } from '@angular/forms';

@Component({
    selector: 'page-Interest',
    templateUrl: 'Interest.html'
})

export class InterestPage {
    interestName: string;
    interestGroup: Array<any>;

    parent: InterestPage;
    children: Array<InterestPage>;
  posts: any[];
  events: any[];
    icon: ImageBitmap;
    globalInterests: Array<string>;
    groupId: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public interestGroupService: InterestGroupServiceProvider) {
        console.log("initializing");
        this.groupId = navParams.get('groupId');
        console.log(this.groupId);
        interestGroupService.getGroup(this.groupId).subscribe(g => {
            this.interestGroup = g;
            this.interestName = g.group;
        });
       
      this.interestGroupService.getEvents(this.groupId).subscribe(e => {
        this.events = e;
      });

    }

    addPost(newPostName: string, newPostText: string) {
        this.interestGroupService.createNewPost(newPostName, this.groupId, newPostText);
    }

    goToInterest(inter: any) {
        this.navCtrl.push(InterestPage, { 'groupId': inter.key });
    }

}
