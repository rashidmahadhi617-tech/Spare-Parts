import React from 'react';

interface FormulaBarProps {
  activeCell: string;
  activeValue: string;
  onChangeValue?: (val: string) => void;
}

export const FormulaBar: React.FC<FormulaBarProps> = ({
  activeCell,
  activeValue,
  onChangeValue,
}) => {
  return (
    <div className="flex items-center px-2 py-1 bg-white border-b border-[#e1dfdd] text-xs select-none">
      {/* Name Box (e.g. A1, B4) */}
      <div className="w-16 px-2 py-0.5 border border-neutral-300 rounded text-center font-mono font-medium text-neutral-700 bg-neutral-50 shadow-inner">
        {activeCell || 'A1'}
      </div>

      {/* Function fx button */}
      <div className="flex items-center justify-center px-2 text-neutral-400 font-serif italic font-bold">
        fx
      </div>

      <div className="h-4 w-[1px] bg-neutral-300 mr-2" />

      {/* Formula Input */}
      <input
        type="text"
        value={activeValue}
        onChange={(e) => onChangeValue && onChangeValue(e.target.value)}
        readOnly={!onChangeValue}
        className="flex-1 px-2 py-0.5 text-neutral-800 font-mono text-xs border border-transparent hover:border-neutral-300 focus:border-emerald-500 focus:outline-none rounded bg-transparent"
        placeholder="=FORMULA au thamani ya kisanduku (Cell value)..."
      />
    </div>
  );
};
