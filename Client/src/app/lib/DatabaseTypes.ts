// Database Types - Generated from actual database schema

export interface Cart {  // id random uuid
  id: string; // uuid
}

export interface Categorie {
  id: string; // uuid
  name: string; // varchar(100)
  desc: string | null; // varchar(500)
  img: string; // varchar(255)
}


export interface Color {
  id: string; // uuid
  color: string | null; // varchar(255)
  product: string | null; // uuid → FK to product.id
}

export interface DeliveryCost {
  seller_id: string; // uuid → FK to seller.id
  state_id: number; // → FK to states.id
  available: boolean;
  price: number | null; // 
}

export interface ExtraImg {
  id: string; // uuid
  img: string | null; // varchar(255)
  productId: string | null; // uuid → FK to product.id
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
  // - address: string (street address)
  // - notes: string (delivery instructions)
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
  // - weight: number (for shipping calculations)
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
  // - phone: string
  // - business_name: string
  // - address: string
  // - city: string
  // - state: number
  // - updated_at: Date
}

export interface Size {
  id: string; // uuid
  size: string; // varchar(10)
  product: string | null; // uuid → FK to product.id
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
}

// Additional types that should exist but are missing:


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

