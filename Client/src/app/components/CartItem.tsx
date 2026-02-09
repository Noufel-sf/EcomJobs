'use client';

import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "@/lib/DatabaseTypes";
import Image from "next/image";
import { Minus, Plus ,Trash } from "lucide-react";
import { memo } from "react";

interface CartItemProps {
  item: CartItemType;
  handleQuantityUpdate: (productId: string, newVal: number, currentVal: number) => void;
  handleDeleteCartItem: (productId: string) => void;
}

const CartItem = memo(function CartItem({ item, handleQuantityUpdate, handleDeleteCartItem }: CartItemProps) {
  const totalPrice = (item?.price * item?.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 py-4 border-b border-border last:border-b-0">
      {/* Top row on mobile: Image + Info */}
      <div className="flex gap-3 sm:gap-4 flex-1">
        {/* Product image */}
        <div className="relative w-16 h-16 sm:w-22 sm:h-22 shrink-0 rounded overflow-hidden">
          <Image
            src={item?.image || '/placeholder.png'}
            alt={item?.name || 'Product image'}
            className="w-full h-full object-contain"
            loading="lazy"
            fill
            sizes="(max-width: 640px) 64px, 88px"
          />
        </div>

        {/* Product name & details */}
        <div className="flex-1 space-y-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 sm:line-clamp-1">
            {item?.name}
          </h3>
          <p className="font-medium text-green-500 text-sm">
            ${item?.price.toFixed(2)} x {item?.quantity}
          </p>
          <button
            onClick={() => handleDeleteCartItem(item.productId)}
            type="button"
            className="flex items-center gap-1 cursor-pointer text-red-500 text-xs hover:text-red-600 transition"
            aria-label="Remove item"
          >
            <Trash className="w-3 h-3" />
            <span>remove</span>
          </button>
        </div>

        {/* Total price - visible on mobile in top row */}
        <div className="text-sm font-semibold shrink-0 sm:hidden">
          ${totalPrice}
        </div>
      </div>

      {/* Bottom row on mobile: Quantity controls + Total */}
      <div className="flex items-center justify-between sm:justify-end gap-4 pl-19 sm:pl-0">
        {/* Quantity controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-7 sm:w-7 rounded-full border"
            onClick={() => handleQuantityUpdate(item.productId, item.quantity - 1, item.quantity)}
            disabled={item.quantity <= 1}
            type="button"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 sm:w-6 text-center text-sm font-medium">
            {item?.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-7 sm:w-7 rounded-full border"
            onClick={() => handleQuantityUpdate(item.productId, item.quantity + 1, item.quantity)}
            type="button"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        {/* Total price - hidden on mobile, visible on desktop */}
        <div className="hidden sm:block text-sm font-semibold shrink-0 w-16 text-right">
          ${totalPrice}
        </div>
      </div>
    </div>
  );
});

export default CartItem;
