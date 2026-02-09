"use client";

import { useState, memo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Store,
  ShoppingCart,
} from "lucide-react";
import SingleProductSkeleton from "@/components/SingleProductSkeleton";
import { useAddToCartMutation } from "@/Redux/Services/CartApi";
import { useGetProductByIdQuery } from "@/Redux/Services/ProductsApi";
import { productThumbnails, shopOwnerInfo } from "@/lib/data";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Navigation, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import toast from "react-hot-toast";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/zoom";

type SwiperInstance = any;

const SingleProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance>(null);
  const [addToCart] = useAddToCartMutation();

  const { data: singleProduct, isLoading, isError } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });

  const handleAddToCart = useCallback(() => {
    if (!singleProduct) return;
    
    addToCart({
      productId: singleProduct.id,
      name: singleProduct.name,
      price: singleProduct.price,
      image: singleProduct.main_img || productThumbnails[0],
      quantity: 1,
    })
      .unwrap()
      .then(() => {
        toast.success("Added to cart");
      })
      .catch((error: any) => {
        toast.error(error?.data?.message || "Failed to add to cart");
      });
  }, [singleProduct, addToCart]);

  if (isError) {
    return (
      <main
        className="container mx-auto text-center py-16"
        role="alert"
        aria-live="polite"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          404 - Product Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          Sorry, the product you are looking for does not exist.
        </p>
        <Button
          asChild
          variant="default"
          size="default"
          className=""
          type="button"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </main>
    );
  }

  if (isLoading) {
    return <SingleProductSkeleton />;
  }

  return (
    <main className="mx-auto container px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav
        className="text-sm text-muted-foreground mb-6"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center" role="list">
          <li>
            <Link href="/" className="hover:text-foreground transition">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="mx-2">
            /
          </li>
          <li>
            <Link
              href="/allproducts"
              className="hover:text-foreground transition"
            >
              Categories
            </Link>
          </li>
          <li aria-hidden="true" className="mx-2">
            /
          </li>
          <li aria-current="page">
            <span className="text-foreground font-medium">
              {singleProduct?.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <section className="space-y-4" aria-label="Product images">
          {/* Main Swiper */}
          <div className="relative group">
            <Swiper
              spaceBetween={10}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Navigation, Autoplay, Thumbs]}
              className="w-full aspect-square rounded-lg border border-border bg-background"
              a11y={{
                enabled: true,
                prevSlideMessage: "View previous product image",
                nextSlideMessage: "View next product image",
              }}
            >
              {productThumbnails.map((img, idx) => (
                <SwiperSlide key={`main-image-${idx}`}>
                  <Card className="flex items-center justify-center h-full p-8">
                    <Image
                      src={img}
                      className="w-full lg:w-2/3 object-contain"
                      alt={`${singleProduct?.name} - Image ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      width={600}
                      height={600}
                    />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <button
              className="swiper-button-prev-custom cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              className="swiper-button-next-custom absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="w-full"
            role="group"
            aria-label="Product thumbnail images"
          >
            {productThumbnails.map((img, idx) => (
              <SwiperSlide key={`thumbnail-${idx}`}>
                <Card className="cursor-pointer h-24 flex items-center justify-center p-2 hover:border-purple-500 transition focus-within:ring-2 focus-within:ring-purple-500">
                  <Image
                    src={img}
                    alt={`${singleProduct?.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    width={120}
                    height={120}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Right: Product Info */}
        <section className="space-y-6" aria-label="Product information">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
              {singleProduct?.name}
            </h1>
            <p className="text-muted-foreground">
              {singleProduct?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  Lorem ipsum dolor sit amet, consectetur adipiscing elit  Lorem ipsum dolor sit amet, consectetur adipiscing elit ."}{" "}
            </p>
          </div>
          {/* Weight */}
          {singleProduct?.weight && (
            <div className="space-y-2 ">
              <h3 className="text-sm font-semibold">Weight</h3>
              <Badge variant="outline" className="text-sm bg-muted/50 text-foreground border-transparent px-3 py-1">
                {singleProduct.weight}
              </Badge>
            </div>
          )}

          {/* Size Selector */}
          {/* {(singleProduct?.category === "Clothing" ||
            singleProduct?.category === "Shoes" ||
            singleProduct?.sizes) && ( */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Select Size</h3>
            <fieldset aria-label="Select product size">
              <legend className="sr-only">Available sizes</legend>
              <div className="flex flex-wrap gap-2">
                {(
                  singleProduct?.sizes || ["XS", "S", "M", "L", "XL", "XXL"]
                ).map((size: string) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2  rounded-md cursor-pointer font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "bg-muted hover:bg-muted/50 text-foreground border-transparent"
                    }`}
                    aria-pressed={selectedSize === size}
                    aria-label={`Size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          {/* )} */}

          {/* Color Selector */}
          {singleProduct?.colors && singleProduct.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                Select Color {selectedColor && <span className="font-normal text-muted-foreground">- {singleProduct.colors.find(c => c.hex === selectedColor)?.name}</span>}
              </h3>
              <fieldset aria-label="Select product color">
                <legend className="sr-only">Available colors</legend>
                <div className="flex flex-wrap gap-3">
                  {singleProduct.colors.map((color: { name: string; hex: string }) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setSelectedColor(color.hex)}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all focus:outline-none focus:ring-2  ${
                        selectedColor === color.hex
                          ? "ring-2  scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-pressed={selectedColor === color.hex}
                      aria-label={`Color ${color.name}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              className="text-4xl font-bold text-orange-600"
              aria-label={`Price: $${singleProduct?.price}`}
            >
              ${singleProduct?.price}
            </span>
            {singleProduct?.originalPrice && (
              <span
                className="text-xl text-muted-foreground line-through"
                aria-label={`Original price: $${singleProduct?.originalPrice}`}
              >
                ${singleProduct?.originalPrice}
              </span>
            )}
          </div>

          <Separator className="" />

          {/* Shop Owner Information */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-3">
              <Link href="/seller" className="no-underline">
                <div className="flex items-center gap-2 mb-3 hover:text-purple-600 transition-colors">
                  <Store
                    className="h-5 w-5 text-purple-600"
                    aria-hidden="true"
                  />
                  <h3 className="font-bold text-lg">{shopOwnerInfo.name}</h3>
                </div>
              </Link>

              <address className="space-y-2 text-sm not-italic">
                <div className="flex items-start gap-2">
                  <MapPin
                    className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">
                    {shopOwnerInfo.location}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail
                    className="h-4 w-4 text-muted-foreground flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${shopOwnerInfo.email}`}
                    className="text-muted-foreground hover:text-purple-600 transition"
                    aria-label={`Email ${shopOwnerInfo.name}`}
                  >
                    {shopOwnerInfo.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone
                    className="h-4 w-4 text-muted-foreground flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${shopOwnerInfo.phone}`}
                    className="text-muted-foreground hover:text-purple-600 transition"
                    aria-label={`Call ${shopOwnerInfo.name}`}
                  >
                    {shopOwnerInfo.phone}
                  </a>
                </div>
              </address>
            </div>
          </Card>

          <Separator className="" />

          {/* Actions */}
          <div className="space-y-3">
            <div className="flex sm:flex-row gap-3">
              <Button
                variant="default"
                size="lg"
                className="flex-1 text-base font-semibold"
                onClick={handleAddToCart}
                type="button"
                aria-label="Add product to cart"
              >
                <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                Add to Cart
              </Button>

              <Link href="/complete-order" className="flex-1">
                <Button
                  size="lg"
                  variant="secondary"
                  className="flex-1 text-base font-semibold"
                  type="button"
                  aria-label="Buy product now"
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Reviews Section */}
    </main>
  );
};

export default memo(SingleProduct);
