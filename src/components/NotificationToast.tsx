import React from 'react';
import { useApp } from '../context/AppContext.tsx';

export const NotificationToast: React.FC = () => {
  const { activeToast, dismissToast, setActiveTab, language } = useApp();

  if (!activeToast) return null;

  const isPoints = activeToast.type === 'points';
  const isKyc = activeToast.type === 'kyc';
  const isPayout = activeToast.type === 'payout';

  const handleAction = () => {
    if (activeToast.actionTab) {
      setActiveTab(activeToast.actionTab);
    }
    dismissToast();
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-20 inset-x-4 z-50 max-w-md mx-auto pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      <div
        className={`relative overflow-hidden rounded-2xl shadow-2xl p-4 border backdrop-blur-xl ${
          isPoints
            ? 'bg-[#1e1e1e]/95 border-[#ffdea6]/50 text-white'
            : isKyc
            ? 'bg-[#1e1e1e]/95 border-[#bdeed0]/50 text-white'
            : isPayout
            ? 'bg-[#1e1e1e]/95 border-[#fdc34d]/50 text-white'
            : 'bg-[#1e1e1e]/95 border-neutral-700 text-white'
        }`}
      >
        {/* Glow backdrop */}
        <div
          className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-xl pointer-events-none ${
            isPoints
              ? 'bg-[#964407]/40'
              : isKyc
              ? 'bg-[#39654e]/40'
              : 'bg-[#fdc34d]/30'
          }`}
        />

        <div className="relative z-10 flex items-start gap-3">
          {/* Leading Icon Badge */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
              isPoints
                ? 'bg-[#ffdea6] text-[#271900]'
                : isKyc
                ? 'bg-[#bdeed0] text-[#002113]'
                : isPayout
                ? 'bg-[#fdc34d] text-[#715000]'
                : 'bg-white/20 text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPoints
                ? 'toll'
                : isKyc
                ? 'verified_user'
                : isPayout
                ? 'bolt'
                : 'notifications'}
            </span>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  isPoints
                    ? 'bg-[#ffdea6]/20 text-[#ffdea6] border border-[#ffdea6]/30'
                    : isKyc
                    ? 'bg-[#bdeed0]/20 text-[#bdeed0] border border-[#bdeed0]/30'
                    : 'bg-[#fdc34d]/20 text-[#fdc34d] border border-[#fdc34d]/30'
                }`}
              >
                {isPoints
                  ? language === 'hi' ? 'रिवार्ड्स अपडेट' : 'Points Credited'
                  : isKyc
                  ? language === 'hi' ? 'केवाईसी स्थिति' : 'KYC Status Update'
                  : language === 'hi' ? 'कैशआउट' : 'UPI Payout'}
              </span>

              <span className="text-[10px] text-neutral-400">Just now</span>
            </div>

            <h4 className="text-[14px] font-extrabold text-white mt-1 leading-snug">
              {language === 'hi' && activeToast.hindiTitle
                ? activeToast.hindiTitle
                : activeToast.title}
            </h4>

            <p className="text-[12px] text-neutral-300 mt-0.5 leading-relaxed">
              {language === 'hi' && activeToast.hindiMessage
                ? activeToast.hindiMessage
                : activeToast.message}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 mt-2.5">
              {activeToast.actionTab && (
                <button
                  type="button"
                  onClick={handleAction}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1 ${
                    isPoints
                      ? 'bg-[#964407] hover:bg-[#b65c21] text-white'
                      : isKyc
                      ? 'bg-[#39654e] hover:bg-[#2e5a44] text-white'
                      : 'bg-[#7b5800] text-white'
                  }`}
                >
                  <span>
                    {language === 'hi' && activeToast.actionHindiLabel
                      ? activeToast.actionHindiLabel
                      : activeToast.actionLabel || 'View'}
                  </span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              )}

              <div className="flex items-center gap-1 text-[10px] text-neutral-400 ml-auto">
                <span className="material-symbols-outlined text-[12px] text-[#25D366]">chat</span>
                <span>WhatsApp Synced</span>
              </div>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            aria-label="Dismiss Notification"
            onClick={dismissToast}
            className="w-7 h-7 -mr-1 -mt-1 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Animated 4.5s countdown timer bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isPoints
                ? 'bg-[#ffdea6]'
                : isKyc
                ? 'bg-[#bdeed0]'
                : isPayout
                ? 'bg-[#fdc34d]'
                : 'bg-white'
            }`}
            style={{
              animation: 'shrinkWidth 4.5s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};
