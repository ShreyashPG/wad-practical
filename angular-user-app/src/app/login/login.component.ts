import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule],
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(private router: Router) {}

  login() {
    if (!this.user.email || !this.user.password) {
      alert('Please fill all fields');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: any) =>
        u.email === this.user.email && u.password === this.user.password
    );
    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid credentials');
    }
  }
}
