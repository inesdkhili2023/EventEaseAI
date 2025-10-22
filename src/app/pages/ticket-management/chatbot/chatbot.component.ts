import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subject, takeUntil } from 'rxjs';

import { ChatbotService } from '../../../services/chatbot.service';
import { ChatMessage, MessageType, QuickReply } from '../../../models/chatbot.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  currentMessage = '';
  isTyping = false;
  isOpen = false;
  isMinimized = false;
  
  // Quick replies
  quickReplies: QuickReply[] = [
    { id: '1', text: 'Prix des billets', payload: 'PRICING' },
    { id: '2', text: 'Lieu de l\'événement', payload: 'VENUE' },
    { id: '3', text: 'Date et heure', payload: 'DATE_TIME' },
    { id: '4', text: 'Disponibilité', payload: 'AVAILABILITY' },
    { id: '5', text: 'Achat de billets', payload: 'PURCHASE' },
    { id: '6', text: 'Remboursement', payload: 'REFUND' }
  ];

  private destroy$ = new Subject<void>();

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.scrollToBottom();
      });

    this.chatbotService.isTyping$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isTyping => {
        this.isTyping = isTyping;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleChatbot(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isMinimized = false;
    }
  }

  minimizeChatbot(): void {
    this.isMinimized = true;
  }

  maximizeChatbot(): void {
    this.isMinimized = false;
  }

  sendMessage(): void {
    if (this.currentMessage.trim()) {
      this.chatbotService.sendMessage(this.currentMessage.trim())
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.currentMessage = '';
          },
          error: (error) => {
            console.error('Error sending message:', error);
            this.addErrorMessage('Désolé, une erreur est survenue. Veuillez réessayer.');
          }
        });
    }
  }

  sendQuickReply(quickReply: QuickReply): void {
    this.chatbotService.sendQuickReply(quickReply.payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Quick reply sent successfully
        },
        error: (error) => {
          console.error('Error sending quick reply:', error);
          this.addErrorMessage('Désolé, une erreur est survenue. Veuillez réessayer.');
        }
      });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private addErrorMessage(message: string): void {
    const errorMessage: ChatMessage = {
      id: this.generateId(),
      content: message,
      isUser: false,
      timestamp: new Date(),
      messageType: MessageType.TEXT
    };
    
    this.messages.push(errorMessage);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getMessageTypeClass(message: ChatMessage): string {
    switch (message.messageType) {
      case MessageType.TICKET_INFO:
        return 'ticket-info';
      case MessageType.PAYMENT_LINK:
        return 'payment-link';
      case MessageType.QUICK_REPLY:
        return 'quick-reply';
      default:
        return 'text-message';
    }
  }

  formatMessageTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  clearChat(): void {
    this.chatbotService.clearChat();
  }

  exportChat(): void {
    const chatData = this.chatbotService.exportChat();
    const blob = new Blob([chatData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
