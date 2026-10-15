export type Language = 'en' | 'hi';
export type Theme = 'sand' | 'copper';
export type ActiveTab = 'rewards' | 'passbook' | 'redeem' | 'directory' | 'kyc';

export interface PlumberProfile {
  name: string;
  englishName: string;
  memberCode: string;
  phone: string;
  email: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
  photoUrl: string;
  aadhaarFrontUrl: string;
  aadhaarBackUrl: string;
  aadhaarNumber: string;
  panNumber: string;
  shopAffiliation: string;
  address: string;
  matchScore: number;
  biometricEnabled: boolean;
  upiId: string;
  registrationDate: string;
}

export type TransactionCategory = 'all' | 'purchase' | 'upi' | 'bonus' | 'voucher';

export interface LedgerEntry {
  id: string;
  date: string;
  time: string;
  timestamp: number;
  month: string; // e.g. "2023-10"
  title: string;
  hindiTitle?: string;
  invoiceNo?: string;
  category: 'purchase' | 'upi' | 'bonus' | 'voucher';
  points: number; // positive for credit, negative for debit
  cashAmount: number;
  type: 'credit' | 'debit';
  status: 'Delivered' | 'Success' | 'Claimed' | 'Approved';
  addedBy?: string;
  recipient?: string;
  utr?: string;
  counterLocation?: string;
  details?: string;
}

export interface OfferScheme {
  id: string;
  title: string;
  hindiTitle: string;
  badge: string;
  validTill: string;
  description: string;
  hindiDescription: string;
  bonusPercent: number;
  brandFocus: string;
}

export interface RateItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'CPVC' | 'UPVC' | 'Brass' | 'Sanitary' | 'Fittings';
  size: string;
  mrp: number;
  contractorPrice: number;
  pointsEarned: number;
  unit: string;
  brand: string;
}

export interface ContractorContact {
  id: string;
  name: string;
  hindiName: string;
  code: string;
  phone: string;
  specialty: string;
  hindiSpecialty: string;
  experienceYears: number;
  location: string;
  rating: number;
  verified: boolean;
  avatarUrl: string;
}

export type NotificationType = 'points' | 'kyc' | 'payout' | 'info';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  hindiTitle?: string;
  message: string;
  hindiMessage?: string;
  points?: number;
  timestamp: number;
  read: boolean;
  actionTab?: ActiveTab;
  actionLabel?: string;
  actionHindiLabel?: string;
}

