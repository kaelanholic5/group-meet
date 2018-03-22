import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public rest: RestProvider) {

  }

  groups: string[];
  errorMessage: string;

  ionViewDidLoad() {
    this.getGroups();
  }

  getGroups() {
    this.rest.getGroups()
      .subscribe(
        groups => this.groups = groups,
        error => this.errorMessage = <any>error
      );
  }

}
