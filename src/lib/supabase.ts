import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Profile {
  id: string;
  role: 'admin' | 'seller' | 'driver' | 'customer';
  full_name: string;
  phone_number: string;
  id_number?: string;
  license_number?: string;
  verified: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'marketplace' | 'services' | 'errands' | 'properties';
  icon: string;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  service_type: 'product' | 'service' | 'property' | 'errand';
  location?: string;
  rating: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  seller?: Profile;
}

export interface Ride {
  id: string;
  customer_id: string;
  driver_id?: string;
  pickup_location: string;
  dropoff_location: string;
  ride_type: 'car' | 'bike' | 'motorbike';
  fare: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  customer?: Profile;
  driver?: Profile;
}

export interface Order {
  id: string;
  customer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  delivery_address?: string;
  created_at: string;
  updated_at: string;
  customer?: Profile;
  seller?: Profile;
  product?: Product;
}

export interface Payment {
  id: string;
  user_id: string;
  order_id?: string;
  ride_id?: string;
  amount: number;
  payment_method: 'till' | 'paybill' | 'card';
  status: 'pending' | 'success' | 'failed';
  transaction_id?: string;
  created_at: string;
}

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  role: string;
  assigned_area?: string;
  phone_number?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}