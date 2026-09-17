import React from 'react';
import { SaleItem, PurchaseItem, ExpenseItem } from '../types';
import { FileText, TrendingUp, DollarSign, Award, PieChart } from 'lucide-react';

interface ReportSheetProps {
  sales: SaleItem[];
  purchases: PurchaseItem[];
  expenses: ExpenseItem[];
  lang: 'sw' | 'en';
}

export const ReportSheet: React.FC<ReportSheetProps> = ({
  sales,
  purchases,
  expenses,
  lang,
}) => {
  const totalSales = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalPurchases = purchases.reduce((acc, p) => acc + p.totalCost, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.total, 0);
  const grossProfit = totalSales - totalPurchases;
  const netProfit = grossProfit - totalExpenses;
  const grossMargin = totalSales > 0 ? ((grossProfit / totalSales) * 100).toFixed(1) : '0';
  const netMargin = totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : '0';

  // Sales by Motorcycle Type
  const motoSales: Record<string, { count: number; rev: number }> = {};
  sales.forEach((s) => {
    if (!motoSales[s.typeOfMotorcycle]) {
      motoSales[s.typeOfMotorcycle] = { count: 0, rev: 0 };
    }
    motoSales[s.typeOfMotorcycle].count += 1;
    motoSales[s.typeOfMotorcycle].rev += s.totalAmount;
  });

  // Sales by Brand
  const brandSales: Record<string, { count: number; rev: number }> = {};
  sales.forEach((s) => {
    if (!brandSales[s.brand]) {
      brandSales[s.brand] = { count: 0, rev: 0 };
    }
    brandSales[s.brand].count += 1;
    brandSales[s.brand].rev += s.totalAmount;
  });

  return (
    <div className="p-6 bg-white min-h-[calc(100vh-180px)] select-none max-w-5xl">
      {/* Banner */}
      <div className="bg-[#1F4E79] text-white p-4 rounded mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide uppercase">
            {lang === 'sw' ? 'Ripoti Kamili ya Biashara & Fedha' : 'Business & Financial Report'}
          </h1>
          <p className="text-xs text-blue-200 mt-0.5">
            {lang === 'sw'
              ? 'Uchambuzi wa kina wa faida, mwenendo wa mauzo, na mgawanyo wa chapa'
              : 'Detailed analysis of profitability, sales trends, and brand distribution'}
          </p>
        </div>
        <div className="bg-white/10 px-3 py-1.5 rounded text-xs text-right">
          <div>Tarehe: {new Date().toLocaleDateString('sw-TZ')}</div>
          <div className="text-blue-200 font-mono">Sarafu: TZS</div>
        </div>
      </div>

      {/* Financial Summary Table */}
      <div className="mb-6 border border-neutral-300 rounded overflow-hidden shadow-xs">
        <div className="bg-[#D9E1F2] px-4 py-2 font-bold text-neutral-800 text-xs uppercase flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <DollarSign size={14} className="text-blue-700" />
            {lang === 'sw' ? 'Muhtasari wa Fedha na Faida' : 'Financial & Profitability Summary'}
          </span>
          <span className="text-[10px] text-neutral-500 font-normal">Kiwango cha Hesabu: Halisi (Actuals)</span>
        </div>

        <table className="w-full text-xs font-sans">
          <tbody className="divide-y divide-neutral-200">
            <tr className="hover:bg-neutral-50">
              <td className="py-2 px-4 font-semibold text-neutral-700 w-1/3">
                {lang === 'sw' ? 'Jumla ya Mapato ya Mauzo (Revenue)' : 'Total Sales Revenue'}
              </td>
              <td className="py-2 px-4 font-mono font-bold text-right text-emerald-800">
                {totalSales.toLocaleString()} TZS
              </td>
              <td className="py-2 px-4 text-neutral-500 italic text-[11px]">
                {lang === 'sw' ? 'Mapato kutoka maagizo 15 ya spea na huduma' : 'Revenue from 15 orders'}
              </td>
            </tr>
            <tr className="hover:bg-neutral-50">
              <td className="py-2 px-4 font-semibold text-neutral-700">
                {lang === 'sw' ? 'Gharama za Manunuzi (COGS)' : 'Cost of Goods Sold (COGS)'}
              </td>
              <td className="py-2 px-4 font-mono font-bold text-right text-neutral-800">
                {totalPurchases.toLocaleString()} TZS
              </td>
              <td className="py-2 px-4 text-neutral-500 italic text-[11px]">
                {lang === 'sw' ? 'Gharama za kununua mzigo kutoka kwa wauzaji' : 'Purchases from suppliers'}
              </td>
            </tr>
            <tr className="bg-amber-50/50 hover:bg-amber-50">
              <td className="py-2 px-4 font-bold text-amber-900">
                {lang === 'sw' ? 'Faida Ghafi (Gross Profit)' : 'Gross Profit'}
              </td>
              <td className="py-2 px-4 font-mono font-extrabold text-right text-amber-900 text-sm">
                {grossProfit.toLocaleString()} TZS
              </td>
              <td className="py-2 px-4 font-semibold text-amber-800 text-[11px]">
                Gross Margin: {grossMargin}%
              </td>
            </tr>
            <tr className="hover:bg-neutral-50">
              <td className="py-2 px-4 font-semibold text-neutral-700">
                {lang === 'sw' ? 'Gharama za Uendeshaji (Operational Expenses)' : 'Operational Expenses'}
              </td>
              <td className="py-2 px-4 font-mono font-bold text-right text-rose-700">
                {totalExpenses.toLocaleString()} TZS
              </td>
              <td className="py-2 px-4 text-neutral-500 italic text-[11px]">
                {lang === 'sw' ? 'Mafunzo (50k) na Taka (25k)' : 'Training and Waste collection'}
              </td>
            </tr>
            <tr className="bg-emerald-50 hover:bg-emerald-100/70 border-t-2 border-emerald-500">
              <td className="py-2.5 px-4 font-extrabold text-emerald-950 text-sm">
                {lang === 'sw' ? 'Faida Halisi ya Biashara (Net Profit)' : 'Net Profit'}
              </td>
              <td className="py-2.5 px-4 font-mono font-black text-right text-emerald-900 text-base">
                {netProfit.toLocaleString()} TZS
              </td>
              <td className="py-2.5 px-4 font-bold text-emerald-800 text-xs">
                Net Margin: {netMargin}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2 Sub-Reports: Sales by Motorcycle & Sales by Brand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Motorcycle distribution */}
        <div className="border border-neutral-300 rounded overflow-hidden shadow-xs">
          <div className="bg-[#70AD47] text-white px-3 py-1.5 font-bold text-xs uppercase flex justify-between">
            <span>{lang === 'sw' ? 'Mauzo kwa Aina ya Chombo' : 'Sales by Motorcycle Type'}</span>
            <span>Maagizo</span>
          </div>
          <table className="w-full text-xs font-sans">
            <tbody className="divide-y divide-neutral-200">
              {Object.entries(motoSales).map(([type, data]) => {
                const pct = totalSales > 0 ? ((data.rev / totalSales) * 100).toFixed(0) : '0';
                return (
                  <tr key={type} className="hover:bg-neutral-50">
                    <td className="py-2 px-3 font-semibold text-neutral-800">{type}</td>
                    <td className="py-2 px-2 text-center text-neutral-600">{data.count}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-800">
                      {data.rev.toLocaleString()} TZS
                    </td>
                    <td className="py-2 px-2 text-right text-neutral-500 text-[11px]">{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Brand distribution */}
        <div className="border border-neutral-300 rounded overflow-hidden shadow-xs">
          <div className="bg-[#ED7D31] text-white px-3 py-1.5 font-bold text-xs uppercase flex justify-between">
            <span>{lang === 'sw' ? 'Mauzo kwa Chapa ya Spea' : 'Sales by Brand'}</span>
            <span>Maagizo</span>
          </div>
          <table className="w-full text-xs font-sans">
            <tbody className="divide-y divide-neutral-200">
              {Object.entries(brandSales).map(([brand, data]) => {
                const pct = totalSales > 0 ? ((data.rev / totalSales) * 100).toFixed(0) : '0';
                return (
                  <tr key={brand} className="hover:bg-neutral-50">
                    <td className="py-2 px-3 font-semibold text-neutral-800">{brand}</td>
                    <td className="py-2 px-2 text-center text-neutral-600">{data.count}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-800">
                      {data.rev.toLocaleString()} TZS
                    </td>
                    <td className="py-2 px-2 text-right text-neutral-500 text-[11px]">{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
