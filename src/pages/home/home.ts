import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/loginService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public loginService: LoginServiceProvider) {
  }

  public login() {
    this.loginService.login();
  }

}
