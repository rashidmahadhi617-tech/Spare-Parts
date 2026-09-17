import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ProductSheetProps {
  products: string[];
  brands: string[];
  motorcycleTypes: string[];
  onAddProduct: (item: string) => void;
  onAddBrand: (item: string) => void;
  onAddMotorcycleType: (item: string) => void;
  onDeleteProduct: (index: number) => void;
  onDeleteBrand: (index: number) => void;
  onDeleteMotorcycleType: (index: number) => void;
  onSelectCell?: (cell: string, value: string) => void;
  lang: 'sw' | 'en';
}

export const ProductSheet: React.FC<ProductSheetProps> = ({
  products,
  brands,
  motorcycleTypes,
  onAddProduct,
  onAddBrand,
  onAddMotorcycleType,
  onDeleteProduct,
  onDeleteBrand,
  onDeleteMotorcycleType,
  onSelectCell,
  lang,
}) => {
  const [newProduct, setNewProduct] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newType, setNewType] = useState('');

  const handleAddProd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.trim()) {
      onAddProduct(newProduct.trim().toUpperCase());
      setNewProduct('');
    }
  };

  const handleAddBr = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBrand.trim()) {
      onAddBrand(newBrand.trim().toUpperCase());
      setNewBrand('');
    }
  };

  const handleAddTy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newType.trim()) {
      onAddMotorcycleType(newType.trim().toUpperCase());
      setNewType('');
    }
  };

  const maxRows = Math.max(products.length, brands.length, motorcycleTypes.length);

  return (
    <div className="p-6 bg-white min-h-[calc(100vh-180px)] select-none">
      {/* Description banner */}
      <div className="mb-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900 flex justify-between items-center">
        <div>
          <strong className="font-semibold">{lang === 'sw' ? 'Jedwali Kuu la Bidhaa & Chapa' : 'Product & Brand Master Lists'}:</strong>{' '}
          {lang === 'sw'
            ? 'Orodha hii inatumika kama dropdown kwenye mauzo (Sales Table), manunuzi (Purchase Table), na ufuatiliaji wa stoo (Stock Tracker).'
            : 'These lists populate dropdown selectors for Sales, Purchases, and Stock Tracker tables.'}
        </div>
      </div>

      {/* 3 Side-by-Side Excel Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {/* TABLE 1: PRODUCT (Blue) */}
        <div className="border border-neutral-300 rounded shadow-xs overflow-hidden">
          <div className="bg-[#2E75B6] text-white px-3 py-2 flex items-center justify-between font-bold text-xs uppercase tracking-wide">
            <span>PRODUCT</span>
            <span className="text-[10px] bg-blue-800 px-1.5 py-0.5 rounded">{products.length} bidhaa</span>
          </div>

          {/* Add input */}
          <form onSubmit={handleAddProd} className="p-2 bg-blue-50/50 border-b border-blue-100 flex gap-1">
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Andika jina la spea...' : 'Add product name...'}
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-neutral-300 rounded focus:border-blue-500 focus:outline-none uppercase"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-[#2E75B6] hover:bg-[#256299] text-white rounded text-xs font-semibold flex items-center gap-1"
            >
              <Plus size={12} />
              <span>{lang === 'sw' ? 'Weka' : 'Add'}</span>
            </button>
          </form>

          {/* List items */}
          <div className="divide-y divide-neutral-200 max-h-[500px] overflow-y-auto">
            {products.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCell && onSelectCell(`B${idx + 4}`, item)}
                className="px-3 py-1.5 text-xs text-neutral-800 hover:bg-blue-50/70 flex items-center justify-between group cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-neutral-400 font-mono w-5">{idx + 1}</span>
                  <span className="font-medium text-neutral-800">{item}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProduct(idx);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-opacity"
                  title="Futa"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TABLE 2: BRAND (Orange) */}
        <div className="border border-neutral-300 rounded shadow-xs overflow-hidden">
          <div className="bg-[#ED7D31] text-white px-3 py-2 flex items-center justify-between font-bold text-xs uppercase tracking-wide">
            <span>BRAND</span>
            <span className="text-[10px] bg-orange-800 px-1.5 py-0.5 rounded">{brands.length} chapa</span>
          </div>

          <form onSubmit={handleAddBr} className="p-2 bg-orange-50/50 border-b border-orange-100 flex gap-1">
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Andika chapa mpya...' : 'Add brand name...'}
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-neutral-300 rounded focus:border-orange-500 focus:outline-none uppercase"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-[#ED7D31] hover:bg-[#d96b24] text-white rounded text-xs font-semibold flex items-center gap-1"
            >
              <Plus size={12} />
              <span>{lang === 'sw' ? 'Weka' : 'Add'}</span>
            </button>
          </form>

          <div className="divide-y divide-neutral-200 max-h-[500px] overflow-y-auto">
            {brands.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCell && onSelectCell(`F${idx + 4}`, item)}
                className="px-3 py-1.5 text-xs text-neutral-800 hover:bg-orange-50/70 flex items-center justify-between group cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-neutral-400 font-mono w-5">{idx + 1}</span>
                  <span className="font-medium text-neutral-800">{item}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBrand(idx);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-opacity"
                  title="Futa"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TABLE 3: TYPE OF MOTORCYCLE (Green) */}
        <div className="border border-neutral-300 rounded shadow-xs overflow-hidden">
          <div className="bg-[#70AD47] text-white px-3 py-2 flex items-center justify-between font-bold text-xs uppercase tracking-wide">
            <span>TYPE OF MOTORCYCLE</span>
            <span className="text-[10px] bg-green-800 px-1.5 py-0.5 rounded">{motorcycleTypes.length} aina</span>
          </div>

          <form onSubmit={handleAddTy} className="p-2 bg-green-50/50 border-b border-green-100 flex gap-1">
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Aina ya pikipiki...' : 'Add motorcycle type...'}
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-neutral-300 rounded focus:border-green-500 focus:outline-none uppercase"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-[#70AD47] hover:bg-[#5f933c] text-white rounded text-xs font-semibold flex items-center gap-1"
            >
              <Plus size={12} />
              <span>{lang === 'sw' ? 'Weka' : 'Add'}</span>
            </button>
          </form>

          <div className="divide-y divide-neutral-200 max-h-[500px] overflow-y-auto">
            {motorcycleTypes.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCell && onSelectCell(`J${idx + 4}`, item)}
                className="px-3 py-1.5 text-xs text-neutral-800 hover:bg-green-50/70 flex items-center justify-between group cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-neutral-400 font-mono w-5">{idx + 1}</span>
                  <span className="font-medium text-neutral-800">{item}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMotorcycleType(idx);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-opacity"
                  title="Futa"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
