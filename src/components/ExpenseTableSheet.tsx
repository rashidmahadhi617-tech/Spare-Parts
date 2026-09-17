import React, { useState, useMemo } from 'react';
import { ExpenseItem } from '../types';
import { Plus, Trash2, Search } from 'lucide-react';

interface ExpenseTableSheetProps {
  expenses: ExpenseItem[];
  onAddExpenseClick: () => void;
  onDeleteExpense: (id: string) => void;
  onSelectCell?: (cell: string, value: string) => void;
  lang: 'sw' | 'en';
}

export const ExpenseTableSheet: React.FC<ExpenseTableSheetProps> = ({
  expenses,
  onAddExpenseClick,
  onDeleteExpense,
  onSelectCell,
  lang,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (e) =>
        e.expenseType.toLowerCase().includes(filterQuery.toLowerCase()) ||
        e.account.toLowerCase().includes(filterQuery.toLowerCase()) ||
        e.date.includes(filterQuery)
    );
  }, [expenses, filterQuery]);

  const totalExpenseSum = filteredExpenses.reduce((acc, e) => acc + e.total, 0);

  return (
    <div className="p-4 bg-white min-h-[calc(100vh-180px)] select-none overflow-x-auto">
      {/* Title Banner */}
      <div className="bg-[#FCE4D6] border border-[#F8CBAD] text-center py-2 px-4 rounded-t mb-2">
        <h1 className="text-xl font-bold tracking-wide text-[#C00000] uppercase">
          EXPENSES TABLE
        </h1>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-neutral-50 p-2 rounded border border-neutral-200 text-xs">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === 'sw' ? 'Tafuta matumizi...' : 'Search expenses...'}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-7 pr-3 py-1 border border-neutral-300 rounded text-xs focus:outline-none focus:border-emerald-500 w-56"
            />
          </div>
        </div>

        <div>
          <button
            onClick={onAddExpenseClick}
            className="flex items-center space-x-1 px-3 py-1 bg-[#107C41] hover:bg-[#0c5e31] text-white rounded font-medium text-xs shadow-xs"
          >
            <Plus size={13} />
            <span>{lang === 'sw' ? 'Ongeza Matumizi (Add Expense)' : 'Add Expense Record'}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-neutral-300 rounded shadow-xs max-w-5xl">
        <table className="w-full border-collapse text-xs font-sans">
          <thead>
            <tr className="bg-[#D9E1F2] text-neutral-800 font-semibold border-b border-neutral-300 text-left">
              <th className="py-2 px-2 border-r border-neutral-300 text-center w-8 text-neutral-500 font-mono">#</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Date ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Expense type ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Brief ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Recurring ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Period ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right whitespace-nowrap">Total Cost ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Payment Mode ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Account ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 whitespace-nowrap">Description ▾</th>
              <th className="py-2 px-2.5 border-r border-neutral-300 text-right font-bold whitespace-nowrap bg-[#B4C6E7]">Total</th>
              <th className="py-2 px-2 text-center w-8 text-neutral-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={expense.id}
                  className={`border-b border-neutral-200 hover:bg-amber-50/70 transition-colors ${
                    isEven ? 'bg-white' : 'bg-[#F2F2F2]'
                  }`}
                  onClick={() => onSelectCell && onSelectCell(`B${index + 4}`, expense.expenseType)}
                >
                  <td className="py-1.5 px-2 border-r border-neutral-200 text-center text-neutral-400 font-mono text-[11px]">
                    {index + 1}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-mono whitespace-nowrap">
                    {expense.date}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 font-bold text-neutral-900 whitespace-nowrap">
                    {expense.expenseType}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-400 italic">
                    {expense.brief || '—'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        expense.recurring === 'Yes'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {expense.recurring}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-600 whitespace-nowrap">
                    {expense.period}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono whitespace-nowrap">
                    {expense.totalCost.toLocaleString()}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-600 whitespace-nowrap">
                    {expense.paymentMode}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {expense.account}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-neutral-500 italic max-w-xs truncate">
                    {expense.description || '—'}
                  </td>
                  <td className="py-1.5 px-2.5 border-r border-neutral-200 text-right font-mono font-bold text-neutral-900 bg-[#E9EEF4] whitespace-nowrap">
                    {expense.total.toLocaleString()}
                  </td>
                  <td className="py-1 px-1 text-center">
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
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
              <td colSpan={6} className="py-2 px-3 text-right uppercase tracking-wider">
                JUMLA YA MATUMIZI YOTE (TOTAL EXPENSES):
              </td>
              <td className="py-2 px-2.5 text-right font-mono text-sm text-neutral-900 font-extrabold">
                {totalExpenseSum.toLocaleString()} TZS
              </td>
              <td colSpan={3}></td>
              <td className="py-2 px-2.5 text-right font-mono text-sm text-rose-900 font-extrabold bg-[#8EA9DB]">
                {totalExpenseSum.toLocaleString()} TZS
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
