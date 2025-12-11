"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { ProductDetail } from "../types/product.types";

export default function ProductMediaSlider({
  media,
}: {
  media: ProductDetail.Media[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="flex gap-3 max-w-full overflow-hidden flex-col md:flex-row">
      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="w-20 shrink-0 hidden md:block">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={12}
            watchSlidesProgress
            modules={[Thumbs]}
            className="h-[448px]! [&_.swiper-slide-thumb-active]:border-brand-primary!"
            breakpoints={{
              0: {
                direction: "horizontal",
                slidesPerView: 4,
              },
              768: {
                direction: "vertical",
              },
            }}
          >
            {media?.map((src, i) => (
              <SwiperSlide
                key={i}
                className="border border-solid border-transparent rounded-lg overflow-hidden duration-300! transition-all!"
              >
                <div className="aspect-square">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_MEDIA_UPLOAD_DIR + src.fileName
                    }
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Main slider container (to position buttons over it) */}
      <div className="relative flex-1 w-full min-w-0">
        {/* Custom Prev Button */}
        {media.length > 1 && (
          <>
            <button
              onClick={() => mainSwiperRef.current?.slidePrev()}
              className="
            absolute left-2 top-1/2 -translate-y-1/2
            z-20 w-12 h-12 bg-white rounded-lg
            flex items-center justify-center
            border border-solid border-secondary-border
          "
            >
              <span className="material-symbols-rounded -ml-1">
                chevron_left
              </span>
            </button>

            {/* Custom Next Button */}
            <button
              onClick={() => mainSwiperRef.current?.slideNext()}
              className="
            absolute right-2 top-1/2 -translate-y-1/2
            z-20 w-12 h-12 bg-white rounded-lg 
            flex items-center justify-center
            border border-solid border-secondary-border

          "
            >
              <span className="material-symbols-rounded -ml-1">
                chevron_right
              </span>
            </button>
          </>
        )}

        {/* Main Slider */}
        <Swiper
          onSwiper={(sw) => (mainSwiperRef.current = sw)}
          modules={[Thumbs, Pagination]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={10}
          pagination={{ clickable: true }}
          className="w-full"
          autoHeight={true}
        >
          {media?.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={process.env.NEXT_PUBLIC_MEDIA_UPLOAD_DIR + src.fileName}
                className="w-full rounded-2xl object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
