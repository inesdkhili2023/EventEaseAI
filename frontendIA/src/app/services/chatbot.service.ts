import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChatMessage, ChatbotResponse, ChatbotConfig, MessageType } from '../models/chatbot.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly API_BASE_URL = 'http://localhost:8080/api/chatbot';
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  private isTypingSubject = new BehaviorSubject<boolean>(false);
  public isTyping$ = this.isTypingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeChatbot();
  }

  private initializeChatbot(): void {
    const welcomeMessage: ChatMessage = {
      id: '1',
      content: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider avec votre événement ?',
      isUser: false,
      timestamp: new Date(),
      messageType: MessageType.TEXT
    };
    this.messagesSubject.next([welcomeMessage]);
  }

  // Send Message
  sendMessage(content: string, eventId?: string): Observable<ChatbotResponse> {
    const userMessage: ChatMessage = {
      id: this.generateId(),
      content: content,
      isUser: true,
      timestamp: new Date(),
      messageType: MessageType.TEXT
    };

    this.addMessage(userMessage);
    this.isTypingSubject.next(true);

    const request = {
      message: content,
      eventId: eventId,
      context: this.getContext()
    };

    return this.http.post<ChatbotResponse>(`${this.API_BASE_URL}/message`, request)
      .pipe(
        tap(response => {
          this.isTypingSubject.next(false);
          this.handleBotResponse(response);
        })
      );
  }

  // Quick Reply
  sendQuickReply(payload: string, eventId?: string): Observable<ChatbotResponse> {
    this.isTypingSubject.next(true);

    const request = {
      quickReply: payload,
      eventId: eventId,
      context: this.getContext()
    };

    return this.http.post<ChatbotResponse>(`${this.API_BASE_URL}/quick-reply`, request)
      .pipe(
        tap(response => {
          this.isTypingSubject.next(false);
          this.handleBotResponse(response);
        })
      );
  }

  // Get Event Information
  getEventInfo(eventId: string): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/event-info/${eventId}`);
  }

  // Get Ticket Availability
  getTicketAvailability(eventId: string): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/ticket-availability/${eventId}`);
  }

  // Get FAQ
  getFAQ(eventId?: string): Observable<any> {
    let params: any = {};
    if (eventId) params.eventId = eventId;
    
    return this.http.get(`${this.API_BASE_URL}/faq`, { params });
  }

  // Clear Chat
  clearChat(): void {
    this.messagesSubject.next([]);
    this.initializeChatbot();
  }

  // Get Chat History
  getChatHistory(): ChatMessage[] {
    return this.messagesSubject.value;
  }

  // Export Chat
  exportChat(): string {
    const messages = this.messagesSubject.value;
    return JSON.stringify(messages, null, 2);
  }

  private handleBotResponse(response: ChatbotResponse): void {
    const botMessage: ChatMessage = {
      id: this.generateId(),
      content: response.message,
      isUser: false,
      timestamp: new Date(),
      messageType: MessageType.TEXT
    };

    this.addMessage(botMessage);

    // Handle special response types
    if (response.ticketInfo) {
      this.handleTicketInfo(response.ticketInfo);
    }

    if (response.paymentLink) {
      this.handlePaymentLink(response.paymentLink);
    }

    if (response.quickReplies && response.quickReplies.length > 0) {
      this.handleQuickReplies(response.quickReplies);
    }
  }

  private handleTicketInfo(ticketInfo: any): void {
    const ticketMessage: ChatMessage = {
      id: this.generateId(),
      content: `📅 ${ticketInfo.eventName}\n📍 ${ticketInfo.venue}\n📅 ${ticketInfo.date}\n\nBillets disponibles:`,
      isUser: false,
      timestamp: new Date(),
      messageType: MessageType.TICKET_INFO
    };

    this.addMessage(ticketMessage);
  }

  private handlePaymentLink(paymentLink: string): void {
    const paymentMessage: ChatMessage = {
      id: this.generateId(),
      content: `💳 Lien de paiement: ${paymentLink}`,
      isUser: false,
      timestamp: new Date(),
      messageType: MessageType.PAYMENT_LINK
    };

    this.addMessage(paymentMessage);
  }

  private handleQuickReplies(quickReplies: any[]): void {
    // Implementation for quick reply buttons
    // This would typically render as buttons in the UI
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  private getContext(): any {
    const messages = this.messagesSubject.value;
    return {
      messageCount: messages.length,
      lastUserMessage: messages.filter(m => m.isUser).pop()?.content,
      conversationStart: messages[0]?.timestamp
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // AI-Powered Features
  analyzeUserIntent(message: string): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/analyze-intent`, { message });
  }

  getPersonalizedSuggestions(userId?: string, eventId?: string): Observable<any> {
    let params: any = {};
    if (userId) params.userId = userId;
    if (eventId) params.eventId = eventId;
    
    return this.http.get(`${this.API_BASE_URL}/suggestions`, { params });
  }

  // Multi-language Support
  detectLanguage(message: string): Observable<string> {
    return this.http.post<{ language: string }>(`${this.API_BASE_URL}/detect-language`, { message })
      .pipe(map(response => response.language));
  }

  // Analytics
  getChatAnalytics(eventId?: string): Observable<any> {
    let params: any = {};
    if (eventId) params.eventId = eventId;
    
    return this.http.get(`${this.API_BASE_URL}/analytics`, { params });
  }
}
