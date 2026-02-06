'use client';

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Api from "@/lib/Api";
import { SkeletonCard } from "./SkeletonCard";
import { useCart } from "@/context/CartContext";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/Types";

const BestSellingSection = memo(function BestSellingSection() {
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const swiperRef = useRef<SwiperType | null>(null);

  const fetchBestSellingProducts = useCallback(async () => {
    try {
      setError(null);
      const { data } = await Api.get("/product/bestSelling");
      setBestSellingProducts(data?.products || []);
    } catch (error) {
      console.error("Failed to fetch best selling products:", error);     
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBestSellingProducts();
  }, [fetchBestSellingProducts]);

  const handleSlideChange = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  return (
    <section className="mx-auto container px-6 py-12" aria-labelledby="best-selling-heading">
      <div className="heading mb-6 flex items-center justify-between">
        <h2 id="best-selling-heading" className="capitalize text-2xl font-bold">
          Best Selling Products
        </h2>
        <div className="flex items-center gap-3" role="group" aria-label="Carousel navigation">
          <button
            className="best-selling-prev w-8 h-8 px-2 rounded-lg flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Previous products"
            type="button"
          >
            <ChevronLeft className="text-white" aria-hidden="true" />
          </button>
          <button
            className="best-selling-next w-8 h-8 px-2 rounded-lg flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Next products"
            type="button"
          >
            <ChevronRight className="text-white" aria-hidden="true" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="text-center py-8 text-red-500" role="alert">
          <p>{error}</p>
          <Button onClick={fetchBestSellingProducts} className="mt-4" variant="default" size="default">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
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
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
            className="testimonial-swiper"
            a11y={{
              enabled: true,
              prevSlideMessage: "Previous product",
              nextSlideMessage: "Next product",
            }}
          >
            {loading
              ? [...Array(5)].map((_, i) => (
                  <SwiperSlide key={`skeleton-${i}`}>
                    <SkeletonCard />
                  </SwiperSlide>
                ))
              : bestSellingProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
          
          {!loading && bestSellingProducts.length > 0 && (
            <div className="text-center">
              <Link href="/products" aria-label="View all best selling products">
                <Button
                  size="lg"
                  variant="default"
                  className="mt-8 mx-auto bg-primary hover:bg-primary/90 flex items-center gap-2 transition-colors"
                >
                  View All Best Selling Products
                  <ShoppingCart className="h-5 w-5" aria-hidden="true" />
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
