import { Component } from '@angular/core';
import { NavController,NavParams, Events  } from 'ionic-angular';
import { Interest } from '../Interest/Interest';
import { Post } from '../Posts/Post';
import { FormControl } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  interests: Array<string>;
  errorMessage: string;
  descending: boolean = false;
  order: number;
  column: string = 'name';
  constructor(public navCtrl: NavController, public events: Events) {
    let interBase = "base"
    let interBase2 = "second" 

    this.interests = [interBase, interBase2];
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  goToInterest(inter: string)
  {
    this.navCtrl.push(Interest, {name: inter});
  }
}


