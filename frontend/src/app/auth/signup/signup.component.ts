import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService,private router: Router) {}

signup() {
  this.auth.signup({
    email: this.email,
    password: this.password
  }).subscribe((res: any) => {

    if (res.success) {
      alert(res.message); 
      this.router.navigate(['/login']);
    } else {
      alert(res.message);
    }

  }, () => {
    alert('Server error');
  });
}
}