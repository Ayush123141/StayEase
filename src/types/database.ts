export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'guest' | 'staff' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface RoomType {
  id: string;
  name: string;
  description: string | null;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
}

export interface Room {
  id: string;
  room_number: string;
  title: string;
  description: string | null;
  room_type_id: string | null;
  price_per_night: number;
  capacity: number;
  beds: number;
  size_sqft: number | null;
  images: string[];
  is_active: boolean;
  created_at: string;
  room_type?: RoomType;
  amenities?: Amenity[];
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  nights: number;
  total_price: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  special_requests: string | null;
  created_at: string;
  room?: Room;
  profile?: Profile;
}

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  room_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profile?: Profile;
}
