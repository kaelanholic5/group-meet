import { Component } from '@angular/core';

@Component({
    selector: 'page-Post',
    templateUrl: 'Post.html'
  })
export class Post{

    text: string;

    constructor(text:string){
        this.text = text;
    }

}