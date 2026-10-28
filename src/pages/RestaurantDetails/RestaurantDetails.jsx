import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Clock,
  Phone,
  Users,
  Star,
  ChevronLeft,
  CalendarCheck,
  CheckCircle,
  Crown,
  ChefHat,
  Utensils,
} from 'lucide-react';
import { fetchRestaurantById } from '../../services/api';
import { LikeButton } from '../../components/LikeButton/LikeButton';

export const RestaurantDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchRestaurantById(id)
        .then((res) => {
          setRestaurant(res);
          if (res) {
            setSelectedGalleryImg(res.image);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
        <span className="text-xs font-mono text-stone-400">Loading details...</span>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-[60vh] max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <Utensils size={40} className="text-stone-600 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-stone-200">
          Restoran topilmadi
        </h2>
        <p className="text-xs text-stone-400">
          Ushbu ID ({id}) bo'yicha hech qanday restoran topilmadi.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-stone-950 text-xs font-semibold rounded-lg"
        >
          <ChevronLeft size={16} />
          <span>{t('restaurant.backToList')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-400 hover:text-amber-300 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>{t('restaurant.backToList')}</span>
        </Link>

        <div className="flex items-center gap-3">
          <LikeButton
            item={{
              id: restaurant.id,
              type: 'restaurant',
              name: restaurant.name,
              image: restaurant.image,
              subtitle: restaurant.tagline,
              rating: restaurant.rating,
              cuisine: restaurant.cuisine,
              city: restaurant.city,
            }}
            size={20}
          />
        </div>
      </div>

      {/* Main Showcase Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Left: Gallery & Main Image */}
        <div className="space-y-4 flex flex-col">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
            <img
              src={selectedGalleryImg || restaurant.image}
              alt={restaurant.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
              <span className="bg-stone-950/70 backdrop-blur-md px-3 py-1 rounded-md border border-stone-800 text-stone-200">
                {restaurant.city}, {restaurant.country}
              </span>
              <div className="flex items-center gap-1 bg-stone-950/70 backdrop-blur-md px-3 py-1 rounded-md border border-stone-800 text-amber-300 font-mono font-bold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{restaurant.rating.toFixed(2)} ({restaurant.reviewsCount})</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {restaurant.gallery && restaurant.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {restaurant.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryImg(img)}
                  className={`aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedGalleryImg === img
                      ? 'border-amber-400 scale-[1.02]'
                      : 'border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Reservation Action */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
              <Crown size={14} />
              <span>{restaurant.cuisine}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">{restaurant.priceRange}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              {restaurant.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {restaurant.description}
            </p>

            <div className="pt-4 border-t border-stone-800/80 space-y-3 text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-amber-400 shrink-0" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span className="font-mono">{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <span>{restaurant.hours}</span>
              </div>
              <div className="flex items-center gap-3">
                <ChefHat size={16} className="text-amber-400 shrink-0" />
                <span>{restaurant.headChef}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={16} className="text-amber-400 shrink-0" />
                <span>{t('restaurant.capacity')}: {restaurant.capacity} mehmon</span>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 font-mono">
              {t('restaurant.features')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {restaurant.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle size={14} className="text-amber-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reserve Table Button */}
          <div className="pt-4 border-t border-stone-800">
            <Link
              to="/reservations"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all"
            >
              <CalendarCheck size={18} />
              <span>{t('restaurant.reserve')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
