import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('valveris_favorites');
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (e) {
    console.error('Failed to load favorites from localStorage', e);
  }
  return [];
};

const saveFavoritesToStorage = (items) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('valveris_favorites', JSON.stringify(items));
    }
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
};

const initialState = {
  items: loadFavoritesFromStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const existsIndex = state.items.findIndex(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (existsIndex >= 0) {
        state.items.splice(existsIndex, 1);
      } else {
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
    addFavorite: (state, action) => {
      const exists = state.items.some(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (!exists) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload)
      );
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const { toggleFavorite, addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
