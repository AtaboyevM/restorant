import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export const Contact = () => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Iltimos, to\'g\'ri elektron pochta manzilini kiriting.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase">
          <MessageSquare size={15} />
          <span>GLOBAL CONCIERGE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100">
          {t('contact.title')}
        </h1>
        <p className="text-sm text-stone-400">
          {t('contact.subtitle')}
        </p>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-stone-100">
              Xabar Qoldiring
            </h2>
            <p className="text-xs text-stone-400">
              Quyidagi formani to'ldiring, konsyerjimiz 30 daqiqa ichida javob beradi.
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
              <span>{t('contact.success')}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle size={18} className="shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nom@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                placeholder="Korporativ kecha, sharob dasturxoni yoki boshqa..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                {t('contact.message')} *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Xabaringizni batafsil yozing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                <Send size={15} />
                <span>{isSubmitting ? t('contact.sending') : t('contact.send')}</span>
              </button>
            </div>
          </form>

          <p className="text-[11px] text-stone-400 font-mono">
            * Aloqa formasi mijoz demonstratsiyasi uchun faol holatda sozlangan.
          </p>
        </div>

        {/* Contact Info & Operating Details */}
        <div className="space-y-8">
          <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-100">
              {t('contact.infoTitle')}
            </h2>

            <div className="space-y-5 text-sm text-stone-300">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-semibold text-stone-100 block">
                    {t('contact.centralOffice')}
                  </span>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    {t('contact.addressVal')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="font-semibold text-stone-100 block">
                    Konsyerj va Bron
                  </span>
                  <a
                    href="tel:+998712004545"
                    className="text-xs text-amber-400 font-mono hover:underline mt-0.5 block"
                  >
                    {t('contact.phoneVal')}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-semibold text-stone-100 block">
                    Rasmiy Email
                  </span>
                  <a
                    href="mailto:concierge@valveris-dining.com"
                    className="text-xs text-stone-300 hover:text-amber-400 mt-0.5 block"
                  >
                    {t('contact.emailVal')}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="font-semibold text-stone-100 block">
                    {t('contact.hoursTitle')}
                  </span>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {t('contact.hoursVal')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-100">
                {t('contact.mapTitle')}
              </h3>
              <span className="text-xs font-mono text-amber-400">
                GPS: 41.311081, 69.279737
              </span>
            </div>

            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative text-center space-y-2 p-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin size={20} />
                </div>
                <span className="font-serif font-bold text-sm text-stone-100 block">
                  VALVERIS Tashkent Flagship
                </span>
                <span className="text-[11px] text-stone-400 block font-mono">
                  Amir Temur Avenue 45
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
