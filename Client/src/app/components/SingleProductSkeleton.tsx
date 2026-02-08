import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SingleProductSkeleton = () => {
  return (
    <main className="mx-auto container px-4 lg:px-8 py-8">
      {/* Breadcrumb Skeleton */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb loading">
        <Skeleton className="h-4 w-64" />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery Skeleton */}
        <section className="space-y-4" aria-label="Product images loading">
          {/* Main Image Skeleton */}
          <Skeleton className="w-full aspect-square rounded-lg" />

          {/* Thumbnails Skeleton */}
          <div className="flex gap-2">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={`thumb-skeleton-${idx}`} className="h-24 flex-1 rounded-md" />
            ))}
          </div>
        </section>

        {/* Right: Product Info Skeleton */}
        <section className="space-y-6" aria-label="Product information loading">
          <div className="space-y-4">
            {/* Title Skeleton */}
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          {/* Price Skeleton */}
          <div className="flex items-baseline gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>

          <Separator className="" />

          {/* Features Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-56" />
          </div>

          <Separator className="" />

          {/* Shop Owner Skeleton */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </Card>

          <Separator className="" />

          {/* Actions Skeleton */}
          <div className="space-y-3">
            <div className="flex sm:flex-row gap-3">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>
        </section>
      </div>

      {/* Reviews Section Skeleton */}
      <section className="mt-16">
        <Skeleton className="h-9 w-64 mb-8" />

        <div className="space-y-8">
          {/* Write Review Form Skeleton */}
          <Card className="p-6">
            <Skeleton className="h-7 w-48 mb-4" />
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-12 w-full" />
          </Card>

          {/* Existing Reviews Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <Card key={`review-skeleton-${idx}`} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleProductSkeleton;
