"use client";

import { useRef, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import JobCard from './JobCard';
import { jobsOfTheDay } from '@/lib/data.tsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JobsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-muted/20"
      aria-labelledby="jobs-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="max-w-4xl">
            <h2 
              id="jobs-heading"
              className="text-
              2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6"
            >
              Featured Opportunities
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Discover top tech jobs in Algeria. Apply now and take your career to
              the next level.
            </p>
          </div>
          <div className="flex items-center gap-3" role="group" aria-label="Job carousel navigation">
            <button 
              className="jobs-prev w-8 h-8 px-2 rounded-lg flex items-center justify-center bg-primary hover:bg-primary/90 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Previous jobs"
              type="button"
            >
              <ChevronLeft className="text-white" aria-hidden="true" />
            </button>
            <button 
              className="jobs-next w-8 h-8 px-2 rounded-lg flex items-center justify-center bg-primary hover:bg-primary/90 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Next jobs"
              type="button"
            >
              <ChevronRight className="text-white" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Jobs Swiper */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          navigation={{
            nextEl: '.jobs-next',
            prevEl: '.jobs-prev',
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
              slidesPerView: 4,
            },
          }}
          className="mb-12"
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous job',
            nextSlideMessage: 'Next job',
          }}
        >
          {jobsOfTheDay.map((job) => (
            <SwiperSlide key={job.id}>
              <JobCard job={job} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="default"
            className="bg-primary hover:bg-primary/90 transition-colors"
            aria-label="Browse all available jobs"
          >
            Browse All Jobs
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(JobsSection);
