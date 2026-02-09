'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Api from '@/lib/Api';
import type { CartAction, CartContextType, CartProviderProps, CartState } from '@/lib/DatabaseTypes';
import toast from 'react-hot-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  cart: [],
  total: 0,
  loading: false,
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        cart: action.payload.cartItems,
        total: action.payload.total,
        loading: false,
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], total: 0 };
    default:
      return state;
  }
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCart = async (withLoading = true) => {
    try {
      if (withLoading) dispatch({ type: 'FETCH_START' });
      const res = await Api.get('/cart');
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await Api.post('/cart', { productId });
      fetchCart();
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Add to cart failed');
    }
  };

  const updateCartItems = async (productId: string, action: 'increase' | 'decrease') => {
    try {
      await Api.patch('/cart', { productId, action });
      await fetchCart(false);
    } catch (error) {
      toast.error('Failed to update cart');
      console.log(error);
    }
  };

  const deleteCartItem = async (productId: string) => {
    try {
      await Api.delete('/cart/deleteItem', {
        data: { productId },
      });
      await fetchCart(false);
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const clearCart = async () => {
    try {
      await Api.delete('/cart');
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared');
      await fetchCart(false);
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        total: state.total,
        loading: state.loading,
        fetchCart,
        addToCart,
        updateCartItems,
        deleteCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
