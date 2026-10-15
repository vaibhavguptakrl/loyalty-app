import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency, formatPoints, validatePointsInput } from '../utils/rewards.ts';

const NPCI_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBwobulEfFRcB6pN9W1u5LMLk9ulCqNuVfNeKkMBnQIJYl4_nBuBKrNIPPQJOHFM-SYPVPwzsRV9iYRlbgMe_B8dBJyyAVVExuT_uYit5rm3VEl2YQLjAV1bw4KdeB98e9wXKVZ3WAg-49w_u7DiU5vQwjBAORIhU5jHzFHUuSKWF2WsVmtVCWozGXC8CU6CR15evvIiPIU9ue1MhE_Q-jhxDCuixxR8QQZCSHKHVPi19XeItxC_U7H';

export const RedeemScreen: React.FC = () => {
  const {
    balance,
    profile,
    language,
    redeemUPI,
    claimVoucher,
    setActiveTab,
    openModal,
  } = useApp();

  const [mode, setMode] = useState<'upi' | 'voucher'>('upi');
  const [pointsInput, setPointsInput] = useState<number>(3000);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transferSuccess, setTransferSuccess] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Voucher tab points
  const [voucherPoints, setVoucherPoints] = useState<number>(5000);
  const voucherValue = Math.round(voucherPoints * 1.05);

  const handlePointsChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setPointsInput(0);
      setValidationError(null);
    } else {
      setPointsInput(num);
      setValidationError(null);
    }
  };

  const handleAddPoints = (delta: number) => {
    const nextVal = Math.min(balance, pointsInput + delta);
    setPointsInput(nextVal);
    setValidationError(null);
  };

  const handleSetMax = () => {
    setPointsInput(balance);
    setValidationError(null);
  };

  const handleExecuteUPI = async () => {
    const check = validatePointsInput(pointsInput, balance);
    if (!check.valid) {
      setValidationError(check.error || 'Invalid amount');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);

    try {
      // Simulate biometric check and IMPS dispatch
      await new Promise((resolve) => setTimeout(resolve, 1400));
      const res = await redeemUPI(pointsInput, profile.upiId);
      setIsProcessing(false);
      setTransferSuccess(
        `Dispatched ₹${res.amount.toLocaleString('en-IN')} to ${profile.upiId}! (UTR: ${res.utr})`
      );

      setTimeout(() => {
        setTransferSuccess(null);
      }, 5000);
    } catch {
      setIsProcessing(false);
      setValidationError('Transfer failed. Please check network and retry.');
    }
  };

  const handleExecuteVoucher = async () => {
    const check = validatePointsInput(voucherPoints, balance);
    if (!check.valid) {
      alert(check.error || 'Invalid points for voucher');
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const res = await claimVoucher(voucherPoints);
      setIsProcessing(false);
      openModal('invoice_slip', {
        title: `Shiv Agency Hardware Voucher`,
        invoiceNo: res.voucherCode,
        amount: res.voucherValue,
        points: voucherPoints,
        type: 'Voucher Slip',
      });
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4 max-w-lg mx-auto">
      {/* Hero Kiln Balance Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#1e1e1e] text-[#f3f0ef] p-4 shadow-xl border border-neutral-800">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#964407]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#b65c21] text-[#fffbff]">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#dbc1b5] uppercase tracking-wider font-bold">
                  {language === 'hi' ? 'कुल रिडीम करने योग्य बैलेंस' : 'कुल रिडीम करने योग्य बैलेंस'}
                </span>
                <span className="text-[12px] text-[#e5e2e1]">
                  Redeemable Rewards Balance
                </span>
              </div>
            </div>

            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdea6] text-[#271900] text-[10px] font-bold shadow-sm">
              <span
                className="material-symbols-outlined text-[14px] mr-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              1 Pt = ₹1 Cash
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[36px] font-extrabold text-[#f7bd48] tracking-tight leading-none">
                  {formatPoints(balance)}
                </span>
                <span className="text-[16px] text-[#dbc1b5] font-semibold">Pts</span>
              </div>
              <p className="text-[12px] text-[#eae7e7] mt-1 flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-[#bdeed0]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>
                  समतुल्य नकद:{' '}
                  <strong className="text-white font-bold">{formatCurrency(balance)} INR</strong>
                </span>
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm text-[#e5e2e1] text-[11px] font-medium">
                करौली लेजर सक्रिय
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Mode Control */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-[#eae7e7] dark:bg-[#24201d] shadow-sm border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <button
          type="button"
          onClick={() => setMode('upi')}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
            mode === 'upi'
              ? 'bg-white dark:bg-[#1c1816] text-[#964407] dark:text-[#e07937] shadow-sm font-bold'
              : 'text-[#554339] dark:text-[#d5c4ba] hover:text-[#1b1b1c] font-semibold'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            currency_rupee
          </span>
          <span className="text-[14px]">Instant UPI</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('voucher')}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
            mode === 'voucher'
              ? 'bg-white dark:bg-[#1c1816] text-[#964407] dark:text-[#e07937] shadow-sm font-bold'
              : 'text-[#554339] dark:text-[#d5c4ba] hover:text-[#1b1b1c] font-semibold'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          <span className="text-[14px]">Store Voucher</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#ffdea6] text-[#271900] text-[10px] font-bold">
            +5%
          </span>
        </button>
      </div>

      {/* UPI View */}
      {mode === 'upi' && (
        <div className="flex flex-col space-y-4">
          {/* Amount Selection Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1c1816] shadow-sm space-y-3.5 border border-[#eae7e7]/60 dark:border-[#2d2825]">
            <div className="flex items-center justify-between">
              <label htmlFor="pts-input" className="flex flex-col cursor-pointer">
                <span className="text-[13px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                  {language === 'hi' ? 'पॉइंट्स दर्ज करें' : 'पॉइंट्स दर्ज करें'}
                </span>
                <span className="text-[11px] text-[#554339] dark:text-[#d5c4ba]">
                  Enter Points to Redeem
                </span>
              </label>
              <span className="text-[10px] text-[#964407] dark:text-[#e07937] font-bold bg-[#ffdbca] dark:bg-[#773300]/40 px-2 py-0.5 rounded-full">
                No Deductions
              </span>
            </div>

            {/* Quick Fill Field */}
            <div className="relative flex items-center">
              <input
                id="pts-input"
                type="number"
                min="100"
                max={balance}
                value={pointsInput || ''}
                onChange={(e) => handlePointsChange(e.target.value)}
                placeholder="0"
                className="w-full h-12 pl-4 pr-16 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] text-[#1b1b1c] dark:text-[#f5eeea] text-[20px] font-bold focus:outline-none focus:ring-2 focus:ring-[#964407] shadow-inner"
              />
              <div className="absolute right-3 flex items-center pointer-events-none">
                <span className="text-[12px] font-bold text-[#887368] dark:text-[#9e8a7f]">
                  PTS
                </span>
              </div>
            </div>

            {/* Amount Increment Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleAddPoints(500)}
                className="px-3 py-1.5 rounded-lg bg-[#f0eded] dark:bg-[#2d2825] hover:bg-[#eae7e7] text-[#1b1b1c] dark:text-[#f5eeea] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                +500
              </button>
              <button
                type="button"
                onClick={() => handleAddPoints(1000)}
                className="px-3 py-1.5 rounded-lg bg-[#f0eded] dark:bg-[#2d2825] hover:bg-[#eae7e7] text-[#1b1b1c] dark:text-[#f5eeea] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                +1,000
              </button>
              <button
                type="button"
                onClick={() => handleAddPoints(2000)}
                className="px-3 py-1.5 rounded-lg bg-[#f0eded] dark:bg-[#2d2825] hover:bg-[#eae7e7] text-[#1b1b1c] dark:text-[#f5eeea] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                +2,000
              </button>
              <button
                type="button"
                onClick={handleSetMax}
                className="px-3 py-1.5 rounded-lg bg-[#ffdea6] hover:bg-[#f7bd48] text-[#271900] text-[12px] font-bold transition-colors cursor-pointer"
              >
                Max: {formatPoints(balance)}
              </button>
            </div>

            {validationError && (
              <p className="text-[12px] text-[#ba1a1a] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {validationError}
              </p>
            )}

            {/* Payout conversion receipt preview */}
            <div className="p-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#bdeed0] text-[#002113]">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    currency_rupee
                  </span>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f]">
                    खाते में प्राप्त राशि / Amount to Receive
                  </span>
                  <span className="text-[12px] text-[#1b1b1c] dark:text-[#f5eeea] font-semibold">
                    Instant IMPS Bank Transfer
                  </span>
                </div>
              </div>
              <span className="text-[22px] font-extrabold text-[#964407] dark:text-[#e07937]">
                {formatCurrency(pointsInput || 0)}
              </span>
            </div>
          </div>

          {/* Verified UPI ID Destination Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#1c1816] shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                  यूपीआई आईडी (UPI VPA)
                </span>
                <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
                  Registered Payout Handle
                </span>
              </div>
              <button
                type="button"
                onClick={() => openModal('edit_upi')}
                className="text-[11px] text-[#964407] dark:text-[#e07937] font-bold hover:underline cursor-pointer"
              >
                बदलें / Edit
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
              <span className="material-symbols-outlined text-[24px] text-[#39654e] dark:text-[#5fa581] flex-shrink-0">
                verified_user
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] text-[#1b1b1c] dark:text-[#f5eeea] truncate">
                  {profile.upiId}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="material-symbols-outlined text-[14px] text-[#39654e] dark:text-[#5fa581]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-[11px] text-[#39654e] dark:text-[#5fa581] font-bold truncate">
                    सत्यापित: {profile.name} ({profile.englishName})
                  </span>
                </div>
              </div>
              <img
                alt="NPCI UPI"
                className="w-8 h-8 rounded-lg object-contain bg-white dark:bg-neutral-800 p-1 flex-shrink-0"
                src={NPCI_LOGO}
              />
            </div>

            {/* Trust assurances */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
                <span className="material-symbols-outlined text-[16px] text-[#964407] dark:text-[#e07937]">
                  speed
                </span>
                <span className="text-[11px] text-[#554339] dark:text-[#d5c4ba] font-medium">
                  Zero Fee Instant Settlement
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
                <span className="material-symbols-outlined text-[16px] text-[#39654e] dark:text-[#5fa581]">
                  lock
                </span>
                <span className="text-[11px] text-[#554339] dark:text-[#d5c4ba] font-medium">
                  NPCI 256-Bit Encrypted
                </span>
              </div>
            </div>
          </div>

          {/* Store Voucher Alternative Cross-Sell */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#ffdea6]/50 via-[#f6f3f2] to-white dark:from-[#715000]/20 dark:via-[#24201d] dark:to-[#1c1816] p-4 shadow-sm border border-[#ffdea6]/60 dark:border-[#715000]/40">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fdc34d] text-[#715000] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">local_mall</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                    शिव एजेंसी स्टोर वाउचर विकल्प
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#964407] text-white text-[10px] font-bold">
                    +5% BONUS
                  </span>
                </div>
                <p className="text-[12px] text-[#554339] dark:text-[#d5c4ba] mt-0.5 leading-relaxed">
                  5,000 Pts = ₹5,250 Material Purchase Credit for pipes &amp; brass fittings at Bhoodara Bazar counter.
                </p>
                <button
                  type="button"
                  onClick={() => setMode('voucher')}
                  className="mt-2 text-left text-[12px] text-[#964407] dark:text-[#e07937] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>वाउचर में देखें / View Voucher Offer</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Security Checkpoint Notice */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#eae7e7] dark:bg-[#24201d] text-[#554339] dark:text-[#d5c4ba]">
            <span
              className="material-symbols-outlined text-[20px] text-[#964407] dark:text-[#e07937]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              fingerprint
            </span>
            <span className="text-[11px] flex-1 leading-snug">
              भुगतान से पहले बायोमेट्रिक / स्क्रीन लॉक प्रमाणीकरण आवश्यक है (Biometric authorization required).
            </span>
          </div>

          {/* Main Execution Button */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleExecuteUPI}
            className={`w-full h-14 rounded-xl font-bold text-[15px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer ${
              transferSuccess
                ? 'bg-[#39654e] text-white'
                : 'bg-[#964407] hover:bg-[#b65c21] text-white'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Authenticating Biometrics &amp; Dispatching...</span>
              </>
            ) : transferSuccess ? (
              <>
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
                <span className="truncate">{transferSuccess}</span>
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span>Transfer {formatCurrency(pointsInput || 0)} Instantly via UPI</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Store Voucher View */}
      {mode === 'voucher' && (
        <div className="flex flex-col space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1c1816] shadow-md space-y-4 border border-[#eae7e7]/60 dark:border-[#2d2825]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#964407] dark:text-[#e07937] font-bold uppercase tracking-wider">
                  काउंटर पिकअप डिस्काउंट
                </span>
                <h2 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                  Shiv Agency Exclusive Hardware Slip
                </h2>
              </div>
              <span className="inline-flex px-2 py-1 rounded bg-[#ffdea6] text-[#271900] text-[10px] font-bold">
                5% Extra Boost
              </span>
            </div>

            {/* Voucher Graphic Card */}
            <div className="relative overflow-hidden rounded-xl bg-[#1e1e1e] p-4 text-[#f3f0ef] flex items-center justify-between border border-neutral-800 shadow-inner">
              <div className="flex flex-col space-y-1 z-10">
                <span className="text-[11px] text-[#dbc1b5]">
                  Authorized Dealership Voucher
                </span>
                <span className="text-[24px] font-bold text-[#ffdea6]">
                  {formatCurrency(voucherValue)} Value
                </span>
                <span className="text-[12px] text-[#eae7e7]">
                  Redeem against {formatPoints(voucherPoints)} Points
                </span>
                <div className="flex items-center gap-1.5 pt-2 text-[#dbc1b5] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#bdeed0]">
                    location_on
                  </span>
                  <span>Bhoodara Bazar, Karauli Store</span>
                </div>
              </div>

              <div className="w-20 h-20 rounded-lg bg-white/10 backdrop-blur-md flex flex-col items-center justify-center p-2 text-center border border-white/20">
                <span className="material-symbols-outlined text-[32px] text-[#ffdea6]">
                  qr_code_2
                </span>
                <span className="text-[9px] text-[#f3f0ef] mt-1 font-semibold">
                  Scan at Desk
                </span>
              </div>
            </div>

            {/* Points selection for voucher */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                Select Voucher Points Amount:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 2000, 5000].map((pts) => (
                  <button
                    key={pts}
                    type="button"
                    onClick={() => setVoucherPoints(pts)}
                    className={`p-2 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                      voucherPoints === pts
                        ? 'bg-[#964407] text-white shadow-sm'
                        : 'bg-[#f0eded] dark:bg-[#2d2825] text-[#1b1b1c] dark:text-[#f5eeea] hover:bg-[#eae7e7]'
                    }`}
                  >
                    {pts} Pts (₹{Math.round(pts * 1.05)})
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
                <span className="text-[12px] text-[#1b1b1c] dark:text-[#f5eeea]">
                  Valid on Astral, Supreme &amp; Brass Fixtures
                </span>
                <span className="text-[10px] text-[#39654e] dark:text-[#5fa581] font-bold">
                  Active Today
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
                <span className="text-[12px] text-[#1b1b1c] dark:text-[#f5eeea]">
                  Invoice Bill Counter
                </span>
                <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] font-semibold">
                  Shiv Agency Main
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleExecuteVoucher}
              className="w-full h-12 rounded-xl bg-[#fdc34d] hover:bg-[#ffdea6] active:scale-[0.99] text-[#715000] font-bold text-[14px] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
              <span>
                {isProcessing
                  ? 'Generating Voucher Slip...'
                  : `Generate Voucher Slip (${formatPoints(voucherPoints)} Pts)`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Recent Redemptions Compact Ledger Mini */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#1c1816] shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
            {language === 'hi' ? 'हालिया निकासी' : 'हालिया निकासी / Recent Payouts'}
          </span>
          <button
            type="button"
            onClick={() => setActiveTab('passbook')}
            className="text-[11px] text-[#964407] dark:text-[#e07937] font-bold hover:underline cursor-pointer"
          >
            View Passbook
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-full bg-[#bdeed0] flex items-center justify-center text-[#002113] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">done_all</span>
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] text-[#1b1b1c] dark:text-[#f5eeea] font-bold truncate">
                  ₹2,500 Dispatched
                </span>
                <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] truncate">
                  IMPS • 14 Oct 2024
                </span>
              </div>
            </div>
            <span className="text-[10px] text-[#39654e] dark:text-[#5fa581] font-bold bg-[#bdeed0]/40 px-2 py-0.5 rounded-full">
              Success
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-full bg-[#ffdea6] flex items-center justify-center text-[#271900] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">receipt</span>
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] text-[#1b1b1c] dark:text-[#f5eeea] font-bold truncate">
                  Store Voucher ₹1,050
                </span>
                <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] truncate">
                  Counter Bill #2841
                </span>
              </div>
            </div>
            <span className="text-[10px] text-[#7b5800] dark:text-[#f7bd48] font-bold bg-[#ffdea6]/40 px-2 py-0.5 rounded-full">
              Claimed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
