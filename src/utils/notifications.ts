import type { AppNotification } from '../types.ts';

export function createPointsCreditedNotification(
  points: number,
  invoiceNo?: string,
  title?: string
): AppNotification {
  const invText = invoiceNo ? ` (Invoice #${invoiceNo})` : '';
  const itemText = title ? ` for ${title}` : '';

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: 'points',
    title: `+${points.toLocaleString('en-IN')} Points Credited!`,
    hindiTitle: `+${points.toLocaleString('en-IN')} पॉइंट्स खाते में जुड़े!`,
    message: `Shiv Agency Counter credited ${points} reward points${itemText}${invText}.`,
    hindiMessage: `शिव एजेंसी काउंटर द्वारा ${points} रिवार्ड पॉइंट्स जोड़े गए। बिल पर्ची व्हाट्सएप पर भेज दी गई है।`,
    points,
    timestamp: Date.now(),
    read: false,
    actionTab: 'passbook',
    actionLabel: 'View Ledger',
    actionHindiLabel: 'लेजर देखें',
  };
}

export function createKycStatusNotification(
  status: 'verified' | 'submitted' | 'under_review',
  code?: string
): AppNotification {
  if (status === 'verified') {
    return {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: 'kyc',
      title: 'KYC Verification Approved!',
      hindiTitle: 'केवाईसी सत्यापन स्वीकृत!',
      message: `Your plumber profile is 100% verified. Member code assigned: ${code || 'KRL-PLUMB-7842'}.`,
      hindiMessage: `आपका प्लम्बर प्रोफाइल सत्यापित हो गया है। अधिकृत सदस्य कोड: ${code || 'KRL-PLUMB-7842'}।`,
      timestamp: Date.now(),
      read: false,
      actionTab: 'rewards',
      actionLabel: 'View Profile',
      actionHindiLabel: 'प्रोफाइल देखें',
    };
  }

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: 'kyc',
    title: 'KYC Documents Submitted',
    hindiTitle: 'केवाईसी दस्तावेज जमा हुए',
    message: 'Automated AI checks underway for Aadhaar, PAN, and Live Selfie.',
    hindiMessage: 'आधार, पैन व लाइव सेल्फी का स्वचालित एआई सत्यापन प्रगति पर है।',
    timestamp: Date.now(),
    read: false,
    actionTab: 'kyc',
    actionLabel: 'Check Status',
    actionHindiLabel: 'स्थिति देखें',
  };
}

export function createPayoutNotification(
  amount: number,
  upiId: string,
  utr?: string
): AppNotification {
  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: 'payout',
    title: `₹${amount.toLocaleString('en-IN')} Dispatched via UPI`,
    hindiTitle: `₹${amount.toLocaleString('en-IN')} यूपीआई द्वारा खाते में भेजे गए`,
    message: `Transferred to ${upiId}. IMPS UTR: ${utr || 'Direct'}.`,
    hindiMessage: `राशि आपके खाते ${upiId} में भेज दी गई है।`,
    timestamp: Date.now(),
    read: false,
    actionTab: 'passbook',
    actionLabel: 'View Receipt',
    actionHindiLabel: 'रसीद देखें',
  };
}

export function formatNotificationTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}
