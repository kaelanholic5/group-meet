import { Component } from '@angular/core';
import { Post } from '../Posts/Post';
import { NavController, NavParams, Events } from 'ionic-angular';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { FormControl } from '@angular/forms';
import {EventsPage} from "../events/events";

@Component({
    selector: 'page-Interest',
    templateUrl: 'Interest.html'
})

export class InterestPage {
    interestName: string;
    interestGroup: Array<any>;

    parent: InterestPage;
    children: Array<InterestPage>;
    posts: Array<any>;
    events: any[];
    icon: ImageBitmap;
    globalInterests: Array<string>;
    groupId: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public interestGroupService: InterestGroupServiceProvider) {
        this.groupId = navParams.get('groupId');
        interestGroupService.getGroup(this.groupId).subscribe(g => {
            console.log(g.payload.val().posts);
            this.interestName = g.payload.val().groupName;
            this.interestGroupService.getPosts(this.groupId).subscribe(p =>{
                this.posts = p;
                this.posts.sort(function(a,b){return b.payload.val().createDTM - a.payload.val().createDTM });
            })
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

    createEvent() {
      this.navCtrl.push(EventsPage, { 'groupId': this.groupId });
    }

}
