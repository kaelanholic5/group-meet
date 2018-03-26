import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Interest } from '../Interest/Interest';
import { Post } from '../Posts/Post';
import { FormControl } from '@angular/forms';

import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  interests: Array<Interest>;
  errorMessage: string;
  descending: boolean = false;
  order: number;
  column: string = 'name';

  constructor(public navCtrl: NavController) {
    
    let postArr: Array<Post>;
    let post1 = new Post("first post ever");
    let post2 = new Post("second post ever");

    postArr = [post1]
    let postArr2 = [post1,post2];

    //let image = new Image("");
    let interBase = new Interest("base", null, null, postArr);
    let interBase2 = new Interest("second", interBase, null, postArr2); 
    
    interBase.addChild(interBase2);

    this.interests = [interBase, interBase2];
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  pushPage(inter){
    this.navCtrl.push(inter);
  }

}


