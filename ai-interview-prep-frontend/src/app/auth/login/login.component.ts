import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService,private router: Router) {}

login() {
  this.auth.login({
    email: this.email,
    password: this.password
  }).subscribe((res: any) => {

if (res.success) {
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('userEmail', this.email); // 🔥 MUST
  this.router.navigate(['/dashboard']);
}
    else {
      alert(res.message);
    }

  }, error => {
    alert('Server error');
  });
}
}
