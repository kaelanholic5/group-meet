import { Component } from "@angular/core";
import {LoginServiceProvider} from "../../providers/loginService";
import {ViewController} from "ionic-angular";
import {MobileHomeDisplayService} from "../../providers/mobileHomeDisplayControlService";

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController, public loginService: LoginServiceProvider, public viewController: ViewController, public mobileHomeService: MobileHomeDisplayService) {
  }

  logout() {
    this.loginService.logout();
    this.close();
  }

  displayPosts(){
    this.mobileHomeService.displayPosts();
    this.close()
  }

  displayEvents(){
    this.mobileHomeService.displayEvents();
    this.close()
  }

  displaySearch(){
    this.mobileHomeService.displaySearch();
    this.close()
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
