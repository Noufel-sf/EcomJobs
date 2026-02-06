"use client";

import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = ["/hero1.png", "/hero2.png", "/hero3.png", "/hero4.png"];

const AdSection = () => {
  return (
    <section
      className="px-4 sm:px-6 py-6 sm:py-12 mx-auto container flex items-stretch gap-5 min-h-[300px] sm:min-h-[500px]"
      aria-label="Promotional banners"
    >
      <div className="flex-1 relative">
        <Swiper
          navigation={{
            prevEl: ".custom-prev-all",
            nextEl: ".custom-next-all",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper rounded-sm shadow-lg h-full"
          a11y={{
            enabled: true,
            prevSlideMessage: "Previous promotional banner",
            nextSlideMessage: "Next promotional banner",
          }}
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={`hero-${index}`}>
              <img
                src={image}
                alt={`Promotional banner ${index + 1}`}
                className="w-full h-full cursor-pointer object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                width="1200"
                height="500"
              />
            </SwiperSlide>
          ))}

          <button
            className="custom-prev-all absolute cursor-pointer left-4 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-md p-2 rounded-full text-xl hover:bg-red-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            className="custom-next-all cursor-pointer absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-md p-2 rounded-full text-xl hover:bg-red-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </Swiper>
      </div>

      <aside
        className="hidden lg:flex max-w-[20%] items-center"
        aria-label="Sponsored advertisement"
      >
        <img
          src="/sp2.png"
          alt="Sponsored advertisement banner"
          className="w-full h-full object-cover rounded-sm shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
          loading="lazy"
          width="300"
          height="500"
        />
      </aside>
    </section>
  );
};

export default memo(AdSection);
