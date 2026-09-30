import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import {
  Users,
  FileCheck2,
  TrendingUp,
  Shield,
  Search,
  Cloud,
  Database,
  Lock,
  Server,
  Layers,
  CheckCircle,
  ExternalLink,
  Cpu
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [allAnalyses, setAllAnalyses] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAnalyses: 0,
    averageScore: 0,
    distribution: { excellent: 0, good: 0, average: 0, poor: 0 },
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'analyses' | 'architecture'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const users = authService.getUsers();
    const analyses = storageService.getAllAnalyses();
    const platformStats = storageService.getStats();

    setUsersList(users);
    setAllAnalyses(analyses);
    setStats(platformStats);
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
              System Administration
            </span>
            <Badge variant="cyan" size="sm" dot>
              Admin Portal
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ResumeLens Admin & Analytics
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            College project evaluator view: monitor platform telemetry, user records, and AWS cloud mapping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button href="/analyzer" variant="outline" size="sm">
            Open Analyzer
          </Button>
          <Button href="/dashboard" variant="primary" size="sm">
            Candidate View
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Users
            </span>
            <Users className="w-5 h-5 text-brand-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.totalUsers}</div>
          <p className="text-xs text-slate-500 mt-2">Registered student accounts</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Resumes Analyzed
            </span>
            <FileCheck2 className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.totalAnalyses}</div>
          <p className="text-xs text-slate-500 mt-2">Total ATS scoring runs</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Platform Average Score
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.averageScore} / 100</div>
          <p className="text-xs text-slate-500 mt-2">Across all candidate evaluations</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ready for ATS (&ge;80)
            </span>
            <Shield className="w-5 h-5 text-violet-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.distribution.excellent}</div>
          <p className="text-xs text-slate-500 mt-2">Passed all critical ATS thresholds</p>
        </Card>
      </div>

      {/* Cloud Architecture Phase 2 Preview Banner */}
      <Card className="p-6 bg-gradient-to-r from-brand-900 to-slate-900 text-white border-none shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/30 text-brand-200 border border-brand-400/30">
              <Cloud className="w-3.5 h-3.5" /> Planned AWS Cloud Architecture (Stage 2)
            </div>
            <h3 className="text-lg font-bold text-white">
              Zero-Credentials Frontend Ready for Cloud Deployment
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All data and authentication calls are isolated in <code className="text-cyan-300 font-mono">authService.js</code>,{' '}
              <code className="text-cyan-300 font-mono">storageService.js</code>, and <code className="text-cyan-300 font-mono">atsService.js</code>.
              When ready, deploy to <strong>AWS S3 + CloudFront</strong>, migrate users to <strong>Amazon Cognito</strong>, and execute scoring via <strong>AWS Lambda</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto text-xs shrink-0">
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Authentication</span>
              <span className="font-semibold text-white">Amazon Cognito</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Resume Storage</span>
              <span className="font-semibold text-white">Amazon S3</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Serverless API</span>
              <span className="font-semibold text-white">API Gateway + Lambda</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Database</span>
              <span className="font-semibold text-white">Amazon DynamoDB</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`pb-3 transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Registered Users ({usersList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('analyses')}
          className={`pb-3 transition-colors ${
            activeTab === 'analyses'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          All Resume Analyses ({allAnalyses.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`pb-3 transition-colors ${
            activeTab === 'architecture'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          AWS Architecture Blueprint
        </button>
      </div>

      {/* Tab 1: Users Table */}
      {activeTab === 'users' && (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <CardHeader
              title="Platform Users Directory"
              subtitle="All registered candidates and administrative reviewers"
              className="mb-0"
            />
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="pb-3 pl-2">Name & ID</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-center">Analyses</th>
                  <th className="pb-3">Joined Date</th>
                  <th className="pb-3">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pl-2 font-semibold text-slate-900">
                      <div>{u.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{u.id}</div>
                    </td>
                    <td className="py-3.5 text-slate-600">{u.email}</td>
                    <td className="py-3.5">
                      <Badge variant={u.role === 'admin' ? 'cyan' : 'default'} size="sm">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 text-center font-bold text-slate-800">
                      {u.analysesCount || 0}
                    </td>
                    <td className="py-3.5 text-slate-500">{u.joinedDate}</td>
                    <td className="py-3.5 text-slate-500">{u.lastActive || 'Today'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 2: All Analyses Table */}
      {activeTab === 'analyses' && (
        <Card className="p-6">
          <CardHeader
            title="Global Resume Analysis Telemetry"
            subtitle="Complete feed of all processed resume documents and scoring runs"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="pb-3 pl-2">Candidate & Resume</th>
                  <th className="pb-3">Job Description Target</th>
                  <th className="pb-3 text-center">ATS Score</th>
                  <th className="pb-3 text-center">Keyword Match</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3 text-right pr-2">Cloud Object</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {allAnalyses.map((ana) => (
                  <tr key={ana.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="font-semibold text-slate-900">{ana.userName || 'Candidate'}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{ana.resumeName}</div>
                    </td>
                    <td className="py-3.5 text-slate-700 max-w-xs truncate">{ana.jobTitle}</td>
                    <td className="py-3.5 text-center">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full ${
                          ana.score >= 80
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : ana.score >= 65
                            ? 'bg-brand-50 text-brand-700 border border-brand-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {ana.score} / 100
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-medium text-slate-700">
                      {ana.keywordMatch}%
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {new Date(ana.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        S3 Mock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: AWS Architecture Blueprint */}
      {activeTab === 'architecture' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <CardHeader
            title="AWS Cloud Architecture Design"
            subtitle="Target AWS deployment pipeline for ResumeLens ATS (Stage 2 Integration)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">1. Authentication: Cognito</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Amazon Cognito User Pools with JWT tokens. Replaces <code className="text-brand-600">authService.js</code> without touching React components.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">2. Storage: S3 & DynamoDB</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Resume PDFs stored in private S3 bucket via presigned upload URLs. Score records saved in DynamoDB tables.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">3. Compute: Lambda & Textract</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Serverless AWS Lambda executes deterministic ATS scoring. Amazon Textract handles OCR for scanned PDF documents.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-1">
            <div className="text-emerald-400 font-bold mb-2">// Current Local Service Isolation Contract</div>
            <div>src/services/authService.js    ==&gt; [Cognito Identity Provider Interface]</div>
            <div>src/services/storageService.js ==&gt; [Amazon S3 Presigned URLs + DynamoDB Client]</div>
            <div>src/services/atsService.js     ==&gt; [AWS Lambda / Serverless ATS Endpoint]</div>
          </div>
        </Card>
      )}
    </div>
  );
}
