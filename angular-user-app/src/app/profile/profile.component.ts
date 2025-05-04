import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.user.email) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
