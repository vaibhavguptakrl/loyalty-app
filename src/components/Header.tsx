import React from 'react';
import { useApp } from '../context/AppContext.tsx';

const SHIV_LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1UehJfHd5tmyBmEC03B-WTbevt6Q_Rh9FRXeKJMXyQizQRrxv1-FI1P2UqZwiXGbMzRuFLW2d6s0kC9ZJtJ6sOM4SV0gV8SSiX7vwJyAzIVh5lf1s-TEmMm_ex0jb_bSG2AX0bq2lWSixSYF3gNuPCYL5EzwghU1ktjiyYBm55l7ZLSAF0_GvRofj4LC18HHCmuQP7YWww_ZolYmFaUW2clSKlU6LK0Ka2XWyAWO-vrq4aouxpIL1gYQw8';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    profile,
    unreadNotificationCount,
    setIsNotificationPanelOpen,
  } = useApp();

  const getSubtitle = () => {
    switch (activeTab) {
      case 'rewards':
        return language === 'hi' ? 'रिवार्ड्स होम • करौली' : 'Home Rewards • Karauli';
      case 'passbook':
        return language === 'hi' ? 'पासबुक लेजर • करौली' : 'Statement Passbook • Karauli';
      case 'redeem':
        return language === 'hi' ? 'यूपीआई कैश निकासी • करौली' : 'Redeem Cash Upi • Karauli';
      case 'directory':
        return language === 'hi' ? 'कारीगर डायरेक्टरी • करौली' : 'Contractor Directory • Karauli';
      case 'kyc':
        return 'Shiv Agency Karauli';
      default:
        return 'Shiv Agency Karauli';
    }
  };

  const getTitle = () => {
    if (activeTab === 'kyc') {
      return language === 'hi' ? 'केवाईसी सत्यापन' : 'Kyc Verification';
    }
    return 'Shiv Agency';
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#fcf9f8]/90 dark:bg-[#141211]/90 backdrop-blur-xl border-b border-[#eae7e7]/60 dark:border-[#2d2825] shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 max-w-lg mx-auto px-4 flex items-center justify-between gap-2">
        {/* Left Side Branding or Back Button */}
        <div className="flex items-center gap-2 min-w-0">
          {activeTab === 'kyc' ? (
            <button
              aria-label="Go back to rewards"
              onClick={() => setActiveTab('rewards')}
              className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#1b1b1c] dark:text-[#f5eeea] hover:bg-[#eae7e7] dark:hover:bg-[#2d2825] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <img
            alt="Shiv Agency Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={SHIV_LOGO}
          />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-[16px] text-[#1b1b1c] dark:text-[#f5eeea] truncate leading-tight">
                {getTitle()}
              </h1>
              {activeTab !== 'kyc' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('kyc')}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#bdeed0] text-[#002113] dark:bg-[#2e5a44] dark:text-[#bdeed0] text-[10px] font-bold tracking-tight hover:opacity-90 transition-opacity"
                  title="Click to view KYC details"
                >
                  <span className="material-symbols-outlined text-[12px] mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  KYC
                </button>
              )}
            </div>
            <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] truncate leading-tight">
              {getSubtitle()}
            </span>
          </div>
        </div>

        {/* Right Controls: Language toggle & Profile Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {activeTab !== 'kyc' && (
            <button
              aria-label="Switch Language"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="h-9 px-2.5 rounded-xl bg-[#eae7e7] dark:bg-[#2d2825] hover:bg-[#e5e2e1] dark:hover:bg-[#38322e] flex items-center gap-1 text-[#554339] dark:text-[#d5c4ba] transition-colors cursor-pointer"
            >
              <span className={`text-[12px] font-bold ${language === 'en' ? 'text-[#964407] dark:text-[#e07937]' : 'text-[#887368]'}`}>
                EN
              </span>
              <span className="text-[11px] text-[#887368]">|</span>
              <span className={`text-[12px] font-bold ${language === 'hi' ? 'text-[#964407] dark:text-[#e07937]' : 'text-[#887368]'}`}>
                हिन्दी
              </span>
            </button>
          )}

          <button
            type="button"
            aria-label="View notifications"
            onClick={() => setIsNotificationPanelOpen(true)}
            className="relative w-9 h-9 rounded-xl bg-[#eae7e7] dark:bg-[#2d2825] hover:bg-[#e5e2e1] dark:hover:bg-[#38322e] flex items-center justify-center text-[#554339] dark:text-[#d5c4ba] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#fcf9f8] dark:ring-[#141211]">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label="Open KYC Profile"
            onClick={() => setActiveTab(activeTab === 'kyc' ? 'rewards' : 'kyc')}
            className="relative flex items-center justify-center rounded-full ring-2 ring-[#b65c21]/30 hover:ring-[#b65c21] transition-all cursor-pointer"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={profile.photoUrl}
            />
            {profile.kycStatus === 'verified' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#39654e] border-2 border-[#fcf9f8] dark:border-[#141211] rounded-full" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
