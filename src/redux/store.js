import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import favoritesReducer from './slices/favoritesSlice';
import reservationsReducer from './slices/reservationsSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    reservations: reservationsReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
