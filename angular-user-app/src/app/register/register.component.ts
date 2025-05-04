import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule],
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };

  constructor(private router: Router) {}

  register() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      alert('Please fill all fields');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    this.router.navigate(['/login']);
  }
}
