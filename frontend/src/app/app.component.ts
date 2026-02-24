import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn = false;

  constructor(private router: Router) {

    //  Every route change-la login status check pannum
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = !!localStorage.getItem('loggedIn');
      }
    });

  }
}
