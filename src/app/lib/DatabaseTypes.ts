// Database Types - Generated from actual database schema

export interface Cart {
  id: string; // uuid
  // ⚠️ MISSING ATTRIBUTES:
  // - user_id: string (to track which user owns this cart)
  // - created_at: Date
  // - updated_at: Date
}

export interface Classification {
  id: string; // uuid
  name: string; // varchar(100)
  img: string; // varchar(255)
  // ⚠️ MISSING ATTRIBUTES:
  // - description: string (category description)
  // - href: string (URL slug for the category)
  // - created_at: Date
  // - updated_at: Date
}

export interface Color {
  id: string; // uuid
  color: string | null; // varchar(255)
  product: string | null; // uuid → FK to product.id
  // ⚠️ MISSING ATTRIBUTES:
  // - hex_code: string (e.g., "#FF5733" for actual color display)
  // - available: boolean (is this color variant in stock)
  // - stock_quantity: number
}

export interface DeliveryCost {
  seller_id: string; // uuid → FK to seller.id
  state_id: number; // → FK to states.id
  available: boolean;
  price: number | null; // numeric
  // ⚠️ MISSING ATTRIBUTES:
  // - estimated_days: number (delivery time estimate)
  // - created_at: Date
  // - updated_at: Date
}

export interface ExtraImg {
  id: string; // uuid
  img: string | null; // varchar(255)
  product: string | null; // uuid → FK to product.id
  // ⚠️ MISSING ATTRIBUTES:
  // - order: number (sort order for images)
  // - alt_text: string (for accessibility)
}

export interface Order {
  id: string; // uuid
  first_name: string; // varchar(100)
  last_name: string; // varchar(100)
  phone_number: number; // integer
  city: string; // varchar(100)
  state: number | null; // FK to states.id
  delivery_cost: number | null; // numeric
  products_cost: number; // numeric
  total_cost: number | null; // numeric
  status: string | null; // varchar(255)
  seller: string | null; // uuid → FK to seller.id
  // ⚠️ MISSING ATTRIBUTES:
  // - user_id: string (who placed the order)
  // - email: string (customer email)
  // - address: string (street address)
  // - zip_code: string
  // - notes: string (delivery instructions)
  // - payment_id: string (Stripe payment intent ID)
  // - payment_method: string ('card', 'paypal', etc.)
  // - payment_status: string ('pending', 'paid', 'failed')
  // - tracking_number: string
  // - estimated_delivery: Date
  // - delivered_at: Date
  // - canceled_at: Date
  // - cancellation_reason: string
  // - created_at: Date
  // - updated_at: Date
}

export interface Product {
  id: string; // uuid
  name: string; // varchar(100)
  price: number; // numeric
  main_img: string; // varchar(255)
  small_desc: string; // varchar(500)
  big_desc: string | null; // varchar(1000)
  available: boolean;
  sponsored: boolean;
  owner: string | null; // uuid → FK to seller.id
  classification: string | null; // uuid → FK to classification.id
  // ⚠️ MISSING ATTRIBUTES:
  // - sku: string (Stock Keeping Unit)
  // - stock_quantity: number
  // - discount_percentage: number
  // - original_price: number (for showing discounts)
  // - weight: number (for shipping calculations)
  // - dimensions: string (L x W x H)
  // - average_rating: number (calculated from reviews)
  // - num_of_reviews: number
  // - view_count: number (for analytics)
  // - sold_count: number (total sold)
  // - is_featured: boolean
  // - tags: string[] (searchable tags)
  // - created_at: Date
  // - updated_at: Date
}

export interface ProductList {
  id: string; // uuid
  product_id: string | null; // uuid → FK to product.id
  order_id: string | null; // uuid → FK to orders.id
  cart_id: string | null; // uuid → FK to cart.id
  prod_nb: number; // quantity
  type: string | null; // varchar(255)
  color: string | null; // varchar(255)
  size: string | null; // varchar(255)
  // ⚠️ MISSING ATTRIBUTES:
  // - price_at_time: number (snapshot of price when added)
  // - product_name: string (snapshot in case product deleted)
  // - product_img: string (snapshot)
  // - created_at: Date
  // - updated_at: Date
}

export interface Seller {
  id: string; // uuid
  email: string; // varchar(100)
  password: string; // varchar(255) - hashed
  first_name: string; // varchar(100)
  last_name: string; // varchar(100)
  img: string | null; // varchar(255)
  description: string | null; // varchar(500)
  created_at: Date; // timestamp
  total_orders: number;
  successful_orders: number;
  waiting_orders: number;
  returned_orders: number;
  total_sales: number; // numeric
  // ⚠️ MISSING ATTRIBUTES:
  // - phone: string
  // - business_name: string
  // - business_license: string
  // - tax_id: string
  // - address: string
  // - city: string
  // - state: number
  // - zip_code: string
  // - is_verified: boolean
  // - is_active: boolean
  // - rating: number (average seller rating)
  // - num_of_reviews: number
  // - commission_rate: number (platform commission %)
  // - payment_method: string (how seller gets paid)
  // - bank_account: string (encrypted)
  // - last_login: Date
  // - email_verified: boolean
  // - updated_at: Date
}

export interface Size {
  id: string; // uuid
  size: string; // varchar(10)
  product: string | null; // uuid → FK to product.id
  // ⚠️ MISSING ATTRIBUTES:
  // - available: boolean
  // - stock_quantity: number
  // - size_chart: string (S, M, L or numeric)
}

export interface State {
  id: number;
  name: string | null; // varchar(255)
  // ⚠️ MISSING ATTRIBUTES:
  // - country: string
  // - code: string (e.g., "CA" for California)
  // - is_active: boolean
}

export interface Type {
  id: string; // uuid
  type: string; // varchar(10)
  product: string | null; // uuid → FK to product.id
  // ⚠️ MISSING ATTRIBUTES:
  // - available: boolean
  // - stock_quantity: number
  // - price_modifier: number (if type affects price)
}

// Additional types that should exist but are missing:

export interface User {
  id: string; // uuid
  email: string;
  password: string; // hashed
  first_name: string;
  last_name: string;
  phone: string;
  role: 'BUYER' | 'ADMIN' | 'SELLER';
  is_verified: boolean;
  avatar: string | null;
  address: string | null;
  city: string | null;
  state: number | null;
  zip_code: string | null;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
}

export interface Review {
  id: string;
  user_id: string; // FK to user.id
  product_id: string; // FK to product.id
  seller_id: string; // FK to seller.id
  rating: number; // 1-5
  comment: string;
  images: string[]; // review photos
  verified_purchase: boolean;
  helpful_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Token {
  id: string;
  user_id: string;
  refresh_token: string;
  ip: string;
  user_agent: string;
  is_valid: boolean;
  expires_at: Date;
  created_at: Date;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: Date;
}

export interface Address {
  id: string;
  user_id: string;
  label: string; // 'Home', 'Work', etc.
  first_name: string;
  last_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: number;
  zip_code: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  is_read: boolean;
  link: string | null;
  created_at: Date;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase: number;
  max_discount: number | null;
  valid_from: Date;
  valid_until: Date;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  created_at: Date;
}

export interface OrderHistory {
  id: string;
  order_id: string;
  status: string;
  note: string | null;
  changed_by: string; // user_id or seller_id
  created_at: Date;
}
