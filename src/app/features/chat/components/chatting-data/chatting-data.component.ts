import { Component, Input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { CurrentUserService } from '../../../../core/services/currentUser/current-user.service';

@Component({
  selector: 'app-chatting-data',
  imports: [MatIconModule, CommonModule],
  templateUrl: './chatting-data.component.html',
  styleUrl: './chatting-data.component.css',
})
export class ChattingDataComponent {
  @Input() detailsContent!: { title: string; description: string };
  @Input() chat: any;
  chatDetails: any = null;
  constructor(
    private currentUserService: CurrentUserService,
    private chatService: ChatService
  ) {}

  currentUser: {
    userId: string;
  } | null = null;
  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  //////////////////////////////////////////////////////
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat']) {
      this.fetchChatDetails(this.chat.chatId);
    }
  }
  fetchChatDetails(chatId: string): void {
    this.chatService.getChatDetails(chatId).subscribe({
      next: (data) => {
        this.chatDetails = data.data;
      },
      error: (error) => {
        console.error('Error fetching chat details:', error);
      },
    });
  }

  ////////////////////// start update content & send content////////////////////////
  messageContent: string = '';
  updateContent(event: Event): void {
    const target = event.target as HTMLDivElement;
    this.messageContent = target.textContent?.trim() || ''; // ইনপুট আপডেট করা

    // যদি ডিভ ফাঁকা থাকে, তাহলে একে পরিষ্কারভাবে চেক করুন
    if (this.messageContent === '') {
      target.textContent = ''; // পুরোপুরি ফাঁকা করুন
    }
  }

  sendMessage(): void {
    const chattingData = {
      chatId: this.chat.chatId,
      content: this.messageContent,
      messageType: 'text',
    };

    this.chatService.sendMessage(chattingData).subscribe({
      next: (response) => {
        this.messageContent = '';
      },
      error: (error) => {
        console.error('Error sending message:', error);
      },
    });
  }

  ////////////////////// End update content & send content////////////////////////
}
