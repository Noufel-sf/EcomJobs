import { IconDots } from '@tabler/icons-react';
import { IconDots } from '@tabler/icons-react';
import { Order } from '@/types/order';
// Database Types - Generated from actual database schema

import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { StaticImageData } from "next/image";

export interface Cart {  // id random uuid
  id: string; // uuid
}

export interface Categorie {
  id: string; // uuid
  name: string; // varchar(100)
  desc: string | null; // varchar(500)
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
  id: string; 
  firstName: string; 
  lastName: string; 
  phoneNumber: number; 
  city: string; 
  state: number | null; 
  deliveryCost: number | null; 
  totalCost: number; 
  products: OrderProduct[];
  status: "New" | "Delivered" | "Returned" | "Processing" | "Canceled"; 
  note: string | null; 
}

export interface OrderItem {
  id:string , 
  name: string;
  product:OrderProduct | null;
  prodNb :number;
  size: string | null;
  color: string | null;
}

export interface OrderProduct {
  id: string; // uuid
  name: string; // varchar(255)
  price: number; // numeric
  priceAtTime: number; // numeric
  mainImage: string; // varchar(255)
  smallDesc: string; // varchar(255)
  bigDesc: string | null; // varchar(500)
  available: boolean;
  color: string | null; // varchar(255)
  size: string | null; // varchar(255)
  product: string | null; // uuid → FK to product.id
}

export interface Product {
  id: string; 
  name: string;
  price: number; 
  status:boolean ;
  mainImage: string; 
  extraImages: string[];
  sizes: string[];
  smallDesc: string; 
  colors:string[];
  bigDesc: string | null; 
  available: boolean;
  sponsored: boolean;
  owner: string | null; // uuid → FK to seller.id
  prod_class: string | null; // uuid → FK to classification.id
}

export interface ProductList {
  id: string; // uuid
  mainImage: string; // varchar(255)
  name: string; // varchar(255)
  price: number; // numeric
  prodNb: number; // quantity
  color: string | null; // varchar(255)
  size: string | null; // varchar(255)
}


export interface Seller {
  id: string; // uuid
  email: string; // varchar(100)
  password: string; // varchar(255) - hashed
  firstName: string; // varchar(100)
  lastName: string; // varchar(100)
  img: string | null; // varchar(255)
  description: string | null; // varchar(500)
  created_at: Date; // timestamp
  total_orders: number;
  successful_orders: number;
  waiting_orders: number;
  returned_orders: number;
  total_sales: number; // numeric
  phone: number; // integer

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

// ==========================================
// Application Types (UI, Context, State)
// ==========================================

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
}

// ProductDisplay is for UI display purposes (different from database Product)
export type ProductDisplay = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number; // crossed-out price
  currency?: string;
  discountPercent?: number;
  averageRating?: number;
  numOfReviews?: number;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
};

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string; 
  name: string;
  image?: string | StaticImageData;
  weight?: string;
}

export interface CartState {
  cart: CartItem[];
  total: number;
  loading: boolean;
}

export type CartAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { cartItems: CartItem[]; total: number } }
  | { type: "CLEAR_CART" };

export interface CartContextType {
  cart: CartItem[];
  total: number;
  loading: boolean;
  fetchCart: (withLoading?: boolean) => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  updateCartItems: (
    productId: string,
    action: "increase" | "decrease",
  ) => Promise<void>;
  deleteCartItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export interface CartProviderProps {
  children: ReactNode;
}

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

