import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Message {
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  providers: [ChatService],
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: Message[] = [];
  input = '';
  loading = false;

  constructor(private chatService: ChatService) {
    // Welcome message
    this.messages.push({
      from: 'bot',
      text: 'Hello! I\'m EventEaseAI. How can I help you with your event today?',
      timestamp: new Date()
    });
  }

  send() {
    const text = this.input.trim();
    if (!text || this.loading) return;

    // Add user message
    this.messages.push({ 
      from: 'user', 
      text,
      timestamp: new Date()
    });
    
    this.input = '';
    this.loading = true;

    // Scroll to bottom
    setTimeout(() => this.scrollToBottom(), 100);

    this.chatService.sendMessage(text).subscribe({
      next: (res) => {
        this.messages.push({ 
          from: 'bot', 
          text: res.reply,
          timestamp: new Date()
        });
        this.loading = false;
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => {
        this.messages.push({ 
          from: 'bot', 
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        });
        this.loading = false;
        console.error('Chat error:', err);
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
  }

  private scrollToBottom() {
    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}