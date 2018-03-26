import { Component } from '@angular/core';
import { Post } from '../Posts/Post';

@Component({
    selector: 'page-Interest',
    templateUrl: 'Interest.html'
  })

export class Interest {
    private _name: string;
    private _parent: Interest;
    private _children: Array<Interest>;
    private _forum: Array<Post>;
    private _icon: ImageBitmap;

    constructor(name:string, parent: Interest, children: Array<Interest>, forum: Array<Post>){
        this._name = name;
        this._parent = parent;
        if(children == null){
            this._children = [];
        }else{
            this._children =  children;
        }
        if(forum == null){
            this.initializeForum();
        }else{
            this._forum =  forum;
        }
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

    initializeForum(){
       let initialPost = new Post("Welcome to "+this._name+"! This is the fist post ever.");
   }
}