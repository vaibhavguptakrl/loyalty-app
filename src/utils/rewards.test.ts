import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCashValue,
  calculateVoucherValue,
  validatePointsInput,
  formatPoints,
  formatCurrency,
  filterEntries,
  calculateTotals,
  generatePlumberCode,
  calculateMonthlyTotals,
} from './rewards.ts';
import type { LedgerEntry } from '../types.ts';

test('calculateCashValue gives 1:1 rupee conversion', () => {
  assert.equal(calculateCashValue(8450), 8450);
  assert.equal(calculateCashValue(0), 0);
  assert.equal(calculateCashValue(-100), 0);
  assert.equal(calculateCashValue(3000.75), 3000);
});

test('calculateVoucherValue applies +5% bonus credit', () => {
  assert.equal(calculateVoucherValue(5000, 5), 5250);
  assert.equal(calculateVoucherValue(1000, 5), 1050);
  assert.equal(calculateVoucherValue(0, 5), 0);
});

test('validatePointsInput enforces minimums and max balances', () => {
  assert.deepEqual(validatePointsInput(3000, 8450), { valid: true });
  assert.equal(validatePointsInput(50, 8450).valid, false);
  assert.equal(validatePointsInput(9000, 8450).valid, false);
  assert.equal(validatePointsInput(-10, 8450).valid, false);
});

test('formatPoints and formatCurrency format Indian numerals', () => {
  assert.equal(formatPoints(8450), '8,450');
  assert.equal(formatCurrency(8450), '₹8,450');
  assert.equal(formatCurrency(3000), '₹3,000');
});

test('filterEntries correctly filters by category and month', () => {
  const sampleEntries: LedgerEntry[] = [
    {
      id: '1',
      date: '24 Oct 2023',
      time: '02:45 PM',
      timestamp: 1698138900000,
      month: '2023-10',
      title: 'Ashirvad CPVC',
      category: 'purchase',
      points: 850,
      cashAmount: 850,
      type: 'credit',
      status: 'Delivered',
    },
    {
      id: '2',
      date: '24 Oct 2023',
      time: '11:20 AM',
      timestamp: 1698126600000,
      month: '2023-10',
      title: 'UPI Payout',
      category: 'upi',
      points: -2500,
      cashAmount: 2500,
      type: 'debit',
      status: 'Success',
    },
    {
      id: '3',
      date: '12 Oct 2023',
      time: '10:00 AM',
      timestamp: 1697083200000,
      month: '2023-10',
      title: 'Festive Scheme',
      category: 'bonus',
      points: 500,
      cashAmount: 500,
      type: 'credit',
      status: 'Approved',
    },
  ];

  const purchases = filterEntries(sampleEntries, 'purchase');
  assert.equal(purchases.length, 1);
  assert.equal(purchases[0].id, '1');

  const upiList = filterEntries(sampleEntries, 'upi');
  assert.equal(upiList.length, 1);
  assert.equal(upiList[0].id, '2');

  const all = filterEntries(sampleEntries, 'all');
  assert.equal(all.length, 3);
});

test('calculateTotals calculates earned, redeemed and net balance', () => {
  const entries: LedgerEntry[] = [
    {
      id: '1',
      date: '',
      time: '',
      timestamp: 1,
      month: '2023-10',
      title: '',
      category: 'purchase',
      points: 10000,
      cashAmount: 10000,
      type: 'credit',
      status: 'Delivered',
    },
    {
      id: '2',
      date: '',
      time: '',
      timestamp: 2,
      month: '2023-10',
      title: '',
      category: 'upi',
      points: -2000,
      cashAmount: 2000,
      type: 'debit',
      status: 'Success',
    },
    {
      id: '3',
      date: '',
      time: '',
      timestamp: 3,
      month: '2023-10',
      title: '',
      category: 'bonus',
      points: 500,
      cashAmount: 500,
      type: 'credit',
      status: 'Approved',
    },
  ];

  const totals = calculateTotals(entries);
  assert.equal(totals.earned, 10500);
  assert.equal(totals.redeemedPoints, 2000);
  assert.equal(totals.redeemedRupees, 2000);
  assert.equal(totals.balance, 8500);
});

test('generatePlumberCode creates standard member format', () => {
  const code = generatePlumberCode('KRL-PLUMB', 4821);
  assert.equal(code, 'KRL-PLUMB-4821');

  const randomCode = generatePlumberCode();
  assert.match(randomCode, /^KRL-PLUMB-\d{4}$/);
});

test('calculateMonthlyTotals aggregates 6-month earnings and redemptions', () => {
  const monthlyData = [
    { month: 'May', hindiMonth: 'मई', earned: 1800, redeemed: 500 },
    { month: 'Jun', hindiMonth: 'जून', earned: 2400, redeemed: 1000 },
    { month: 'Jul', hindiMonth: 'जुलाई', earned: 3100, redeemed: 1500 },
    { month: 'Aug', hindiMonth: 'अगस्त', earned: 2850, redeemed: 800 },
    { month: 'Sep', hindiMonth: 'सितंबर', earned: 3450, redeemed: 2000 },
    { month: 'Oct', hindiMonth: 'अक्टूबर', earned: 3200, redeemed: 2500 },
  ];

  const totals = calculateMonthlyTotals(monthlyData);
  assert.equal(totals.totalEarned, 16800);
  assert.equal(totals.totalRedeemed, 8300);
  assert.equal(totals.netAccumulated, 8500);
});
