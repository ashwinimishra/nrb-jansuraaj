export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  biharDistrict: string;
  referredBy?: string;
  isRegistered: string;
  isMember: string;
  currentCountry: string;
  currentState: string;
  createdAt: string;
  profileUrl: string;
  status?: 'pending' | 'active' | 'verified';
  points?: number;
  pincode: number;
}
export interface ReferralFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  district: string;
}

export interface ReferralStats {
  totalCount: number;
  pendingCount: number;
  verifiedCount: number;
  totalPoints: number;
}