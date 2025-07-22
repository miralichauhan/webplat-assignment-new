import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData: any;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe({
      next: (response) => {
        this.userData = response;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }
}
