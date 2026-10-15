import type { LedgerEntry, TransactionCategory } from '../types.ts';

/**
 * 1 Reward Point = 1 Indian Rupee
 */
export function calculateCashValue(points: number): number {
  if (points <= 0 || isNaN(points)) return 0;
  return Math.floor(points);
}

/**
 * Store Voucher includes extra bonus credit (default 5%)
 */
export function calculateVoucherValue(points: number, bonusPercent: number = 5): number {
  if (points <= 0 || isNaN(points)) return 0;
  const multiplier = 1 + bonusPercent / 100;
  return Math.round(points * multiplier);
}

/**
 * Validates points redemption request
 */
export function validatePointsInput(points: number, balance: number): { valid: boolean; error?: string } {
  if (isNaN(points) || points <= 0) {
    return { valid: false, error: 'कृपया मान्य पॉइंट्स दर्ज करें (Please enter valid points)' };
  }
  if (points < 100) {
    return { valid: false, error: 'न्यूनतम निकासी 100 पॉइंट्स है (Minimum redemption is 100 Points)' };
  }
  if (points > balance) {
    return { valid: false, error: 'अपर्याप्त बैलेंस (Insufficient reward points balance)' };
  }
  return { valid: true };
}

/**
 * Formats Indian number system strings (e.g. 8,450)
 */
export function formatPoints(points: number): string {
  const absVal = Math.abs(points || 0);
  return absVal.toLocaleString('en-IN');
}

/**
 * Formats Rupee amounts (e.g. ₹8,450)
 */
export function formatCurrency(amount: number): string {
  const absVal = Math.abs(amount || 0);
  return `₹${absVal.toLocaleString('en-IN')}`;
}

/**
 * Filter ledger records by category and optionally by month
 */
export function filterEntries(
  entries: LedgerEntry[],
  category: TransactionCategory,
  month?: string
): LedgerEntry[] {
  return entries.filter((entry) => {
    const matchesCategory = category === 'all' || entry.category === category;
    const matchesMonth = !month || month === 'all' || entry.month === month;
    return matchesCategory && matchesMonth;
  });
}

/**
 * Computes lifetime earned, redeemed, and net balance from ledger
 */
export function calculateTotals(entries: LedgerEntry[]): {
  earned: number;
  redeemedPoints: number;
  redeemedRupees: number;
  balance: number;
} {
  let earned = 0;
  let redeemedPoints = 0;
  let redeemedRupees = 0;

  for (const entry of entries) {
    if (entry.type === 'credit') {
      earned += entry.points;
    } else if (entry.type === 'debit') {
      redeemedPoints += Math.abs(entry.points);
      redeemedRupees += Math.abs(entry.cashAmount);
    }
  }

  const balance = Math.max(0, earned - redeemedPoints);
  return { earned, redeemedPoints, redeemedRupees, balance };
}

/**
 * Generates an official plumber registration code, e.g. KRL-PLUMB-4821
 */
export function generatePlumberCode(prefix: string = 'KRL-PLUMB', seed?: number): string {
  const randomNum = seed !== undefined ? seed : Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
}

export interface MonthlyPointsData {
  month: string;
  hindiMonth: string;
  earned: number;
  redeemed: number;
}

export function calculateMonthlyTotals(data: MonthlyPointsData[]): {
  totalEarned: number;
  totalRedeemed: number;
  netAccumulated: number;
} {
  let totalEarned = 0;
  let totalRedeemed = 0;
  for (const item of data) {
    totalEarned += item.earned;
    totalRedeemed += item.redeemed;
  }
  return {
    totalEarned,
    totalRedeemed,
    netAccumulated: Math.max(0, totalEarned - totalRedeemed),
  };
}

