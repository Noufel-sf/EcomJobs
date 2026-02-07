import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { StaticImageData } from 'next/image';

export interface User {
	userId: string;
	name: string;
	email: string;
	role: string;
}

export type Product = {
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
	name: string;
	image?: string | StaticImageData;
}

export interface CartState {
	cart: CartItem[];
	total: number;
	loading: boolean;
}

export type CartAction =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: { cartItems: CartItem[]; total: number } }
	| { type: 'CLEAR_CART' };

export interface CartContextType {
	cart: CartItem[];
	total: number;
	loading: boolean;
	fetchCart: (withLoading?: boolean) => Promise<void>;
	addToCart: (productId: string) => Promise<void>;
	updateCartItems: (productId: string, action: 'increase' | 'decrease') => Promise<void>;
	deleteCartItem: (productId: string) => Promise<void>;
	clearCart: () => Promise<void>;
}

export interface CartProviderProps {
	children: ReactNode;
}

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeProviderContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
}




