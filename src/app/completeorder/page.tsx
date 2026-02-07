'use client';

import { useState, useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCartQuery } from "@/Redux/Services/CartApi";
import axiosInstance from "@/lib/Api";
import toast from "react-hot-toast";
import CompleteOrderSkeleton from "@/components/CompleteOrderSkeleton";
import Image from "next/image";
import {
  Truck,
  MapPin,
  User,
  Lock,
  Package,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/zodValidation";
import { wilayas, shippingOptions } from "@/lib/data";

function CompleteOrder() {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const cart = cartData?.cartItems || [];
  const total = cartData?.total || 0;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);



  const displayCart = cart.length > 0 ? cart : [];
  const mockTotal = 0;
  const displayTotal = total > 0 ? total : mockTotal;

  // Enhanced shipping options with icons
  const shippingOptionsWithIcons = useMemo(
    () =>
      shippingOptions.map((option) => ({
        ...option,
        icon: option.id === "standard" ? Truck : Package,
      })),
    [],
  );

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      wilaya: "",
      shippingMethod: "standard",
      notes: "",
    },
  });

  const selectedShippingMethod = form.watch("shippingMethod");

  const { shippingCost, grandTotal } = useMemo(() => {
    const selectedShipping = shippingOptions.find(
      (opt) => opt.id === selectedShippingMethod,
    );
    const cost = selectedShipping?.price || 0;
    return {
      shippingCost: cost,
      grandTotal: displayTotal + cost,
    };
  }, [selectedShippingMethod, displayTotal]);

  const SubmitOrder = useCallback(
    async (data: CheckoutFormValues) => {
      try {
        setSubmitting(true);
        const response = await axiosInstance.post("/order", {
          ...data,
          items: displayCart,
          total: grandTotal,
        });
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${response.data.orderId}`);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Order failed");
      } finally {
        setSubmitting(false);
      }
    },
    [displayCart, grandTotal, router],
  );

  if (isLoading) {
    return <CompleteOrderSkeleton />;
  }

  if (cart.length === 0 && !isLoading) {
    return (
      <main
        className="container mx-auto px-4 py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <Package
          className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Add items to your cart before checking out
        </p>
        <Button
          onClick={() => router.push("/products")}
          size="lg"
          variant="default"
          className=""
          type="button"
          aria-label="Continue shopping"
        >
          Continue Shopping
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <header className="mb-8">
          <Button
            variant="ghost"
            size="default"
            onClick={() => router.push("/cart")}
            className="mb-4"
            type="button"
            aria-label="Back to cart"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Cart
          </Button>
          <h1 className="text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" aria-hidden="true" />
            Complete Your Order
          </h1>
          <p className="text-muted-foreground mt-2">
            Fill in your details to complete your purchase
          </p>
        </header>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Checkout Form */}
          <section className="lg:col-span-2" aria-label="Checkout form">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(SubmitOrder)}
                className="space-y-6"
                aria-label="Complete order form"
              >
                {/* Contact Information */}
                <Card className="">
                  <CardHeader className="">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" aria-hidden="true" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field } ) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ahmed" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Benali" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="ahmed@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+213 555 123 456"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Shipping Address & Method */}
                <Card className="">
                  <CardHeader className="">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                      Shipping Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Main Street, Apt 4B"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Algiers" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="wilaya"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Wilaya *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Select wilaya" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="">
                                {wilayas.map((wilaya) => (
                                  <SelectItem
                                    key={wilaya}
                                    value={wilaya}
                                    className=""
                                  >
                                    {wilaya}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-6" />

                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Truck className="w-4 h-4" aria-hidden="true" />
                            Shipping Method
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3 mt-3"
                            >
                              {shippingOptionsWithIcons.map((option) => (
                                <div
                                  key={option.id}
                                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition ${
                                    field.value === option.id
                                      ? "border-primary bg-primary/5 shadow-sm"
                                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={option.id}
                                    id={option.id}
                                  />
                                  <Label
                                    htmlFor={option.id}
                                    className="flex-1 cursor-pointer"
                                  >
                                    <div className="flex items-center w-full justify-between">
                                      <div className="flex items-center gap-3">
                                        <option.icon
                                          className="w-5 h-5 text-muted-foreground"
                                          aria-hidden="true"
                                        />
                                        <div>
                                          <p className="font-semibold">
                                            {option.name}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            {option.time}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="font-semibold  text-green-500">
                                        {option.price === 0
                                          ? "FREE"
                                          : `${option.price} DA`}
                                      </p>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-6" />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <textarea
                              className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                              rows={3}
                              placeholder="Any special instructions for your order..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting || displayCart.length === 0}
                  className="w-full"
                  size="lg"
                  variant="default"
                  aria-label={submitting ? "Processing order" : "Place order"}
                >
                  {submitting ? (
                    <>
                      <div
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                        aria-hidden="true"
                      />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" aria-hidden="true" />
                      Place Order - {grandTotal.toFixed(2)} DZ
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our terms and conditions.
                  Payment will be collected on delivery.
                </p>
              </form>
            </Form>
          </section>

          {/* Right: Order Summary */}
          <aside className="space-y-4" aria-label="Order summary">
            <Card className="sticky top-4 shadow-lg">
              <CardHeader className="">
                <CardTitle className="">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mt-6">
                {/* Cart Items */}
                <div
                  className="space-y-3 max-h-80 overflow-y-auto"
                  role="list"
                  aria-label="Cart items"
                >
                  {displayCart.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="relative  w-16 h-16 bg-muted rounded flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                          width={64}
                          height={64}
                        />
                        <Badge
                          variant="default"
                          className="absolute -top-0 right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="" />

                {/* Price Breakdown */}
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">
                      Subtotal ({displayCart.length} items)
                    </dt>
                    <dd className="font-medium">${displayTotal.toFixed(2)}</dd>
                  </div>

                  <Separator className="" />

                  <div className="flex justify-between text-base pt-2">
                    <dt className="font-bold">Total</dt>
                    <dd className="font-bold text-green-500 text-xl">
                      {grandTotal.toFixed(2)} DZ
                    </dd>
                  </div>
                </dl>

                <Separator className="" />

                {/* Trust Badges */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock
                      className="w-4 h-4 text-green-600"
                      aria-hidden="true"
                    />
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default memo(CompleteOrder);
