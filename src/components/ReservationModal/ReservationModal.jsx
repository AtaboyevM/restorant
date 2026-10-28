import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, Users, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { createReservation } from '../../redux/slices/reservationsSlice';

const TIME_SLOTS = [
  '12:00 - 14:00',
  '14:00 - 16:00',
  '17:00 - 19:00',
  '19:00 - 21:00',
  '21:00 - 23:00',
  '23:00 - 01:00',
];

export const ReservationModal = ({ table, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const existingBookings = useAppSelector((state) => state.reservations.bookings);

  const todayStr = new Date().toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [guests, setGuests] = useState(Math.min(2, table.seats));
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[3]);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMsg(t('reservations.validation.nameRequired'));
      return;
    }

    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMsg(t('reservations.validation.phoneRequired'));
      return;
    }

    if (!guests || guests <= 0) {
      setErrorMsg(t('reservations.validation.guestsRequired'));
      return;
    }

    if (guests > table.seats) {
      setErrorMsg(
        `${t('reservations.validation.guestsExceed')} (Max: ${table.seats})`
      );
      return;
    }

    if (!date) {
      setErrorMsg(t('reservations.validation.dateRequired'));
      return;
    }

    if (!timeSlot) {
      setErrorMsg(t('reservations.validation.timeRequired'));
      return;
    }

    // Check conflict: Same table, same date, same timeSlot
    const hasConflict = existingBookings.some(
      (b) =>
        b.tableId === table.id &&
        b.date === date &&
        b.timeSlot === timeSlot
    );

    if (hasConflict) {
      setErrorMsg(t('reservations.validation.alreadyBookedSlot'));
      return;
    }

    // Dispatch booking creation
    dispatch(
      createReservation({
        tableId: table.id,
        tableNumber: table.tableNumber,
        customerName: customerName.trim(),
        phone: phone.trim(),
        guests: Number(guests),
        date,
        timeSlot,
        notes: notes.trim(),
      })
    );

    // Celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#f59e0b', '#ffffff', '#e11d48'],
      });
    } catch {
      // Confetti fallback
    }

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
                {table.zone} · {table.seats} {t('reservations.seats')}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-100">
                {t('reservations.modalTitle')} #{table.tableNumber}
              </h3>
              <p className="text-xs text-stone-400">{table.description}</p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-amber-400" />
                  <span>{t('reservations.fullName')} *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alisher Navoiy"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-amber-400" />
                  <span>{t('reservations.phone')} *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>

              {/* Guests & Date 2-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                    <Users size={14} className="text-amber-400" />
                    <span>{t('reservations.guests')} (Max {table.seats}) *</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={table.seats}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar size={14} className="text-amber-400" />
                    <span>{t('reservations.date')} *</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-400" />
                  <span>{t('reservations.time')} *</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = existingBookings.some(
                      (b) =>
                        b.tableId === table.id &&
                        b.date === date &&
                        b.timeSlot === slot
                    );

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-2.5 text-xs font-mono font-medium rounded-lg border transition-all text-center ${
                          isBooked
                            ? 'bg-stone-950 text-stone-600 border-stone-900 cursor-not-allowed line-through'
                            : timeSlot === slot
                            ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                            : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-500/50'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  {t('reservations.notes')}
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary, allergy considerations, quiet table, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-stone-400 hover:text-white rounded-xl transition-colors"
                >
                  {t('reservations.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
                >
                  {t('reservations.confirm')}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-stone-100">
                {t('reservations.successTitle')}
              </h3>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                {t('reservations.successDesc')}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between text-stone-400 border-b border-stone-800 pb-2">
                <span>Table:</span>
                <span className="text-amber-300 font-bold">#{table.tableNumber} ({table.zone})</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Guest:</span>
                <span className="text-stone-200">{customerName}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Date & Time:</span>
                <span className="text-amber-400">{date} · {timeSlot}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Party Size:</span>
                <span className="text-stone-200">{guests} persons</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
