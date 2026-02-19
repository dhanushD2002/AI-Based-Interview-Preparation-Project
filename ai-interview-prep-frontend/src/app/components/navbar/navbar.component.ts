import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedIn');
  }

  constructor(private router: Router) {}

logout() {
  localStorage.removeItem('loggedIn');
  this.router.navigateByUrl('/home');
}
}
