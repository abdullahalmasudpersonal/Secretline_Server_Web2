import { Component, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chat-view',
  imports: [CommonModule],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.css',
})
export class ChatViewComponent {
  chatData: any;
  selectedChatUser: any = null;
  @Output() selectChat = new EventEmitter<any>();
  onChatClick(chat: any) {
    this.selectedChatUser = chat; // সিলেক্টেড চ্যাট সেট করুন
    this.selectChat.emit(chat); // সিলেক্টেড চ্যাট প্যারেন্টে পাঠান।
    console.log(chat, 'chatss');
  }

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.getChattingData().subscribe({
      next: (data) => {
        this.chatData = data?.data;
        // console.log(this.chatData, 'chatdata');
      },
      error: (err) => {
        console.error('Error fetching chat data:', err);
      },
    });
  }
}
