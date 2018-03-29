import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { InterestGroupServiceProvider } from "../../providers/interestGroupService";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ProfilePage;
  constructor(public interestService: InterestGroupServiceProvider ) {
    // try {
    //   interestService.getMyGroups().subscribe(g => {
    //     this.profileEnabled = g != null;
    //     //console.log(this.interests);
    //   });
    // } catch{
    // } 
  }
}
