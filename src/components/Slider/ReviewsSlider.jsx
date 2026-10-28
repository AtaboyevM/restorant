import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

export const ReviewsSlider = ({ reviews }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop={true}
        className="pb-12"
      >
        {reviews.map((rev) => (
          <SwiperSlide key={rev.id} className="h-auto">
            <div className="h-full bg-stone-900/60 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote size={20} className="text-amber-500/30" />
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-800/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-semibold text-stone-100">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-amber-400/80">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
