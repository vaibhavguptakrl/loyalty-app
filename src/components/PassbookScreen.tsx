import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { filterEntries, formatCurrency, formatPoints } from '../utils/rewards.ts';
import type { TransactionCategory, LedgerEntry } from '../types.ts';

export const PassbookScreen: React.FC = () => {
  const {
    balance,
    lifetimeEarned,
    lifetimeRedeemed,
    entries,
    language,
    openModal,
  } = useApp();

  const [filter, setFilter] = useState<TransactionCategory>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('2023-10');
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  const displayedEntries = filterEntries(entries, filter);

  const handleDownloadPdf = () => {
    setIsPdfGenerating(true);
    setTimeout(() => {
      setIsPdfGenerating(false);
      openModal('pdf_statement', {
        month: selectedMonth === '2023-10' ? 'October 2023' : selectedMonth,
        entries: displayedEntries,
        balance,
        lifetimeEarned,
        lifetimeRedeemed,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4 max-w-lg mx-auto">
      {/* Top Balance & Lifetime Metric Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#1e1e1e] text-[#f3f0ef] p-4 shadow-xl border border-neutral-800">
        <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#fdc34d]/10 pointer-events-none blur-2xl" />
        <div className="absolute right-3 top-3 opacity-15 pointer-events-none">
          <svg className="text-[#ffdea6]" fill="none" height="72" viewBox="0 0 100 100" width="72">
            <polygon
              fill="none"
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle cx="50" cy="54" fill="currentColor" r="16" />
            <path
              d="M50 24 C50 24, 38 42, 38 52 C38 58.6 43.4 64 50 64 C56.6 64 62 58.6 62 52 C62 42 50 24 50 24 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Dual Language Mini Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#ffdea6] tracking-wide uppercase">
              पासबुक शेष • PASSBOOK BALANCE
            </span>
            <span className="text-[11px] text-[#eae7e7]/70">
              Karauli Branch Verified Ledger
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#39654e]/30 text-[#bdeed0] text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Secured</span>
          </div>
        </div>

        {/* Current Available Balance */}
        <div className="my-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-extrabold text-[#f7bd48] tracking-tight leading-none">
              {formatPoints(balance)}
            </span>
            <span className="text-[16px] text-[#ffdea6]/80 font-bold">Pts</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#eae7e7]/90 text-[12px] mt-1">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#fdc34d] text-[#715000] font-bold text-[10px]">
              ₹
            </span>
            <span>
              Equivalent Cash Value:{' '}
              <strong className="text-white font-bold">{formatCurrency(balance)}</strong> (1 Pt = ₹1)
            </span>
          </div>
        </div>

        {/* Ledger Totals Grid (Earned vs Redeemed) */}
        <div className="grid grid-cols-2 gap-2 pt-3 mt-3 bg-white/5 rounded-lg p-2.5 border border-white/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#eae7e7]/70 text-[11px]">
              <span className="material-symbols-outlined text-[13px] text-[#bdeed0]">
                add_circle
              </span>
              <span>कुल अर्जित (Earned)</span>
            </div>
            <span className="text-[16px] text-white font-bold mt-0.5">
              {formatPoints(lifetimeEarned || 14200)} Pts
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#eae7e7]/70 text-[11px]">
              <span className="material-symbols-outlined text-[13px] text-[#ffdea6]">
                payments
              </span>
              <span>निकासी (Redeemed)</span>
            </div>
            <span className="text-[16px] text-[#ffdea6] font-bold mt-0.5">
              {formatCurrency(lifetimeRedeemed || 5750)}{' '}
              <span className="text-[11px] text-[#eae7e7]/60 font-normal">
                / {formatPoints(lifetimeRedeemed || 5750)} Pts
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp Sync Info Box */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#bdeed0]/50 dark:bg-[#2e5a44]/40 text-[#002113] dark:text-[#bdeed0] border border-[#bdeed0]/60 dark:border-[#2e5a44]">
        <div className="p-1 rounded-full bg-[#39654e] text-white flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[16px] block">chat</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[12px] font-bold">
            शिव एजेंसी एडमिन द्वारा सुरक्षित प्रविष्टि (Direct Admin Entry)
          </span>
          <p className="text-[11px] mt-0.5 text-[#002113]/90 dark:text-[#bdeed0]/90 leading-relaxed">
            Points are added directly on material purchases at counter. Instant updates and bill invoices are sent to your verified WhatsApp.
          </p>
        </div>
      </div>

      {/* Date Selector & PDF Statement Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="relative flex-1">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-white dark:bg-[#1c1816] shadow-sm flex items-center text-[#1b1b1c] dark:text-[#f5eeea] text-[12px] font-bold border border-[#eae7e7]/60 dark:border-[#2d2825] focus:outline-none appearance-none cursor-pointer"
          >
            <option value="2023-10">October 2023 (अक्टूबर २०२३)</option>
            <option value="2023-09">September 2023 (सितंबर २०२३)</option>
            <option value="2023-08">August 2023 (अगस्त २०२३)</option>
          </select>
          <span className="material-symbols-outlined text-[#887368] text-[18px] absolute right-3 top-3 pointer-events-none">
            expand_more
          </span>
        </div>

        <button
          type="button"
          disabled={isPdfGenerating}
          onClick={handleDownloadPdf}
          className="h-11 px-3.5 rounded-xl bg-[#964407] hover:bg-[#b65c21] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer flex-shrink-0"
        >
          {isPdfGenerating ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>डाउनलोडिंग...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>स्टेटमेंट PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar">
        {[
          { id: 'all', label: language === 'hi' ? 'सभी लेनदेन' : 'सभी लेनदेन (All)' },
          { id: 'purchase', label: language === 'hi' ? 'सामान ख़रीद' : 'सामान ख़रीद (Purchases)' },
          { id: 'upi', label: language === 'hi' ? 'UPI निकासी' : 'UPI कैश निकासी (Cashouts)' },
          { id: 'bonus', label: language === 'hi' ? 'स्कीम बोनस' : 'स्कीम बोनस (Bonus)' },
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as TransactionCategory)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#964407] text-white shadow-sm'
                  : 'bg-[#f0eded] dark:bg-[#2d2825] text-[#554339] dark:text-[#d5c4ba] hover:bg-[#eae7e7]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Transactions Timeline Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#887368] dark:text-[#9e8a7f] uppercase tracking-wider">
            लेखा-जोखा टाइमलाइन • LEDGER RECORDS
          </span>
          <span className="text-[11px] text-[#964407] dark:text-[#e07937] font-bold">
            {displayedEntries.length} प्रविष्टियाँ (Entries)
          </span>
        </div>

        {displayedEntries.map((item) => (
          <div
            key={item.id}
            className="relative bg-white dark:bg-[#1c1816] p-4 rounded-xl shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm ${
                    item.category === 'upi'
                      ? 'bg-[#ffdea6]/60 text-[#7b5800]'
                      : item.category === 'bonus'
                      ? 'bg-[#ffdbca] text-[#964407]'
                      : item.category === 'voucher'
                      ? 'bg-[#fdc34d]/40 text-[#715000]'
                      : 'bg-[#bdeed0]/50 text-[#39654e]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.category === 'upi'
                      ? 'account_balance'
                      : item.category === 'bonus'
                      ? 'military_tech'
                      : item.category === 'voucher'
                      ? 'confirmation_number'
                      : 'add_shopping_cart'}
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] leading-snug">
                    {item.title}
                  </span>
                  {item.invoiceNo && (
                    <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
                      बिल संख्या: {item.invoiceNo} • {item.details || 'Counter Slip'}
                    </span>
                  )}
                  {item.recipient && (
                    <span className="text-[11px] text-[#554339] dark:text-[#d5c4ba] truncate">
                      Transferred to: {item.recipient}
                    </span>
                  )}
                  {item.category === 'bonus' && (
                    <span className="text-[11px] text-[#964407] dark:text-[#e07937] font-semibold">
                      Karauli Plumbers Special Bonus Tier
                    </span>
                  )}
                </div>
              </div>

              {/* Amount badge */}
              <div className="text-right flex-shrink-0">
                <span
                  className={`text-[16px] font-extrabold block leading-tight ${
                    item.type === 'debit'
                      ? 'text-[#7b5800] dark:text-[#f7bd48]'
                      : 'text-[#39654e] dark:text-[#5fa581]'
                  }`}
                >
                  {item.type === 'debit'
                    ? `-₹${Math.abs(item.cashAmount).toLocaleString('en-IN')}`
                    : `+${item.points} Pts`}
                </span>
                <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f]">
                  {item.type === 'debit'
                    ? `-${Math.abs(item.points)} Pts`
                    : `₹${item.cashAmount} Credit`}
                </span>
              </div>
            </div>

            {/* Middle ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 bg-[#f6f3f2]/90 dark:bg-[#24201d] -mx-4 -mb-1 p-2.5 rounded-b-lg border-t border-[#eae7e7]/50 dark:border-[#2d2825]">
              <div className="flex items-center gap-1.5 text-[#554339] dark:text-[#d5c4ba] text-[11px]">
                {item.utr ? (
                  <span className="font-mono text-[#887368] dark:text-[#9e8a7f]">
                    UTR: {item.utr}
                  </span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[14px] text-[#964407] dark:text-[#e07937]">
                      storefront
                    </span>
                    <span>{item.addedBy || 'Added by: Admin - Shiv Agency'}</span>
                  </>
                )}
              </div>

              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  item.category === 'upi'
                    ? 'bg-[#ffdea6] text-[#271900]'
                    : item.category === 'bonus'
                    ? 'bg-[#ffdbca] text-[#331200]'
                    : 'bg-[#bdeed0] text-[#002113]'
                }`}
              >
                <span className="material-symbols-outlined text-[12px]">
                  {item.category === 'upi'
                    ? 'done_all'
                    : item.category === 'bonus'
                    ? 'celebration'
                    : 'check_circle'}
                </span>
                <span>
                  {item.category === 'upi'
                    ? 'Dispatched to Bank'
                    : item.category === 'bonus'
                    ? 'Special Reward'
                    : 'WhatsApp Alert Sent'}
                </span>
              </div>
            </div>

            {/* Bottom info & Action */}
            <div className="flex items-center justify-between text-[#887368] dark:text-[#9e8a7f] text-[11px] px-0.5 pt-1">
              <span>
                {item.date}, {item.time} {item.counterLocation ? `• ${item.counterLocation}` : ''}
              </span>

              {item.category === 'upi' ? (
                <button
                  type="button"
                  onClick={() => openModal('share_receipt', item)}
                  className="text-[#7b5800] dark:text-[#f7bd48] font-bold inline-flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">share</span>
                  <span>रसीद शेयर करें</span>
                </button>
              ) : item.category === 'purchase' ? (
                <button
                  type="button"
                  onClick={() => openModal('invoice_slip', item)}
                  className="text-[#964407] dark:text-[#e07937] font-bold inline-flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>पर्ची देखें</span>
                </button>
              ) : (
                <span className="text-[#39654e] dark:text-[#5fa581] font-bold">Approved ✓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Help & Support Callout for Local Plumbers */}
      <div className="p-3.5 rounded-xl bg-[#f6f3f2] dark:bg-[#1c1816] flex items-center justify-between mt-2 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#eae7e7] dark:bg-[#2d2825] flex items-center justify-center text-[#964407] dark:text-[#e07937] flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] truncate">
              {language === 'hi' ? 'कोई एंट्री छूट गई है?' : 'कोई एंट्री छूट गई है? (Missing Points?)'}
            </span>
            <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] truncate">
              Contact Counter Admin at Shiv Agency Karauli
            </span>
          </div>
        </div>

        <a
          className="h-9 px-3 rounded-lg bg-white dark:bg-[#24201d] text-[#964407] dark:text-[#e07937] shadow-sm text-[12px] font-bold flex items-center gap-1 hover:bg-[#ffdbca]/30 transition-colors flex-shrink-0"
          href="tel:01464220000"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>कॉल करें</span>
        </a>
      </div>
    </div>
  );
};
