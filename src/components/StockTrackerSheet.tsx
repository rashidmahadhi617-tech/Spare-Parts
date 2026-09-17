import React, { useState, useMemo } from 'react';
import { SaleItem, PurchaseItem } from '../types';
import { Search, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface StockTrackerSheetProps {
  products: string[];
  sales: SaleItem[];
  purchases: PurchaseItem[];
  onSelectCell?: (cell: string, value: string) => void;
  lang: 'sw' | 'en';
}

export const StockTrackerSheet: React.FC<StockTrackerSheetProps> = ({
  products,
  sales,
  purchases,
  onSelectCell,
  lang,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStockStatus, setFilterStockStatus] = useState<'All' | 'Low' | 'Out' | 'Available'>('All');

  const stockData = useMemo(() => {
    return products.map((prod) => {
      const purchased = purchases
        .filter((p) => p.productName.trim().toUpperCase() === prod.trim().toUpperCase())
        .reduce((sum, p) => sum + p.quantity, 0);

      const sold = sales
        .filter((s) => s.productName.trim().toUpperCase() === prod.trim().toUpperCase())
        .reduce((sum, s) => sum + s.quantity, 0);

      const remaining = purchased - sold;

      return {
        productName: prod,
        purchased,
        sold,
        remaining,
      };
    });
  }, [products, sales, purchases]);

  const filteredStock = useMemo(() => {
    return stockData.filter((item) => {
      const matchSearch = item.productName.toLowerCase().includes(filterQuery.toLowerCase());
      let matchStatus = true;
      if (filterStockStatus === 'Out') matchStatus = item.remaining <= 0 && item.purchased > 0;
      else if (filterStockStatus === 'Low') matchStatus = item.remaining > 0 && item.remaining <= 2;
      else if (filterStockStatus === 'Available') matchStatus = item.remaining > 2;

      return matchSearch && matchStatus;
    });
  }, [stockData, filterQuery, filterStockStatus]);

  const totalPurchased = stockData.reduce((acc, s) => acc + s.purchased, 0);
  const totalSold = stockData.reduce((acc, s) => acc + s.sold, 0);
  const totalRemaining = stockData.reduce((acc, s) => acc + s.remaining, 0);

  return (
    <div className="p-4 bg-white min-h-[calc(100vh-180px)] select-none overflow-x-auto">
      {/* Title Banner - Exact Pale Mint Green Header */}
      <div className="bg-[#E2EFDA] border border-[#C5E0B4] text-center py-2 px-4 rounded-t mb-2">
        <h1 className="text-xl font-bold tracking-wider text-neutral-800 uppercase">
          STOCK TRACKER
        </h1>
      </div>

      {/* Info & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-neutral-50 p-2 rounded border border-neutral-200 text-xs">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Tafuta spea stoo...' : 'Search stock item...'}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-7 pr-3 py-1 border border-neutral-300 rounded text-xs focus:outline-none focus:border-emerald-500 w-56"
            />
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setFilterStockStatus('All')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                filterStockStatus === 'All'
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              {lang === 'sw' ? 'Zote' : 'All'}
            </button>
            <button
              onClick={() => setFilterStockStatus('Available')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                filterStockStatus === 'Available'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {lang === 'sw' ? 'Ipo Stoo (>2)' : 'In Stock'}
            </button>
            <button
              onClick={() => setFilterStockStatus('Low')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                filterStockStatus === 'Low'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {lang === 'sw' ? 'Inakaribia Kuisha (1-2)' : 'Low Stock'}
            </button>
          </div>
        </div>

        <div className="text-[11px] text-neutral-500 flex items-center space-x-3">
          <span>
            {lang === 'sw' ? 'Fomula:' : 'Formula:'}{' '}
            <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono text-[10px]">
              REMAINING = PURCHASED - SOLD
            </code>
          </span>
        </div>
      </div>

      {/* Stock Tracker Table matching Screenshot exact colors */}
      <div className="overflow-x-auto border border-neutral-300 rounded shadow-xs max-w-4xl">
        <table className="w-full border-collapse text-xs font-sans">
          <thead>
            <tr className="font-bold border-b border-neutral-300 text-center uppercase tracking-tight">
              <th className="py-2.5 px-3 border-r border-neutral-300 w-10 text-neutral-500 bg-neutral-100 font-mono">
                #
              </th>
              {/* Yellow header for PRODUCT NAME */}
              <th className="py-2.5 px-4 border-r border-neutral-300 text-left bg-[#FFD966] text-neutral-900 w-72">
                PRODUCT NAME
              </th>
              {/* Blue header for PURCHASED */}
              <th className="py-2.5 px-4 border-r border-neutral-300 bg-[#8EA9DB] text-neutral-900 w-32">
                PURCHASED
              </th>
              {/* Green header for SOLD */}
              <th className="py-2.5 px-4 border-r border-neutral-300 bg-[#A9D18E] text-neutral-900 w-32">
                SOLD
              </th>
              {/* Red header for REMAINING */}
              <th className="py-2.5 px-4 bg-[#FF0000] text-white w-36">
                REMAINING
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item, index) => {
              const isLowStock = item.remaining > 0 && item.remaining <= 2;
              const isOutOfStock = item.remaining <= 0 && item.purchased > 0;
              const isUnpurchased = item.purchased === 0;

              return (
                <tr
                  key={item.productName}
                  className={`border-b border-neutral-200 hover:bg-blue-50/50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                  }`}
                  onClick={() => onSelectCell && onSelectCell(`D${index + 4}`, String(item.remaining))}
                >
                  <td className="py-2 px-3 border-r border-neutral-200 text-center text-neutral-400 font-mono text-[11px]">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-r border-neutral-200 font-bold text-neutral-900">
                    <div className="flex items-center justify-between">
                      <span>{item.productName}</span>
                      {isLowStock && (
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-normal flex items-center gap-0.5">
                          <AlertTriangle size={10} />
                          {lang === 'sw' ? 'Habari: Chache' : 'Low'}
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-normal flex items-center gap-0.5">
                          <ShieldAlert size={10} />
                          {lang === 'sw' ? 'Imeisha' : 'Out'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-r border-neutral-200 text-center font-mono font-semibold text-blue-800">
                    {item.purchased}
                  </td>
                  <td className="py-2 px-4 border-r border-neutral-200 text-center font-mono font-semibold text-emerald-800">
                    {item.sold}
                  </td>
                  <td className="py-2 px-4 text-center font-mono font-extrabold text-sm">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded ${
                        item.remaining > 2
                          ? 'text-emerald-700 bg-emerald-50'
                          : isLowStock
                          ? 'text-amber-700 bg-amber-100'
                          : isOutOfStock
                          ? 'text-rose-700 bg-rose-100'
                          : 'text-neutral-400'
                      }`}
                    >
                      {item.remaining}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-neutral-200 text-neutral-900 font-bold border-t-2 border-neutral-400">
              <td colSpan={2} className="py-2.5 px-4 text-right uppercase tracking-wider">
                JUMLA KUU (TOTALS):
              </td>
              <td className="py-2.5 px-4 text-center font-mono text-sm text-blue-900 font-extrabold bg-[#D9E1F2]">
                {totalPurchased}
              </td>
              <td className="py-2.5 px-4 text-center font-mono text-sm text-emerald-900 font-extrabold bg-[#E2EFDA]">
                {totalSold}
              </td>
              <td className="py-2.5 px-4 text-center font-mono text-sm text-rose-900 font-extrabold bg-[#FCE4D6]">
                {totalRemaining}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
