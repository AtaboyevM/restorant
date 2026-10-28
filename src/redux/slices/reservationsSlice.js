import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_TABLES = [
  { id: 1, tableNumber: 1, seats: 2, zone: 'Window View', status: 'available', description: 'Romantic window table with panoramic courtyard view', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { id: 2, tableNumber: 2, seats: 2, zone: 'Window View', status: 'available', description: 'Intimate booth bathed in sunset light', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { id: 3, tableNumber: 3, seats: 4, zone: 'Window View', status: 'booked', description: 'Spacious family table along floor-to-ceiling glass', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 4, tableNumber: 4, seats: 4, zone: 'Window View', status: 'available', description: 'Corner table with dual-aspect city panorama', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 5, tableNumber: 5, seats: 6, zone: 'Window View', status: 'available', description: 'Grand window table ideal for celebration dinners', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 6, tableNumber: 6, seats: 2, zone: 'Main Hall', status: 'available', description: 'Chic table adjacent to acoustic live piano', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 7, tableNumber: 7, seats: 2, zone: 'Main Hall', status: 'booked', description: 'Velvet banquette seating in central hall', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 8, tableNumber: 8, seats: 4, zone: 'Main Hall', status: 'available', description: 'Italian marble table under crystal chandelier', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 9, tableNumber: 9, seats: 4, zone: 'Main Hall', status: 'available', description: 'Comfortable leather armchairs with central ambiance', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 10, tableNumber: 10, seats: 4, zone: 'Main Hall', status: 'booked', description: 'Sleek contemporary dining square', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 11, tableNumber: 11, seats: 6, zone: 'Main Hall', status: 'available', description: 'Large round table with center lazy susan option', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 12, tableNumber: 12, seats: 6, zone: 'Main Hall', status: 'available', description: 'Executive banquet setup in lively main salon', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 13, tableNumber: 13, seats: 2, zone: 'Main Hall', status: 'available', description: 'Cozy table close to the master sommelier station', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 14, tableNumber: 14, seats: 2, zone: 'Main Hall', status: 'available', description: 'Private recessed booth with warm pendant light', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 15, tableNumber: 15, seats: 4, zone: 'Main Hall', status: 'available', description: 'Central avenue table with swift sommelier access', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 16, tableNumber: 16, seats: 4, zone: 'Main Hall', status: 'booked', description: 'Fine walnut dining table with plush seating', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 17, tableNumber: 17, seats: 8, zone: 'Main Hall', status: 'available', description: 'Imperial long table for corporate feasts and banquets', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { id: 18, tableNumber: 18, seats: 2, zone: 'VIP Zone', status: 'available', description: 'Private curtained alcove with dedicated butler', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { id: 19, tableNumber: 19, seats: 4, zone: 'VIP Zone', status: 'booked', description: 'Exclusive Amber Salon with private wine cellar entrance', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { id: 20, tableNumber: 20, seats: 4, zone: 'VIP Zone', status: 'available', description: 'Gold Salon with soundproof partitions and fine porcelain', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { id: 21, tableNumber: 21, seats: 6, zone: 'VIP Zone', status: 'available', description: 'Royal Salon with custom fireplace and private server', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { id: 22, tableNumber: 22, seats: 8, zone: 'VIP Zone', status: 'available', description: 'Presidential Dining Chamber with bespoke menu curation', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
  { id: 23, tableNumber: 23, seats: 2, zone: 'Window View', status: 'available', description: 'Skyline view table with direct sunset exposure', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { id: 24, tableNumber: 24, seats: 4, zone: 'Window View', status: 'available', description: 'Glasshouse terrace table overlooking botanical greens', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 25, tableNumber: 25, seats: 10, zone: 'VIP Zone', status: 'available', description: 'Grand Sovereign Pavilion for high-profile delegations', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' },
];

const loadBookingsFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('valveris_bookings');
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (e) {
    console.error('Failed to load bookings from localStorage', e);
  }
  return [
    {
      id: 'book-init-1',
      tableId: 3,
      tableNumber: 3,
      customerName: 'Maximilian Vance',
      phone: '+998 90 123 45 67',
      guests: 4,
      date: new Date().toISOString().split('T')[0],
      timeSlot: '19:00 - 21:00',
      notes: 'Celebration dinner with anniversary champagne',
      createdAt: new Date().toISOString(),
    },
  ];
};

const saveBookingsToStorage = (bookings) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('valveris_bookings', JSON.stringify(bookings));
    }
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
};

const initialState = {
  tables: INITIAL_TABLES,
  bookings: loadBookingsFromStorage(),
  selectedTableId: null,
  filterZone: 'all',
  filterStatus: 'all',
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    selectTable: (state, action) => {
      state.selectedTableId = action.payload;
    },
    setFilterZone: (state, action) => {
      state.filterZone = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    createReservation: (state, action) => {
      const newBooking = {
        ...action.payload,
        id: 'book-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        createdAt: new Date().toISOString(),
      };
      state.bookings.push(newBooking);
      saveBookingsToStorage(state.bookings);

      const table = state.tables.find((t) => t.id === action.payload.tableId);
      if (table) {
        table.status = 'booked';
      }
      state.selectedTableId = null;
    },
    cancelReservation: (state, action) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) {
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
        saveBookingsToStorage(state.bookings);

        const otherBookings = state.bookings.some(
          (b) => b.tableId === booking.tableId
        );
        if (!otherBookings) {
          const table = state.tables.find((t) => t.id === booking.tableId);
          if (table) {
            table.status = 'available';
          }
        }
      }
    },
  },
});

export const {
  selectTable,
  setFilterZone,
  setFilterStatus,
  createReservation,
  cancelReservation,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
