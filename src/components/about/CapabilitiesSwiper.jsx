"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

function CapabilityCard({ item, index }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:bg-[linear-gradient(145deg,rgba(127,195,80,0.18)_0%,rgba(79,134,198,0.12)_55%,rgba(255,255,255,0.04)_100%)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:rounded-2xl sm:p-5 lg:p-6">
      <div
        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-b from-accent via-accent-soft to-brand transition-all duration-500 group-hover:w-[3px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition duration-500 group-hover:bg-accent/25"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-3">
        <p className="font-display text-3xl leading-none tracking-tight text-white/12 transition duration-500 group-hover:text-accent sm:text-4xl">
          {String(index + 1).padStart(2, "0")}
        </p>
        <span
          className="mt-1 text-sm text-white/20 transition duration-500 group-hover:translate-x-0.5 group-hover:text-accent-soft"
          aria-hidden
        >
          →
        </span>
      </div>

      <h3 className="relative mt-3 font-display text-base tracking-tight transition duration-500 group-hover:text-accent-soft sm:mt-4 sm:text-xl">
        {item.title}
      </h3>
      <div
        className="relative mt-2 h-px w-8 origin-left bg-white/25 transition-all duration-500 group-hover:w-14 group-hover:bg-accent sm:mt-2.5"
        aria-hidden
      />
      <p className="relative mt-2.5 text-xs leading-relaxed text-white/60 transition duration-500 group-hover:text-white/85 sm:mt-3 sm:text-sm">
        {item.description}
      </p>
    </article>
  );
}

export default function CapabilitiesSwiper({ capabilities }) {
  return (
    <div className="capabilities-swiper -mx-5 mt-5">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        centeredSlides
        slidesPerView={1.22}
        spaceBetween={14}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="pb-9"
      >
        {capabilities.map((item, index) => (
          <SwiperSlide key={item.title} className="!h-auto">
            <CapabilityCard item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { CapabilityCard };
