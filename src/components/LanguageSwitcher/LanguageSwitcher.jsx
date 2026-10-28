import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleSelectLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-200 hover:text-amber-200 bg-stone-900/80 border border-stone-800 rounded-lg hover:border-amber-500/40 transition-colors whitespace-nowrap shrink-0"
        title="Select Language"
        aria-label="Select Language"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="hidden sm:inline uppercase font-mono tracking-wider">{currentLang.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl py-1 z-50 backdrop-blur-md">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                i18n.language === lang.code
                  ? 'bg-amber-500/10 text-amber-300 font-semibold'
                  : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {i18n.language === lang.code && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
