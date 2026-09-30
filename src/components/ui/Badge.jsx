import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-brand-50 text-brand-700 border-brand-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    fail: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-brand-500',
    cyan: 'bg-cyan-500',
    success: 'bg-emerald-500',
    pass: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    fail: 'bg-rose-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.default}`} />}
      {children}
    </span>
  );
}
