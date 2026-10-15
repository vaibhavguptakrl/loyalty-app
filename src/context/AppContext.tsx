import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ActiveTab,
  Language,
  Theme,
  PlumberProfile,
  LedgerEntry,
  AppNotification,
} from '../types.ts';
import { INITIAL_PROFILE, INITIAL_ENTRIES } from '../data/mockData.ts';
import { generatePlumberCode } from '../utils/rewards.ts';
import {
  createPointsCreditedNotification,
  createKycStatusNotification,
  createPayoutNotification,
} from '../utils/notifications.ts';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  profile: PlumberProfile;
  setProfile: React.Dispatch<React.SetStateAction<PlumberProfile>>;
  entries: LedgerEntry[];
  balance: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  redeemUPI: (points: number, upiId: string) => Promise<{ success: boolean; utr: string; amount: number }>;
  claimVoucher: (points: number) => Promise<{ success: boolean; voucherCode: string; voucherValue: number }>;
  addPurchasePoints: (invoiceNo: string, itemsDesc: string, points: number) => void;
  completeKyc: (name: string, phone: string, email: string) => Promise<string>;
  updateUpiId: (newUpi: string) => void;
  toggleBiometric: () => void;
  activeModal: string | null;
  modalPayload: any;
  openModal: (modal: string, payload?: any) => void;
  closeModal: () => void;

  // Notification Toast & Center State
  notifications: AppNotification[];
  unreadNotificationCount: number;
  activeToast: AppNotification | null;
  showToast: (notif: AppNotification) => void;
  dismissToast: () => void;
  isNotificationPanelOpen: boolean;
  setIsNotificationPanelOpen: (open: boolean) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  triggerSimulatedNotification: (type: 'points' | 'kyc') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'init-notif-1',
    type: 'points',
    title: '+650 Points Credited!',
    hindiTitle: '+650 पॉइंट्स खाते में जुड़े!',
    message: 'Shiv Agency Counter added 650 points for CPVC Pipes & Brass Fittings (SA-4091).',
    hindiMessage: 'शिव एजेंसी द्वारा सीपीवीसी पाइप्स बिल #SA-4091 हेतु 650 पॉइंट्स जोड़े गए।',
    points: 650,
    timestamp: Date.now() - 3600000 * 2, // 2 hours ago
    read: false,
    actionTab: 'passbook',
    actionLabel: 'View Ledger',
    actionHindiLabel: 'लेजर देखें',
  },
  {
    id: 'init-notif-2',
    type: 'kyc',
    title: 'KYC Verification 100% Approved',
    hindiTitle: 'केवाईसी सत्यापन पूर्णतः स्वीकृत',
    message: 'Aadhaar, PAN & live selfie verified. Unique code: KRL-PLUMB-7842.',
    hindiMessage: 'आधार, पैन व लाइव सेल्फी सत्यापन सफल। यूनिक कोड: KRL-PLUMB-7842।',
    timestamp: Date.now() - 3600000 * 24, // 1 day ago
    read: true,
    actionTab: 'rewards',
    actionLabel: 'View Profile',
    actionHindiLabel: 'प्रोफाइल देखें',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('rewards');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('sand');
  const [profile, setProfile] = useState<PlumberProfile>(INITIAL_PROFILE);
  const [entries, setEntries] = useState<LedgerEntry[]>(INITIAL_ENTRIES);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  // Notification system state
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState<boolean>(false);

  // Sync theme to root class
  useEffect(() => {
    if (theme === 'copper') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Auto-dismiss active toast after 4.5 seconds
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [activeToast]);

  const showToast = (notif: AppNotification) => {
    setActiveToast(notif);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'sand' ? 'copper' : 'sand'));
  };

  const toggleBiometric = () => {
    setProfile((prev) => ({
      ...prev,
      biometricEnabled: !prev.biometricEnabled,
    }));
  };

  const updateUpiId = (newUpi: string) => {
    setProfile((prev) => ({
      ...prev,
      upiId: newUpi.trim(),
    }));
  };

  // Balance starts at 8,450 as requested in reference mockups
  const [balance, setBalance] = useState<number>(8450);
  const [lifetimeEarned, setLifetimeEarned] = useState<number>(14200);
  const [lifetimeRedeemed, setLifetimeRedeemed] = useState<number>(5750);

  const openModal = (modal: string, payload?: any) => {
    setActiveModal(modal);
    setModalPayload(payload || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  const redeemUPI = async (points: number, upiId: string): Promise<{ success: boolean; utr: string; amount: number }> => {
    const amount = points;
    const utr = `${Math.floor(300000000000 + Math.random() * 900000000000)}`;
    const payoutId = `UP-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEntry: LedgerEntry = {
      id: `entry-${Date.now()}`,
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      month: '2023-10',
      title: 'Instant UPI Cashout (निकासी)',
      hindiTitle: 'त्वरित यूपीआई निकासी',
      category: 'upi',
      points: -points,
      cashAmount: amount,
      type: 'debit',
      status: 'Success',
      recipient: upiId,
      utr,
      details: `Dispatched to Bank via IMPS. Payout ID #${payoutId}`,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setBalance((prev) => Math.max(0, prev - points));
    setLifetimeRedeemed((prev) => prev + amount);

    const notif = createPayoutNotification(amount, upiId, utr);
    setNotifications((prev) => [notif, ...prev]);
    showToast(notif);

    return { success: true, utr, amount };
  };

  const claimVoucher = async (points: number): Promise<{ success: boolean; voucherCode: string; voucherValue: number }> => {
    const voucherValue = Math.round(points * 1.05);
    const voucherCode = `SHIV-VOUCH-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEntry: LedgerEntry = {
      id: `entry-${Date.now()}`,
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      month: '2023-10',
      title: `Store Hardware Voucher ₹${voucherValue.toLocaleString('en-IN')}`,
      hindiTitle: `स्टोर हार्डवेयर वाउचर ₹${voucherValue.toLocaleString('en-IN')}`,
      invoiceNo: voucherCode,
      category: 'voucher',
      points: -points,
      cashAmount: voucherValue,
      type: 'debit',
      status: 'Claimed',
      counterLocation: 'Shiv Agency Main Desk',
      details: `₹${voucherValue.toLocaleString('en-IN')} Material Credit (+5% bonus applied)`,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setBalance((prev) => Math.max(0, prev - points));
    setLifetimeRedeemed((prev) => prev + voucherValue);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'points',
      title: `Store Voucher Slip Generated!`,
      hindiTitle: `स्टोर वाउचर पर्ची तैयार!`,
      message: `₹${voucherValue.toLocaleString('en-IN')} Hardware credit voucher ready for pickup at Bhoodara Bazar counter.`,
      hindiMessage: `₹${voucherValue.toLocaleString('en-IN')} हार्डवेयर वाउचर भूदरा बाज़ार काउंटर पर मान्य है।`,
      timestamp: Date.now(),
      read: false,
      actionTab: 'passbook',
      actionLabel: 'View Slip',
      actionHindiLabel: 'पर्ची देखें',
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(notif);

    return { success: true, voucherCode, voucherValue };
  };

  const addPurchasePoints = (invoiceNo: string, itemsDesc: string, points: number) => {
    const newEntry: LedgerEntry = {
      id: `entry-${Date.now()}`,
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      month: '2023-10',
      title: itemsDesc || 'Counter Bill Purchase Points',
      hindiTitle: 'काउंटर बिल खरीद पॉइंट्स',
      invoiceNo: invoiceNo || `SA-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'purchase',
      points,
      cashAmount: points,
      type: 'credit',
      status: 'Delivered',
      addedBy: 'Admin - Shiv Agency Store',
      counterLocation: 'Shiv Agency Bhoodara Bazar',
      details: 'Instant points credited via Bill QR Scanner',
    };

    setEntries((prev) => [newEntry, ...prev]);
    setBalance((prev) => prev + points);
    setLifetimeEarned((prev) => prev + points);

    // Trigger instant points credited notification & toast
    const notif = createPointsCreditedNotification(points, invoiceNo, itemsDesc);
    setNotifications((prev) => [notif, ...prev]);
    showToast(notif);
  };

  const completeKyc = async (name: string, phone: string, email: string): Promise<string> => {
    const newCode = generatePlumberCode('KRL-PLUMB', 4821);
    setProfile((prev) => ({
      ...prev,
      name: name || 'Rajesh Sharma',
      englishName: name || 'Rajesh Sharma',
      phone: phone || prev.phone,
      email: email || prev.email,
      memberCode: newCode,
      kycStatus: 'verified',
    }));

    // Trigger instant KYC status update notification & toast
    const notif = createKycStatusNotification('verified', newCode);
    setNotifications((prev) => [notif, ...prev]);
    showToast(notif);

    return newCode;
  };

  const triggerSimulatedNotification = (type: 'points' | 'kyc') => {
    if (type === 'points') {
      const samplePoints = [350, 500, 850, 1200][Math.floor(Math.random() * 4)];
      const sampleInv = `SA-${Math.floor(1000 + Math.random() * 9000)}`;
      addPurchasePoints(sampleInv, 'Astral CPVC & Supreme PVC Materials', samplePoints);
    } else {
      const notif = createKycStatusNotification('verified', profile.memberCode);
      setNotifications((prev) => [notif, ...prev]);
      showToast(notif);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        theme,
        toggleTheme,
        profile,
        setProfile,
        entries,
        balance,
        lifetimeEarned,
        lifetimeRedeemed,
        redeemUPI,
        claimVoucher,
        addPurchasePoints,
        completeKyc,
        updateUpiId,
        toggleBiometric,
        activeModal,
        modalPayload,
        openModal,
        closeModal,
        notifications,
        unreadNotificationCount,
        activeToast,
        showToast,
        dismissToast,
        isNotificationPanelOpen,
        setIsNotificationPanelOpen,
        markAllNotificationsAsRead,
        clearNotifications,
        triggerSimulatedNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
