import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency, formatPoints, calculateMonthlyTotals } from '../utils/rewards.ts';
import type { MonthlyPointsData } from '../utils/rewards.ts';

const SIX_MONTH_DATA: MonthlyPointsData[] = [
  { month: 'May', hindiMonth: 'मई', earned: 1800, redeemed: 500 },
  { month: 'Jun', hindiMonth: 'जून', earned: 2400, redeemed: 1000 },
  { month: 'Jul', hindiMonth: 'जुलाई', earned: 3100, redeemed: 1500 },
  { month: 'Aug', hindiMonth: 'अगस्त', earned: 2850, redeemed: 800 },
  { month: 'Sep', hindiMonth: 'सितंबर', earned: 3450, redeemed: 2000 },
  { month: 'Oct', hindiMonth: 'अक्टूबर', earned: 3200, redeemed: 2500 },
];

export const MonthlyPointsChart: React.FC = () => {
  const { language } = useApp();
  const [chartType, setChartType] = useState<'bar' | 'area'>('bar');

  const { totalEarned, totalRedeemed, netAccumulated } = calculateMonthlyTotals(SIX_MONTH_DATA);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentItem = SIX_MONTH_DATA.find(
        (d) => d.month === label || d.hindiMonth === label
      );
      const earnedVal = payload.find((p: any) => p.dataKey === 'earned')?.value || 0;
      const redeemedVal = payload.find((p: any) => p.dataKey === 'redeemed')?.value || 0;
      const netMonth = earnedVal - redeemedVal;

      return (
        <div className="bg-[#1e1e1e] text-white p-3 rounded-xl shadow-xl border border-neutral-700 text-[11px] space-y-1.5 min-w-[150px]">
          <div className="font-bold text-[12px] text-[#ffdea6] border-b border-neutral-700 pb-1">
            {language === 'hi' && currentItem ? currentItem.hindiMonth : label} 2023
          </div>
          <div className="flex items-center justify-between gap-3 text-[#bdeed0]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#39654e]" />
              {language === 'hi' ? 'अर्जित (Earned):' : 'Earned:'}
            </span>
            <span className="font-bold">+{formatPoints(earnedVal)} Pts</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[#ffdbca]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#b65c21]" />
              {language === 'hi' ? 'निकासी (Redeemed):' : 'Redeemed:'}
            </span>
            <span className="font-bold">-{formatPoints(redeemedVal)} Pts</span>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-neutral-700/80 font-bold text-neutral-300">
            <span>{language === 'hi' ? 'शुद्ध अंतर:' : 'Net Difference:'}</span>
            <span className={netMonth >= 0 ? 'text-[#bdeed0]' : 'text-red-400'}>
              {netMonth >= 0 ? `+${formatPoints(netMonth)}` : formatPoints(netMonth)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#1c1816] rounded-xl p-4 shadow-sm space-y-3.5 border border-[#eae7e7]/60 dark:border-[#2d2825]">
      {/* Title & View Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#bdeed0]/50 dark:bg-[#2e5a44]/50 text-[#39654e] dark:text-[#bdeed0] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">bar_chart</span>
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi' ? '६ माह पॉइंट्स तुलना' : 'Monthly Points Earned vs Redeemed'}
            </h3>
            <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
              Last 6 Months • May - Oct 2023
            </span>
          </div>
        </div>

        {/* Bar vs Area Toggle */}
        <div className="flex items-center gap-1 bg-[#f0eded] dark:bg-[#2d2825] p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-white dark:bg-[#1c1816] text-[#964407] dark:text-[#e07937] shadow-sm'
                : 'text-[#887368] hover:text-[#1b1b1c]'
            }`}
          >
            {language === 'hi' ? 'बार' : 'Bar'}
          </button>
          <button
            type="button"
            onClick={() => setChartType('area')}
            className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              chartType === 'area'
                ? 'bg-white dark:bg-[#1c1816] text-[#964407] dark:text-[#e07937] shadow-sm'
                : 'text-[#887368] hover:text-[#1b1b1c]'
            }`}
          >
            {language === 'hi' ? 'ट्रेंड' : 'Trend'}
          </button>
        </div>
      </div>

      {/* 6-Month Metric Summary Pills */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] border border-[#eae7e7]/50 dark:border-[#2d2825] text-left">
          <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f] block">
            {language === 'hi' ? 'कुल अर्जित (Earned)' : 'Total Earned'}
          </span>
          <span className="text-[14px] font-extrabold text-[#39654e] dark:text-[#5fa581] block mt-0.5">
            {formatPoints(totalEarned)}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] border border-[#eae7e7]/50 dark:border-[#2d2825] text-left">
          <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f] block">
            {language === 'hi' ? 'कुल निकासी (Redeemed)' : 'Total Redeemed'}
          </span>
          <span className="text-[14px] font-extrabold text-[#964407] dark:text-[#e07937] block mt-0.5">
            {formatPoints(totalRedeemed)}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#f6f3f2] dark:bg-[#24201d] border border-[#eae7e7]/50 dark:border-[#2d2825] text-left">
          <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f] block">
            {language === 'hi' ? 'शुद्ध संचय' : 'Net Accrual'}
          </span>
          <span className="text-[14px] font-extrabold text-[#7b5800] dark:text-[#f7bd48] block mt-0.5">
            +{formatPoints(netAccumulated)}
          </span>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={SIX_MONTH_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eae7e7" opacity={0.6} />
              <XAxis
                dataKey={language === 'hi' ? 'hindiMonth' : 'month'}
                tick={{ fontSize: 11, fill: '#887368' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#887368' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="earned"
                name="Points Earned"
                fill="#39654e"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
              <Bar
                dataKey="redeemed"
                name="Points Redeemed"
                fill="#b65c21"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={SIX_MONTH_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39654e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#39654e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorRedeemed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b65c21" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#b65c21" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eae7e7" opacity={0.6} />
              <XAxis
                dataKey={language === 'hi' ? 'hindiMonth' : 'month'}
                tick={{ fontSize: 11, fill: '#887368' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#887368' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="earned"
                stroke="#39654e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEarned)"
                name="Points Earned"
              />
              <Area
                type="monotone"
                dataKey="redeemed"
                stroke="#b65c21"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRedeemed)"
                name="Points Redeemed"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend & Counter Audit Note */}
      <div className="flex items-center justify-between pt-1 border-t border-[#eae7e7]/60 dark:border-[#2d2825] text-[11px] text-[#554339] dark:text-[#d5c4ba]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#39654e]" />
            <span className="font-semibold">
              {language === 'hi' ? 'अर्जित (Earned)' : 'Earned'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#b65c21]" />
            <span className="font-semibold">
              {language === 'hi' ? 'निकासी (Redeemed)' : 'Redeemed'}
            </span>
          </div>
        </div>

        <span className="text-[10px] text-[#887368] dark:text-[#9e8a7f] flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[13px] text-[#39654e]">verified</span>
          <span>Shiv Agency Verified Ledger</span>
        </span>
      </div>
    </div>
  );
};
