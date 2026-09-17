export type SheetId =
  | 'PRODUCT'
  | 'Sales Table'
  | 'Purchase Table'
  | 'Expense Table'
  | 'Stock tracker'
  | 'Dashboard'
  | 'Report'
  | 'Contact';

export interface SaleItem {
  id: string;
  date: string;
  typeOfMotorcycle: string;
  energyMode: 'CNG' | 'PETROL' | 'ELECTRIC';
  brief?: string;
  brand: string;
  productName: string;
  quantity: number;
  sparePartCompany?: string;
  location: 'Within Region' | 'Outside Region';
  customer: 'New' | 'Old';
  pricePerUnit: number;
  service: 'Yes' | 'No';
  servicePrice: number;
  totalAmount: number;
}

export interface PurchaseItem {
  id: string;
  date: string;
  productName: string;
  typeOfMotorcycle: string;
  brand: string;
  quantity: number;
  source: 'Physical' | 'Online';
  supplierName: string;
  sparePartCompany?: string;
  costPerUnit: number;
  paymentMode: 'Cash' | 'emoney';
  account: 'CASH' | 'CRDB' | 'VODA CARD';
  description?: string;
  totalCost: number;
}

export interface ExpenseItem {
  id: string;
  date: string;
  expenseType: string;
  brief?: string;
  recurring: 'Yes' | 'No';
  period: 'None' | 'Weekly' | 'Monthly';
  totalCost: number;
  paymentMode: 'Cash' | 'emoney';
  account: 'CASH' | 'CRDB' | 'VODA CARD';
  description?: string;
  total: number;
}

export interface StockItem {
  productName: string;
  purchased: number;
  sold: number;
  remaining: number;
}

export interface DashboardMetrics {
  totalOrders: number;
  totalSales: number;
  totalPurchase: number;
  totalExpenses: number;
  grossProfit: number;
  netProfit: number;
}
