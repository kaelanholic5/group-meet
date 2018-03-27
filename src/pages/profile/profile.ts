import { Component } from '@angular/core';
import { NavController,NavParams, Events  } from 'ionic-angular';
import { InterestPage } from '../Interest/Interest';
import { Post } from '../Posts/Post';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  interests: Array<string>;
  errorMessage: string;
  column: string = 'name';
  reorderList: boolean;
  reorderButton: string;
  savedInterestOrder: Array<string>;
  constructor(public navCtrl: NavController, public events: Events) {
    let interBase = "base";
    let interBase2 = "second";
    this.reorderButton = "Reorder Interests";
    this.reorderList = false;
    this.interests = [interBase, interBase2, "1","2","g","h","j"];
  }
  goToInterest(inter: string)
  {
    this.navCtrl.push(InterestPage, {name: inter});
  }

  reorderItems(indexes) {
    let element = this.interests[indexes.from];
    this.interests.splice(indexes.from, 1);
    this.interests.splice(indexes.to, 0, element);
  }

  reorderInterests(){
    if(this.reorderList){
      //save order
      this.reorderList = false;
      this.reorderButton = "Reorder Interests";
    }
    else{
      this.savedInterestOrder = Object.assign([], this.interests);
      this.reorderList = true;
      this.reorderButton = "Save";
    }
  }

  cancelReorder(){
    this.interests =  Object.assign([], this.savedInterestOrder);
    this.reorderList = false;
    this.reorderButton = "Reorder Interests";
  }
}


