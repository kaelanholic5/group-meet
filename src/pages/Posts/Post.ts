import { Component } from '@angular/core';

@Component({
    selector: 'page-Post',
    templateUrl: 'Post.html'
  })
export class Post{

    _text: string;

    constructor(text:string){
        this._text = text;
    }
    
    public get text() {
     return this._text;
    }

    public set text(text) {
        this._text = text;
    }
}