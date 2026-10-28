import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Menu, X, CalendarCheck } from 'lucide-react';
import { useAppSelector } from '../../redux/store';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/sign-in', label: t('nav.signIn') },
    { to: '/login', label: t('nav.login') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-stone-950 font-serif font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-amber-100 group-hover:text-amber-300 transition-colors">
              VALVERIS
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500/80 -mt-1">
              Grand Dining
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-200 whitespace-nowrap shrink-0 hover:text-amber-200 ${
                  isActive
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5'
                    : 'text-stone-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Actions (Language, Favorites with Badge, Book Table CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />

          {/* Favorites Heart with Synchronized Count */}
          <Link
            to="/favorites"
            className="relative p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-rose-400 hover:border-rose-400/40 transition-colors flex items-center justify-center"
            title={t('nav.favorites')}
            aria-label={t('nav.favorites')}
          >
            <Heart size={18} className={favoritesCount > 0 ? 'text-rose-400 fill-rose-400/20' : ''} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-rose-600 text-white text-[11px] font-bold font-mono rounded-full flex items-center justify-center border-2 border-stone-950 shadow-md animate-pulse">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Primary Book Table CTA */}
          <Link
            to="/reservations"
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-lg transition-all duration-300 whitespace-nowrap shrink-0 ${
              location.pathname === '/reservations'
                ? 'bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/20'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md hover:shadow-amber-500/20 hover:scale-[1.02]'
            }`}
          >
            <CalendarCheck size={15} />
            <span>{t('nav.bookTable')}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white bg-stone-900 rounded-lg border border-stone-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-300 font-semibold border-l-2 border-amber-400'
                      : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="pt-2 border-t border-stone-800 flex flex-col gap-3">
            <Link
              to="/reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-amber-500 text-stone-950 rounded-lg shadow-md"
            >
              <CalendarCheck size={16} />
              <span>{t('nav.bookTable')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
