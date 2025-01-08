import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/v1/user/me';
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = localStorage.getItem('accessToken'); // যদি টোকেন থাকে
    if (!token) {
      console.error('No token found!');
    }

    const headers = new HttpHeaders({
      Authorization: `${token}`, // টোকেনটি Authorization Header-এ পাঠান
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
