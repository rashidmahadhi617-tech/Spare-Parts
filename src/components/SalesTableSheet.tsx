import React, { useState, useMemo } from 'react';
import { SaleItem } from '../types';
import { Plus, Trash2, Filter, Search } from 'lucide-react';

interface SalesTableSheetProps {
  sales: SaleItem[];
  onAddSaleClick: () => void;
  onDeleteSale: (id: string) => void;
  onSelectCell?: (cell: string, value: string) => void;
  lang: 'sw' | 'en';
}

export const SalesTableSheet: React.FC<SalesTableSheetProps> = ({
  sales,
  onAddSaleClick,
  onDeleteSale,
  onSelectCell,
  lang,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const filteredSales = useMemo(() => {
    return sales.filter((item) => {
      const matchText =
        item.productName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.typeOfMotorcycle.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.date.includes(filterQuery);

      const matchLoc =
        selectedLocation === 'All' || item.location === selectedLocation;

      return matchText && matchLoc;
    });
  }, [sales, filterQuery, selectedLocation]);

  const totalQty = filteredSales.reduce((acc, s) => acc + s.quantity, 0);
  const totalRevenue = filteredSales.reduce((acc, s) => acc + s.totalAmount, 0);

  return (
    <div className="p-4 bg-white min-h-[calc(100vh-180px)] select-none overflow-x-auto">
      {/* Excel Title Banner (Peach background with red text) */}
      <div className="bg-[#FCE4D6] border border-[#F8CBAD] text-center py-2 px-4 rounded-t mb-2">
        <h1 className="text-xl font-bold tracking-wide text-[#C00000] uppercase">
          SALES TABLE
        </h1>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-neutral-50 p-2 rounded border border-neutral-200 text-xs">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Chuja kwa jina, chapa...' : 'Search sales...'}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-7 pr-3 py-1 border border-neutral-300 rounded text-xs focus:outline-none focus:border-emerald-500 w-56"
            />
          </div>

          <div className="flex items-center space-x-1">
            <Filter size={13} className="text-neutral-500" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-neutral-300 rounded px-2 py-1 text-xs bg-white text-neutral-700"
            >
              <option value="All">{lang === 'sw' ? 'Eneo Zote (All Locations)' : 'All Locations'}</option>
              <option value="Within Region">Within Region</option>
              <option value="Outside Region">Outside Region</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onAddSaleClick}
            className="flex items-center space-x-1 px-3 py-1 bg-[#107C41] hover:bg-[#0c5e31] text-white rounded font-medium text-xs shadow-xs"
          >
            <Plus size={13} />
            <span>{lang === 'sw' ? 'Ongeza Mauzo (Add Sale)' : 'Add Sale Record'}</span>
          </button>
        </div>
      </div>

      {/* Authentic Excel Table */}
      <div className="overflow-x-auto border border-neutral-300 rounded shadow-xs">
        <table className="w-full border-collapse text-xs font-sans">
          <thead>
            {/* Table Headers */}
            <tr className="bg-[#D9E1F2] text-neutral-800 font-semibold border-b border-neutral-300 text-left">
              <th className="py-2 px-2 border-r border-neutral-300 text-center w-8 text-neutral-500 font-mono">#</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Date ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Type of Motorcycle ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Energy mode ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Brief ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Brand ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Product Name ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-center whitespace-nowrap">Quantity ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Spare part company ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Location ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Customer ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right whitespace-nowrap">Price per Unit ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-center whitespace-nowrap">Service ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right whitespace-nowrap">Service price ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right font-bold whitespace-nowrap bg-[#B4C6E7]">Total Amount</th>
              <th className="py-2 px-2 text-center w-8 text-neutral-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={sale.id}
                  className={`border-b border-neutral-200 hover:bg-amber-50/70 transition-colors ${
                    isEven ? 'bg-white' : 'bg-[#F2F2F2]'
                  }`}
                  onClick={() => onSelectCell && onSelectCell(`F${index + 4}`, sale.productName)}
                >
                  <td className="py-1.5 px-2 border-r border-neutral-200 text-center text-neutral-400 font-mono text-[11px]">
                    {index + 1}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-mono whitespace-nowrap">
                    {sale.date}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-medium whitespace-nowrap">
                    {sale.typeOfMotorcycle}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        sale.energyMode === 'ELECTRIC'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sale.energyMode === 'CNG'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sale.energyMode}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-400 italic">
                    {sale.brief || '—'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-semibold text-neutral-700 whitespace-nowrap">
                    {sale.brand}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-bold text-neutral-900 whitespace-nowrap">
                    {sale.productName}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-center font-bold text-blue-700 font-mono">
                    {sale.quantity}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-400">
                    {sale.sparePartCompany || '—'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        sale.location === 'Within Region'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-orange-50 text-orange-700 border border-orange-200'
                      }`}
                    >
                      {sale.location}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-700 whitespace-nowrap">
                    {sale.customer}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono whitespace-nowrap">
                    {sale.pricePerUnit.toLocaleString()}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-center font-medium">
                    <span
                      className={`px-1 rounded text-[10px] ${
                        sale.service === 'Yes'
                          ? 'bg-green-100 text-green-800 font-bold'
                          : 'text-neutral-400'
                      }`}
                    >
                      {sale.service}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono text-neutral-600 whitespace-nowrap">
                    {sale.servicePrice ? sale.servicePrice.toLocaleString() : '0'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono font-bold text-emerald-800 bg-[#E9EEF4] whitespace-nowrap">
                    {sale.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-1 px-1 text-center">
                    <button
                      onClick={() => onDeleteSale(sale.id)}
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
            {/* Totals Summary Row */}
            <tr className="bg-[#B4C6E7] text-neutral-900 font-bold border-t-2 border-neutral-400">
              <td colSpan={7} className="py-2 px-3 text-right uppercase tracking-wider">
                TOTAL (JUMLA):
              </td>
              <td className="py-2 px-2.5 text-center font-mono text-sm text-blue-900">
                {totalQty}
              </td>
              <td colSpan={6} className="py-2 px-3 text-right">
                JUMLA YA MAPATO (REVENUE):
              </td>
              <td className="py-2 px-2.5 text-right font-mono text-sm text-emerald-900 font-extrabold bg-[#8EA9DB]">
                {totalRevenue.toLocaleString()} TZS
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
