import { Component } from '@angular/core';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { NavController, NavParams } from 'ionic-angular';
import { MobileHomeDisplayService } from "../../providers/mobileHomeDisplayControlService";

@Component({
    selector: 'page-Post',
    templateUrl: 'Post.html'
})
export class PostPage {

    groupId: string;
    creatingPostForGroup: boolean;
    interestGroupName: string;
    newPostText: string;
    newPostName: string;
    errorMessage: string;
    constructor(private navCtrl: NavController, private navParams: NavParams,
        private interestGroupService: InterestGroupServiceProvider, public mobileHomeService: MobileHomeDisplayService) {
        this.groupId = navParams.get('groupId');
        if (this.groupId != null) {
            this.creatingPostForGroup = true;
            interestGroupService.getGroup(this.groupId).subscribe(g => {
                this.interestGroupName = g.payload.val().groupName;
            });
        }
    }

    addPost() {
        if (this.newPostName == null) {
            this.errorMessage = 'Please enter a post name.';
            return;
        }

        if (this.newPostText == null) {
            this.errorMessage = 'Please enter post text.';
            return;
        }

        this.interestGroupService.createNewPost(this.newPostName, this.groupId, this.newPostText).then(res => {
            this.errorMessage = "Post creation successful!";
            this.newPostText = null;
            this.newPostName = null;
            this.navCtrl.pop();
        });

    }

}