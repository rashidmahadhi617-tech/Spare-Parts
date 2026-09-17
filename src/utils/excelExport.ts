import ExcelJS from 'exceljs';
import { SaleItem, PurchaseItem, ExpenseItem } from '../types';

// Helper for cell border
const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
  left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
  bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
  right: { style: 'thin', color: { argb: 'FFD3D3D3' } },
};

const tableHeaderBorder: Partial<ExcelJS.Borders> = {
  top: { style: 'medium', color: { argb: 'FF808080' } },
  left: { style: 'thin', color: { argb: 'FFB0B0B0' } },
  bottom: { style: 'medium', color: { argb: 'FF808080' } },
  right: { style: 'thin', color: { argb: 'FFB0B0B0' } },
};

export async function exportToExcelFile(
  products: string[],
  brands: string[],
  motorcycleTypes: string[],
  sales: SaleItem[],
  purchases: PurchaseItem[],
  expenses: ExpenseItem[],
  contact: {
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    address: string;
    currency: string;
    notes: string;
  }
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'SM Template T3';
  wb.created = new Date();
  wb.modified = new Date();

  // =========================================================================
  // 1. DASHBOARD SHEET (Exact layout from Screenshot_20260911-115255_YouTube)
  // =========================================================================
  const wsDash = wb.addWorksheet('Dashboard', {
    properties: { tabColor: { argb: 'FF245B9E' } },
    views: [{ showGridLines: true }],
  });

  // Title Banner: BUSINESS DASHBOARD
  wsDash.mergeCells('A1:L1');
  const dashTitleCell = wsDash.getCell('A1');
  dashTitleCell.value = 'BUSINESS DASHBOARD';
  dashTitleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  dashTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  dashTitleCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF245B9E' },
  };
  wsDash.getRow(1).height = 32;

  // KPI CARDS (Row 3 to 5)
  // Card 1: No. of Sales (order) (Cols B-C)
  wsDash.mergeCells('B3:C3');
  wsDash.mergeCells('B4:C5');
  const kpi1Title = wsDash.getCell('B3');
  kpi1Title.value = 'No. of Sales (order)';
  kpi1Title.font = { name: 'Segoe UI', size: 10, color: { argb: 'FFE2EFDA' } };
  kpi1Title.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi1Title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF274E13' } };

  const kpi1Val = wsDash.getCell('B4');
  kpi1Val.value = sales.length;
  kpi1Val.font = { name: 'Segoe UI', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
  kpi1Val.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi1Val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF274E13' } };

  // Card 2: Total Sales (Revenue) (Cols D-E)
  wsDash.mergeCells('D3:E3');
  wsDash.mergeCells('D4:E5');
  const kpi2Title = wsDash.getCell('D3');
  kpi2Title.value = 'Total Sales (Revenue)';
  kpi2Title.font = { name: 'Segoe UI', size: 10, color: { argb: 'FFE2EFDA' } };
  kpi2Title.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi2Title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF274E13' } };

  const totalRev = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const kpi2Val = wsDash.getCell('D4');
  kpi2Val.value = totalRev;
  kpi2Val.numFmt = '#,##0';
  kpi2Val.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  kpi2Val.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi2Val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF274E13' } };

  // Card 3: Total Purchase (COGS) (Cols F-G)
  wsDash.mergeCells('F3:G3');
  wsDash.mergeCells('F4:G5');
  const kpi3Title = wsDash.getCell('F3');
  kpi3Title.value = 'Total Purchase (COGS)';
  kpi3Title.font = { name: 'Segoe UI', size: 10, color: { argb: 'FFFFF2CC' } };
  kpi3Title.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi3Title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF806000' } };

  const totalCost = purchases.reduce((acc, p) => acc + p.totalCost, 0);
  const kpi3Val = wsDash.getCell('F4');
  kpi3Val.value = totalCost;
  kpi3Val.numFmt = '#,##0';
  kpi3Val.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  kpi3Val.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi3Val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF806000' } };

  // Card 4: Total Expenses (Col H)
  wsDash.getCell('H3').value = 'Total Expenses';
  wsDash.getCell('H3').font = { name: 'Segoe UI', size: 9, color: { argb: 'FFFCE4D6' } };
  wsDash.getCell('H3').alignment = { horizontal: 'center', vertical: 'middle' };
  wsDash.getCell('H3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF990000' } };

  const totalExp = expenses.reduce((acc, e) => acc + e.total, 0);
  wsDash.mergeCells('H4:H5');
  const kpi4Val = wsDash.getCell('H4');
  kpi4Val.value = totalExp;
  kpi4Val.numFmt = '#,##0';
  kpi4Val.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  kpi4Val.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi4Val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF990000' } };

  // Card 5: Gross Profit/Loss (Cols I-J)
  wsDash.mergeCells('I3:J3');
  wsDash.mergeCells('I4:J5');
  const kpi5Title = wsDash.getCell('I3');
  kpi5Title.value = 'Gross Profit/Loss';
  kpi5Title.font = { name: 'Segoe UI', size: 10, color: { argb: 'FFD9E1F2' } };
  kpi5Title.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi5Title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF305496' } };

  const grossProfit = totalRev - totalCost;
  const kpi5Val = wsDash.getCell('I4');
  kpi5Val.value = grossProfit;
  kpi5Val.numFmt = '#,##0';
  kpi5Val.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  kpi5Val.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi5Val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF305496' } };

  // Card 6: Net Profit/Loss (Cols K-L)
  wsDash.mergeCells('K3:L3');
  wsDash.mergeCells('K4:L5');
  const kpi6Title = wsDash.getCell('K3');
  kpi6Title.value = 'Net Profit/Loss';
  kpi6Title.font = { name: 'Segoe UI', size: 10, color: { argb: 'FFD9E1F2' } };
  kpi6Title.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi6Title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1B365D' } };

  const netProfit = grossProfit - totalExp;
  const kpi6Val = wsDash.getCell('K4');
  kpi6Val.value = netProfit;
  kpi6Val.numFmt = '#,##0';
  kpi6Val.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  kpi6Val.alignment = { horizontal: 'center', vertical: 'middle' };
  kpi6Val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1B365D' } };

  // Analytical Breakdown Tables below KPI cards
  // 1. TOP 10 SOLD PRODUCTS
  wsDash.mergeCells('B7:E7');
  const t1Header = wsDash.getCell('B7');
  t1Header.value = '(2.) TOP 10 SOLD PRODUCTS (OVERALL)';
  t1Header.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  t1Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
  t1Header.alignment = { vertical: 'middle' };

  wsDash.getCell('B8').value = 'Rank';
  wsDash.getCell('C8').value = 'Product Name';
  wsDash.getCell('D8').value = 'Quantity Sold';
  wsDash.getCell('E8').value = 'Total Amount (TZS)';
  ['B8', 'C8', 'D8', 'E8'].forEach((addr) => {
    const c = wsDash.getCell(addr);
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1F4E79' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
    c.border = thinBorder;
  });

  // Calculate top sold
  const prodMap: Record<string, { qty: number; amt: number }> = {};
  sales.forEach((s) => {
    if (!prodMap[s.productName]) prodMap[s.productName] = { qty: 0, amt: 0 };
    prodMap[s.productName].qty += s.quantity;
    prodMap[s.productName].amt += s.totalAmount;
  });
  const sortedProds = Object.entries(prodMap).sort((a, b) => b[1].qty - a[1].qty);

  sortedProds.slice(0, 10).forEach(([name, data], idx) => {
    const rowNum = 9 + idx;
    const rCell = wsDash.getCell(`B${rowNum}`);
    rCell.value = idx + 1;
    rCell.alignment = { horizontal: 'center' };
    rCell.border = thinBorder;

    const nCell = wsDash.getCell(`C${rowNum}`);
    nCell.value = name;
    nCell.border = thinBorder;

    const qCell = wsDash.getCell(`D${rowNum}`);
    qCell.value = data.qty;
    qCell.alignment = { horizontal: 'center' };
    qCell.font = { bold: true };
    qCell.border = thinBorder;

    const aCell = wsDash.getCell(`E${rowNum}`);
    aCell.value = data.amt;
    aCell.numFmt = '#,##0';
    aCell.border = thinBorder;
  });

  // 2. REGIONAL SPLIT (WITHIN vs OUTSIDE REGION)
  wsDash.mergeCells('G7:I7');
  const t2Header = wsDash.getCell('G7');
  t2Header.value = '(5.) WITHIN vs OUTSIDE REGION';
  t2Header.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  t2Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF385723' } };

  wsDash.getCell('G8').value = 'Location';
  wsDash.getCell('H8').value = 'Orders';
  wsDash.getCell('I8').value = 'Percentage (%)';
  ['G8', 'H8', 'I8'].forEach((addr) => {
    const c = wsDash.getCell(addr);
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF385723' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
    c.border = thinBorder;
  });

  const withinCount = sales.filter((s) => s.location === 'Within Region').length;
  const outsideCount = sales.filter((s) => s.location === 'Outside Region').length;
  const totalOrders = sales.length || 1;

  wsDash.getCell('G9').value = 'Within Region';
  wsDash.getCell('H9').value = withinCount;
  wsDash.getCell('I9').value = `${Math.round((withinCount / totalOrders) * 100)}%`;

  wsDash.getCell('G10').value = 'Outside Region';
  wsDash.getCell('H10').value = outsideCount;
  wsDash.getCell('I10').value = `${Math.round((outsideCount / totalOrders) * 100)}%`;

  ['G9', 'H9', 'I9', 'G10', 'H10', 'I10'].forEach((addr) => {
    wsDash.getCell(addr).border = thinBorder;
  });

  // 3. EXPENSES BREAKDOWN
  wsDash.mergeCells('G12:I12');
  const expH = wsDash.getCell('G12');
  expH.value = '(6.) EXPENSES BREAKDOWN';
  expH.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  expH.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF833C0C' } };

  wsDash.getCell('G13').value = 'Expense Type';
  wsDash.getCell('H13').value = 'Recurring?';
  wsDash.getCell('I13').value = 'Amount (TZS)';
  ['G13', 'H13', 'I13'].forEach((addr) => {
    const c = wsDash.getCell(addr);
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF833C0C' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
    c.border = thinBorder;
  });

  expenses.forEach((e, i) => {
    const r = 14 + i;
    wsDash.getCell(`G${r}`).value = e.expenseType;
    wsDash.getCell(`H${r}`).value = e.recurring;
    wsDash.getCell(`I${r}`).value = e.total;
    wsDash.getCell(`I${r}`).numFmt = '#,##0';
    ['G', 'H', 'I'].forEach((col) => {
      wsDash.getCell(`${col}${r}`).border = thinBorder;
    });
  });

  wsDash.columns = [
    { width: 4 },
    { width: 8 },
    { width: 28 },
    { width: 16 },
    { width: 22 },
    { width: 6 },
    { width: 18 },
    { width: 14 },
    { width: 18 },
    { width: 14 },
    { width: 14 },
    { width: 14 },
  ];

  // =========================================================================
  // 2. PRODUCT SHEET (Screenshot_20260911-114432_YouTube)
  // =========================================================================
  const wsProd = wb.addWorksheet('PRODUCT', {
    properties: { tabColor: { argb: 'FF2E75B6' } },
    views: [{ showGridLines: true }],
  });

  // Table 1: PRODUCT (Cols B-C)
  wsProd.mergeCells('B2:C2');
  const pHeader = wsProd.getCell('B2');
  pHeader.value = 'PRODUCT';
  pHeader.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  pHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E75B6' } };
  pHeader.alignment = { horizontal: 'center', vertical: 'middle' };
  wsProd.getRow(2).height = 24;

  products.forEach((prod, i) => {
    const r = 3 + i;
    const numCell = wsProd.getCell(`B${r}`);
    numCell.value = i + 1;
    numCell.alignment = { horizontal: 'center' };
    numCell.font = { size: 10, color: { argb: 'FF595959' } };
    numCell.border = thinBorder;

    const valCell = wsProd.getCell(`C${r}`);
    valCell.value = prod;
    valCell.font = { size: 11, bold: true };
    valCell.border = thinBorder;
    if (i % 2 === 1) {
      valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F7FA' } };
    }
  });

  // Table 2: BRAND (Cols E-F)
  wsProd.mergeCells('E2:F2');
  const bHeader = wsProd.getCell('E2');
  bHeader.value = 'BRAND';
  bHeader.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  bHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFED7D31' } };
  bHeader.alignment = { horizontal: 'center', vertical: 'middle' };

  brands.forEach((brand, i) => {
    const r = 3 + i;
    const numCell = wsProd.getCell(`E${r}`);
    numCell.value = i + 1;
    numCell.alignment = { horizontal: 'center' };
    numCell.font = { size: 10, color: { argb: 'FF595959' } };
    numCell.border = thinBorder;

    const valCell = wsProd.getCell(`F${r}`);
    valCell.value = brand;
    valCell.font = { size: 11, bold: true };
    valCell.border = thinBorder;
    if (i % 2 === 1) {
      valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF7F2' } };
    }
  });

  // Table 3: TYPE OF MOTORCYCLE (Cols H-I)
  wsProd.mergeCells('H2:I2');
  const mHeader = wsProd.getCell('H2');
  mHeader.value = 'TYPE OF MOTORCYCLE';
  mHeader.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  mHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
  mHeader.alignment = { horizontal: 'center', vertical: 'middle' };

  motorcycleTypes.forEach((mType, i) => {
    const r = 3 + i;
    const numCell = wsProd.getCell(`H${r}`);
    numCell.value = i + 1;
    numCell.alignment = { horizontal: 'center' };
    numCell.font = { size: 10, color: { argb: 'FF595959' } };
    numCell.border = thinBorder;

    const valCell = wsProd.getCell(`I${r}`);
    valCell.value = mType;
    valCell.font = { size: 11, bold: true };
    valCell.border = thinBorder;
    if (i % 2 === 1) {
      valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4F9F1' } };
    }
  });

  wsProd.columns = [
    { width: 4 },
    { width: 5 },
    { width: 28 },
    { width: 4 },
    { width: 5 },
    { width: 22 },
    { width: 4 },
    { width: 5 },
    { width: 24 },
  ];

  // =========================================================================
  // 3. SALES TABLE SHEET (Screenshot_20260911-114928_YouTube)
  // =========================================================================
  const wsSales = wb.addWorksheet('Sales Table', {
    properties: { tabColor: { argb: 'FFED7D31' } },
    views: [{ showGridLines: true }],
  });

  // Peach Banner: SALES TABLE
  wsSales.mergeCells('A1:N1');
  const salesBanner = wsSales.getCell('A1');
  salesBanner.value = 'SALES TABLE';
  salesBanner.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFC00000' } };
  salesBanner.alignment = { horizontal: 'center', vertical: 'middle' };
  salesBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
  wsSales.getRow(1).height = 28;

  // Header row
  const salesHeaders = [
    'Date',
    'Type of Motorcycle',
    'Energy mode',
    'Brief',
    'Brand',
    'Product Name',
    'Quantity',
    'Spare part company',
    'Location',
    'Customer',
    'Price per Unit',
    'Service',
    'Service price',
    'Total Amount',
  ];

  const salesHeaderRow = wsSales.getRow(2);
  salesHeaderRow.values = salesHeaders;
  salesHeaderRow.height = 24;
  salesHeaders.forEach((_, i) => {
    const cell = salesHeaderRow.getCell(i + 1);
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF000000' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: i === 13 ? 'FFB4C6E7' : 'FFD9E1F2' },
    };
    cell.border = tableHeaderBorder;
    cell.alignment = { vertical: 'middle' };
  });

  sales.forEach((s, idx) => {
    const rowNum = 3 + idx;
    const row = wsSales.getRow(rowNum);
    row.values = [
      s.date,
      s.typeOfMotorcycle,
      s.energyMode,
      s.brief || '',
      s.brand,
      s.productName,
      s.quantity,
      s.sparePartCompany || '',
      s.location,
      s.customer,
      s.pricePerUnit,
      s.service,
      s.servicePrice,
      { formula: `G${rowNum}*K${rowNum}+M${rowNum}`, result: s.totalAmount },
    ];

    const isEven = idx % 2 === 0;
    const bg = isEven ? 'FFFFFFFF' : 'FFF2F2F2';

    for (let c = 1; c <= 14; c++) {
      const cell = row.getCell(c);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: c === 14 ? 'FFE9EEF4' : bg } };

      if (c === 7) {
        cell.alignment = { horizontal: 'center' };
        cell.font = { bold: true, color: { argb: 'FF1F4E79' } };
      } else if (c === 11 || c === 13) {
        cell.numFmt = '#,##0';
      } else if (c === 14) {
        cell.numFmt = '#,##0';
        cell.font = { bold: true, color: { argb: 'FF1F4E79' } };
      }
    }
  });

  // Totals Row
  const salesTotalRowIndex = 3 + sales.length;
  wsSales.mergeCells(`A${salesTotalRowIndex}:F${salesTotalRowIndex}`);
  const salesTotLabel = wsSales.getCell(`A${salesTotalRowIndex}`);
  salesTotLabel.value = 'TOTAL (JUMLA):';
  salesTotLabel.font = { name: 'Segoe UI', size: 10, bold: true };
  salesTotLabel.alignment = { horizontal: 'right', vertical: 'middle' };

  const salesTotQty = wsSales.getCell(`G${salesTotalRowIndex}`);
  salesTotQty.value = { formula: `SUM(G3:G${salesTotalRowIndex - 1})`, result: sales.reduce((a, s) => a + s.quantity, 0) };
  salesTotQty.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF1F4E79' } };
  salesTotQty.alignment = { horizontal: 'center', vertical: 'middle' };

  wsSales.mergeCells(`H${salesTotalRowIndex}:M${salesTotalRowIndex}`);
  const salesTotMid = wsSales.getCell(`H${salesTotalRowIndex}`);
  salesTotMid.value = 'JUMLA YA MAPATO (REVENUE):';
  salesTotMid.font = { name: 'Segoe UI', size: 10, bold: true };
  salesTotMid.alignment = { horizontal: 'right', vertical: 'middle' };

  const salesTotRev = wsSales.getCell(`N${salesTotalRowIndex}`);
  salesTotRev.value = { formula: `SUM(N3:N${salesTotalRowIndex - 1})`, result: totalRev };
  salesTotRev.numFmt = '#,##0 "TZS"';
  salesTotRev.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF1F4E79' } };
  salesTotRev.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8EA9DB' } };

  for (let c = 1; c <= 14; c++) {
    const cell = wsSales.getCell(salesTotalRowIndex, c);
    cell.border = tableHeaderBorder;
    if (c !== 14) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB4C6E7' } };
    }
  }

  wsSales.columns = [
    { width: 14 }, // Date
    { width: 18 }, // Motorcycle
    { width: 14 }, // Energy
    { width: 12 }, // Brief
    { width: 16 }, // Brand
    { width: 22 }, // Product Name
    { width: 12 }, // Quantity
    { width: 18 }, // Spare part comp
    { width: 16 }, // Location
    { width: 12 }, // Customer
    { width: 15 }, // Price per unit
    { width: 10 }, // Service
    { width: 14 }, // Service price
    { width: 18 }, // Total Amount
  ];

  // =========================================================================
  // 4. PURCHASE TABLE SHEET (Screenshot_20260911-115031_YouTube)
  // =========================================================================
  const wsPur = wb.addWorksheet('Purchase Table', {
    properties: { tabColor: { argb: 'FF70AD47' } },
    views: [{ showGridLines: true }],
  });

  // Banner
  wsPur.mergeCells('A1:M1');
  const purBanner = wsPur.getCell('A1');
  purBanner.value = 'PURCHASE TABLE';
  purBanner.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFC00000' } };
  purBanner.alignment = { horizontal: 'center', vertical: 'middle' };
  purBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
  wsPur.getRow(1).height = 28;

  const purHeaders = [
    'Date',
    'Product Name',
    'Type of Motorcycle',
    'Brand',
    'Quantity',
    'Source',
    'Supplier Name',
    'Spare part Company',
    'Cost per Unit',
    'Payment Mode',
    'Account',
    'Description',
    'Total Cost',
  ];

  const purHeaderRow = wsPur.getRow(2);
  purHeaderRow.values = purHeaders;
  purHeaderRow.height = 24;
  purHeaders.forEach((_, i) => {
    const cell = purHeaderRow.getCell(i + 1);
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF000000' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: i === 12 ? 'FFB4C6E7' : 'FFD9E1F2' },
    };
    cell.border = tableHeaderBorder;
    cell.alignment = { vertical: 'middle' };
  });

  purchases.forEach((p, idx) => {
    const rowNum = 3 + idx;
    const row = wsPur.getRow(rowNum);
    row.values = [
      p.date,
      p.productName,
      p.typeOfMotorcycle,
      p.brand,
      p.quantity,
      p.source,
      p.supplierName,
      p.sparePartCompany || '',
      p.costPerUnit,
      p.paymentMode,
      p.account,
      p.description || '',
      { formula: `E${rowNum}*I${rowNum}`, result: p.totalCost },
    ];

    const isEven = idx % 2 === 0;
    const bg = isEven ? 'FFFFFFFF' : 'FFF2F2F2';

    for (let c = 1; c <= 13; c++) {
      const cell = row.getCell(c);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: c === 13 ? 'FFE9EEF4' : bg } };

      if (c === 5) {
        cell.alignment = { horizontal: 'center' };
        cell.font = { bold: true, color: { argb: 'FF1F4E79' } };
      } else if (c === 9) {
        cell.numFmt = '#,##0';
      } else if (c === 13) {
        cell.numFmt = '#,##0';
        cell.font = { bold: true, color: { argb: 'FF1F4E79' } };
      }
    }
  });

  // Totals Row
  const purTotalRowIndex = 3 + purchases.length;
  wsPur.mergeCells(`A${purTotalRowIndex}:D${purTotalRowIndex}`);
  const purTotLabel = wsPur.getCell(`A${purTotalRowIndex}`);
  purTotLabel.value = 'TOTAL (JUMLA YA VIPANDE):';
  purTotLabel.font = { name: 'Segoe UI', size: 10, bold: true };
  purTotLabel.alignment = { horizontal: 'right', vertical: 'middle' };

  const purTotQty = wsPur.getCell(`E${purTotalRowIndex}`);
  purTotQty.value = { formula: `SUM(E3:E${purTotalRowIndex - 1})`, result: purchases.reduce((a, p) => a + p.quantity, 0) };
  purTotQty.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF1F4E79' } };
  purTotQty.alignment = { horizontal: 'center', vertical: 'middle' };

  wsPur.mergeCells(`F${purTotalRowIndex}:L${purTotalRowIndex}`);
  const purTotMid = wsPur.getCell(`F${purTotalRowIndex}`);
  purTotMid.value = 'JUMLA YA GHARAMA ZA MANUNUZI (COGS):';
  purTotMid.font = { name: 'Segoe UI', size: 10, bold: true };
  purTotMid.alignment = { horizontal: 'right', vertical: 'middle' };

  const purTotCost = wsPur.getCell(`M${purTotalRowIndex}`);
  purTotCost.value = { formula: `SUM(M3:M${purTotalRowIndex - 1})`, result: totalCost };
  purTotCost.numFmt = '#,##0 "TZS"';
  purTotCost.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF1F4E79' } };
  purTotCost.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8EA9DB' } };

  for (let c = 1; c <= 13; c++) {
    const cell = wsPur.getCell(purTotalRowIndex, c);
    cell.border = tableHeaderBorder;
    if (c !== 13) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB4C6E7' } };
    }
  }

  wsPur.columns = [
    { width: 14 },
    { width: 22 },
    { width: 18 },
    { width: 16 },
    { width: 12 },
    { width: 12 },
    { width: 18 },
    { width: 18 },
    { width: 15 },
    { width: 14 },
    { width: 14 },
    { width: 18 },
    { width: 18 },
  ];

  // =========================================================================
  // 5. EXPENSES TABLE SHEET (Screenshot_20260911-115137_YouTube)
  // =========================================================================
  const wsExp = wb.addWorksheet('Expense Table', {
    properties: { tabColor: { argb: 'FFFFC000' } },
    views: [{ showGridLines: true }],
  });

  // Banner
  wsExp.mergeCells('A1:J1');
  const expBanner = wsExp.getCell('A1');
  expBanner.value = 'EXPENSES TABLE';
  expBanner.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFC00000' } };
  expBanner.alignment = { horizontal: 'center', vertical: 'middle' };
  expBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
  wsExp.getRow(1).height = 28;

  const expHeaders = [
    'Date',
    'Expense type',
    'Brief',
    'Recurring',
    'Period',
    'Total Cost',
    'Payment Mode',
    'Account',
    'Description',
    'Total',
  ];

  const expHeaderRow = wsExp.getRow(2);
  expHeaderRow.values = expHeaders;
  expHeaderRow.height = 24;
  expHeaders.forEach((_, i) => {
    const cell = expHeaderRow.getCell(i + 1);
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF000000' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: i === 9 ? 'FFB4C6E7' : 'FFD9E1F2' },
    };
    cell.border = tableHeaderBorder;
    cell.alignment = { vertical: 'middle' };
  });

  expenses.forEach((e, idx) => {
    const rowNum = 3 + idx;
    const row = wsExp.getRow(rowNum);
    row.values = [
      e.date,
      e.expenseType,
      e.brief || '',
      e.recurring,
      e.period,
      e.totalCost,
      e.paymentMode,
      e.account,
      e.description || '',
      { formula: `F${rowNum}`, result: e.total },
    ];

    for (let c = 1; c <= 10; c++) {
      const cell = row.getCell(c);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: c === 10 ? 'FFE9EEF4' : 'FFFFFFFF' } };

      if (c === 6 || c === 10) {
        cell.numFmt = '#,##0';
        if (c === 10) cell.font = { bold: true };
      }
    }
  });

  // Totals Row
  const expTotalRowIndex = 3 + expenses.length;
  wsExp.mergeCells(`A${expTotalRowIndex}:E${expTotalRowIndex}`);
  const expTotLabel = wsExp.getCell(`A${expTotalRowIndex}`);
  expTotLabel.value = 'JUMLA YA MATUMIZI YOTE (TOTAL EXPENSES):';
  expTotLabel.font = { name: 'Segoe UI', size: 10, bold: true };
  expTotLabel.alignment = { horizontal: 'right', vertical: 'middle' };

  const expTotCost = wsExp.getCell(`F${expTotalRowIndex}`);
  expTotCost.value = { formula: `SUM(F3:F${expTotalRowIndex - 1})`, result: totalExp };
  expTotCost.numFmt = '#,##0';
  expTotCost.font = { name: 'Segoe UI', size: 11, bold: true };

  wsExp.mergeCells(`G${expTotalRowIndex}:I${expTotalRowIndex}`);
  const expTotMid = wsExp.getCell(`G${expTotalRowIndex}`);
  expTotMid.value = '';

  const expTotTotal = wsExp.getCell(`J${expTotalRowIndex}`);
  expTotTotal.value = { formula: `SUM(J3:J${expTotalRowIndex - 1})`, result: totalExp };
  expTotTotal.numFmt = '#,##0 "TZS"';
  expTotTotal.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF990000' } };
  expTotTotal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8EA9DB' } };

  for (let c = 1; c <= 10; c++) {
    const cell = wsExp.getCell(expTotalRowIndex, c);
    cell.border = tableHeaderBorder;
    if (c !== 10) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB4C6E7' } };
    }
  }

  wsExp.columns = [
    { width: 14 },
    { width: 20 },
    { width: 12 },
    { width: 14 },
    { width: 14 },
    { width: 16 },
    { width: 16 },
    { width: 14 },
    { width: 22 },
    { width: 18 },
  ];

  // =========================================================================
  // 6. STOCK TRACKER SHEET (Screenshot_20260911-115213_YouTube)
  // =========================================================================
  const wsStock = wb.addWorksheet('Stock tracker', {
    properties: { tabColor: { argb: 'FFA9D18E' } },
    views: [{ showGridLines: true }],
  });

  // Pale Mint Header: STOCK TRACKER
  wsStock.mergeCells('B2:E2');
  const stockBanner = wsStock.getCell('B2');
  stockBanner.value = 'STOCK TRACKER';
  stockBanner.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FF262626' } };
  stockBanner.alignment = { horizontal: 'center', vertical: 'middle' };
  stockBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
  wsStock.getRow(2).height = 28;

  // Exact Headers with Screenshot Colors:
  // PRODUCT NAME (Yellow: #FFD966)
  // PURCHASED (Blue: #8EA9DB)
  // SOLD (Green: #A9D18E)
  // REMAINING (Red: #FF0000 with white text)
  const colB = wsStock.getCell('B3');
  colB.value = 'PRODUCT NAME';
  colB.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF000000' } };
  colB.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD966' } };
  colB.alignment = { horizontal: 'center', vertical: 'middle' };
  colB.border = tableHeaderBorder;

  const colC = wsStock.getCell('C3');
  colC.value = 'PURCHASED';
  colC.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF000000' } };
  colC.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8EA9DB' } };
  colC.alignment = { horizontal: 'center', vertical: 'middle' };
  colC.border = tableHeaderBorder;

  const colD = wsStock.getCell('D3');
  colD.value = 'SOLD';
  colD.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF000000' } };
  colD.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA9D18E' } };
  colD.alignment = { horizontal: 'center', vertical: 'middle' };
  colD.border = tableHeaderBorder;

  const colE = wsStock.getCell('E3');
  colE.value = 'REMAINING';
  colE.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  colE.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
  colE.alignment = { horizontal: 'center', vertical: 'middle' };
  colE.border = tableHeaderBorder;
  wsStock.getRow(3).height = 24;

  products.forEach((prod, idx) => {
    const rowNum = 4 + idx;
    const row = wsStock.getRow(rowNum);

    const purchased = purchases
      .filter((p) => p.productName.trim().toUpperCase() === prod.trim().toUpperCase())
      .reduce((s, p) => s + p.quantity, 0);

    const sold = sales
      .filter((s) => s.productName.trim().toUpperCase() === prod.trim().toUpperCase())
      .reduce((s, sa) => s + sa.quantity, 0);

    const remaining = purchased - sold;

    // Formulas referencing Purchase and Sales tables!
    // PURCHASED = SUMIF('Purchase Table'!B:B, prod, 'Purchase Table'!E:E)
    // SOLD = SUMIF('Sales Table'!F:F, prod, 'Sales Table'!G:G)
    // REMAINING = C - D
    row.getCell(2).value = prod;
    row.getCell(2).font = { name: 'Segoe UI', size: 10, bold: true };
    row.getCell(2).border = thinBorder;

    const cellC = row.getCell(3);
    cellC.value = {
      formula: `SUMIF('Purchase Table'!$B$3:$B$100, B${rowNum}, 'Purchase Table'!$E$3:$E$100)`,
      result: purchased,
    };
    cellC.alignment = { horizontal: 'center' };
    cellC.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF1F4E79' } };
    cellC.border = thinBorder;

    const cellD = row.getCell(4);
    cellD.value = {
      formula: `SUMIF('Sales Table'!$F$3:$F$100, B${rowNum}, 'Sales Table'!$G$3:$G$100)`,
      result: sold,
    };
    cellD.alignment = { horizontal: 'center' };
    cellD.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF385723' } };
    cellD.border = thinBorder;

    const cellE = row.getCell(5);
    cellE.value = {
      formula: `C${rowNum}-D${rowNum}`,
      result: remaining,
    };
    cellE.alignment = { horizontal: 'center' };
    cellE.font = { name: 'Segoe UI', size: 12, bold: true };
    cellE.border = thinBorder;

    if (remaining <= 0 && purchased > 0) {
      cellE.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
      cellE.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFC00000' } };
    } else if (remaining > 0 && remaining <= 2) {
      cellE.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF2CC' } };
      cellE.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFB25900' } };
    } else if (remaining > 2) {
      cellE.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
      cellE.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF274E13' } };
    }
  });

  // Totals row for Stock Tracker
  const stockTotalRowIndex = 4 + products.length;
  const totRow = wsStock.getRow(stockTotalRowIndex);
  totRow.getCell(2).value = 'JUMLA KUU (TOTALS):';
  totRow.getCell(2).font = { name: 'Segoe UI', size: 11, bold: true };
  totRow.getCell(2).alignment = { horizontal: 'right', vertical: 'middle' };
  totRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
  totRow.getCell(2).border = tableHeaderBorder;

  const totPurch = totRow.getCell(3);
  totPurch.value = {
    formula: `SUM(C4:C${stockTotalRowIndex - 1})`,
    result: purchases.reduce((a, p) => a + p.quantity, 0),
  };
  totPurch.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF1F4E79' } };
  totPurch.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
  totPurch.alignment = { horizontal: 'center', vertical: 'middle' };
  totPurch.border = tableHeaderBorder;

  const totSold = totRow.getCell(4);
  totSold.value = {
    formula: `SUM(D4:D${stockTotalRowIndex - 1})`,
    result: sales.reduce((a, s) => a + s.quantity, 0),
  };
  totSold.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF385723' } };
  totSold.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
  totSold.alignment = { horizontal: 'center', vertical: 'middle' };
  totSold.border = tableHeaderBorder;

  const totRem = totRow.getCell(5);
  totRem.value = {
    formula: `C${stockTotalRowIndex}-D${stockTotalRowIndex}`,
    result: purchases.reduce((a, p) => a + p.quantity, 0) - sales.reduce((a, s) => a + s.quantity, 0),
  };
  totRem.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFC00000' } };
  totRem.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } };
  totRem.alignment = { horizontal: 'center', vertical: 'middle' };
  totRem.border = tableHeaderBorder;

  wsStock.columns = [
    { width: 4 },
    { width: 28 }, // Product name
    { width: 16 }, // Purchased
    { width: 16 }, // Sold
    { width: 18 }, // Remaining
  ];

  // =========================================================================
  // 7. REPORT SHEET (Financial Summary)
  // =========================================================================
  const wsRep = wb.addWorksheet('Report', {
    properties: { tabColor: { argb: 'FF1F4E79' } },
    views: [{ showGridLines: true }],
  });

  wsRep.mergeCells('B2:E2');
  const repBanner = wsRep.getCell('B2');
  repBanner.value = 'FINANCIAL & BUSINESS REPORT';
  repBanner.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  repBanner.alignment = { horizontal: 'center', vertical: 'middle' };
  repBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
  wsRep.getRow(2).height = 30;

  const repItems = [
    ['Jumla ya Mapato (Total Revenue)', totalRev, 'Mapato kutokana na mauzo 15'],
    ['Gharama za Manunuzi (COGS)', totalCost, 'Gharama za kununua spea kutoka wauzaji'],
    ['Faida Ghafi (Gross Profit)', grossProfit, 'Mapato kutoa gharama za manunuzi'],
    ['Matumizi ya Uendeshaji (Expenses)', totalExp, 'Gharama za uendeshaji (Mafunzo, Taka)'],
    ['Faida Halisi (Net Profit)', netProfit, 'Faida baada ya kutoa matumizi yote'],
  ];

  repItems.forEach(([item, val, notes], idx) => {
    const r = 4 + idx;
    wsRep.getCell(`B${r}`).value = item;
    wsRep.getCell(`B${r}`).font = { name: 'Segoe UI', size: 11, bold: idx === 2 || idx === 4 };
    wsRep.getCell(`B${r}`).border = thinBorder;

    const valCell = wsRep.getCell(`C${r}`);
    valCell.value = val;
    valCell.numFmt = '#,##0 "TZS"';
    valCell.font = { name: 'Segoe UI', size: 12, bold: true };
    valCell.border = thinBorder;

    if (idx === 4) {
      valCell.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FF274E13' } };
      valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
    } else if (idx === 2) {
      valCell.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FF1F4E79' } };
      valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
    }

    const notesCell = wsRep.getCell(`D${r}`);
    notesCell.value = notes;
    notesCell.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: 'FF595959' } };
    notesCell.border = thinBorder;
  });

  wsRep.columns = [
    { width: 4 },
    { width: 34 },
    { width: 22 },
    { width: 40 },
  ];

  // =========================================================================
  // 8. CONTACT SHEET
  // =========================================================================
  const wsContact = wb.addWorksheet('Contact', {
    properties: { tabColor: { argb: 'FF107C41' } },
    views: [{ showGridLines: true }],
  });

  wsContact.mergeCells('B2:D2');
  const cBanner = wsContact.getCell('B2');
  cBanner.value = 'TAARIFA ZA MAWASILIANO & KIOLEZO';
  cBanner.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  cBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF107C41' } };
  cBanner.alignment = { horizontal: 'center', vertical: 'middle' };
  wsContact.getRow(2).height = 28;

  const contactRows = [
    ['Jina la Biashara / Duka:', contact.businessName],
    ['Jina la Mmiliki:', contact.ownerName],
    ['Nambari ya Simu:', contact.phone],
    ['Barua Pepe (Email):', contact.email],
    ['Mahali / Eneo:', contact.address],
    ['Sarafu (Currency):', contact.currency],
    ['Mfumo / Version:', 'SM Template T3 - Spea za Pikipiki Workbook'],
    ['Maelezo:', contact.notes],
  ];

  contactRows.forEach(([lbl, v], idx) => {
    const r = 4 + idx;
    const lCell = wsContact.getCell(`B${r}`);
    lCell.value = lbl;
    lCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF333333' } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F7F4' } };
    lCell.border = thinBorder;

    const vCell = wsContact.getCell(`C${r}`);
    vCell.value = v;
    vCell.font = { name: 'Segoe UI', size: 11 };
    vCell.border = thinBorder;
  });

  wsContact.columns = [
    { width: 4 },
    { width: 26 },
    { width: 45 },
  ];

  // =========================================================================
  // GENERATE AND TRIGGER BROWSER DOWNLOAD OF THE .XLSX FILE
  // =========================================================================
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'SM_TEMPLATE_T3_SPEA_ZA_PIKIPIKI_SPARE_PARTS.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
