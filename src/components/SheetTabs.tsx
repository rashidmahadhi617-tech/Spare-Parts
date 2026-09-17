import React from 'react';
import { SheetId } from '../types';
import { ChevronLeft, ChevronRight, Plus, Eye, Minus, ZoomIn } from 'lucide-react';

interface SheetTabsProps {
  activeSheet: SheetId;
  onSelectSheet: (sheet: SheetId) => void;
  zoom: number;
  setZoom: (z: number) => void;
  totalRecordsCount: number;
}

const TABS: { id: SheetId; label: string; color: string }[] = [
  { id: 'PRODUCT', label: 'PRODUCT', color: 'border-b-2 border-blue-600' },
  { id: 'Sales Table', label: 'Sales Table', color: 'border-b-2 border-rose-500' },
  { id: 'Purchase Table', label: 'Purchase Table', color: 'border-b-2 border-amber-500' },
  { id: 'Expense Table', label: 'Expense Table', color: 'border-b-2 border-purple-500' },
  { id: 'Stock tracker', label: 'Stock tracker', color: 'border-b-2 border-emerald-500' },
  { id: 'Dashboard', label: 'Dashboard', color: 'border-b-2 border-blue-700' },
  { id: 'Report', label: 'Report', color: 'border-b-2 border-teal-600' },
  { id: 'Contact', label: 'Contact', color: 'border-b-2 border-neutral-600' },
];

export const SheetTabs: React.FC<SheetTabsProps> = ({
  activeSheet,
  onSelectSheet,
  zoom,
  setZoom,
  totalRecordsCount,
}) => {
  return (
    <div className="bg-[#f3f2f1] border-t border-[#d2d0ce] select-none text-xs flex flex-wrap items-center justify-between px-2 py-1 gap-2">
      {/* Left: Tab scrolling arrows and sheet tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-[70vw] py-0.5">
        <button
          className="p-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded"
          title="Scroll Left"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          className="p-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded"
          title="Scroll Right"
        >
          <ChevronRight size={14} />
        </button>

        {/* The Tabs */}
        <div className="flex items-center space-x-0.5 ml-1">
          {TABS.map((tab) => {
            const isActive = activeSheet === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => onSelectSheet(tab.id)}
                className={`px-3 py-1 font-medium text-xs whitespace-nowrap transition-colors rounded-t border-t border-l border-r ${
                  isActive
                    ? 'bg-white text-[#107C41] font-semibold border-neutral-300 shadow-sm border-b-2 border-b-[#107C41]'
                    : 'bg-neutral-200/70 text-neutral-700 hover:bg-neutral-200 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Plus new sheet button */}
        <button
          onClick={() => alert('Majedwali yote 8 yamejengwa kwa ukamilifu kulingana na kiolezo cha picha!')}
          className="p-1 text-neutral-500 hover:text-[#107C41] hover:bg-neutral-200 rounded ml-1"
          title="Add Sheet / Ongeza Jedwali"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Right: Status and zoom */}
      <div className="flex items-center space-x-3 text-neutral-600 text-[11px]">
        <span className="hidden sm:inline">
          Hali: <strong className="text-emerald-700 font-semibold">Tayari (Ready)</strong>
        </span>
        <span className="hidden md:inline">| Rekodi: {totalRecordsCount}</span>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1.5 pl-2 border-l border-neutral-300">
          <button
            onClick={() => setZoom(Math.max(70, zoom - 10))}
            className="p-0.5 hover:bg-neutral-200 rounded text-neutral-600"
            title="Punguza Ukubwa (Zoom Out)"
          >
            <Minus size={11} />
          </button>
          <span className="font-mono w-9 text-center text-[11px]">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(140, zoom + 10))}
            className="p-0.5 hover:bg-neutral-200 rounded text-neutral-600"
            title="Ongeza Ukubwa (Zoom In)"
          >
            <ZoomIn size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
