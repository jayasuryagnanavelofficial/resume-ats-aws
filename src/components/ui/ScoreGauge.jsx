import React from 'react';

export default function ScoreGauge({
  score = 0,
  size = 140,
  strokeWidth = 10,
  label = 'ATS Score',
  sublabel = true,
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  let strokeColor = '#2563eb'; // brand-600
  let textColor = 'text-brand-600';
  let statusText = 'Good';

  if (clampedScore >= 80) {
    strokeColor = '#10b981'; // emerald-500
    textColor = 'text-emerald-600';
    statusText = 'ATS Ready';
  } else if (clampedScore >= 65) {
    strokeColor = '#2563eb'; // brand-600
    textColor = 'text-brand-600';
    statusText = 'Competitive';
  } else if (clampedScore >= 50) {
    strokeColor = '#f59e0b'; // amber-500
    textColor = 'text-amber-600';
    statusText = 'Needs Work';
  } else {
    strokeColor = '#f43f5e'; // rose-500
    textColor = 'text-rose-600';
    statusText = 'High ATS Risk';
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active score circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
            {clampedScore}
          </span>
          <span className="text-[11px] font-medium text-slate-400 -mt-0.5">/ 100</span>
        </div>
      </div>

      {sublabel && (
        <div className="mt-2 text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
          <span className={`text-xs font-semibold ${textColor}`}>{statusText}</span>
        </div>
      )}
    </div>
  );
}
