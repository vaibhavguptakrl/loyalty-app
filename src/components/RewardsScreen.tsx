import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency, formatPoints } from '../utils/rewards.ts';
import { ACTIVE_OFFER } from '../data/mockData.ts';
import { MonthlyPointsChart } from './MonthlyPointsChart.tsx';

const HARDWARE_DEPOT_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDBeFzS4B2Ns7lLj20RUaug5yfui2v4iQJnLRFyvu4gAhPwIY5VwsRRn5kEwog_byaTVXZOv6i6Dzlm990RUfSKlDlqQmCjRvhQoW56yzYhudb-dZ-jZxS8ZcZp6I9gHox7qqqA7VBCSjIKCna7jZerhTwynAIoZhByDAPJ9kqBmCzX3we9FjUU5NGTPS_KU6je_1IBwf2HJ5DZxmpyRcqP3elwiXbPD4mvqBZSSAhG-vc_qDglpa9M';

export const RewardsScreen: React.FC = () => {
  const {
    profile,
    balance,
    entries,
    language,
    theme,
    toggleTheme,
    toggleBiometric,
    setActiveTab,
    openModal,
  } = useApp();

  // Find the latest purchase entry or fallback
  const latestPurchase = entries.find((e) => e.category === 'purchase') || entries[0];

  return (
    <div className="flex flex-col w-full space-y-4 max-w-lg mx-auto">
      {/* Plumber Profile Identifier Bar */}
      <div className="bg-[#f6f3f2] dark:bg-[#1c1816] rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#ffdbca] dark:bg-[#773300] flex items-center justify-center text-[#964407] dark:text-[#ffdbca] flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">handyman</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[18px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] truncate">
                  {profile.name}
                </span>
                <span className="text-[12px] text-[#887368] dark:text-[#9e8a7f] truncate">
                  ({profile.englishName})
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="text-[10px] bg-[#e5e2e1] dark:bg-[#2d2825] px-2 py-0.5 rounded text-[#554339] dark:text-[#d5c4ba] font-mono font-bold tracking-wider">
                  {profile.memberCode}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#bdeed0] text-[#002113] dark:bg-[#2e5a44] dark:text-[#bdeed0] text-[10px] font-bold">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  {language === 'hi' ? 'सत्यापित प्लम्बर' : 'Verified Plumber'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#e5e2e1] dark:bg-[#2d2825] px-2.5 py-1.5 rounded-xl flex-shrink-0 shadow-sm">
            <span
              className="material-symbols-outlined text-[16px] text-[#39654e] dark:text-[#5fa581]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              fingerprint
            </span>
            <span className="text-[11px] text-[#39654e] dark:text-[#5fa581] font-bold hidden sm:inline">
              Protected
            </span>
          </div>
        </div>

        {/* Agency Affiliation Ribbon */}
        <div className="bg-[#f0eded] dark:bg-[#24201d] rounded-lg p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0 text-[#554339] dark:text-[#d5c4ba]">
            <span className="material-symbols-outlined text-[16px] text-[#964407] dark:text-[#e07937] flex-shrink-0">
              storefront
            </span>
            <span className="text-[11px] truncate">
              Shiv Agency — Bhoodara Bazar, Karauli (Plumbing &amp; Sanitary)
            </span>
          </div>
          <span className="flex-shrink-0 text-[10px] text-[#39654e] dark:text-[#5fa581] font-bold bg-[#39654e]/10 dark:bg-[#5fa581]/20 px-2 py-0.5 rounded">
            Authorized
          </span>
        </div>
      </div>

      {/* Hero Reward Points Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#1e1e1e] text-[#f3f0ef] p-5 shadow-xl border border-neutral-800">
        {/* Geometric Terracotta Background Glow */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#b65c21]/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-[#fdc34d]/15 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-4">
          {/* Title & Value Status */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5 text-[#ffdea6]">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {language === 'hi'
                    ? 'कुल उपलब्ध पॉइंट्स (बैलेंस)'
                    : 'कुल उपलब्ध पॉइंट्स (BALANCE)'}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[36px] font-extrabold text-[#f7bd48] tracking-tight leading-none">
                  {formatPoints(balance)}
                </span>
                <span className="text-[14px] text-[#eae7e7] font-bold">PTS</span>
              </div>
            </div>

            <div className="bg-[#fdc34d]/25 border border-[#fdc34d]/30 px-3 py-1.5 rounded-lg flex flex-col items-end">
              <span className="text-[10px] text-[#f7bd48] font-medium">
                {language === 'hi' ? 'नकद मूल्य' : 'नकद मूल्य (Cash Value)'}
              </span>
              <span className="text-[20px] text-[#ffdea6] font-bold leading-tight">
                {formatCurrency(balance)}
              </span>
            </div>
          </div>

          {/* UPI Conversion Status Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 flex items-center justify-between text-[#e5e2e1]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#bdeed0]">bolt</span>
              <span className="text-[12px] text-white font-medium">
                Instant Transfer: 1 Point = 1 Rupee
              </span>
            </div>
            <span className="text-[10px] text-[#bdeed0] font-bold bg-[#bdeed0]/20 px-2 py-0.5 rounded">
              Direct UPI
            </span>
          </div>

          {/* Action Button Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('redeem')}
              className="flex items-center justify-center gap-1.5 h-12 rounded-lg bg-[#964407] hover:bg-[#b65c21] text-white font-bold text-[14px] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                currency_rupee
              </span>
              <span>{language === 'hi' ? 'UPI निकासी' : 'Redeem UPI'}</span>
            </button>

            <button
              type="button"
              onClick={() => openModal('scan_bill')}
              className="flex items-center justify-center gap-1.5 h-12 rounded-lg bg-[#eae7e7] text-[#1b1b1c] font-bold text-[14px] hover:bg-[#e5e2e1] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              <span>{language === 'hi' ? 'बिल / QR स्कैन करें' : 'Scan Bill / QR'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Helper */}
          <div className="flex items-center justify-between pt-1 text-[#e5e2e1]/80 text-[12px]">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#bdeed0]">
                verified_user
              </span>
              <span>Shiv Agency Helpdesk</span>
            </div>
            <a
              href="https://wa.me/919829044219"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#bdeed0] hover:text-[#f6fff6] font-bold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activity / Purchase Points Banner */}
      <div className="bg-white dark:bg-[#1c1816] rounded-xl p-4 shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#964407] dark:text-[#e07937]">
              history
            </span>
            <span className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi' ? 'नवीनतम बिल पॉइंट्स' : 'नवीनतम बिल पॉइंट्स (Latest Entry)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('passbook')}
            className="text-[12px] text-[#964407] dark:text-[#e07937] font-bold hover:underline cursor-pointer"
          >
            {language === 'hi' ? 'लेजर देखें' : 'View Ledger'}
          </button>
        </div>

        {/* Bill Card Box */}
        <div className="bg-[#f6f3f2] dark:bg-[#24201d] rounded-lg p-3.5 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#bdeed0]/50 dark:bg-[#2e5a44]/60 text-[#39654e] dark:text-[#bdeed0] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">add_circle</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#1b1b1c] dark:text-[#f5eeea] font-bold truncate">
                  {latestPurchase.title}
                </span>
                <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
                  Invoice #{latestPurchase.invoiceNo || 'SA-4091'} • Shiv Agency Counter
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-[16px] text-[#39654e] dark:text-[#5fa581] font-extrabold">
                +{latestPurchase.points} Pts
              </span>
              <span className="text-[10px] text-[#554339] dark:text-[#d5c4ba]">
                Added by Admin
              </span>
            </div>
          </div>

          {/* WhatsApp Delivery Status Pill */}
          <div className="flex items-center justify-between pt-2 mt-1 bg-[#f0eded]/90 dark:bg-[#2d2825] rounded px-2.5 py-1.5">
            <div className="flex items-center gap-1.5 text-[#554339] dark:text-[#d5c4ba]">
              <span className="material-symbols-outlined text-[16px] text-[#39654e] dark:text-[#5fa581]">
                check_circle
              </span>
              <span className="text-[11px]">
                Confirmed on WhatsApp (+91 94140 XXXXX)
              </span>
            </div>
            <span className="text-[10px] text-[#39654e] dark:text-[#5fa581] font-bold">
              Delivered
            </span>
          </div>
        </div>
      </div>

      {/* 6-Month Points Earned vs Redeemed Chart */}
      <MonthlyPointsChart />

      {/* Active Special Offer / Scheme Flyer Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#b65c21] via-[#964407] to-[#b65c21] text-white p-4 shadow-md">
        {/* Festive Glow SVG Elements */}
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <svg fill="currentColor" height="140" viewBox="0 0 100 100" width="140">
            <path d="M50 0 L60 35 L95 35 L68 57 L78 92 L50 70 L22 92 L32 57 L5 35 L40 35 Z" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fdc34d] text-[#715000] text-[10px] font-extrabold shadow-sm">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              {ACTIVE_OFFER.badge}
            </span>
            <span className="text-[10px] text-[#ffdbca] bg-[#331200]/40 px-2 py-0.5 rounded">
              Valid till {ACTIVE_OFFER.validTill}
            </span>
          </div>

          <div>
            <h3 className="text-[16px] text-white font-bold leading-tight">
              {language === 'hi' ? ACTIVE_OFFER.hindiTitle : ACTIVE_OFFER.title}
            </h3>
            <p className="text-[12px] text-[#ffdbca] mt-1 leading-relaxed">
              {language === 'hi' ? ACTIVE_OFFER.hindiDescription : ACTIVE_OFFER.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[#ffdbca] text-[11px]">
              <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
              <span>Auto-shared to your WhatsApp</span>
            </div>
            <button
              type="button"
              onClick={() => openModal('scheme_details', ACTIVE_OFFER)}
              className="bg-white text-[#964407] px-3 py-1.5 rounded-lg text-[11px] font-bold shadow hover:bg-[#ffdbca] transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'स्कीम देखें' : 'View Scheme'}
            </button>
          </div>
        </div>
      </div>

      {/* Operational Quick Controls & Theme Customizer */}
      <div className="bg-[#f6f3f2] dark:bg-[#1c1816] rounded-xl p-4 shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
            {language === 'hi' ? 'त्वरित सेटिंग्स व सुरक्षा' : 'Quick App Settings & Security'}
          </span>
          <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
            Karauli Region
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Biometric Status Toggle */}
          <button
            type="button"
            onClick={toggleBiometric}
            className="bg-white dark:bg-[#24201d] rounded-lg p-2.5 flex items-center gap-2.5 shadow-sm text-left hover:bg-[#eae7e7] dark:hover:bg-[#2d2825] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#bdeed0] text-[#002113] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">fingerprint</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#1b1b1c] dark:text-[#f5eeea] font-bold truncate">
                Biometric Lock
              </span>
              <span className="text-[10px] text-[#39654e] dark:text-[#5fa581] font-semibold truncate">
                {profile.biometricEnabled ? 'Enabled Active' : 'Disabled'}
              </span>
            </div>
          </button>

          {/* Theme Switch Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            id="theme-toggle-btn"
            className="bg-white dark:bg-[#24201d] rounded-lg p-2.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-[#eae7e7] dark:hover:bg-[#2d2825] transition-colors text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffdea6] text-[#271900] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  {theme === 'sand' ? 'palette' : 'bedtime'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-[#1b1b1c] dark:text-[#f5eeea] font-bold truncate">
                  Appearance
                </span>
                <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f] truncate">
                  {theme === 'sand' ? 'Light Sand' : 'Dark Copper'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#887368]">tune</span>
          </button>
        </div>
      </div>

      {/* Local Contractor Support Info Footer Bar */}
      <div className="bg-[#f0eded] dark:bg-[#24201d] rounded-xl p-3.5 flex items-center justify-between text-[#554339] dark:text-[#d5c4ba] border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center gap-3 min-w-0">
          <img
            alt="Shiv Agency Karauli depot"
            className="w-11 h-11 rounded-lg object-cover shadow-sm flex-shrink-0"
            src={HARDWARE_DEPOT_IMG}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-[#1b1b1c] dark:text-[#f5eeea] font-bold truncate">
              Shiv Agency Karauli Helpline
            </span>
            <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] truncate">
              Bhoodara Bazar Market Counter • 9:00 AM - 8:30 PM
            </span>
          </div>
        </div>

        <a
          className="w-9 h-9 rounded-full bg-[#964407] text-white flex items-center justify-center shadow-sm flex-shrink-0 hover:bg-[#b65c21] transition-colors cursor-pointer"
          href="tel:01464220000"
          aria-label="Call Shiv Agency Helpline"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
        </a>
      </div>
    </div>
  );
};
