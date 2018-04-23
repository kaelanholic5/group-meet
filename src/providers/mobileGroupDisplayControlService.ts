import { Injectable } from '@angular/core';

@Injectable()
export class MobileGroupDisplayService {
    
   showPosts : boolean = true;
   showEvents : boolean = false;
  
   
   constructor() {
   }
 
   displayPosts(){
    this.showPosts = true;
    this.showEvents = false;
  }

  displayEvents(){
    this.showPosts = false;
    this.showEvents = true;
  }

}