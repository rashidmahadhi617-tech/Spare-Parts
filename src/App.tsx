import React, { useState } from 'react';
import { SheetId, SaleItem, PurchaseItem, ExpenseItem } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BRANDS,
  INITIAL_MOTORCYCLE_TYPES,
  INITIAL_SALES,
  INITIAL_PURCHASES,
  INITIAL_EXPENSES,
  INITIAL_CONTACT,
} from './initialData';
import { exportToExcelFile } from './utils/excelExport';
import { ExcelHeader } from './components/ExcelHeader';
import { ExcelRibbon } from './components/ExcelRibbon';
import { FormulaBar } from './components/FormulaBar';
import { SheetTabs } from './components/SheetTabs';
import { DashboardView } from './components/DashboardView';
import { ProductSheet } from './components/ProductSheet';
import { SalesTableSheet } from './components/SalesTableSheet';
import { PurchaseTableSheet } from './components/PurchaseTableSheet';
import { ExpenseTableSheet } from './components/ExpenseTableSheet';
import { StockTrackerSheet } from './components/StockTrackerSheet';
import { ReportSheet } from './components/ReportSheet';
import { ContactSheet } from './components/ContactSheet';
import { AddRecordModal } from './components/AddRecordModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Download, CheckCircle2, Smartphone } from 'lucide-react';

