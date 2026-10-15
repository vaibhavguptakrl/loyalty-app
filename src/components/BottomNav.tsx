import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import type { ActiveTab } from '../types.ts';

interface NavItem {
  id: ActiveTab;
  icon: string;
  labelEn: string;
  labelHi: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'rewards', icon: 'account_balance_wallet', labelEn: 'Rewards', labelHi: 'रिवार्ड्स' },
  { id: 'passbook', icon: 'receipt_long', labelEn: 'Passbook', labelHi: 'पासबुक' },
  { id: 'redeem', icon: 'currency_rupee', labelEn: 'Redeem', labelHi: 'निकासी' },
  { id: 'directory', icon: 'badge', labelEn: 'Directory', labelHi: 'डायरेक्टरी' },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language } = useApp();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#fcf9f8]/95 dark:bg-[#141211]/95 backdrop-blur-xl border-t border-[#eae7e7] dark:border-[#2d2825] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer select-none ${
                isActive
                  ? 'text-[#964407] dark:text-[#e07937] font-bold'
                  : 'text-[#554339] dark:text-[#d5c4ba] hover:text-[#1b1b1c] dark:hover:text-[#f5eeea]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-semibold tracking-tight mt-0.5">
                {language === 'hi' ? item.labelHi : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
