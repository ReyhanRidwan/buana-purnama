/**
 * Types and interfaces for MbjTourBali app
 */

export interface TravelPackage {
  id: string;
  name: string;
  category: 'adventure' | 'cultural' | 'luxury' | 'car-rental' | 'bus-rental' | 'study-tour';
  price: number; // in IDR
  description: string;
  rating: number;
  duration: string;
  image: string; // Image asset path or base64 / fallback
  highlights: string[];
  maxCapacityText?: string; // only for car-rental
}

export interface AddOn {
  id: string;
  name: string;
  price: number; // in IDR
  description: string;
}

export interface BookingState {
  packageId: string;
  date: string; // YYYY-MM-DD
  adults: number;
  children: number;
  addOnIds: string[];
  name: string;
  phone: string;
  email: string;
  paymentMethod: 'dp' | 'full';
  orderCode: string;
}
