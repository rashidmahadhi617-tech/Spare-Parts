import React, { useMemo } from 'react';
import { SaleItem, PurchaseItem, ExpenseItem } from '../types';

interface DashboardViewProps {
  sales: SaleItem[];
  purchases: PurchaseItem[];
  expenses: ExpenseItem[];
  onSelectCell?: (cell: string, value: string) => void;
  lang: 'sw' | 'en';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  sales,
  purchases,
  expenses,
  onSelectCell,
  lang,
}) => {
  // Calculations
  const metrics = useMemo(() => {
    const totalOrders = sales.length;
    const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalPurchase = purchases.reduce((sum, p) => sum + p.totalCost, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.total, 0);
    const grossProfit = totalSales - totalPurchase;
    const netProfit = grossProfit - totalExpenses;

    return {
      totalOrders,
      totalSales,
      totalPurchase,
      totalExpenses,
      grossProfit,
      netProfit,
    };
  }, [sales, purchases, expenses]);

  // Overall Top Sold Products
  const topProductsOverall = useMemo(() => {
    const map: Record<string, number> = {};
    sales.forEach((s) => {
      map[s.productName] = (map[s.productName] || 0) + s.quantity;
    });
    return Object.entries(map)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);
  }, [sales]);

  // Top Sold Products (Within Region)
  const topProductsWithin = useMemo(() => {
    const map: Record<string, number> = {};
    sales
      .filter((s) => s.location === 'Within Region')
      .forEach((s) => {
        map[s.productName] = (map[s.productName] || 0) + s.quantity;
      });
    return Object.entries(map)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);
  }, [sales]);

  // Top Sold Products (Outside Region)
  const topProductsOutside = useMemo(() => {
    const map: Record<string, number> = {};
    sales
      .filter((s) => s.location === 'Outside Region')
      .forEach((s) => {
        map[s.productName] = (map[s.productName] || 0) + s.quantity;
      });
    return Object.entries(map)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);
  }, [sales]);

  // Region Orders count
  const regionBreakdown = useMemo(() => {
    const within = sales.filter((s) => s.location === 'Within Region').length;
    const outside = sales.filter((s) => s.location === 'Outside Region').length;
    const total = sales.length || 1;
    return {
      within,
      outside,
      withinPct: Math.round((within / total) * 100),
      outsidePct: Math.round((outside / total) * 100),
    };
  }, [sales]);

  // Expenses by Type
  const expensesByType = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.expenseType] = (map[e.expenseType] || 0) + e.total;
    });
    return Object.entries(map).map(([type, amount]) => ({ type, amount }));
  }, [expenses]);

  // Expenses recurring vs non-recurring
  const expensesRecurring = useMemo(() => {
    let recurring = 0;
    let nonRecurring = 0;
    expenses.forEach((e) => {
      if (e.recurring === 'Yes') recurring += e.total;
      else nonRecurring += e.total;
    });
    const total = recurring + nonRecurring || 1;
    return {
      recurring,
      nonRecurring,
      recPct: Math.round((recurring / total) * 100),
      nonRecPct: Math.round((nonRecurring / total) * 100),
    };
  }, [expenses]);

  // Max value for bar scaling
  const maxOverall = Math.max(...topProductsOverall.map((p) => p.qty), 16);
  const maxWithin = Math.max(...topProductsWithin.map((p) => p.qty), 16);
  const maxOutside = Math.max(...topProductsOutside.map((p) => p.qty), 12);

  return (
    <div className="p-4 bg-white min-h-[calc(100vh-180px)] overflow-x-auto select-none">
      {/* Excel Sheet Title Banner */}
      <div className="flex justify-center mb-4">
        <div
          onClick={() => onSelectCell && onSelectCell('C1', 'BUSINESS DASHBOARD')}
          className="bg-[#245B9E] text-white px-12 py-2 rounded-md shadow font-bold italic tracking-wider text-xl uppercase cursor-pointer hover:opacity-95"
        >
          BUSINESS DASHBOARD
        </div>
      </div>

      {/* 6 KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
        {/* Card 1: No. of Sales */}
        <div
          onClick={() => onSelectCell && onSelectCell('A3', String(metrics.totalOrders))}
          className="bg-[#274E13] rounded p-2.5 text-center text-white cursor-pointer shadow-sm hover:brightness-110 transition-all border border-[#1f3e0f]"
        >
          <div className="text-xs font-semibold text-neutral-100">
            {lang === 'sw' ? 'Idadi ya Mauzo' : 'No. of Sales'}
          </div>
          <div className="text-[11px] italic text-[#f8db6d] mb-1 font-medium">order</div>
          <div className="text-2xl font-bold tracking-tight">{metrics.totalOrders}</div>
        </div>

        {/* Card 2: Total Sales */}
        <div
          onClick={() => onSelectCell && onSelectCell('B3', metrics.totalSales.toLocaleString())}
          className="bg-[#274E13] rounded p-2.5 text-center text-white cursor-pointer shadow-sm hover:brightness-110 transition-all border border-[#1f3e0f]"
        >
          <div className="text-xs font-semibold text-neutral-100">
            {lang === 'sw' ? 'Jumla ya Mauzo' : 'Total Sales'}
          </div>
          <div className="text-[11px] italic text-[#f8db6d] mb-1 font-medium">Revenue</div>
          <div className="text-xl font-bold tracking-tight">
            {metrics.totalSales.toLocaleString()}
          </div>
        </div>

        {/* Card 3: Total Purchase */}
        <div
          onClick={() => onSelectCell && onSelectCell('C3', metrics.totalPurchase.toLocaleString())}
          className="bg-[#274E13] rounded p-2.5 text-center text-white cursor-pointer shadow-sm hover:brightness-110 transition-all border border-[#1f3e0f]"
        >
          <div className="text-xs font-semibold text-neutral-100">
            {lang === 'sw' ? 'Jumla ya Manunuzi' : 'Total Purchase'}
          </div>
          <div className="text-[10px] italic text-[#f8db6d] mb-1 font-medium truncate" title="Cost of goods sold (COGS)">
            Cost of goods sold (COGS)
          </div>
          <div className="text-xl font-bold tracking-tight">
            {metrics.totalPurchase.toLocaleString()}
          </div>
        </div>

        {/* Card 4: Total Expenses */}
        <div
          onClick={() => onSelectCell && onSelectCell('D3', metrics.totalExpenses.toLocaleString())}
          className="bg-[#274E13] rounded p-2.5 text-center text-white cursor-pointer shadow-sm hover:brightness-110 transition-all border border-[#1f3e0f]"
        >
          <div className="text-xs font-semibold text-neutral-100">
            {lang === 'sw' ? 'Jumla ya Matumizi' : 'Total Expenses'}
          </div>
          <div className="text-[11px] italic text-[#f8db6d] mb-1 font-medium">Expenses</div>
          <div className="text-xl font-bold tracking-tight">
            {metrics.totalExpenses.toLocaleString()}
          </div>
        </div>

        {/* Card 5: Gross Profit/Loss */}
        <div
          onClick={() => onSelectCell && onSelectCell('E3', metrics.grossProfit.toLocaleString())}
          className="bg-[#806000] rounded p-2.5 text-center text-white cursor-pointer shadow-sm hover:brightness-110 transition-all border border-[#6b5000]"
        >
          <div className="text-xs font-semibold text-neutral-100">
            {lang === 'sw' ? 'Faida Ghafi' : 'Gross Profit/Loss'}
          </div>
          <div className="text-[11px] italic text-amber-200 mb-1 font-medium">Sales - Purchases</div>
          <div className="text-xl font-bold tracking-tight">
            {metrics.grossProfit.toLocaleString()}
          </div>
        </div>

        {/* Card 6: Net Profit/Loss */}
        <div
          onClick={() => onSelectCell && onSelectCell('F3', metrics.netProfit.toLocaleString())}
          className="bg-[#806000] rounded p-2.5 text-center text-white cursor-pointer shadow-sm hover:brightness-110 transition-all border border-[#6b5000]"
        >
          <div className="text-xs font-semibold text-neutral-100">
            {lang === 'sw' ? 'Faida Halisi' : 'Net Profit/Loss'}
          </div>
          <div className="text-[11px] italic text-amber-200 mb-1 font-medium">Gross - Expenses</div>
          <div className="text-xl font-bold tracking-tight">
            {metrics.netProfit.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Grid of 8 Excel Chart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Chart 1: TOP 10 SOLD PRODUCTS (OVERALL) */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight">
              (2.) TOP 10 SOLD PRODUCTS (OVERALL)
            </span>
            <span className="text-[9px] bg-neutral-100 px-1 py-0.5 rounded text-neutral-500">
              Total
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-1 pt-4 pb-6 px-1 border-b border-neutral-200">
            {topProductsOverall.map((item, idx) => {
              const heightPercent = Math.max(8, (item.qty / maxOverall) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                    {item.name}: {item.qty} pcs
                  </div>
                  <span className="text-[9px] text-neutral-500 font-medium mb-0.5">{item.qty}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#4472C4] hover:bg-[#345999] rounded-t-sm transition-all"
                  />
                  <span className="text-[8px] text-neutral-600 truncate w-full text-center mt-1 rotate-45 origin-left">
                    {item.name.substring(0, 8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: TOP 10 SOLD PRODUCTS (WITHIN REGION) */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight">
              (3.) TOP 10 SOLD (WITHIN REGION)
            </span>
            <span className="text-[9px] bg-neutral-100 px-1 py-0.5 rounded text-neutral-500">
              Total
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-1 pt-4 pb-6 px-1 border-b border-neutral-200">
            {topProductsWithin.map((item, idx) => {
              const heightPercent = Math.max(8, (item.qty / maxWithin) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                    {item.name}: {item.qty} pcs
                  </div>
                  <span className="text-[9px] text-neutral-500 font-medium mb-0.5">{item.qty}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#4472C4] hover:bg-[#345999] rounded-t-sm transition-all"
                  />
                  <span className="text-[8px] text-neutral-600 truncate w-full text-center mt-1 rotate-45 origin-left">
                    {item.name.substring(0, 8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: TOP 10 SOLD PRODUCTS (OUTSIDE REGION) */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight">
              (4.) TOP 10 SOLD (OUTSIDE REGION)
            </span>
            <span className="text-[9px] bg-neutral-100 px-1 py-0.5 rounded text-neutral-500">
              Total
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-1 pt-4 pb-6 px-1 border-b border-neutral-200">
            {topProductsOutside.map((item, idx) => {
              const heightPercent = Math.max(8, (item.qty / maxOutside) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                    {item.name}: {item.qty} pcs
                  </div>
                  <span className="text-[9px] text-neutral-500 font-medium mb-0.5">{item.qty}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#4472C4] hover:bg-[#345999] rounded-t-sm transition-all"
                  />
                  <span className="text-[8px] text-neutral-600 truncate w-full text-center mt-1 rotate-45 origin-left">
                    {item.name.substring(0, 8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 4: WITHIN vs OUTSIDE REGION (ORDERS) - Pie / Donut */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight">
              (5.) WITHIN vs OUTSIDE REGION
            </span>
            <span className="text-[9px] bg-neutral-100 px-1 py-0.5 rounded text-neutral-500">
              Orders
            </span>
          </div>

          <div className="h-44 flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
              {/* Slice 1: Within Region (Blue, ~73.3%) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#4472C4"
                strokeWidth="24"
                strokeDasharray={`${(regionBreakdown.withinPct / 100) * 238.76} 238.76`}
                strokeDashoffset="0"
              />
              {/* Slice 2: Outside Region (Orange, ~26.7%) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#ED7D31"
                strokeWidth="24"
                strokeDasharray={`${(regionBreakdown.outsidePct / 100) * 238.76} 238.76`}
                strokeDashoffset={`-${(regionBreakdown.withinPct / 100) * 238.76}`}
              />
            </svg>

            {/* Legend */}
            <div className="flex items-center space-x-3 text-[10px] mt-2">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-[#4472C4] inline-block rounded-xs" />
                <span className="text-neutral-700">Within ({regionBreakdown.withinPct}%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-[#ED7D31] inline-block rounded-xs" />
                <span className="text-neutral-700">Outside ({regionBreakdown.outsidePct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 5: EXPENSES (TYPE) */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight">
              (6.) EXPENSES (TYPE)
            </span>
          </div>

          <div className="h-44 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#4472C4"
                strokeWidth="24"
                strokeDasharray="159.17 238.76"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#ED7D31"
                strokeWidth="24"
                strokeDasharray="79.58 238.76"
                strokeDashoffset="-159.17"
              />
            </svg>

            <div className="flex flex-col space-y-1 text-[9px] mt-1">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#4472C4] inline-block rounded-xs" />
                <span className="text-neutral-700">Training: 50,000 (67%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#ED7D31] inline-block rounded-xs" />
                <span className="text-neutral-700">Waste collection: 25,000 (33%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 6: RECURRING EXPENSES (NO/YES) */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight">
              (7.) RECURRING EXPENSES (NO/YES)
            </span>
          </div>

          <div className="h-44 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
              {/* Donut with inner hole */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#4472C4"
                strokeWidth="16"
                strokeDasharray={`${(expensesRecurring.nonRecPct / 100) * 238.76} 238.76`}
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#ED7D31"
                strokeWidth="16"
                strokeDasharray={`${(expensesRecurring.recPct / 100) * 238.76} 238.76`}
                strokeDashoffset={`-${(expensesRecurring.nonRecPct / 100) * 238.76}`}
              />
            </svg>

            <div className="flex items-center space-x-3 text-[9px] mt-2">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#4472C4] inline-block rounded-xs" />
                <span>No ({expensesRecurring.nonRecPct}%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#ED7D31] inline-block rounded-xs" />
                <span>Yes ({expensesRecurring.recPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 7: TOP RECURRING EXPENSES */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight truncate">
              (8.) TOP RECURRING EXPENSES
            </span>
          </div>

          <div className="h-44 flex flex-col justify-end pb-3 px-3">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] text-neutral-600 mb-1">
                  <span>Waste collection</span>
                  <span className="font-semibold text-blue-700">25,000 TZS</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-xs h-6 overflow-hidden">
                  <div className="bg-[#4472C4] h-full w-[50%] rounded-xs flex items-center justify-end pr-1 text-white text-[9px] font-semibold">
                    25k
                  </div>
                </div>
              </div>
              <div className="text-[9px] text-neutral-400 italic">
                {lang === 'sw' ? 'Gharama inayojirudia kila wiki' : 'Weekly recurring sanitation fee'}
              </div>
            </div>
          </div>
        </div>

        {/* Chart 8: TOP NON-RECURRING EXPENSES */}
        <div className="border border-neutral-300 rounded bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-2">
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-tight truncate">
              (9.) TOP NON-RECURRING EXPENSES
            </span>
          </div>

          <div className="h-44 flex flex-col justify-end pb-3 px-3">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] text-neutral-600 mb-1">
                  <span>Training</span>
                  <span className="font-semibold text-blue-700">50,000 TZS</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-xs h-6 overflow-hidden">
                  <div className="bg-[#4472C4] h-full w-[100%] rounded-xs flex items-center justify-end pr-1 text-white text-[9px] font-semibold">
                    50k
                  </div>
                </div>
              </div>
              <div className="text-[9px] text-neutral-400 italic">
                {lang === 'sw' ? 'Gharama ya mafunzo ya wafanyakazi' : 'Staff training workshop'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
