export enum TicketCategory {
  VIP = 'VIP',
  STANDARD = 'STANDARD',
  FREE = 'FREE'
}

export interface TicketPlan {
  id: string;
  eventId: string;
  category: TicketCategory;
  name: string;
  description: string;
  price: number;
  currency: string;
  quota: number;
  sold: number;
  available: number;
  isActive: boolean;
  salesStartDate: Date;
  salesEndDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketSale {
  id: string;
  ticketPlanId: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  quantity: number;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  stripePaymentIntentId?: string;
  refundedAmount?: number;
  refundedAt?: Date;
  createdAt: Date;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED'
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalTicketsSold: number;
  totalRefunds: number;
  categoryBreakdown: CategoryBreakdown[];
  dailySales: DailySales[];
  topSellingPlans: TopSellingPlan[];
}

export interface CategoryBreakdown {
  category: TicketCategory;
  sold: number;
  revenue: number;
  percentage: number;
}

export interface DailySales {
  date: string;
  ticketsSold: number;
  revenue: number;
}

export interface TopSellingPlan {
  planId: string;
  planName: string;
  category: TicketCategory;
  sold: number;
  revenue: number;
}
