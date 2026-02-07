'use client';

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkeletonItem, SkeletonSummary } from "@/components/CartItemsSkeleton";
import { useGetCartQuery, useUpdateCartItemMutation, useDeleteCartItemMutation, useClearCartMutation } from "@/Redux/Services/CartApi";
import toast from "react-hot-toast";
import CartItem from "@/components/CartItem";
import Api from "@/lib/Api";

import {
  ShoppingBag,
  Trash2,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

function CartPage() {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItemMutation] = useDeleteCartItemMutation();
  const [clearCartMutation] = useClearCartMutation();

  const cart = cartData?.cartItems || [];
  console.log("the cart is " , cart);
  
  const total = cartData?.total || 0;

  const Total = cart.reduce((sum : number, item) => sum + (item.price * item.quantity), 0);
  const displayTotal = total > 0 ? total : Total;

  const router = useRouter();

  const handleQuantityUpdate = useCallback(
    async (productId: string, newVal: number, currentVal: number) => {
      try {
        if (newVal < 1) {
          await deleteCartItemMutation(productId).unwrap();
          toast.success("Item removed from cart");
        } else {
          const action = newVal > currentVal ? "increase" : "decrease";
          await updateCartItem({ productId, action }).unwrap();
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update cart");
      }
    },
    [deleteCartItemMutation, updateCartItem],
  );

  const handleDeleteCartItem = useCallback(
    async (productId: string) => {
      try {
        await deleteCartItemMutation(productId).unwrap();
        toast.success("Item removed from cart");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to remove item");
      }
    },
    [deleteCartItemMutation],
  );

  const handleClearCart = useCallback(async () => {
    try {
      await clearCartMutation().unwrap();
      toast.success("Cart cleared");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to clear cart");
    }
  }, [clearCartMutation]);

  const checkOut = useCallback(async () => {
    try {
      const { data } = await Api.post("/order");
      window.location.href = data.url;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Checkout failed");
    }
  }, []);  const savings = 0; // Can be used for future promo code feature
  const finalTotal = displayTotal - savings;





  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-muted-foreground mb-6 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/allproducts")}
            className="gap-1"
            type="button"
            aria-label="Continue shopping"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Continue Shopping
          </Button>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" aria-hidden="true" />
            Shopping Cart
          </h1>
          <p className="text-muted-foreground" role="status" aria-live="polite">
            {isLoading ? "Loading..." : `${cart.length} ${cart.length === 1 ? "item" : "items"} in your cart`}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 pr-2 gap-8">
          {/* Left: Cart Items */}
          <section
            className="lg:col-span-2 space-y-4"
            aria-label="Shopping cart items"
          >
            {isLoading ? (
              <>
                {/* Loading Skeletons */}
                {[...Array(3)].map((_, index) => (
                  <SkeletonItem key={index} />
                ))}
              </>
            ) : cart.length > 0 ? (
              <>
                {/* Cart items */}
                {cart.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item.product}
                    handleQuantityUpdate={handleQuantityUpdate}
                    handleDeleteCartItem={handleDeleteCartItem}
                  />
                ))}

                {/* Clear cart */}
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="w-full sm:w-auto"
                  size="default"
                  type="button"
                  aria-label="Clear all items from cart"
                >
                  <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
                  Clear Cart
                </Button>
              </>
            ) : (
              <Card
                className="p-12 text-center"
                role="status"
                aria-live="polite"
              >
                <ShoppingBag
                  className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven&apos;t added anything to your cart yet
                </p>
                <Button
                  onClick={() => router.push("/allproducts")}
                  size="lg"
                  variant=""
                  className=""
                  type="button"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>
              </Card>
            )}
          </section>

          {/* Right: Order Summary */}
          <aside className="space-y-4" aria-label="Order summary">
            {isLoading ? (
              <SkeletonSummary />
            ) : cart.length > 0 ? (
              <Card className="sticky top-4">
                  <CardHeader className="">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" aria-hidden="true" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Price breakdown */}
                    <dl className="space-y-3 mt-3">
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Subtotal</dt>
                        <dd className="font-medium">${total.toFixed(2)}</dd>
                      </div>

                      {savings > 0 && (
                        <div className="flex justify-between text-sm">
                          <dt className="text-green-600">Discount</dt>
                          <dd className="font-medium text-green-600">
                            -${savings.toFixed(2)}
                          </dd>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Shipping</dt>
                        <dd className="font-medium text-green-600">FREE</dd>
                      </div>

                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Tax</dt>
                        <dd className="font-medium">$0.00</dd>
                      </div>

                      <Separator className="" />

                      <div className="flex justify-between text-lg">
                        <dt className="font-bold">Total</dt>
                        <dd className="font-bold text-primary">
                          ${finalTotal.toFixed(2)}
                        </dd>
                      </div>
                    </dl>
                    <Link href="/completeorder" className="w-full">
                      <Button
                        size="lg"
                        variant="primary"
                        className="w-full mt-2 text-base font-semibold"
                        onClick={checkOut}
                        disabled={cart.length === 0}
                        type="button"
                        aria-label="Proceed to complete order"
                      >
                        Proceed to Complete Order
                        <ArrowRight
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </Link>
                    <div className="flex mt-3 items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Lock className="w-3 h-3" aria-hidden="true" />
                      <span>Secure checkout - Your data is protected</span>
                    </div>
                  </CardContent>
                </Card>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default memo(CartPage);
