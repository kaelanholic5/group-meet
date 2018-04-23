import { Component } from "@angular/core";
import {LoginServiceProvider} from "../../providers/loginService";
import {ViewController} from "ionic-angular";
import {MobileGroupDisplayService} from "../../providers/mobileGroupDisplayControlService";

@Component({
  templateUrl: 'popoverInterest.html'
})
export class PopoverInterestPage {
  constructor(public viewCtrl: ViewController, public mobileGroupService: MobileGroupDisplayService) {
  }

  displayPosts(){
    this.mobileGroupService.displayPosts();
    this.close();
  }

  displayEvents(){
    this.mobileGroupService.displayEvents();
    this.close(); 
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
