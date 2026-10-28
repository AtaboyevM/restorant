import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { CalendarCheck, ChevronRight, Sparkles } from 'lucide-react';

export const HeroSlider = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
      title: t('hero.slide1Title'),
      desc: t('hero.slide1Desc'),
      kicker: 'PARIS · TASHKENT · LONDON',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85',
      title: t('hero.slide2Title'),
      desc: t('hero.slide2Desc'),
      kicker: 'MICHELIN HAUTE CUISINE',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=85',
      title: t('hero.slide3Title'),
      desc: t('hero.slide3Desc'),
      kicker: 'DUBAI · ROME · ISTANBUL',
    },
  ];

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] overflow-hidden bg-stone-950">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />

            {/* Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-stone-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60" />

            {/* Slide Content */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl space-y-6">
                
                {/* Clean Unboxed Kicker */}
                <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>{slide.kicker}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t('hero.badge')}</span>
                </div>

                {/* Display Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-100 leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed max-w-xl font-sans">
                  {slide.desc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/reservations"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all duration-200"
                  >
                    <CalendarCheck size={18} />
                    <span>{t('hero.bookTable')}</span>
                  </Link>

                  <a
                    href="#specials-section"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-amber-300 text-xs sm:text-sm font-semibold tracking-wider rounded-xl border border-stone-700/80 backdrop-blur-md transition-all duration-200"
                  >
                    <span>{t('hero.discoverMenu')}</span>
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
