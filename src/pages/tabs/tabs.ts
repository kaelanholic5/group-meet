import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { Interest } from '../Interest/Interest';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Interest;
  tab3Root = ProfilePage;

  constructor() {

  }
}
