import { Component } from '@angular/core';
import { Post } from '../Posts/Post';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@Component({
    selector: 'page-Interest',
    templateUrl: 'Interest.html'
  })

export class Interest {
    _name: string;
    _parent: Interest;
    _children: Array<Interest>;
    _forum: Array<Post>;
    _icon: ImageBitmap;
    searchInterests: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events){
        this._name = navParams.get('name');      
        if(this._name == null){
            this.searchInterests = true;
        }  
        else{
            this.searchInterests = false;
        }
        this._children = [];     
        this._forum = [];  
        let initialPost = new Post("Welcome to "+this._name+"! This is the fist post ever.");
        this.addPost(initialPost);
    }

    public get name() {
        return this._name;
    }

    public set name(name) {
        this._name = name;
    }

    public get parent() {
        return this._parent;
    }

    public set parent(parent) {
        this._parent = parent;
    }

    public get children() {
        return this._children;
    }

    public set children(children) {
        this._children = children;
    }

    public get forum() {
        return this._forum;
    }

    public set forum(forum) {
        this._forum = forum;
    }

    addChild(interest) {
        this._children.push(interest);
    }

    addPost(post) {
        this._forum.push(post);
    }

    
}