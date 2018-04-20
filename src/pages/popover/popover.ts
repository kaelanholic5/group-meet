import { Component } from "@angular/core";
import {LoginServiceProvider} from "../../providers/loginService";
import {ViewController} from "ionic-angular";
import {MobileHomeDisplayService} from "../../providers/mobileHomeDisplayControlService";

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(public loginService: LoginServiceProvider, public viewController: ViewController, public mobileHomeService: MobileHomeDisplayService) {
  }

  logout() {
    this.loginService.logout();
    this.viewController.dismiss();
  }

  goToSettings() {

  }

  displayPosts(){
    this.mobileHomeService.displayPosts();
  }

  displayEvents(){
    this.mobileHomeService.displayEvents();
  }

  displaySearch(){
    this.mobileHomeService.displaySearch();
  }
}
