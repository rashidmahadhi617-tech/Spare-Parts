import React, { useState, useMemo } from 'react';
import { PurchaseItem } from '../types';
import { Plus, Trash2, Search, Filter } from 'lucide-react';

interface PurchaseTableSheetProps {
  purchases: PurchaseItem[];
  onAddPurchaseClick: () => void;
  onDeletePurchase: (id: string) => void;
  onSelectCell?: (cell: string, value: string) => void;
  lang: 'sw' | 'en';
}

export const PurchaseTableSheet: React.FC<PurchaseTableSheetProps> = ({
  purchases,
  onAddPurchaseClick,
  onDeletePurchase,
  onSelectCell,
  lang,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('All');

  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.date.includes(filterQuery);

      const matchesAccount =
        selectedAccount === 'All' || item.account === selectedAccount;

      return matchesSearch && matchesAccount;
    });
  }, [purchases, filterQuery, selectedAccount]);

  const totalQty = filteredPurchases.reduce((acc, p) => acc + p.quantity, 0);
  const totalCost = filteredPurchases.reduce((acc, p) => acc + p.totalCost, 0);

  return (
    <div className="p-4 bg-white min-h-[calc(100vh-180px)] select-none overflow-x-auto">
      {/* Title Banner */}
      <div className="bg-[#FCE4D6] border border-[#F8CBAD] text-center py-2 px-4 rounded-t mb-2">
        <h1 className="text-xl font-bold tracking-wide text-[#C00000] uppercase">
          PURCHASE TABLE
        </h1>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-neutral-50 p-2 rounded border border-neutral-200 text-xs">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Tafuta manunuzi, msambazaji...' : 'Search purchases, supplier...'}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-7 pr-3 py-1 border border-neutral-300 rounded text-xs focus:outline-none focus:border-emerald-500 w-60"
            />
          </div>

          <div className="flex items-center space-x-1">
            <Filter size={13} className="text-neutral-500" />
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="border border-neutral-300 rounded px-2 py-1 text-xs bg-white text-neutral-700"
            >
              <option value="All">{lang === 'sw' ? 'Akaunti Zote (All Accounts)' : 'All Accounts'}</option>
              <option value="CASH">CASH</option>
              <option value="CRDB">CRDB</option>
              <option value="VODA CARD">VODA CARD</option>
            </select>
          </div>
        </div>

        <div>
          <button
            onClick={onAddPurchaseClick}
            className="flex items-center space-x-1 px-3 py-1 bg-[#107C41] hover:bg-[#0c5e31] text-white rounded font-medium text-xs shadow-xs"
          >
            <Plus size={13} />
            <span>{lang === 'sw' ? 'Ongeza Manunuzi (Add Purchase)' : 'Add Purchase Record'}</span>
          </button>
        </div>
      </div>

      {/* Purchase Table */}
      <div className="overflow-x-auto border border-neutral-300 rounded shadow-xs">
        <table className="w-full border-collapse text-xs font-sans">
          <thead>
            <tr className="bg-[#D9E1F2] text-neutral-800 font-semibold border-b border-neutral-300 text-left">
              <th className="py-2 px-2 border-r border-neutral-300 text-center w-8 text-neutral-500 font-mono">#</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Date ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Product Name ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Type of Motorcycle ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Brand ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-center whitespace-nowrap">Quantity ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Source ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Supplier Name ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Spare part Company ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right whitespace-nowrap">Cost per Unit ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Payment Mode ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Account ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Description ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right font-bold whitespace-nowrap bg-[#B4C6E7]">Total Cost</th>
              <th className="py-2 px-2 text-center w-8 text-neutral-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((purchase, index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={purchase.id}
                  className={`border-b border-neutral-200 hover:bg-amber-50/70 transition-colors ${
                    isEven ? 'bg-white' : 'bg-[#F2F2F2]'
                  }`}
                  onClick={() => onSelectCell && onSelectCell(`B${index + 4}`, purchase.productName)}
                >
                  <td className="py-1.5 px-2 border-r border-neutral-200 text-center text-neutral-400 font-mono text-[11px]">
                    {index + 1}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-mono whitespace-nowrap">
                    {purchase.date}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-bold text-neutral-900 whitespace-nowrap">
                    {purchase.productName}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-medium whitespace-nowrap">
                    {purchase.typeOfMotorcycle}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-semibold text-neutral-700 whitespace-nowrap">
                    {purchase.brand}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-center font-bold text-blue-700 font-mono">
                    {purchase.quantity}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 whitespace-nowrap text-neutral-600">
                    {purchase.source}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-medium whitespace-nowrap text-neutral-800">
                    {purchase.supplierName}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-400">
                    {purchase.sparePartCompany || '—'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono whitespace-nowrap">
                    {purchase.costPerUnit.toLocaleString()}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-600 whitespace-nowrap">
                    {purchase.paymentMode}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        purchase.account === 'CRDB'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : purchase.account === 'VODA CARD'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {purchase.account}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-500 italic max-w-xs truncate">
                    {purchase.description || '—'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono font-bold text-blue-900 bg-[#E9EEF4] whitespace-nowrap">
                    {purchase.totalCost.toLocaleString()}
                  </td>
                  <td className="py-1 px-1 text-center">
                    <button
                      onClick={() => onDeletePurchase(purchase.id)}
                      className="text-neutral-400 hover:text-rose-600 p-0.5 rounded"
                      title="Futa mstari huu"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#B4C6E7] text-neutral-900 font-bold border-t-2 border-neutral-400">
              <td colSpan={5} className="py-2 px-3 text-right uppercase tracking-wider">
                TOTAL (JUMLA YA VIPANDE):
              </td>
              <td className="py-2 px-2.5 text-center font-mono text-sm text-blue-900">
                {totalQty}
              </td>
              <td colSpan={7} className="py-2 px-3 text-right">
                JUMLA YA GHARAMA ZA MANUNUZI (COGS):
              </td>
              <td className="py-2 px-2.5 text-right font-mono text-sm text-blue-900 font-extrabold bg-[#8EA9DB]">
                {totalCost.toLocaleString()} TZS
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
