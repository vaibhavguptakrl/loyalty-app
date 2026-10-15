import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency, formatPoints } from '../utils/rewards.ts';

export const ModalsContainer: React.FC = () => {
  const {
    activeModal,
    modalPayload,
    closeModal,
    addPurchasePoints,
    updateUpiId,
    profile,
    balance,
  } = useApp();

  // Scan modal local state
  const [scannedInvoice, setScannedInvoice] = useState<string>('SA-9241');
  const [scannedDesc, setScannedDesc] = useState<string>('Astral CPVC Pipes 1" (8 Bundles)');
  const [scannedPoints, setScannedPoints] = useState<number>(750);
  const [scanStep, setScanStep] = useState<'scan' | 'success'>('scan');

  // Edit UPI state
  const [newUpi, setNewUpi] = useState<string>(profile.upiId);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* 1. Scan Bill / QR Modal */}
      {activeModal === 'scan_bill' && (
        <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl space-y-4 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#964407] dark:text-[#e07937]">
                qr_code_scanner
              </span>
              <h3 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                Scan Invoice or Barcode
              </h3>
            </div>
            <button
              onClick={closeModal}
              className="text-[#887368] hover:text-[#1b1b1c] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {scanStep === 'scan' ? (
            <div className="space-y-3">
              {/* Camera Simulator Box */}
              <div className="relative h-44 rounded-xl bg-neutral-900 overflow-hidden flex flex-col items-center justify-center text-center p-3 border-2 border-dashed border-[#b65c21]">
                <div className="absolute inset-4 border border-white/40 rounded-lg pointer-events-none flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ff0000] animate-pulse" />
                </div>
                <span className="material-symbols-outlined text-[36px] text-white/80 mb-1">
                  document_scanner
                </span>
                <span className="text-[12px] text-white font-semibold">
                  Point camera at Shiv Agency Counter Invoice
                </span>
                <span className="text-[10px] text-neutral-400 mt-1">
                  Automatic OCR barcode detection active
                </span>
              </div>

              {/* Sample Scan Presets for Plumbers */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#554339] dark:text-[#d5c4ba]">
                  Select Sample Counter Slip to Simulate:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScannedInvoice('SA-9241');
                      setScannedDesc('Astral CPVC Pipes 1" (8 Bundles)');
                      setScannedPoints(750);
                    }}
                    className={`p-2 rounded-lg text-left text-[11px] border cursor-pointer ${
                      scannedInvoice === 'SA-9241'
                        ? 'border-[#964407] bg-[#ffdbca]/30 text-[#964407] font-bold'
                        : 'border-neutral-200 dark:border-neutral-700 text-[#554339] dark:text-[#d5c4ba]'
                    }`}
                  >
                    SA-9241 (+750 Pts)
                    <span className="block text-[10px] text-[#887368]">Astral CPVC Pipes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScannedInvoice('SA-5510');
                      setScannedDesc('Zoloto Heavy Brass Valves 4pcs');
                      setScannedPoints(420);
                    }}
                    className={`p-2 rounded-lg text-left text-[11px] border cursor-pointer ${
                      scannedInvoice === 'SA-5510'
                        ? 'border-[#964407] bg-[#ffdbca]/30 text-[#964407] font-bold'
                        : 'border-neutral-200 dark:border-neutral-700 text-[#554339] dark:text-[#d5c4ba]'
                    }`}
                  >
                    SA-5510 (+420 Pts)
                    <span className="block text-[10px] text-[#887368]">Brass Valves</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  addPurchasePoints(scannedInvoice, scannedDesc, scannedPoints);
                  setScanStep('success');
                }}
                className="w-full h-11 bg-[#964407] hover:bg-[#b65c21] text-white font-bold text-[14px] rounded-xl shadow cursor-pointer transition-colors"
              >
                Capture &amp; Credit +{scannedPoints} Pts
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-3 py-2">
              <div className="w-14 h-14 rounded-full bg-[#bdeed0] text-[#002113] flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h4 className="text-[18px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                Points Added to Ledger!
              </h4>
              <p className="text-[12px] text-[#887368] dark:text-[#9e8a7f]">
                +{scannedPoints} Reward Points successfully credited for Invoice #{scannedInvoice}.
              </p>
              <div className="p-2.5 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] w-full text-[12px] font-semibold text-[#39654e] dark:text-[#5fa581]">
                Notification dispatched to WhatsApp (+91 98290 44219)
              </div>
              <button
                type="button"
                onClick={() => {
                  setScanStep('scan');
                  closeModal();
                }}
                className="w-full h-11 bg-[#964407] text-white font-bold text-[14px] rounded-xl shadow cursor-pointer"
              >
                Close &amp; View Balance
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Counter Slip Modal */}
      {activeModal === 'invoice_slip' && modalPayload && (
        <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl space-y-3.5 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between border-b pb-2.5 border-neutral-200 dark:border-neutral-800">
            <div>
              <span className="text-[11px] text-[#964407] font-bold uppercase tracking-wider">
                Official Receipt / पर्ची
              </span>
              <h3 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                Shiv Agency, Karauli
              </h3>
            </div>
            <button onClick={closeModal} className="text-[#887368] hover:text-[#1b1b1c] cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="bg-[#f6f3f2] dark:bg-[#24201d] p-3 rounded-xl space-y-2 text-[12px]">
            <div className="flex justify-between">
              <span className="text-[#887368]">Slip / Invoice:</span>
              <span className="font-mono font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {modalPayload.invoiceNo || modalPayload.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#887368]">Item Details:</span>
              <span className="font-bold text-[#1b1b1c] dark:text-[#f5eeea] text-right truncate max-w-[180px]">
                {modalPayload.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#887368]">Location:</span>
              <span className="text-[#554339] dark:text-[#d5c4ba]">Bhoodara Bazar, Karauli</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#887368]">Plumber Member:</span>
              <span className="font-bold text-[#964407]">{profile.memberCode}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-300 dark:border-neutral-700 pt-2 font-bold text-[14px]">
              <span>Points Accrued / Value:</span>
              <span className="text-[#39654e] dark:text-[#5fa581]">
                {modalPayload.points ? `+${modalPayload.points} Pts` : formatCurrency(modalPayload.cashAmount || 0)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.print?.();
              }}
              className="flex-1 h-10 rounded-xl bg-[#eae7e7] dark:bg-[#2d2825] font-bold text-[12px] text-[#1b1b1c] dark:text-[#f5eeea] flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Slip</span>
            </button>
            <a
              href={`https://wa.me/?text=Shiv%20Agency%20Karauli%20Invoice%20${modalPayload.invoiceNo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-10 rounded-xl bg-[#39654e] text-white font-bold text-[12px] flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* 3. Share Receipt Modal (IMPS Payout) */}
      {activeModal === 'share_receipt' && modalPayload && (
        <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl space-y-4 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              IMPS Payout Receipt
            </h3>
            <button onClick={closeModal} className="text-[#887368] cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="bg-[#1e1e1e] text-white p-4 rounded-xl text-center space-y-1">
            <span className="text-[11px] text-[#ffdea6] uppercase font-bold tracking-wider">
              Dispatched to Bank Account
            </span>
            <div className="text-[28px] font-extrabold text-[#f7bd48]">
              {formatCurrency(modalPayload.cashAmount || 2500)}
            </div>
            <span className="text-[11px] text-[#bdeed0] bg-[#39654e]/30 px-2.5 py-0.5 rounded-full inline-block">
              UTR: {modalPayload.utr || '329188401928'}
            </span>
          </div>

          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-[#887368]">Recipient VPA:</span>
              <span className="font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {modalPayload.recipient || profile.upiId}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-[#887368]">Date &amp; Time:</span>
              <span className="text-[#554339] dark:text-[#d5c4ba]">
                {modalPayload.date}, {modalPayload.time}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#887368]">Status:</span>
              <span className="text-[#39654e] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Completed via NPCI IMPS
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="w-full h-11 bg-[#964407] text-white font-bold text-[14px] rounded-xl shadow cursor-pointer"
          >
            Done
          </button>
        </div>
      )}

      {/* 4. PDF Statement Preview Modal */}
      {activeModal === 'pdf_statement' && modalPayload && (
        <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl space-y-3.5 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between border-b pb-2 border-neutral-200 dark:border-neutral-800">
            <div>
              <span className="text-[10px] text-[#964407] font-bold uppercase">
                Official Ledger Statement
              </span>
              <h3 className="text-[15px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {modalPayload.month} Statement
              </h3>
            </div>
            <button onClick={closeModal} className="text-[#887368] cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] space-y-1.5 text-[12px]">
            <div className="flex justify-between">
              <span className="text-[#887368]">Plumber:</span>
              <span className="font-bold">{profile.name} ({profile.memberCode})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#887368]">Agency:</span>
              <span>Shiv Agency Karauli</span>
            </div>
            <div className="flex justify-between font-bold text-[13px] pt-1 border-t border-neutral-200 dark:border-neutral-700">
              <span>Closing Balance:</span>
              <span className="text-[#964407]">{formatPoints(balance)} PTS (₹{formatPoints(balance)})</span>
            </div>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1.5 text-[11px] pr-1">
            {modalPayload.entries?.map((e: any) => (
              <div key={e.id} className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                <div className="truncate max-w-[170px]">
                  <span className="font-semibold block truncate">{e.title}</span>
                  <span className="text-[#887368]">{e.date}</span>
                </div>
                <span className={`font-bold ${e.type === 'debit' ? 'text-[#7b5800]' : 'text-[#39654e]'}`}>
                  {e.type === 'debit' ? `-₹${Math.abs(e.cashAmount)}` : `+${e.points} Pts`}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              alert('Statement PDF downloaded to device storage.');
              closeModal();
            }}
            className="w-full h-11 bg-[#964407] text-white font-bold text-[13px] rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Official PDF</span>
          </button>
        </div>
      )}

      {/* 5. Edit UPI Modal */}
      {activeModal === 'edit_upi' && (
        <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl space-y-4 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              Update UPI Payout ID
            </h3>
            <button onClick={closeModal} className="text-[#887368] cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-[#554339] dark:text-[#d5c4ba]">
              Enter Registered UPI VPA:
            </label>
            <input
              type="text"
              value={newUpi}
              onChange={(e) => setNewUpi(e.target.value)}
              placeholder="username@okhdfcbank"
              className="w-full h-11 px-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-[#964407]"
            />
            <span className="text-[10px] text-[#887368]">
              Must belong to {profile.name} as verified via Aadhaar KYC.
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (newUpi.trim()) {
                updateUpiId(newUpi.trim());
                closeModal();
              }
            }}
            className="w-full h-11 bg-[#964407] text-white font-bold text-[14px] rounded-xl shadow cursor-pointer"
          >
            Save UPI Handle
          </button>
        </div>
      )}

      {/* 6. Scheme Details Modal */}
      {activeModal === 'scheme_details' && modalPayload && (
        <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl space-y-3.5 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between border-b pb-2 border-neutral-200 dark:border-neutral-800">
            <span className="text-[11px] font-bold text-[#715000] bg-[#ffdea6] px-2 py-0.5 rounded-full">
              {modalPayload.badge}
            </span>
            <button onClick={closeModal} className="text-[#887368] cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <h3 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
            {modalPayload.title}
          </h3>
          <p className="text-[12px] text-[#554339] dark:text-[#d5c4ba] leading-relaxed">
            {modalPayload.description}
          </p>

          <div className="p-3 rounded-xl bg-[#f6f3f2] dark:bg-[#24201d] space-y-1.5 text-[11px]">
            <div className="flex justify-between font-bold">
              <span>Bonus Percentage:</span>
              <span className="text-[#964407]">+{modalPayload.bonusPercent}% Extra Points</span>
            </div>
            <div className="flex justify-between">
              <span>Valid Brands:</span>
              <span className="text-right">{modalPayload.brandFocus}</span>
            </div>
            <div className="flex justify-between">
              <span>Expiry Date:</span>
              <span className="font-semibold text-[#7b5800]">{modalPayload.validTill}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="w-full h-11 bg-[#964407] text-white font-bold text-[14px] rounded-xl shadow cursor-pointer"
          >
            Understood
          </button>
        </div>
      )}
    </div>
  );
};
