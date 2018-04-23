import { Component, OnInit, HostListener } from '@angular/core';
import {App, NavController, NavParams, Events, Tabs, PopoverController} from 'ionic-angular';
import { InterestPage } from '../Interest/Interest';
import { PostPage } from '../Posts/Post';
import { PopoverPage } from '../popover/popover';
import { FormControl } from '@angular/forms';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { LoginServiceProvider } from '../../providers/loginService';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {MobileHomeDisplayService} from "../../providers/mobileHomeDisplayControlService";

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
  postsList: any;
  eventsList: any;
  popoverTab: any;
  screenWidth: any;
  constructor(public navCtrl: NavController, public events: Events,
              public interestGroupService: InterestGroupServiceProvider,
              public loginService: LoginServiceProvider, public popoverController: PopoverController,
              public mobileHomeService: MobileHomeDisplayService) {
  }

  public login() {
    this.loginSubscription = this.loginService.login().subscribe(data =>{
      this.getGroupInformation();
    });
  }

  goToInterest(inter: any) {
    console.log(inter);
    this.navCtrl.push(InterestPage, { 'groupId': inter.payload.val().groupKey });
  }

  getGroupInformation() {
    console.log(this.loginService.user);
    this.interestGroupService.getMyGroups(this.loginService.user).subscribe(g => {
      this.interests = g;
      console.log("interests: " + this.interests);
      this.postsList = this.interestGroupService.getMyGroupPosts(g);
      this.eventsList = this.interestGroupService.getMyGroupEvents(g);
    });


  }

  logout() {
    this.loginSubscription.unsubscribe();
    this.loginService.logout();
  }

  showPopover(event) {
    let popover = this.popoverController.create(
      PopoverPage, {

      }
    );
    popover.present({
      ev: event
    })
    this.popoverTab = popover;
  }

  ngOnInit(){
    this.screenWidth = window.innerWidth;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.screenWidth = window.innerWidth;
  }
  
}
