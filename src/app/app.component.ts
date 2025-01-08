import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ProfileViewComponent } from './features/profile/components/profile-view/profile-view.component';
import { ChatViewComponent } from './features/chat/components/chat-view/chat-view.component';
import { ChattingDataComponent } from './features/chat/components/chatting-data/chatting-data.component';

@Component({
  selector: 'app-root',
  imports: [
    FontAwesomeModule,
    MatIconModule,
    CommonModule,
    RegisterComponent,
    ProfileViewComponent,
    ChatViewComponent,
    ChattingDataComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'secretline_client';

  isUserAvailable: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      this.isUserAvailable = !!token;
    }
  }
  // Child থেকে এই মেথড কল হবে
  updateUserStatus(status: boolean) {
    this.isUserAvailable = status;
  }

  ////////////////////////////////////////////////////
  selectedMenu: string = 'home'; // Default selected menu
  detailsView: boolean = false; // To toggle the details view
  selectedChat: any = null;

  detailsInitialized: boolean = false; // ডিটেইল ভিউ ক্লিক হয়েছে কিনা ট্র্যাক করার জন্য
  selectMenu(menu: string): void {
    if (this.selectedMenu !== menu) {
      this.selectedMenu = menu;

      // // যদি ডিটেইল ভিউ ক্লিক না করা থাকে, তখনই ডিফল্ট কন্টেন্ট দেখাবে
      if (!this.detailsInitialized) {
        this.detailsView = false;
      }

      // // যদি মেনু পরিবর্তন হয় এবং মেনু 'chat' হয়, সিলেক্টেড চ্যাট রিটার্ন করে
      // if (menu === 'chat') {
      //   this.detailsView = true; // ডিটেইল ভিউ চালু রাখে
      // } else {
      //   this.detailsView = false; // অন্য মেনুতে ডিফল্ট কন্টেন্ট দেখাবে
      // }
    }
  }

  onChatSelected(chat: any) {
    this.detailsView = true;
    this.detailsInitialized = true;
    this.selectedChat = chat;
  }
}
