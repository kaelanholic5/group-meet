import { Component } from '@angular/core';
import { Post } from '../Posts/Post';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
    selector: 'page-Interest',
    templateUrl: 'Interest.html'
})

export class Interest {
    name: string;
    parent: Interest;
    children: Array<Interest>;
    forum: Array<Post>;
    icon: ImageBitmap;
    globalInterests: Array<string>;
    searchInterests: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
        this.name = navParams.get('name');
        if (this.name == null) {
            this.searchInterests = true;
            this.globalInterests = ["1", "2", "a", "b", "sports", "music", "video games"];
        }
        else {
            this.searchInterests = false;
        }
        this.children = [];
        this.forum = [];
        let initialPost = new Post("Welcome to " + this.name + "! This is the fist post ever.");
        let post2 = new Post("post 2");
        this.addPost(initialPost);
        this.addPost(post2);
    }

    addChild(interest) {
        this.children.push(interest);
    }

    addPost(post) {
        this.forum.push(post);
    }

    goToInterest(inter: string) {
        this.navCtrl.push(Interest, { name: inter });
    }



}