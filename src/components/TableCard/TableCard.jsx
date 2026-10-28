import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Sparkles, CheckCircle2, XCircle, CalendarPlus } from 'lucide-react';

export const TableCard = ({
  table,
  onSelect,
  isBookedForSlot = false,
}) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const isUnavailable = table.status === 'booked' || isBookedForSlot;

  const getZoneLabel = (zone) => {
    switch (zone) {
      case 'Window View':
        return t('reservations.windowView');
      case 'Main Hall':
        return t('reservations.mainHall');
      case 'VIP Zone':
        return t('reservations.vipZone');
      default:
        return zone;
    }
  };

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
        isUnavailable
          ? 'bg-stone-900/40 border-stone-800/60 opacity-80'
          : 'bg-stone-900/80 border-stone-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10'
      }`}
    >
      {/* Table Image & Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
        {!imgError ? (
          <img
            src={table.image}
            alt={`${t('reservations.table')} #${table.tableNumber}`}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-600">
            <span className="font-serif text-3xl font-bold">#{table.tableNumber}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

        {/* Table Number Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-100 font-mono text-xs font-semibold">
          <span className="text-amber-400 font-serif">№</span>
          <span>{table.tableNumber}</span>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md border ${
              isUnavailable
                ? 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60'
            }`}
          >
            {isUnavailable ? (
              <>
                <XCircle size={13} className="text-rose-400" />
                <span>{t('reservations.booked')}</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>{t('reservations.available')}</span>
              </>
            )}
          </div>
        </div>

        {/* Zone tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-xs font-medium text-stone-200 bg-stone-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
            {getZoneLabel(table.zone)}
          </span>
          {table.zone === 'VIP Zone' && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/20 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/40">
              <Sparkles size={11} />
              <span>VIP</span>
            </span>
          )}
        </div>
      </div>

      {/* Table Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-stone-300 font-medium">
              <Users size={14} className="text-amber-400" />
              <span>
                {table.seats} {t('reservations.seats')}
              </span>
            </div>
            <span className="text-stone-400 font-mono text-[11px]">
              ID: T-{table.tableNumber.toString().padStart(2, '0')}
            </span>
          </div>

          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {table.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-stone-800">
          <button
            onClick={() => onSelect(table)}
            disabled={isUnavailable}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
              isUnavailable
                ? 'bg-stone-800/60 text-stone-500 cursor-not-allowed border border-stone-800'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md hover:shadow-amber-500/20 hover:scale-[1.01]'
            }`}
          >
            <CalendarPlus size={15} />
            <span>
              {isUnavailable
                ? t('reservations.alreadyBooked')
                : t('reservations.bookThisTable')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
