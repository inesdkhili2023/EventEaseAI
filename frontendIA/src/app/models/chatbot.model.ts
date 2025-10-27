export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  messageType: MessageType;
}

export enum MessageType {
  TEXT = 'TEXT',
  QUICK_REPLY = 'QUICK_REPLY',
  TICKET_INFO = 'TICKET_INFO',
  PAYMENT_LINK = 'PAYMENT_LINK'
}

export interface QuickReply {
  id: string;
  text: string;
  payload: string;
}

export interface ChatbotResponse {
  message: string;
  quickReplies?: QuickReply[];
  ticketInfo?: TicketInfo;
  paymentLink?: string;
  suggestions?: string[];
}

export interface TicketInfo {
  eventName: string;
  venue: string;
  date: string;
  availableTickets: TicketAvailability[];
}

export interface TicketAvailability {
  category: string;
  price: number;
  available: number;
  total: number;
}

export interface ChatbotConfig {
  welcomeMessage: string;
  fallbackMessage: string;
  supportEmail: string;
  supportPhone: string;
  businessHours: string;
  timezone: string;
}
