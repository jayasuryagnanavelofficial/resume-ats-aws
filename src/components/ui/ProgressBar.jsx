import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  height = 'h-2',
  color = 'auto', // 'auto', 'brand', 'emerald', 'amber', 'rose'
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  let colorClass = 'bg-brand-600';
  if (color === 'auto') {
    if (percentage >= 80) colorClass = 'bg-emerald-500';
    else if (percentage >= 60) colorClass = 'bg-brand-600';
    else if (percentage >= 40) colorClass = 'bg-amber-500';
    else colorClass = 'bg-rose-500';
  } else if (color === 'emerald') colorClass = 'bg-emerald-500';
  else if (color === 'amber') colorClass = 'bg-amber-500';
  else if (color === 'rose') colorClass = 'bg-rose-500';
  else if (color === 'cyan') colorClass = 'bg-cyan-500';

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
          {label && <span>{label}</span>}
          {showValue && (
            <span className="text-slate-500 tabular-nums">
              {value} / {max} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${colorClass} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
