import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Crown,
  CalendarCheck,
  ArrowRight,
  ChefHat,
} from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const chefs = [
    {
      name: 'Azizbek Rakhimov',
      title: 'Grand Executive Chef · Central Asia & Europe',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
      bio: "20 yillik tajribaga ega bo'lib, Sharq nozik an'analari va zamonaviy frantsuz molekulyar oshpazligining yetakchi muallifi.",
    },
    {
      name: 'Laurent Mercier',
      title: 'Head of Culinary Innovation · Paris & London',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
      bio: '2 ta Michelin yulduzli restoranlarning sobiq bosh oshpazi, xalqaro gastronomiya festivali g\'olibi.',
    },
    {
      name: 'Emre Soylu',
      title: 'Master Sommelier & Mediterranean Lead · Istanbul & Dubai',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80',
      bio: "Dengiz mahsulotlari va sharob madaniyatining xalqaro darajadagi mutaxassisi, VALVERIS menyusi kuratori.",
    },
  ];

  return (
    <div className="space-y-24 py-10 pb-20">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
          <Crown size={15} />
          <span>HERITAGE & EXCELLENCE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
          {t('about.title')}
        </h1>
        <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
          {t('about.subtitle')}
        </p>
      </section>

      {/* Story & Philosophy Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              OUR JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              {t('about.storyTitle')}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <p>{t('about.storyP1')}</p>
              <p>{t('about.storyP2')}</p>
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                <CalendarCheck size={16} />
                <span>{t('nav.bookTable')}</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 border border-stone-800 text-stone-200 text-xs font-semibold rounded-xl hover:border-amber-400/40 transition-colors"
              >
                <span>{t('nav.home')}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="VALVERIS Master Chef Plating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
            </div>

            {/* Floating Metric Callout */}
            <div className="absolute -bottom-6 -left-6 bg-stone-900/95 border border-stone-700/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-serif text-xl font-bold">
                ★
              </div>
              <div>
                <span className="font-serif text-base font-bold text-stone-100">
                  Michelin Caliber
                </span>
                <p className="text-xs text-stone-400 font-mono">
                  World standard gastronomy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numerical Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-stone-900/40 border border-stone-800 rounded-3xl">
          <div className="text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-400">6</span>
            <p className="text-xs text-stone-400 uppercase tracking-wider font-mono">Xalqaro Shaharlar</p>
          </div>
          <div className="text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-400">14+</span>
            <p className="text-xs text-stone-400 uppercase tracking-wider font-mono">Yillik Tajriba</p>
          </div>
          <div className="text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-400">2</span>
            <p className="text-xs text-stone-400 uppercase tracking-wider font-mono">Michelin Yulduzi</p>
          </div>
          <div className="text-center space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-400">150k+</span>
            <p className="text-xs text-stone-400 uppercase tracking-wider font-mono">Mamnun Mehmonlar</p>
          </div>
        </div>
      </section>

      {/* Chefs Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
            <ChefHat size={16} />
            <span>MASTERS OF THE CRAFT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            {t('about.teamTitle')}
          </h2>
          <p className="text-sm text-stone-400">
            {t('about.teamSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, idx) => (
            <div
              key={idx}
              className="bg-stone-900/60 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-950 relative">
                <img
                  src={chef.image}
                  alt={chef.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-100">
                    {chef.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-400">
                    {chef.title}
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {chef.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