export default function App() {
  const [activeSheet, setActiveSheet] = useState<SheetId>('Dashboard');
  const [products, setProducts] = useState<string[]>(INITIAL_PRODUCTS);
  const [brands, setBrands] = useState<string[]>(INITIAL_BRANDS);
  const [motorcycleTypes, setMotorcycleTypes] = useState<string[]>(INITIAL_MOTORCYCLE_TYPES);
  const [sales, setSales] = useState<SaleItem[]>(INITIAL_SALES);
  const [purchases, setPurchases] = useState<PurchaseItem[]>(INITIAL_PURCHASES);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [contact, setContact] = useState(INITIAL_CONTACT);

  const [activeCell, setActiveCell] = useState<string>('A1');
  const [activeValue, setActiveValue] = useState<string>('SM TEMPLATE T3 - SPEA ZA PIKIPIKI');
  const [zoom, setZoom] = useState<number>(100);
  const [lang, setLang] = useState<'sw' | 'en'>('sw');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Handle cell click selection
  const handleSelectCell = (cell: string, value: string) => {
    setActiveCell(cell);
    setActiveValue(value);
  };

  // Download the single Excel file with all sheets
  const handleDownloadExcel = async () => {
    try {
      await exportToExcelFile(
        products,
        brands,
        motorcycleTypes,
        sales,
        purchases,
        expenses,
        contact
      );

      setDownloadNotification(
        lang === 'sw'
          ? 'Faili la Excel "SM_TEMPLATE_T3_SPEA_ZA_PIKIPIKI_SPARE_PARTS.xlsx" limepakuliwa likiwa na rangi, miundo na fomula zote kamili!'
          : 'Excel file "SM_TEMPLATE_T3_SPEA_ZA_PIKIPIKI_SPARE_PARTS.xlsx" downloaded with full colors, formatting and formulas!'
      );

      setTimeout(() => {
        setDownloadNotification(null);
      }, 6000);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert(lang === 'sw' ? 'Hitilafu wakati wa kupakua Excel' : 'Error downloading Excel');
    }
  };

  // Add handlers
  const handleAddSale = (newSale: Omit<SaleItem, 'id'>) => {
    const item: SaleItem = {
      ...newSale,
      id: `s-${Date.now()}`,
    };
    setSales([item, ...sales]);
  };

  const handleDeleteSale = (id: string) => {
    setSales(sales.filter((s) => s.id !== id));
  };

  const handleAddPurchase = (newPurchase: Omit<PurchaseItem, 'id'>) => {
    const item: PurchaseItem = {
      ...newPurchase,
      id: `p-${Date.now()}`,
    };
    setPurchases([item, ...purchases]);
  };

  const handleDeletePurchase = (id: string) => {
    setPurchases(purchases.filter((p) => p.id !== id));
  };

  const handleAddExpense = (newExpense: Omit<ExpenseItem, 'id'>) => {
    const item: ExpenseItem = {
      ...newExpense,
      id: `e-${Date.now()}`,
    };
    setExpenses([item, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const handleAddProduct = (item: string) => {
    if (!products.includes(item)) {
      setProducts([...products, item]);
    }
  };

  const handleDeleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleAddBrand = (item: string) => {
    if (!brands.includes(item)) {
      setBrands([...brands, item]);
    }
  };

  const handleDeleteBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  const handleAddMotorcycleType = (item: string) => {
    if (!motorcycleTypes.includes(item)) {
      setMotorcycleTypes([...motorcycleTypes, item]);
    }
  };

  const handleDeleteMotorcycleType = (index: number) => {
    setMotorcycleTypes(motorcycleTypes.filter((_, i) => i !== index));
  };

  const totalRecordsCount = sales.length + purchases.length + expenses.length + products.length;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-100 font-sans">
      {/* Toast Notification for Excel Download */}
      {downloadNotification && (
        <div className="fixed top-14 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-lg shadow-xl border border-emerald-500 flex items-center space-x-3 animate-fade-in max-w-md">
          <CheckCircle2 className="text-emerald-400 shrink-0" size={22} />
          <div className="text-xs">
            <div className="font-bold text-emerald-300">
              {lang === 'sw' ? 'Upakuaji Umekamilika!' : 'Download Complete!'}
            </div>
            <div className="text-neutral-200 mt-0.5">{downloadNotification}</div>
          </div>
        </div>
      )}

      {/* Offline Status Warning if network is disconnected */}
      <OfflineIndicator lang={lang} />

      {/* Top Excel Application Header & Ribbon */}
      <ExcelHeader
        activeSheet={activeSheet}
        onDownloadExcel={handleDownloadExcel}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      <ExcelRibbon
        onRefreshCalculations={() => {
          alert(lang === 'sw' ? 'Hesabu za stoo na faida zimelandanishwa upya!' : 'Calculations synchronized!');
        }}
        lang={lang}
      />

      <FormulaBar
        activeCell={activeCell}
        activeValue={activeValue}
        onChangeValue={(val) => setActiveValue(val)}
      />

      {/* Main Excel Sheet View Area with Zoom scaling */}
      <main
        className="flex-1 overflow-auto bg-neutral-200/50"
        style={{ zoom: `${zoom}%` }}
      >
        {activeSheet === 'Dashboard' && (
          <DashboardView
            sales={sales}
            purchases={purchases}
            expenses={expenses}
            onSelectCell={handleSelectCell}
            lang={lang}
          />
        )}

        {activeSheet === 'PRODUCT' && (
          <ProductSheet
            products={products}
            brands={brands}
            motorcycleTypes={motorcycleTypes}
            onAddProduct={handleAddProduct}
            onAddBrand={handleAddBrand}
            onAddMotorcycleType={handleAddMotorcycleType}
            onDeleteProduct={handleDeleteProduct}
            onDeleteBrand={handleDeleteBrand}
            onDeleteMotorcycleType={handleDeleteMotorcycleType}
            onSelectCell={handleSelectCell}
            lang={lang}
          />
        )}

        {activeSheet === 'Sales Table' && (
          <SalesTableSheet
            sales={sales}
            onAddSaleClick={() => setIsAddModalOpen(true)}
            onDeleteSale={handleDeleteSale}
            onSelectCell={handleSelectCell}
            lang={lang}
          />
        )}

        {activeSheet === 'Purchase Table' && (
          <PurchaseTableSheet
            purchases={purchases}
            onAddPurchaseClick={() => setIsAddModalOpen(true)}
            onDeletePurchase={handleDeletePurchase}
            onSelectCell={handleSelectCell}
            lang={lang}
          />
        )}

        {activeSheet === 'Expense Table' && (
          <ExpenseTableSheet
            expenses={expenses}
            onAddExpenseClick={() => setIsAddModalOpen(true)}
            onDeleteExpense={handleDeleteExpense}
            onSelectCell={handleSelectCell}
            lang={lang}
          />
        )}

        {activeSheet === 'Stock tracker' && (
          <StockTrackerSheet
            products={products}
            sales={sales}
            purchases={purchases}
            onSelectCell={handleSelectCell}
            lang={lang}
          />
        )}

        {activeSheet === 'Report' && (
          <ReportSheet
            sales={sales}
            purchases={purchases}
            expenses={expenses}
            lang={lang}
          />
        )}

        {activeSheet === 'Contact' && (
          <ContactSheet
            contact={contact}
            onUpdateContact={(newC) => setContact(newC)}
            lang={lang}
          />
        )}
      </main>

      {/* Bottom Sheet Navigation Tabs */}
      <SheetTabs
        activeSheet={activeSheet}
        onSelectSheet={(sheet) => {
          setActiveSheet(sheet);
          setActiveCell('A1');
          setActiveValue(sheet);
        }}
        zoom={zoom}
        setZoom={setZoom}
        totalRecordsCount={totalRecordsCount}
      />

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        products={products}
        brands={brands}
        motorcycleTypes={motorcycleTypes}
        onAddSale={handleAddSale}
        onAddPurchase={handleAddPurchase}
        onAddExpense={handleAddExpense}
        onAddProduct={handleAddProduct}
        lang={lang}
      />

      {/* PWA App Install Modal ("Download iwe kama app") */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
