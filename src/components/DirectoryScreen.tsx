import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { CONTRACTOR_RATE_CARD, LOCAL_CONTRACTORS } from '../data/mockData.ts';
import { formatCurrency } from '../utils/rewards.ts';

export const DirectoryScreen: React.FC = () => {
  const { language } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPlumbers = LOCAL_CONTRACTORS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredRates =
    activeFilter === 'all'
      ? CONTRACTOR_RATE_CARD
      : CONTRACTOR_RATE_CARD.filter((r) => r.category === activeFilter);

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-lg mx-auto">
      {/* Hero Directory Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#1e1e1e] text-[#f3f0ef] p-4 shadow-xl border border-neutral-800">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#b65c21]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#bdeed0] text-[#002113] text-[10px] font-bold">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              Karauli Trade Network
            </span>
            <span className="text-[11px] text-[#ffdea6] font-semibold">
              Shiv Agency Counter
            </span>
          </div>

          <h2 className="text-[18px] font-bold text-white tracking-tight">
            {language === 'hi'
              ? 'अधिकृत प्लम्बर व कारीगर नेटवर्क'
              : 'Authorized Plumber & Contractor Network'}
          </h2>
          <p className="text-[12px] text-[#eae7e7] leading-relaxed">
            {language === 'hi'
              ? 'करौली जिले के सत्यापित प्लम्बर, स्पेशल होलसेल रेट कार्ड एवं तुरंत सामग्री सहायता।'
            : 'Verified tradespeople across Karauli district with wholesale member pricing and instant reward points.'}
          </p>
        </div>
      </div>

      {/* Plumbers & Contractors Directory Section */}
      <div className="bg-white dark:bg-[#1c1816] rounded-xl p-4 shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#964407] dark:text-[#e07937]">
              badge
            </span>
            <span className="text-[15px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi' ? 'सत्यापित कारीगर सूची' : 'Verified Trade Partners'}
            </span>
          </div>
          <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] font-semibold">
            {filteredPlumbers.length} Active
          </span>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-[18px] text-[#887368] absolute left-3 pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'नाम, कोड या क्षेत्र खोजें...'
                : 'Search plumber name, code, or area...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] text-[#1b1b1c] dark:text-[#f5eeea] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#964407]"
          />
        </div>

        {/* Plumber Cards */}
        <div className="space-y-2.5">
          {filteredPlumbers.map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-xl bg-[#f6f3f2] dark:bg-[#24201d] flex items-center justify-between gap-3 border border-[#eae7e7]/50 dark:border-[#2d2825]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  alt={p.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#964407]/20 flex-shrink-0"
                  src={p.avatarUrl}
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] truncate">
                      {p.name}
                    </span>
                    {p.verified && (
                      <span
                        className="material-symbols-outlined text-[14px] text-[#39654e] dark:text-[#5fa581]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#887368] dark:text-[#9e8a7f]">
                    <span className="font-mono font-bold text-[#964407] dark:text-[#e07937]">
                      {p.code}
                    </span>
                    <span>• {p.location}</span>
                  </div>
                  <span className="text-[10px] text-[#554339] dark:text-[#d5c4ba] truncate mt-0.5">
                    {language === 'hi' ? p.hindiSpecialty : p.specialty}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <a
                  href={`tel:${p.phone.replace(/[^0-9]/g, '')}`}
                  className="w-8 h-8 rounded-lg bg-[#964407] hover:bg-[#b65c21] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label={`Call ${p.name}`}
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                </a>
                <a
                  href={`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#39654e] hover:bg-[#2e5a44] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label={`WhatsApp ${p.name}`}
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contractor Wholesale Rate Card Section */}
      <div className="bg-white dark:bg-[#1c1816] rounded-xl p-4 shadow-sm space-y-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi'
                ? 'शिव एजेंसी कारीगर रेट कार्ड'
                : 'Shiv Agency Wholesale Rate Card'}
            </h3>
            <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
              Special Plumber Discounts &amp; Point Accrual
            </span>
          </div>
          <span className="text-[10px] bg-[#ffdea6] text-[#271900] px-2 py-0.5 rounded font-bold">
            Bhoodara Bazar
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['all', 'CPVC', 'Sanitary', 'Brass', 'Fittings'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#964407] text-white'
                  : 'bg-[#f0eded] dark:bg-[#2d2825] text-[#554339] dark:text-[#d5c4ba]'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>

        {/* Rate Items Table / List */}
        <div className="space-y-2">
          {filteredRates.map((rate) => (
            <div
              key={rate.id}
              className="p-3 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] flex items-center justify-between gap-2 border border-[#eae7e7]/40 dark:border-[#2d2825]"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] truncate">
                  {language === 'hi' ? rate.hindiName : rate.name}
                </span>
                <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f]">
                  {rate.size} • MRP: <del>{formatCurrency(rate.mrp)}</del>
                </span>
              </div>

              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[13px] font-extrabold text-[#964407] dark:text-[#e07937]">
                  {formatCurrency(rate.contractorPrice)}
                </span>
                <span className="text-[10px] font-bold text-[#39654e] dark:text-[#5fa581] bg-[#bdeed0]/50 dark:bg-[#2e5a44]/50 px-1.5 rounded">
                  +{rate.pointsEarned} Pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
