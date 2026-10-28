import React from 'react';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleFavorite } from '../../redux/slices/favoritesSlice';

export const LikeButton = ({ item, className = '', size = 18 }) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((f) => String(f.id) === String(item.id))
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-2 rounded-full transition-all duration-200 backdrop-blur-md ${
        isFavorite
          ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40 hover:scale-110'
          : 'bg-stone-900/70 text-stone-300 border border-stone-700/60 hover:text-rose-400 hover:border-rose-400/50 hover:scale-105'
      } ${className}`}
    >
      <Heart
        size={size}
        className={`transition-all duration-300 ${
          isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''
        }`}
      />
    </button>
  );
};
