import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, MapPin, Truck } from "lucide-react";

function CompleteOrderSkeleton() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-32 mb-4" />
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-10 w-80" />
          </div>
          <Skeleton className="h-5 w-64 mt-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <Card className="">
              <CardHeader className="">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" aria-hidden="true" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Details Card */}
            <Card className="">
              <CardHeader className="">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" aria-hidden="true" />
                    <Skeleton className="h-5 w-36" />
                  </div>
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-24 w-full rounded-md" />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button Skeleton */}
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>

          {/* Right: Order Summary Skeleton */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardHeader className="">
                <CardTitle className="">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mt-6">
                {/* Cart Items Skeleton */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="w-16 h-16 rounded flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="" />

                {/* Price Breakdown Skeleton */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}

                  <Separator className="" />

                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>

                <Separator className="" />

                {/* Trust Badge Skeleton */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CompleteOrderSkeleton);
