'use client';

import { useRef, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { SkeletonCard } from "./SkeletonCard";
import { useAddToCartMutation } from "@/Redux/Services/CartApi";
import { useGetAllProductsQuery } from "@/Redux/Services/ProductsApi";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";

const BestSellingSection = memo(function BestSellingSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  // ✅ Fetch with RTK Query
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery(undefined);

  // Extract products array from response
  const products = productsData?.products || [];


  const [addToCartMutation] = useAddToCartMutation();

  const addToCart = async (id: string) => {
    try {
      await addToCartMutation(id).unwrap();
      toast.success("Added to cart");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <section className="mx-auto container px-6 py-12" aria-labelledby="best-selling-heading">
      <div className="heading mb-6 flex items-center justify-between">
        <h2 id="best-selling-heading" className="capitalize text-2xl font-bold">
          Best Selling Products ({products.length} items)
        </h2>

        <div className="flex items-center gap-3">
          <button
            className="best-selling-prev w-8 h-8 px-2 rounded-lg flex cursor-pointer items-center justify-center bg-orange-500 hover:bg-orange-600 transition-all duration-200"
            aria-label="Previous products"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            className="best-selling-next w-8 h-8 px-2 rounded-lg flex cursor-pointer items-center justify-center bg-orange-500 hover:bg-orange-600 transition-all duration-200"
            aria-label="Next products"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      {isError ? (
        <div className="text-center py-8 text-red-500">
          <p>Failed to load best selling products.</p>
          <Button onClick={refetch} className="mt-4" variant="default" size="default">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={30}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".best-selling-next",
              prevEl: ".best-selling-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 5 },
            }}
            className="testimonial-swiper"
          >
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <SwiperSlide key={`skeleton-${i}`}>
                    <SkeletonCard />
                  </SwiperSlide>
                ))
              : products.map((product: any) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>

          {!isLoading && products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No products available at the moment.</p>
            </div>
          )}

          {!isLoading && products.length > 0 && (
            <div className="text-center">
              <Link href="/products">
                <Button
                  size="lg"
                  variant="default"
                  className="mt-8 mx-auto bg-primary hover:bg-primary/90 flex items-center gap-2"
                >
                  View All Best Selling Products
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
});

export default BestSellingSection;
