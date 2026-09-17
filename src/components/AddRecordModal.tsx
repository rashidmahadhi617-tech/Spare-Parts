import React, { useState } from 'react';
import { X, Plus, ShoppingCart, Truck, Receipt, Package } from 'lucide-react';
import { SaleItem, PurchaseItem, ExpenseItem } from '../types';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: string[];
  brands: string[];
  motorcycleTypes: string[];
  onAddSale: (sale: Omit<SaleItem, 'id'>) => void;
  onAddPurchase: (purchase: Omit<PurchaseItem, 'id'>) => void;
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  onAddProduct: (prod: string) => void;
  lang: 'sw' | 'en';
}

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  onClose,
  products,
  brands,
  motorcycleTypes,
  onAddSale,
  onAddPurchase,
  onAddExpense,
  onAddProduct,
  lang,
}) => {
  const [activeType, setActiveType] = useState<'sale' | 'purchase' | 'expense' | 'product'>('sale');

  // Sale form state
  const [saleDate, setSaleDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [saleProduct, setSaleProduct] = useState(products[0] || 'SHAFT KIKI');
  const [saleBrand, setSaleBrand] = useState(brands[0] || 'BOXER');
  const [saleMotorcycle, setSaleMotorcycle] = useState(motorcycleTypes[0] || 'BODABODA');
  const [saleEnergy, setSaleEnergy] = useState<'PETROL' | 'CNG' | 'ELECTRIC'>('PETROL');
  const [saleQty, setSaleQty] = useState(1);
  const [saleLocation, setSaleLocation] = useState<'Within Region' | 'Outside Region'>('Within Region');
  const [saleCustomer, setSaleCustomer] = useState<'New' | 'Old'>('New');
  const [salePrice, setSalePrice] = useState(10000);
  const [saleService, setSaleService] = useState<'Yes' | 'No'>('No');
  const [saleServicePrice, setSaleServicePrice] = useState(0);

  // Purchase form state
  const [purDate, setPurDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [purProduct, setPurProduct] = useState(products[0] || 'SHAFT KIKI');
  const [purBrand, setPurBrand] = useState(brands[0] || 'BOXER');
  const [purMotorcycle, setPurMotorcycle] = useState(motorcycleTypes[0] || 'BODABODA');
  const [purQty, setPurQty] = useState(10);
  const [purCost, setPurCost] = useState(5000);
  const [purSupplier, setPurSupplier] = useState('JJ');
  const [purPayment, setPurPayment] = useState<'Cash' | 'emoney'>('emoney');
  const [purAccount, setPurAccount] = useState<'CASH' | 'CRDB' | 'VODA CARD'>('CRDB');
  const [purSource, setPurSource] = useState<'Physical' | 'Online'>('Physical');

  // Expense form state
  const [expDate, setExpDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [expType, setExpType] = useState('Training');
  const [expCost, setExpCost] = useState(25000);
  const [expRecurring, setExpRecurring] = useState<'Yes' | 'No'>('No');
  const [expPeriod, setExpPeriod] = useState<'None' | 'Weekly' | 'Monthly'>('None');
  const [expAccount, setExpAccount] = useState<'CASH' | 'CRDB' | 'VODA CARD'>('CASH');

  // Product form state
  const [newProductName, setNewProductName] = useState('');

  if (!isOpen) return null;

  const handleSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceFee = saleService === 'Yes' ? saleServicePrice : 0;
    const total = saleQty * salePrice + serviceFee;
    onAddSale({
      date: saleDate,
      typeOfMotorcycle: saleMotorcycle,
      energyMode: saleEnergy,
      brief: '',
      brand: saleBrand,
      productName: saleProduct,
      quantity: Number(saleQty),
      sparePartCompany: '',
      location: saleLocation,
      customer: saleCustomer,
      pricePerUnit: Number(salePrice),
      service: saleService,
      servicePrice: Number(serviceFee),
      totalAmount: total,
    });
    onClose();
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = purQty * purCost;
    onAddPurchase({
      date: purDate,
      productName: purProduct,
      typeOfMotorcycle: purMotorcycle,
      brand: purBrand,
      quantity: Number(purQty),
      source: purSource,
      supplierName: purSupplier,
      costPerUnit: Number(purCost),
      paymentMode: purPayment,
      account: purAccount,
      totalCost: total,
    });
    onClose();
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({
      date: expDate,
      expenseType: expType,
      recurring: expRecurring,
      period: expPeriod,
      totalCost: Number(expCost),
      paymentMode: 'Cash',
      account: expAccount,
      total: Number(expCost),
    });
    onClose();
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductName.trim()) {
      onAddProduct(newProductName.trim().toUpperCase());
      setNewProductName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-neutral-300">
        {/* Modal Header */}
        <div className="bg-[#107C41] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-sm">
            <Plus size={16} />
            <span>
              {lang === 'sw' ? 'Ongeza Rekodi Mpya Kwenye Excel' : 'Add New Entry to Excel'}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs">
          <button
            onClick={() => setActiveType('sale')}
            className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 font-medium border-b-2 ${
              activeType === 'sale'
                ? 'border-emerald-700 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <ShoppingCart size={13} />
            <span>{lang === 'sw' ? 'Mauzo (Sale)' : 'Sale'}</span>
          </button>

          <button
            onClick={() => setActiveType('purchase')}
            className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 font-medium border-b-2 ${
              activeType === 'purchase'
                ? 'border-blue-700 text-blue-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Truck size={13} />
            <span>{lang === 'sw' ? 'Manunuzi' : 'Purchase'}</span>
          </button>

          <button
            onClick={() => setActiveType('expense')}
            className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 font-medium border-b-2 ${
              activeType === 'expense'
                ? 'border-purple-700 text-purple-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Receipt size={13} />
            <span>{lang === 'sw' ? 'Matumizi' : 'Expense'}</span>
          </button>

          <button
            onClick={() => setActiveType('product')}
            className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 font-medium border-b-2 ${
              activeType === 'product'
                ? 'border-amber-600 text-amber-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Package size={13} />
            <span>{lang === 'sw' ? 'Spea Mpya' : 'New Product'}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 text-xs">
          {/* 1. SALE FORM */}
          {activeType === 'sale' && (
            <form onSubmit={handleSaleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Date (Tarehe)</label>
                  <input
                    type="text"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Product (Spea)</label>
                  <select
                    value={saleProduct}
                    onChange={(e) => setSaleProduct(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    {products.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Motorcycle Type</label>
                  <select
                    value={saleMotorcycle}
                    onChange={(e) => setSaleMotorcycle(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    {motorcycleTypes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Brand (Chapa)</label>
                  <select
                    value={saleBrand}
                    onChange={(e) => setSaleBrand(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Quantity (Idadi)</label>
                  <input
                    type="number"
                    min="1"
                    value={saleQty}
                    onChange={(e) => setSaleQty(Number(e.target.value))}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Price per Unit (Bei TZS)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Location</label>
                  <select
                    value={saleLocation}
                    onChange={(e) => setSaleLocation(e.target.value as any)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="Within Region">Within Region</option>
                    <option value="Outside Region">Outside Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Service (Ufungaji)</label>
                  <select
                    value={saleService}
                    onChange={(e) => setSaleService(e.target.value as any)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="No">No (Hapana)</option>
                    <option value="Yes">Yes (Ndio)</option>
                  </select>
                </div>
              </div>

              {saleService === 'Yes' && (
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Gharama ya Huduma (Service Price TZS)</label>
                  <input
                    type="number"
                    value={saleServicePrice}
                    onChange={(e) => setSaleServicePrice(Number(e.target.value))}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs font-mono"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-100"
                >
                  Ghairi (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#107C41] hover:bg-[#0c5e31] text-white rounded font-semibold"
                >
                  Hifadhi Mauzo (Save Sale)
                </button>
              </div>
            </form>
          )}

          {/* 2. PURCHASE FORM */}
          {activeType === 'purchase' && (
            <form onSubmit={handlePurchaseSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    value={purDate}
                    onChange={(e) => setPurDate(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Product (Spea)</label>
                  <select
                    value={purProduct}
                    onChange={(e) => setPurProduct(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    {products.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Brand</label>
                  <select
                    value={purBrand}
                    onChange={(e) => setPurBrand(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Motorcycle Type</label>
                  <select
                    value={purMotorcycle}
                    onChange={(e) => setPurMotorcycle(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    {motorcycleTypes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Quantity (Mzigo)</label>
                  <input
                    type="number"
                    min="1"
                    value={purQty}
                    onChange={(e) => setPurQty(Number(e.target.value))}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Cost per Unit (Gharama TZS)</label>
                  <input
                    type="number"
                    min="0"
                    value={purCost}
                    onChange={(e) => setPurCost(Number(e.target.value))}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Supplier (Msambazaji)</label>
                  <input
                    type="text"
                    value={purSupplier}
                    onChange={(e) => setPurSupplier(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Account</label>
                  <select
                    value={purAccount}
                    onChange={(e) => setPurAccount(e.target.value as any)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="CRDB">CRDB</option>
                    <option value="CASH">CASH</option>
                    <option value="VODA CARD">VODA CARD</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-100"
                >
                  Ghairi
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold"
                >
                  Hifadhi Manunuzi
                </button>
              </div>
            </form>
          )}

          {/* 3. EXPENSE FORM */}
          {activeType === 'expense' && (
            <form onSubmit={handleExpenseSubmit} className="space-y-3">
              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Date</label>
                <input
                  type="text"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="w-full border border-neutral-300 rounded px-2 py-1 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Aina ya Matumizi (Expense Type)</label>
                <input
                  type="text"
                  placeholder="Mfano: Umeme, Kodi, Usafi, Mafunzo..."
                  value={expType}
                  onChange={(e) => setExpType(e.target.value)}
                  className="w-full border border-neutral-300 rounded px-2 py-1 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Kiasi (TZS)</label>
                <input
                  type="number"
                  value={expCost}
                  onChange={(e) => setExpCost(Number(e.target.value))}
                  className="w-full border border-neutral-300 rounded px-2 py-1 text-xs font-mono"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Recurring (Inajirudia?)</label>
                  <select
                    value={expRecurring}
                    onChange={(e) => setExpRecurring(e.target.value as any)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Akaunti</label>
                  <select
                    value={expAccount}
                    onChange={(e) => setExpAccount(e.target.value as any)}
                    className="w-full border border-neutral-300 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="CASH">CASH</option>
                    <option value="CRDB">CRDB</option>
                    <option value="VODA CARD">VODA CARD</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-100"
                >
                  Ghairi
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded font-semibold"
                >
                  Hifadhi Matumizi
                </button>
              </div>
            </form>
          )}

          {/* 4. PRODUCT FORM */}
          {activeType === 'product' && (
            <form onSubmit={handleProductSubmit} className="space-y-3">
              <div>
                <label className="block text-neutral-600 font-semibold mb-1">
                  Jina la Spea Mpya (Product Name)
                </label>
                <input
                  type="text"
                  placeholder="Mfano: SHOCK ABSORBER, TYRE TUBE..."
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full border border-neutral-300 rounded px-2 py-1.5 text-xs uppercase"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-100"
                >
                  Ghairi
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold"
                >
                  Ongeza Spea Kwenye Orodha
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
