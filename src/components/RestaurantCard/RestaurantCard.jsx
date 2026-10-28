import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, ArrowRight, Utensils } from 'lucide-react';
import { LikeButton } from '../LikeButton/LikeButton';

export const RestaurantCard = ({ restaurant }) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-stone-900/70 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
        {!imgError ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-600 gap-2">
            <Utensils size={32} className="text-amber-500/40" />
            <span className="text-xs font-mono">{restaurant.city}</span>
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />

        {/* Like Button */}
        <div className="absolute top-3 right-3 z-10">
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
          />
        </div>

        {/* Location & Rating overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-200">
          <div className="flex items-center gap-1.5 font-medium bg-stone-950/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800/80">
            <MapPin size={13} className="text-amber-400" />
            <span>{restaurant.city}, {restaurant.country}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold font-mono bg-stone-950/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800/80 text-amber-300">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
            <span>{restaurant.cuisine}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-stone-400">{restaurant.priceRange}</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Features minimal tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {restaurant.features.slice(0, 3).map((feat, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-stone-400 bg-stone-800/60 px-2 py-0.5 rounded border border-stone-800"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-3 border-t border-stone-800/70 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            {t('restaurant.capacity')}: <span className="font-mono text-stone-200 font-semibold">{restaurant.capacity}</span>
          </span>
          <Link
            to={`/restaurants/${restaurant.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
          >
            <span>{t('restaurant.viewDetails')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
