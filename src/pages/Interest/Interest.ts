import { Component, HostListener } from '@angular/core';
import { PostPage } from '../Posts/Post';
import { NavController, NavParams, Events, PopoverController } from 'ionic-angular';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";
import { FormControl } from '@angular/forms';
import { EventsPage } from "../events/events";
import { PopoverInterestPage } from '../popover/popoverInterest';
import {MobileGroupDisplayService} from "../../providers/mobileGroupDisplayControlService";

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
    screenWidth: any;
    popoverTab: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public interestGroupService: InterestGroupServiceProvider, 
        public popoverController: PopoverController, public mobileGroupService: MobileGroupDisplayService) {
        this.groupId = navParams.get('groupId');
        interestGroupService.getGroup(this.groupId).subscribe(g => {
            if(g.payload.val() != null){
            this.interestName = g.payload.val().groupName;
            }
            this.interestGroupService.getPosts(this.groupId).subscribe(p => {
                this.posts = p;
                this.posts.sort(function (a, b) { return b.payload.val().createDTM - a.payload.val().createDTM });
            })
        });

        this.interestGroupService.getEvents(this.groupId).subscribe(e => {
            this.events = e;
        });
    }

    createPost() {
        this.navCtrl.push(PostPage, { 'groupId': this.groupId });
    }

    createEvent() {
        this.navCtrl.push(EventsPage, { 'groupId': this.groupId });
    }

    showPopover(event) {
        let popover = this.popoverController.create(
            PopoverInterestPage, {

            }
        );
        popover.present({
            ev: event
        })
        this.popoverTab = popover;
    }

    ngOnInit() {
        this.screenWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenWidth = window.innerWidth;
    }
}
