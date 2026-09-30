import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Cloud, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <FileSearch className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">ResumeLens ATS</span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Deterministic, recruiter-grade Applicant Tracking System evaluation. Detect missing technical keywords, audit resume sections, and boost interview call rates.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                <Cloud className="w-3.5 h-3.5" /> AWS Cloud Architecture Project
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-200">
                <Cpu className="w-3.5 h-3.5" /> Stage 1: Frontend & Engine
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Application</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-brand-600 transition-colors">
                  Overview & Features
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="hover:text-brand-600 transition-colors">
                  Resume ATS Analyzer
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-600 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-600 transition-colors">
                  Admin Analytics Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Cloud Roadmap</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Vite + React + Tailwind
              </li>
              <li className="flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Amazon Cognito (Planned)
              </li>
              <li className="flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Amazon S3 Storage (Planned)
              </li>
              <li className="flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                AWS Lambda & API Gateway
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ResumeLens ATS. College Cloud Technology Capstone Project.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Isolated Service Layer (Zero Frontend Secrets)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
