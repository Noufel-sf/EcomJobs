import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CartItem } from "@/lib/DatabaseTypes";


const CART_STORAGE_KEY = "ecom_cart";


interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}



const getCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { items: [], totalItems: 0, totalPrice: 0 };
    }
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};


const saveCartToStorage = (cart: CartState): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({

    getCart: builder.query<CartState, void>({
      queryFn: () => {
        const cart = getCartFromStorage();
        return { data: cart };
      },
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<CartState, CartItem>({
      queryFn: (newItem) => {
        const cart = getCartFromStorage();
        const existingIndex = cart.items.findIndex(
          (item) => item.productId === newItem.productId
        );

        if (existingIndex >= 0) {
          cart.items[existingIndex].quantity += newItem.quantity || 1;
        } else {
          cart.items.push({ ...newItem, quantity: newItem.quantity || 1 });
        }

        const totals = calculateTotals(cart.items);
        const updatedCart = { items: cart.items, ...totals };
        saveCartToStorage(updatedCart);
        return { data: updatedCart };
      },
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<CartState, { productId: string; action: "increment" | "decrement" }>({
      queryFn: ({ productId, action }) => {
        const cart = getCartFromStorage();
        const itemIndex = cart.items.findIndex((item) => item.productId === productId);

        if (itemIndex >= 0) {
          if (action === "increment") {
            cart.items[itemIndex].quantity += 1;
          } else if (action === "decrement") {
            cart.items[itemIndex].quantity -= 1;
            if (cart.items[itemIndex].quantity <= 0) {
              cart.items.splice(itemIndex, 1);
            }
          }
        }

        const totals = calculateTotals(cart.items);
        const updatedCart = { items: cart.items, ...totals };
        saveCartToStorage(updatedCart);
        return { data: updatedCart };
      },
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation<CartState, string>({
      queryFn: (productId) => {
        const cart = getCartFromStorage();
        cart.items = cart.items.filter((item) => item.productId !== productId);

        const totals = calculateTotals(cart.items);
        const updatedCart = { items: cart.items, ...totals };
        saveCartToStorage(updatedCart);
        return { data: updatedCart };
      },
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<CartState, void>({
      queryFn: () => {
        const emptyCart: CartState = { items: [], totalItems: 0, totalPrice: 0 };
        saveCartToStorage(emptyCart);
        return { data: emptyCart };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} = cartApi;
