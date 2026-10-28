import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Iltimos, elektron pochta va parolingizni kiriting.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Noto\'g\'ri elektron pochta formati.');
      return;
    }

    try {
      localStorage.setItem(
        'valveris_auth_user',
        JSON.stringify({ email: email.trim(), name: email.split('@')[0] })
      );
    } catch {
      // Storage fallback
    }

    setSuccessMsg(t('auth.authSuccess'));
    setTimeout(() => {
      navigate('/reservations');
    }, 1000);
  };

  return (
    <div className="min-h-[75vh] max-w-md mx-auto px-4 py-16 flex flex-col justify-center">
      <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-stone-950 font-serif font-bold text-lg mx-auto shadow-lg">
            V
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-100">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-xs text-stone-400">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Mail size={14} className="text-amber-400" />
              <span>{t('auth.email')} *</span>
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

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Lock size={14} className="text-amber-400" />
              <span>{t('auth.password')} *</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-stone-800 text-amber-500 focus:ring-0 bg-stone-950"
              />
              <span>Eslab qolish</span>
            </label>
            <span className="text-stone-500 hover:text-stone-400 cursor-pointer">
              Parolni unutdingizmi?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <span>{t('auth.submitLogin')}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Switch Link */}
        <div className="pt-2 text-center text-xs text-stone-400 border-t border-stone-800">
          <span>{t('auth.noAccount')}{' '}</span>
          <Link to="/sign-in" className="text-amber-400 font-semibold hover:underline">
            {t('auth.registerLink')}
          </Link>
        </div>

        {/* Security Transparency Notice */}
        <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono pt-1">
          <ShieldCheck size={14} className="shrink-0 text-amber-500/50" />
          <span>{t('auth.demoNotice')}</span>
        </div>
      </div>
    </div>
  );
};
