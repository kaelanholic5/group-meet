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

    parent: InterestPage;
    children: Array<InterestPage>;
    forum: any[];
    icon: ImageBitmap;
    globalInterests: Array<string>;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public interestGroupService: InterestGroupServiceProvider) {
      console.log("initializing");
        this.groupId = navParams.get('groupId');
        interestGroupService.getGroup(this.groupId).subscribe(g => {
          this.interestName = g.payload.val().group;
         // this.forum = g.payload.val().posts;
         // console.log(this.forum);
        });
        this.interestGroupService.getPosts(this.groupId).subscribe(p => {
            this.forum = p;
            console.log(p);
          });

    }

    addPost(newPostName: string) {
      this.interestGroupService.createNewPost(newPostName, this.groupId);
    }

    goToInterest(inter: string) {
        this.navCtrl.push(InterestPage, { name: inter });
    }
}
