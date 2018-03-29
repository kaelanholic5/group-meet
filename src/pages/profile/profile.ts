import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, Events, Tabs } from 'ionic-angular';
import { InterestPage } from '../Interest/Interest';
import { Post } from '../Posts/Post';
import { FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { LoginServiceProvider } from '../../providers/loginService';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  interests: Array<any>;
  errorMessage: string;
  column: string = 'name';
  reorderList: boolean;
  reorderButton: string;
  savedInterestOrder: Array<string>;
  needLogin: boolean;
  user:any;
  constructor(public navCtrl: NavController, public events: Events, public interestGroupService: InterestGroupServiceProvider, public app: App) {
    try {
      this.interestGroupService.getMyGroups().subscribe(g => {
        this.interests = g;
        //console.log(this.interests);
      });
    } catch{
    }
    this.reorderButton = "Reorder Interests";
  }
  goToInterest(inter: any) {
    console.log(inter);
    this.navCtrl.push(InterestPage, { 'groupId': inter.key });
  }

  reorderItems(indexes) {
    let element = this.interests[indexes.from];
    this.interests.splice(indexes.from, 1);
    this.interests.splice(indexes.to, 0, element);
  }

  reorderInterests() {
    if (this.reorderList) {
      //save order
      this.reorderList = false;
      this.reorderButton = "Reorder Interests";
    }
    else {
      this.savedInterestOrder = Object.assign([], this.interests);
      this.reorderList = true;
      this.reorderButton = "Save";
    }
  }

  cancelReorder() {
    this.interests = Object.assign([], this.savedInterestOrder);
    this.reorderList = false;
    this.reorderButton = "Reorder Interests";
  }

  
}


