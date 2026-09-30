import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import Button from '../ui/Button';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Access Required</h2>
        <p className="text-slate-600 text-sm mb-6">
          The page you requested is reserved for administrative evaluators. Your current profile is logged in as{' '}
          <span className="font-semibold text-slate-800">{user?.email}</span> (role: {user?.role}).
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/dashboard" variant="outline">
            Return to User Dashboard
          </Button>
          <Button href="/login" variant="primary">
            Switch to Admin Demo Account
          </Button>
        </div>
      </div>
    );
  }

  return children;
}
