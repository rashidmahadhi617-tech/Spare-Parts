import React from 'react';
import {
  Download,
  Save,
  Undo2,
  Redo2,
  Search,
  FileSpreadsheet,
  PlusCircle,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { SheetId } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ExcelHeaderProps {
  activeSheet: SheetId;
  onDownloadExcel: () => void;
  onOpenAddModal: () => void;
  onOpenInstallModal: () => void;
  lang: 'sw' | 'en';
  setLang: (l: 'sw' | 'en') => void;
}

export const ExcelHeader: React.FC<ExcelHeaderProps> = ({
  onDownloadExcel,
  onOpenAddModal,
  onOpenInstallModal,
  lang,
  setLang,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const handleInstallClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        onOpenInstallModal();
      }
    } else {
      onOpenInstallModal();
    }
  };

  return (
    <header className="bg-[#107C41] text-white select-none border-b border-[#0d6535]">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 text-xs">
        <div className="flex items-center space-x-2">
          {/* Excel App Icon */}
          <div className="w-5 h-5 bg-white text-[#107C41] font-bold rounded flex items-center justify-center text-xs shadow-sm">
            X
          </div>
          {/* Quick Access Icons */}
          <button
            title="Save / Hifadhi"
            className="p-1 hover:bg-[#0c5e31] rounded transition-colors"
            onClick={() => alert(lang === 'sw' ? 'Mabadiliko yamehifadhiwa kwenye mfumo!' : 'Changes saved in memory!')}
          >
            <Save size={14} />
          </button>
          <button title="Undo / Rejesha" className="p-1 hover:bg-[#0c5e31] rounded opacity-75 hover:opacity-100 transition-colors">
            <Undo2 size={14} />
          </button>
          <button title="Redo / Rudia" className="p-1 hover:bg-[#0c5e31] rounded opacity-75 hover:opacity-100 transition-colors">
            <Redo2 size={14} />
          </button>
          <div className="h-3 w-[1px] bg-white/30 mx-1" />
          <span className="font-semibold text-white tracking-wide text-xs hidden sm:inline">
            SM TEMPLATE T3 - SPEA ZA PIKIPIKI SPARE PARTS - Excel
          </span>
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex items-center bg-[#0d6535] rounded px-3 py-0.5 text-xs text-white/90 w-72 focus-within:bg-white focus-within:text-neutral-800 transition-colors">
          <Search size={12} className="mr-2 opacity-70" />
          <input
            type="text"
            placeholder={lang === 'sw' ? "Tafuta (Alt+Q) au fanya kazi..." : "Search (Alt+Q)..."}
            className="bg-transparent border-none outline-none text-xs w-full placeholder:text-white/60 focus:placeholder:text-neutral-400"
          />
        </div>

        {/* Right Actions: Language Switch & Window Controls */}
        <div className="flex items-center space-x-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'sw' ? 'en' : 'sw')}
            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#0c5e31] hover:bg-[#0a4e28] text-white transition-colors"
            title="Badili Lugha / Switch Language"
          >
            {lang === 'sw' ? '🇹🇿 Kiswahili' : '🇬🇧 English'}
          </button>

          {/* User initials badge */}
          <div className="w-5 h-5 rounded-full bg-[#185a37] text-white flex items-center justify-center text-[10px] font-semibold border border-white/30" title="rashidmahadhi617@gmail.com">
            RM
          </div>

          <div className="flex items-center space-x-2 text-white/80 pl-2">
            <span className="cursor-pointer hover:text-white">—</span>
            <span className="cursor-pointer hover:text-white">□</span>
            <span className="cursor-pointer hover:text-red-300">✕</span>
          </div>
        </div>
      </div>

      {/* Primary Action & Download Banner */}
      <div className="bg-[#0e6f3a] px-3 py-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#128a49]">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="text-emerald-200 shrink-0" size={18} />
          <div>
            <span className="font-bold text-sm tracking-tight text-white block leading-none">
              {lang === 'sw' ? 'Kiolezo cha Spea za Pikipiki' : 'Motorcycle Spare Parts Workbook'}
            </span>
            <span className="text-[11px] text-emerald-100/80">
              {lang === 'sw'
                ? 'Majedwali 8: PRODUCT, Sales, Purchases, Expenses, Stock Tracker, Dashboard, Report, Contact'
                : '8 Worksheets: PRODUCT, Sales, Purchases, Expenses, Stock Tracker, Dashboard, Report, Contact'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* In-App PWA Install Button ("Download iwe kama app") */}
          <button
            id="install-pwa-app-btn"
            onClick={handleInstallClick}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white hover:bg-neutral-100 text-[#107C41] rounded-md font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            title={lang === 'sw' ? 'Sakinisha programu hii kwenye simu au kompyuta yako kama App' : 'Install as Application (PWA)'}
          >
            <Smartphone size={15} className="text-[#107C41] stroke-[2.5]" />
            <span>
              {isInstalled
                ? (lang === 'sw' ? '✓ App Imewekwa' : '✓ App Installed')
                : (lang === 'sw' ? 'Download Kama App' : 'Download as App')}
            </span>
          </button>

          {/* Add Entry Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <PlusCircle size={15} />
            <span>{lang === 'sw' ? '+ Ongeza Rekodi' : '+ Add Entry'}</span>
          </button>

          {/* Download Excel Button (.xlsx) */}
          <button
            id="download-excel-btn"
            onClick={onDownloadExcel}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#FFC000] hover:bg-[#e6ad00] text-neutral-900 rounded-md font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            title="Pakua jedwali lote kama faili moja la .xlsx"
          >
            <Download size={15} className="text-neutral-900 stroke-[2.5]" />
            <span>{lang === 'sw' ? 'Pakua Excel (.xlsx)' : 'Download Excel (.xlsx)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
