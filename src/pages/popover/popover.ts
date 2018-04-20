import { Component } from "@angular/core";
import {LoginServiceProvider} from "../../providers/loginService";
import {ViewController} from "ionic-angular";

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(public loginService: LoginServiceProvider, public viewController: ViewController) {

  }

  logout() {
    this.loginService.logout();
    this.viewController.dismiss();
  }

  goToSettings() {

  }
}
