import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck,
  Filter,
  CheckCircle2,
  XCircle,
  Trash2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  setFilterZone,
  setFilterStatus,
  cancelReservation,
} from '../../redux/slices/reservationsSlice';
import { TableCard } from '../../components/TableCard/TableCard';
import { ReservationModal } from '../../components/ReservationModal/ReservationModal';

export const Reservations = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { tables, bookings, filterZone, filterStatus } = useAppSelector(
    (state) => state.reservations
  );

  const [activeTab, setActiveTab] = useState('tables');
  const [selectedTable, setSelectedTable] = useState(null);

  const filteredTables = tables.filter((table) => {
    if (filterZone !== 'all' && table.zone !== filterZone) {
      return false;
    }
    if (filterStatus !== 'all' && table.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const availableCount = tables.filter((t) => t.status === 'available').length;
  const bookedCount = tables.filter((t) => t.status === 'booked').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
            <CalendarCheck size={16} />
            <span>25 LIVE RESTAURANT TABLES</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            {t('reservations.title')}
          </h1>
          <p className="text-sm text-stone-400 max-w-xl leading-relaxed">
            {t('reservations.subtitle')}
          </p>
        </div>

        {/* View Switcher: 25 Tables vs My Bookings */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-900 border border-stone-800 rounded-xl">
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'tables'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>Barcha Stollar</span>
            <span className="font-mono text-[11px] px-1.5 py-0.2 bg-stone-950/40 rounded-full">
              25
            </span>
          </button>
          <button
            onClick={() => setActiveTab('myBookings')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'myBookings'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>{t('reservations.myReservations')}</span>
            <span className="font-mono text-[11px] px-1.5 py-0.2 bg-stone-950/40 rounded-full">
              {bookings.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'tables' ? (
        <div className="space-y-8">
          {/* Controls Bar: Filters & Quick Metrics */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 bg-stone-900/60 border border-stone-800 rounded-2xl">
            
            {/* Zone Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5 mr-1">
                <Filter size={13} className="text-amber-400" />
                <span>{t('reservations.filterZone')}:</span>
              </span>

              {['all', 'Window View', 'Main Hall', 'VIP Zone'].map((z) => (
                <button
                  key={z}
                  onClick={() => dispatch(setFilterZone(z))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterZone === z
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-semibold'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {z === 'all'
                    ? t('reservations.allZones')
                    : z === 'Window View'
                    ? t('reservations.windowView')
                    : z === 'Main Hall'
                    ? t('reservations.mainHall')
                    : t('reservations.vipZone')}
                </button>
              ))}
            </div>

            {/* Status Filters & Counters */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800">
              <span className="text-xs font-mono text-stone-400 mr-1">
                {t('reservations.filterStatus')}:
              </span>

              <button
                onClick={() => dispatch(setFilterStatus('all'))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterStatus === 'all'
                    ? 'bg-stone-200 text-stone-950 font-bold'
                    : 'bg-stone-950 text-stone-400 border border-stone-800'
                }`}
              >
                {t('reservations.allStatuses')} (25)
              </button>

              <button
                onClick={() => dispatch(setFilterStatus('available'))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  filterStatus === 'available'
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-emerald-400 border border-stone-800 hover:border-emerald-500/40'
                }`}
              >
                <CheckCircle2 size={13} />
                <span>{t('reservations.available')} ({availableCount})</span>
              </button>

              <button
                onClick={() => dispatch(setFilterStatus('booked'))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  filterStatus === 'booked'
                    ? 'bg-rose-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-rose-400 border border-stone-800 hover:border-rose-500/40'
                }`}
              >
                <XCircle size={13} />
                <span>{t('reservations.booked')} ({bookedCount})</span>
              </button>
            </div>
          </div>

          {/* 25 Tables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTables.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                onSelect={(tbl) => setSelectedTable(tbl)}
              />
            ))}
          </div>

          {filteredTables.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-stone-900/30 rounded-2xl border border-stone-800">
              <p className="text-sm text-stone-400">
                Tanlangan filtrlar bo'yicha stollar topilmadi.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* My Active Bookings View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-100">
              {t('reservations.myReservations')} ({bookings.length})
            </h2>
            <p className="text-xs text-stone-400 font-mono">
              Saved in Redux & localStorage
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-stone-900/40 rounded-2xl border border-stone-800">
              <CalendarCheck size={40} className="text-stone-600 mx-auto" />
              <p className="text-sm text-stone-400">{t('reservations.noReservations')}</p>
              <button
                onClick={() => setActiveTab('tables')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Stollarni Ko'rish va Bron Qilish
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-amber-500/30 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-serif font-bold text-base flex items-center justify-center">
                          #{booking.tableNumber}
                        </div>
                        <div>
                          <span className="font-serif text-base font-semibold text-stone-100">
                            Stol #{booking.tableNumber}
                          </span>
                          <p className="text-[11px] text-stone-400 font-mono">
                            ID: {booking.id}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Tasdiqlangan</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-stone-300">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Mehmon:</span>
                        <span className="font-medium text-stone-100">{booking.customerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Telefon:</span>
                        <span className="font-mono text-stone-100">{booking.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Mehmonlar soni:</span>
                        <span className="font-mono text-stone-100">{booking.guests} kishi</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Sana & Vaqt:</span>
                        <span className="font-mono text-amber-400 font-semibold">
                          {booking.date} ({booking.timeSlot})
                        </span>
                      </div>
                      {booking.notes && (
                        <div className="pt-2 border-t border-stone-800/60 text-stone-400 italic">
                          "{booking.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex items-center justify-end">
                    <button
                      onClick={() => dispatch(cancelReservation(booking.id))}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors"
                    >
                      <Trash2 size={13} />
                      <span>{t('reservations.cancelReservation')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reservation Booking Modal */}
      {selectedTable && (
        <ReservationModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}
    </div>
  );
};
