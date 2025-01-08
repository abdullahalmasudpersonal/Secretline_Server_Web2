import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
})
export class ProfileViewComponent {
  userData: any;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserData().subscribe({
      next: (data) => {
        this.userData = data?.data; // ডেটা সংরক্ষণ
        // console.log(data?.data);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }
}
