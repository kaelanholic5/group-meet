import { Injectable } from '@angular/core';

@Injectable()
export class MobileHomeDisplayService {
    
   showPosts : boolean = true;
   showEvents : boolean = false;
   showSearch : boolean = false;
   
   constructor() {
   }
 
   displayPosts(){
    this.showPosts = true;
    this.showEvents = false;
    this.showSearch = false;
  }

  displayEvents(){
    this.showPosts = false;
    this.showEvents = true;
    this.showSearch = false;
  }

  displaySearch(){
    this.showSearch = true;
    this.showPosts = false;
    this.showEvents = false;
  }
}