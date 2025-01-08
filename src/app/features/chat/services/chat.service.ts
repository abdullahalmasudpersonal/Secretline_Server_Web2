import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl =
    'http://localhost:5000/api/v1/message/get-all-user-chat-single-member';
  constructor(private http: HttpClient) {}

  getChattingData(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found!');
    }
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get(this.apiUrl, { headers });
  }

  ///////////////////////////////////////////
  private singleChatApi =
    'http://localhost:5000/api/v1/message/get-single-user-chat-single-member';

  // chatId এর ভিত্তিতে চ্যাট ডেটা ফেচ করার জন্য ফাংশন
  getChatDetails(chatId: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found!');
    }
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get<any>(`${this.singleChatApi}/${chatId}`, { headers });
  }

  ////////////////////// start update content & send content////////////////////////
  private sendMapiUrl = 'http://localhost:5000/api/v1/message/send-message'; // আপনার API URL এখানে সেট করুন
  sendMessage(chattingData: {
    chatId: string;
    content: string;
    messageType: string;
  }): Observable<any> {
    console.log(chattingData, 'chattingData');
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found!');
    }
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.post(this.sendMapiUrl, chattingData, { headers }); // POST রিকোয়েস্ট পাঠাচ্ছে
  }
  ////////////////////// End update content & send content////////////////////////
}
