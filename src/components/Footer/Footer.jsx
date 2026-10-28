import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  CalendarCheck,
  Download,
  Sparkles,
} from 'lucide-react';

export const Footer = ({ onDownloadZip }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-stone-950 font-serif font-bold text-base">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-widest text-amber-100">
                  VALVERIS
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-amber-500/80 -mt-0.5">
                  Grand Dining Network
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-amber-200 tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-400">
                  <CalendarCheck size={14} />
                  <span>{t('nav.reservations')}</span>
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-amber-300 transition-colors">
                  {t('nav.favorites')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="hover:text-amber-300 transition-colors">
                  {t('nav.signIn')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-300 transition-colors">
                  {t('nav.login')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-amber-200 tracking-wider">
              {t('footer.locations')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>VALVERIS Tashkent Grand · Uzbekistan</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>VALVERIS Paris Étoile · France</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>VALVERIS Istanbul Bosphorus · Turkey</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>VALVERIS London Mayfair · United Kingdom</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>VALVERIS Dubai Marina · UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>VALVERIS Roma Imperial · Italy</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-amber-200 tracking-wider">
              {t('footer.contact')}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Amir Temur Avenue 45, Tashkent, Uzbekistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <a href="tel:+998712004545" className="hover:text-amber-300 font-mono">
                  +998 71 200 45 45
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a href="mailto:concierge@valveris-dining.com" className="hover:text-amber-300">
                  concierge@valveris-dining.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Mon - Sun: 12:00 PM - 01:00 AM</span>
              </div>
            </div>

            {onDownloadZip && (
              <div className="pt-2">
                <button
                  onClick={onDownloadZip}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-900 border border-stone-800 rounded-lg hover:border-amber-400/50 hover:text-amber-300 transition-colors"
                >
                  <Download size={14} className="text-amber-400" />
                  <span>{t('footer.downloadZip')}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} VALVERIS Grand Dining Network. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <span>{t('footer.brandNotice')}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Sparkles size={12} />
              <span>Michelin Standards</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
