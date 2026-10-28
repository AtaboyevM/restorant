import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Award,
  Crown,
  ChefHat,
  Flame,
  AlertCircle,
  RefreshCw,
  UtensilsCrossed,
} from 'lucide-react';
import { HeroSlider } from '../../components/Slider/HeroSlider';
import { RestaurantCard } from '../../components/RestaurantCard/RestaurantCard';
import { ReviewsSlider } from '../../components/Slider/ReviewsSlider';
import { LikeButton } from '../../components/LikeButton/LikeButton';
import {
  fetchRestaurants,
  fetchSpecials,
  fetchReviews,
} from '../../services/api';

export const Home = () => {
  const { t } = useTranslation();

  const [restaurants, setRestaurants] = useState([]);
  const [specials, setSpecials] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingSpecials, setLoadingSpecials] = useState(true);
  const [specialsError, setSpecialsError] = useState(null);

  useEffect(() => {
    fetchRestaurants()
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err));

    fetchReviews()
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  const loadDbSpecials = () => {
    setLoadingSpecials(true);
    setSpecialsError(null);
    fetchSpecials()
      .then((data) => {
        setSpecials(data);
        setLoadingSpecials(false);
      })
      .catch((err) => {
        console.error('Error fetching specials from db.json:', err);
        setSpecialsError(t('specials.error'));
        setLoadingSpecials(false);
      });
  };

  useEffect(() => {
    loadDbSpecials();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* A. Hero Section with Swiper Slider */}
      <HeroSlider />

      {/* B. First Image Data Section — Dynamic ID /restaurants/:id */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
              <Crown size={14} />
              <span>{t('brand.name')} NETWORK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
              {t('home.locationsTitle')}
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t('home.locationsSubtitle')}
            </p>
          </div>

          <Link
            to="/reservations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 pb-1 border-b border-amber-400/40 hover:border-amber-300 transition-colors shrink-0"
          >
            <span>{t('nav.reservations')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* C. Second Image Data Section — db.json via Fetch API with Loading/Error/Empty states */}
      <section id="specials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
              <ChefHat size={14} />
              <span>LIVE FROM DB.JSON</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
              {t('home.specialsTitle')}
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t('home.specialsSubtitle')}
            </p>
          </div>

          <button
            onClick={loadDbSpecials}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-stone-300 bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors"
            title="Refresh db.json"
          >
            <RefreshCw size={12} className={loadingSpecials ? 'animate-spin' : ''} />
            <span>Fetch db.json</span>
          </button>
        </div>

        {/* Loading State */}
        {loadingSpecials && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 bg-stone-900/30 rounded-2xl border border-stone-800">
            <div className="w-10 h-10 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
            <p className="text-xs font-mono text-stone-400">{t('specials.loading')}</p>
          </div>
        )}

        {/* Error State */}
        {specialsError && !loadingSpecials && (
          <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-800/40 text-center space-y-4">
            <AlertCircle size={36} className="text-rose-400 mx-auto" />
            <p className="text-sm text-rose-300">{specialsError}</p>
            <button
              onClick={loadDbSpecials}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
            >
              {t('specials.retry')}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loadingSpecials && !specialsError && specials.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-stone-900/30 rounded-2xl border border-stone-800">
            <UtensilsCrossed size={36} className="text-stone-600 mx-auto" />
            <p className="text-sm text-stone-400">{t('specials.empty')}</p>
          </div>
        )}

        {/* Specials Grid */}
        {!loadingSpecials && !specialsError && specials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specials.map((dish) => (
              <div
                key={dish.id}
                className="group relative bg-stone-900/60 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Like Button */}
                  <div className="absolute top-3 right-3 z-10">
                    <LikeButton
                      item={{
                        id: dish.id,
                        type: 'dish',
                        name: dish.name,
                        image: dish.image,
                        subtitle: dish.category,
                        price: dish.price,
                      }}
                    />
                  </div>

                  {/* Category & Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-medium text-stone-200 bg-stone-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
                      {dish.category}
                    </span>
                    {dish.isChefSpecial && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/20 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/40">
                        <Flame size={12} />
                        <span>Chef's Choice</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Dish Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-amber-400">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                    <span>{t('specials.prepTime')}: {dish.prepTime}</span>
                    <span>{dish.calories}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* D. Table Reservation CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80"
            alt="VALVERIS Grand Dining Table"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/60" />

          <div className="relative p-8 sm:p-12 lg:p-16 max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
              <CalendarCheck size={16} />
              <span>25 EXCLUSIVE TABLES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 leading-tight">
              {t('home.ctaTitle')}
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {t('home.ctaDesc')}
            </p>

            <div className="pt-2">
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all duration-200"
              >
                <CalendarCheck size={18} />
                <span>{t('home.ctaButton')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* E. Brand Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            EXCELLENCE IN EVERY DETAIL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            {t('home.advantagesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-100">
              Michelin E'tirofi
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Xalqaro darajadagi mutaxassislar va oshpazlar tomonidan yaratilgan mualliflik menyusi.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-100">
              Eng Saralangan Mahsulotlar
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Fransiya, Yaponiya va Italiyadan maxsus keltirilgan premium organik mahsulotlar.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Crown size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-100">
              Shaxsiy Xizmat & Sommelier
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Har bir mehmon uchun shaxsiy butler, maxsus sommelier va yakkama-yakka e'tibor.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-100">
              25 Stolli Bron Tizimi
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              25 ta stolning real vaqt rejimida bandligi va bir necha soniyada onlayn bron qilish.
            </p>
          </div>
        </div>
      </section>

      {/* F. Customer Reviews Carousel with Swiper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            {t('home.reviewsTitle')}
          </h2>
          <p className="text-sm text-stone-400">
            {t('home.reviewsSubtitle')}
          </p>
        </div>

        <ReviewsSlider reviews={reviews} />
      </section>
    </div>
  );
};
