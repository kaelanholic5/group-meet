import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/loginService';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public loginService: LoginServiceProvider) {
  }

  public login() {
    this.loginService.login();
  }

}
