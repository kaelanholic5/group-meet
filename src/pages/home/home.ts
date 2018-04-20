import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, Events, Tabs } from 'ionic-angular';
import { InterestPage } from '../Interest/Interest';
import { Post } from '../Posts/Post';
import { FormControl } from '@angular/forms';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { LoginServiceProvider } from '../../providers/loginService';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loggedIn: boolean;
  interests: Array<any>;
  errorMessage: string;
  column: string = 'name';
  savedInterestOrder: Array<string>;
  user: any;
  loginSubscription: any;
  postsList: Array<any>;
  constructor(public navCtrl: NavController, public events: Events, public interestGroupService: InterestGroupServiceProvider, public loginService: LoginServiceProvider) {
  }

  public login() {
    this.loginSubscription = this.loginService.login().subscribe(data =>{
      this.getGroupsAndPosts();
    });
  }

  goToInterest(inter: any) {
    console.log(inter);
    this.navCtrl.push(InterestPage, { 'groupId': inter.payload.val().groupKey });
  }

  getGroupsAndPosts() {
    console.log(this.loginService.user);
    this.interestGroupService.getMyGroups(this.loginService.user).subscribe(g => {
      this.interests = g;
      console.log("interests: " + this.interests);
      this.postsList = this.interestGroupService.getMyGroupPosts(g);
    });
  }

  logout() {
    this.loginSubscription.unsubscribe();
    this.loginService.logout();
  }


}
