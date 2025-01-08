import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private currentUser: {
    userId: string;
    phone: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  } | null = null;
  constructor() {
    this.setCurrentUserFromToken();
  }

  // লোকাল স্টোরেজ থেকে টোকেন নিয়ে currentUser সেট করুন
  private setCurrentUserFromToken(): void {
    const token = localStorage.getItem('accessToken'); // লোকাল স্টোরেজ থেকে টোকেন রিট্রিভ করুন
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // JWT থেকে Payload ডিকোড করা
        this.currentUser = {
          userId: payload.userId,
          phone: payload.phone,
          email: payload.email,
          role: payload.role,
          iat: payload.iat,
          exp: payload.exp,
        };
      } catch (error) {
        console.error('Invalid token format:', error);
        this.currentUser = null;
      }
    }
  }
  // currentUser রিটার্ন করুন
  getCurrentUser(): {
    userId: string;
    phone: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  } | null {
    return this.currentUser;
  }
}
