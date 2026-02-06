'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { CartItem as CartItemType } from "@/lib/Types";
import { Truck } from "lucide-react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { memo } from "react";

interface CartItemProps {
  item: CartItemType;
  handleQuantityUpdate: (productId: string, newVal: number, currentVal: number) => void;
  handleDeleteCartItem: (productId: string) => void;
}

const CartItem = memo(function CartItem({ item, handleQuantityUpdate, handleDeleteCartItem }: CartItemProps) {
  return (
    <Card key={item?.productId} className="hover:shadow-md  transition-shadow ">
      <CardContent className="">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product image */}
          <div className="relative w-full sm:w-30 h-32 shrink-0 bg-muted rounded-md overflow-hidden">
            <Image
              src={item?.image || '/placeholder.png'}
              alt={item?.name || 'Product image'}
              className="w-full h-full object-contain p-2 cursor-pointer hover:scale-105 transition"
              loading="lazy"
              width={118}
              height={118}
            />
          </div>

          {/* Product info */}
          <div className="space-y-2">
            <h3
              className="font-semibold text-lg line-clamp-2"
            >
              {item?.name}
            </h3>

            <div className="flex items-center gap-2">
              <span
                className="text-2xl font-bold text-primary"
                aria-label={`Price: $${item?.price}`}
              >
                ${item?.price}
              </span>
             
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Truck className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">Eligible for FREE delivery</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor={`quantity-${item?.productId}`}
                  className="text-sm text-muted-foreground"
                >
                  Qty:
                </label>
               

              <Separator orientation="vertical" className="h-6" />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteCartItem(item.productId)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                type="button"
                aria-label={`Remove ${item?.name} from cart`}
              >
                <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
                Remove
              </Button>
            </div>
          </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default CartItem;
