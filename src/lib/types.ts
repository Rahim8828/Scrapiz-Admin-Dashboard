export type UserRole = 'seller' | 'buyer' | 'agent' | 'admin' | 'superadmin';
export type KycStatus = 'pending' | 'verified' | 'rejected';
export type OrderStatus = 'pending' | 'assigned' | 'accepted' | 'on_the_way' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type PaymentType = 'sellerPayout' | 'agentPayout' | 'scrapPurchase';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  address: string;
  zone: string;
  kycStatus: KycStatus;
  documents?: {
    aadhaarURL?: string;
    panURL?: string;
  };
  totalOrders: number;
  totalWeight: number;
  walletBalance: number;
  createdAt: string;
  avatarUrl: string;
  rating?: number;
}

export interface Order {
  id: string;
  sellerId: string;
  agentId?: string;
  scrapCategory: string;
  estimatedWeight: number;
  finalWeight?: number;
  pricePerKg: number;
  totalAmount?: number;
  pickupAddress: string;
  pickupTime: string;
  status: OrderStatus;
  proofPhotoUrl?: string;
  invoiceUrl?: string;
  createdAt: string;
}

export interface ScrapCategory {
  id: string;
  name: string;
  pricePerKg: number;
  updatedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  type: PaymentType;
  paymentMode: 'UPI' | 'bank';
  status: PaymentStatus;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'order' | 'payment' | 'kyc';
  status: 'read' | 'unread';
  createdAt: string;
}
