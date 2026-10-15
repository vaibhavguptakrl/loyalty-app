/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { RewardsScreen } from './components/RewardsScreen.tsx';
import { PassbookScreen } from './components/PassbookScreen.tsx';
import { RedeemScreen } from './components/RedeemScreen.tsx';
import { DirectoryScreen } from './components/DirectoryScreen.tsx';
import { KycScreen } from './components/KycScreen.tsx';
import { ModalsContainer } from './components/Modals.tsx';
import { NotificationToast } from './components/NotificationToast.tsx';
import { NotificationCenter } from './components/NotificationCenter.tsx';
import type { ActiveTab } from './types.ts';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  // Support query param navigation (e.g. ?tab=kyc or ?tab=redeem or ?tab=passbook)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab | null;
    if (tabParam && ['rewards', 'passbook', 'redeem', 'directory', 'kyc'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [setActiveTab]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] dark:bg-[#141211] text-[#1b1b1c] dark:text-[#f5eeea] transition-colors duration-200">
      <Header />
      <NotificationToast />

      <main className="flex-1 w-full px-4 pt-20 pb-24 max-w-lg mx-auto">
        {activeTab === 'rewards' && <RewardsScreen />}
        {activeTab === 'passbook' && <PassbookScreen />}
        {activeTab === 'redeem' && <RedeemScreen />}
        {activeTab === 'directory' && <DirectoryScreen />}
        {activeTab === 'kyc' && <KycScreen />}
      </main>

      {/* Show bottom nav on tab screens, keep footer space clean */}
      <BottomNav />
      <ModalsContainer />
      <NotificationCenter />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
