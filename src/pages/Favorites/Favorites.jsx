import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { removeFavorite, clearFavorites } from '../../redux/slices/favoritesSlice';

export const Favorites = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-rose-400 uppercase">
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            <span>GLOBAL REDUX STORE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            {t('favorites.title')}
          </h1>
          <p className="text-sm text-stone-400">
            {t('favorites.subtitle')}
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-400 font-mono">
              {t('favorites.totalSaved')}{' '}
              <strong className="text-amber-400 font-bold">{favorites.length}</strong>
            </span>
            <button
              onClick={() => dispatch(clearFavorites())}
              className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg transition-colors"
            >
              Hammasini tozalash
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="py-20 text-center space-y-5 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
            <Heart size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-stone-100">
              {t('favorites.emptyTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {t('favorites.emptyDesc')}
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all"
          >
            <span>{t('favorites.browseRestaurants')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={String(item.id)}
              className="bg-stone-900/70 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 text-[11px] font-mono uppercase bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-amber-300 border border-stone-800">
                  {item.type === 'restaurant' ? 'Restoran' : 'Spesiyal Taom'}
                </span>

                {item.city && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-stone-200 bg-stone-950/70 backdrop-blur-md px-2.5 py-0.5 rounded border border-stone-800">
                    <MapPin size={12} className="text-amber-400" />
                    <span>{item.city}</span>
                  </div>
                )}

                {item.price && (
                  <span className="absolute bottom-3 right-3 text-sm font-mono font-bold text-amber-400 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-stone-800">
                    {item.price}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-100 line-clamp-1">
                    {item.name}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs text-stone-400 line-clamp-1 mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  {item.type === 'restaurant' ? (
                    <Link
                      to={`/restaurants/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                    >
                      <span>Batafsil ko'rish</span>
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      to="/reservations"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                    >
                      <span>Stol bron qilish</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}

                  <button
                    onClick={() => dispatch(removeFavorite(item.id))}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title={t('favorites.removeItem')}
                  >
                    <Trash2 size={14} />
                    <span>{t('favorites.removeItem')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
