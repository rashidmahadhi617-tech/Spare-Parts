import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Filter,
  DollarSign,
  Percent,
  Calculator,
  RefreshCw,
  TableProperties,
} from 'lucide-react';

interface ExcelRibbonProps {
  onRefreshCalculations: () => void;
  lang: 'sw' | 'en';
}

export const ExcelRibbon: React.FC<ExcelRibbonProps> = ({
  onRefreshCalculations,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Insert' | 'Data' | 'View' | 'Formulas'>('Home');

  return (
    <div className="bg-[#f3f2f1] border-b border-[#e1dfdd] select-none text-neutral-800 text-xs">
      {/* Ribbon Tabs */}
      <div className="flex space-x-1 px-2 pt-1 border-b border-[#e1dfdd] bg-[#f9f8f7]">
        {(['Home', 'Insert', 'Data', 'Formulas', 'View'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 font-medium rounded-t transition-colors ${
              activeTab === tab
                ? 'bg-white text-[#107C41] border-t-2 border-[#107C41] font-semibold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            {tab === 'Home' && (lang === 'sw' ? 'Mwanzo (Home)' : 'Home')}
            {tab === 'Insert' && (lang === 'sw' ? 'Ingiza (Insert)' : 'Insert')}
            {tab === 'Data' && (lang === 'sw' ? 'Data (Data)' : 'Data')}
            {tab === 'Formulas' && (lang === 'sw' ? 'Fomula (Formulas)' : 'Formulas')}
            {tab === 'View' && (lang === 'sw' ? 'Muonekano (View)' : 'View')}
          </button>
        ))}
      </div>

      {/* Ribbon Command Strip */}
      <div className="flex items-center px-3 py-1.5 overflow-x-auto space-x-4 bg-white min-h-[46px]">
        {/* Font section */}
        <div className="flex items-center space-x-1 pr-3 border-r border-neutral-200">
          <select className="bg-neutral-50 border border-neutral-300 rounded px-1.5 py-0.5 text-xs text-neutral-700 font-sans focus:outline-none">
            <option>Calibri</option>
            <option>Segoe UI</option>
            <option>Arial</option>
          </select>
          <select className="bg-neutral-50 border border-neutral-300 rounded px-1 py-0.5 text-xs text-neutral-700 focus:outline-none">
            <option>11</option>
            <option>10</option>
            <option>12</option>
            <option>14</option>
          </select>

          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700 font-bold" title="Bold">
            <Bold size={13} />
          </button>
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700 italic" title="Italic">
            <Italic size={13} />
          </button>
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700 underline" title="Underline">
            <Underline size={13} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 pr-3 border-r border-neutral-200">
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700" title="Align Left">
            <AlignLeft size={13} />
          </button>
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700" title="Align Center">
            <AlignCenter size={13} />
          </button>
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700" title="Align Right">
            <AlignRight size={13} />
          </button>
        </div>

        {/* Numbers */}
        <div className="flex items-center space-x-1 pr-3 border-r border-neutral-200">
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700 flex items-center space-x-0.5" title="Currency (TZS)">
            <DollarSign size={13} />
            <span className="text-[10px] font-semibold text-neutral-600">TZS</span>
          </button>
          <button className="p-1 hover:bg-neutral-100 rounded text-neutral-700" title="Percent">
            <Percent size={13} />
          </button>
          <span className="text-[10px] text-neutral-400">#,##0</span>
        </div>

        {/* Calculations / Formulas */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefreshCalculations}
            className="flex items-center space-x-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#107C41] border border-emerald-300 rounded transition-colors"
            title="Piga hesabu tena / Recalculate"
          >
            <RefreshCw size={12} />
            <span className="font-medium text-xs">{lang === 'sw' ? 'Hesabu Upya' : 'Recalculate'}</span>
          </button>

          <div className="flex items-center space-x-1 text-neutral-600">
            <Calculator size={14} className="text-[#107C41]" />
            <span className="text-[11px]">
              SUMIF, VLOOKUP, SUM: <strong className="text-emerald-700">{lang === 'sw' ? 'Hai' : 'Active'}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-1 text-neutral-500 pl-2">
            <TableProperties size={13} />
            <span className="text-[11px]">
              {lang === 'sw' ? 'Data imelandanishwa kiotomatiki' : 'Data auto-synced across sheets'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
