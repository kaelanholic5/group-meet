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

    parent: InterestPage;
    children: Array<InterestPage>;
    forum: Array<Post>;
    icon: ImageBitmap;
    globalInterests: Array<string>;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public interestGroupService: InterestGroupServiceProvider) {
      console.log("initializing");
        let groupId = navParams.get('groupId');
        interestGroupService.getGroup(groupId).subscribe(g => {
          this.interestGroup = g;
          this.interestName = g.group;
        });

    }

    addPost(newPostName: string) {
      this.interestGroupService.createNewPost(newPostName, this.interestGroup.key);
    }

    goToInterest(inter: string) {
        this.navCtrl.push(InterestPage, { name: inter });
    }
}
